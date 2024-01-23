import sqlite3
import subprocess
import os
from . import ddl
from . import queries


class DatabaseManager:
    __DB_PATH = 'database/.plagiator.db'

    @classmethod
    def init(cls):
        conn, cur = cls.__open()
        cls.__close(conn, cur)

        if os.name == 'nt':  # to make the file hidden in windows
            subprocess.call(['attrib', '+H', cls.__DB_PATH])

        cls.__execute(ddl.CREATE_TABLE_FILE)
        cls.__execute(ddl.CREATE_TABLE_COMPARISON)

    @classmethod
    def insert_into_files(cls, file):
        cls.__insert(queries.INSERT_INTO_FILES, file)

    @classmethod
    def insert_into_comparison(cls, file_1, file_2, result):
        cls.insert_into_files(file_1)
        cls.insert_into_files(file_2)
        cls.__insert(queries.INSERT_INTO_COMPARISONS,
                     {'file_1': file_1['path'], 'file_2': file_2['path'], 'result': result})

    @classmethod
    def get_history(cls):
        entries = cls.__select(queries.SELECT_ALL_COMPARISONS)
        return [{'file_1': e[0], 'file_2': e[1], 'result': e[2], 'time_stamp': e[3]} for e in entries]

    @classmethod
    def get_file_by_name(cls, file):
        r = cls.__select(queries.SELECT_FILE, {'path': file})[0]
        return {'path': r[0], 'content': r[1], 'contentLength': r[2], 'uploaded': r[3]}

    @classmethod
    def __select(cls, query, params=None):
        conn, cur = cls.__open()
        cur.execute(query) if params is None else cur.execute(query, params)
        result = cur.fetchall()
        cls.__close(conn, cur)
        return result

    @classmethod
    def __insert(cls, query, values):
        conn, cur = cls.__open()
        cur.execute(query, values)
        cls.__close(conn, cur)

    @classmethod
    def __execute(cls, query):
        conn, cur = cls.__open()
        cur.execute(query)
        cls.__close(conn, cur)

    @classmethod
    def __open(cls):
        conn = sqlite3.connect(cls.__DB_PATH)
        return conn, conn.cursor()

    @classmethod
    def __close(cls, conn, cursor):
        cursor.close()
        conn.commit()
        conn.close()
