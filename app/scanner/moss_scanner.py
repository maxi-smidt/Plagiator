import json
import re
import os
import shutil
import logging

import html5lib
import urllib.request

from mosspy import Moss
from datetime import datetime
from bs4 import BeautifulSoup
from urllib.error import HTTPError


class MossScanner:
    """
    A class that stores connection information for Moss and sends Files to Moss and returns the result.

    Attributes:
        user_id: The user id for Moss connection
        language: The language of the submissions
        tmp_path: The path where the submissions are temporary stored

    Methods:
        compare(files): Returns a json array in the form:
            {
                "error": ErrorCode,
                "data": [
                    {
                        "name": FileName,
                        "match": MatchPercent,
                        "match_history": [
                            {
                                "start": StartLine,
                                "end": EndLine,
                                "temperature": MatchPercent
                            }
                        ]
                    }
                ]
            }

    """
    __DICT_IDX = 'file_index'  # json/dict index for the file index
    __DICT_MATCH = 'match'  # json/dict index for the match percentage
    __DICT_HISTORY = 'match_history'  # json/dict index for the match_history list
    __TARGET_FILE = 'match0-top.html'  # target file of the moss response
    __FILE_NAME = 'file'  # prefix of the file names that are sent to moss
    __TMP_FILE_NAME = 'tmp'  # prefix of the file names that are stored in the tmp directory
    __NO_MATCH_FOUND_ERROR = 'No match found'
    __TEMPERATURE_PATTERN = r'http://moss\.stanford.edu/bitmaps/tm_\d+_(\d+).gif'

    def __init__(self, user_id=31398739, language='matlab'):
        self.user_id = user_id
        self.language = language
        self.tmp_path = os.path.join(os.path.dirname(__file__), f'{self.__TMP_FILE_NAME}_{self.__get_unique_id()}')

    def compare(self, files):
        """
        Sends the files to moss and returns the result parsed as json.
        :param files: a list of files as strings to compare
        :return: parsed json data
        """
        error: str = ''
        data = []
        paths = self.__setup(files)
        moss = self.__get_moss(paths)
        try:
            url = moss.send()
            logging.info(f"Moss URL: {url}")
            soup = self.__get_soup_from_url(url + '/' + self.__TARGET_FILE)
            data = self.__parse_soup(soup)
        except HTTPError:
            error = self.__NO_MATCH_FOUND_ERROR
        except Exception as e:
            error = str(e)

        return json.dumps({
            'error': error,
            'data': data
        })

    def __get_moss(self, paths):
        m = Moss(self.user_id, self.language)
        for i, path in enumerate(paths):
            m.addFile(path, f'{self.__FILE_NAME}_{i}')
        return m

    def __setup(self, files):
        os.makedirs(self.tmp_path)
        return [self.__write_file(file) for file in files]

    def __write_file(self, file):
        name = f"{self.__TMP_FILE_NAME}_{self.__get_unique_id()}"
        path = os.path.join(self.tmp_path, name)
        with open(path, 'w') as f:
            f.write(file)
        return path

    @classmethod
    def __get_soup_from_url(cls, url):
        with urllib.request.urlopen(url) as response:
            document = html5lib.parse(response, treebuilder='dom')
            formatted_html = document.toprettyxml()
            return BeautifulSoup(formatted_html, 'html.parser')

    @classmethod
    def __parse_header(cls, th: str):
        idx, perc = th.split()
        idx = idx.split('_')[1]
        perc = perc.translate(str.maketrans('', '', '()%'))
        return {
            cls.__DICT_IDX: idx,
            cls.__DICT_MATCH: perc,
            cls.__DICT_HISTORY: []
        }

    @classmethod
    def __parse_first_tr(cls, first_tr: BeautifulSoup):
        return [cls.__parse_header(th.text) for th in first_tr.children if th.text.strip()]

    @classmethod
    def __parse_match_lines(cls, td: BeautifulSoup):
        return td.text.strip('\n').split('-')

    @classmethod
    def __parse_temperature(cls, td: BeautifulSoup):
        img = td.find_next('img')
        match = re.match(cls.__TEMPERATURE_PATTERN, img.get('src'))
        return match.group(1)

    @classmethod
    def __add_to_match_history(cls, data_dict, start, end, match):
        data_dict[cls.__DICT_HISTORY].append({
            'start': start,
            'end': end,
            'match': match
        })

    @classmethod
    def __parse_data_tr(cls, data_tr: BeautifulSoup, data_list: list):
        assert len(data_list) * 2 == len(data_tr.find_all('td'))
        td_list = data_tr.find_all('td')
        for i in range(0, len(td_list), 2):
            data_list_idx = i // 2

            start, end = cls.__parse_match_lines(td_list[i])
            match = cls.__parse_temperature(td_list[i + 1])

            cls.__add_to_match_history(data_list[data_list_idx], start, end, match)

    @classmethod
    def __parse_data(cls, trs, data_list: list):
        for tr in trs:
            cls.__parse_data_tr(tr, data_list)

    @classmethod
    def __parse_soup(cls, soup: BeautifulSoup):
        trs = soup.find_all('tr')
        data_list = cls.__parse_first_tr(trs[0])  # table row contains info like match %
        cls.__parse_data(trs[1:], data_list)  # residual table rows contain data where the matches were
        return data_list

    @classmethod
    def __get_unique_id(cls):
        return datetime.now().strftime('%M%S%f')

    def __del__(self):
        shutil.rmtree(self.tmp_path)
