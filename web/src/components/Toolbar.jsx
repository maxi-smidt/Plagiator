import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { toast } from 'react-toastify';
import { useFilePicker } from 'use-file-picker';
import { FileCodeIcon, UploadIcon, InfoIcon, TrashIcon } from "@primer/octicons-react";
import { isFunction } from "lodash";
import Modal from './Modal';
import LoadingAnimation from './LoadingAnim';

const selectedColor = "#D7DAE0";
const greyedColor = "#757982";
const defaultColor = "transparent";
const lighterColor = "#333842";


const Button4 = styled.button`
background-color: #333842; 
  border: none;
  border-radius: 0.3em;
  color: white;
  padding: 0.5em 1em 0.5em 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  max-width: 3em;
  transition: 0.2s ease-in-out;

  &:hover{
    background-color: #757982; 
  }
  
`;


const MainContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
padding: 5px;
`;

const ToolbarContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin-bottom: 0.4em;
> :not(:last-child) {
 margin-right: 0.2em;
  }
`;


const ModalTable = styled.table`
width: 100%;
border-collapse: collapse;

tr td:first-child {
  font-weight: bold;
  padding-right: 2em;
}

`;

const Toolbar = ({data, dataCallback, ToolbarID }) => {

  const [file, setFile] = useState(data || "");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showLoading, setLoading] = useState(false)

  useEffect(()=> {    
    setFile(data);
  },[data])
  
  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: '.m',
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      setLoading(true);
      
      const fc = filesContent[0];
      fc["contentLength"] = fc.content.length
      fc["uploaded"] = Date.now()
      toast("File \"" + fc.path + "\" was selected")
      setFile(fc);
      if (fc) {
        if (isFunction(dataCallback)) {
          setLoading(false);
          dataCallback(fc, ToolbarID);
        }
      }
    },
  });



  const _getFileName = () => {
    if (file !== "") {
      return (<><FileCodeIcon /> {file.path}</>)
    }
    return (<><FileCodeIcon /> Nothing selected</>)
  }

  const _getTextSizeInBytes = (text) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

    let size = new Blob([text]).size;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    if(unitIndex==0){
      return size.toFixed(0) + ' ' + units[unitIndex]; 
    }
    return size.toFixed(2) + ' ' + units[unitIndex];
  }

  const _getDT = (time) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    };

    return new Intl.DateTimeFormat('de-DE', options).format(time);

  }

  const ModalTableData = [["Filename", file.path], ["Modified", _getDT(file.lastModified)], ["Uploaded", _getDT(file.uploaded)], ["Size", _getTextSizeInBytes(file.content)]]
  return (
    <>
      <MainContainer>
        {(loading || showLoading) && <LoadingAnimation/>}
        <ToolbarContainer>
          <Button4 onClick={() => {openFilePicker()} }><UploadIcon /></Button4>
          {file && <Button4 onClick={() => { setModalOpen(true) }}><InfoIcon /></Button4>}
          {file && <Button4 onClick={() => dataCallback("", ToolbarID)}><TrashIcon /></Button4>}

        </ToolbarContainer>

        <span>{_getFileName()}</span>
      </MainContainer>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}
        title={file.path}
        tableContent={ModalTableData}
        useTable
      />
       
    </>
  )

}

export default Toolbar


