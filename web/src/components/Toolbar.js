import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import { useFilePicker } from 'use-file-picker';
import { FileCodeIcon, UploadIcon} from "@primer/octicons-react";
import { isFunction } from "lodash";

const Button2 = styled.button`
background-color: #21252B; 
border: none;
border-radius: 4px;
color: #9DA5B4;
padding: 8px 24px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
transition: all 50ms ease-in-out;
&:hover {
    background-color: #33373B; 
}
`;

const selectedColor = "#D7DAE0";
const greyedColor = "#757982";
const defaultColor = "transparent";
const lighterColor = "#333842";

const Button3 = styled.button`
  margin: 2px;
  position: relative;
  min-width: 11em;
  overflow: hidden;
  border: 0px solid #18181a;
  color: ${greyedColor};//#9DA5B4;
  display: inline-block;
  font-size: 15px;
  line-height: 15px;
  padding: 18px 18px 17px;
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  border-radius: 2px;
  background: #21252B;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

& span:first-child {
  position: relative;
  transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 10;
}

& span:last-child {
  color: ${selectedColor};
  display: block;
  position: absolute;
  bottom: 0;
  transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
  z-index: 100;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(225%) translateX(-50%);
  height: 15px;
  line-height: 13px;
}

&:after {
  content: "";
  position: absolute;
  bottom: -50%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${lighterColor};
  transform-origin: bottom center;
  transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
  transform: skewY(9.3deg) scaleY(0);
  z-index: 50;
}

&:hover:after {
  transform-origin: bottom center;
  transform: skewY(9.3deg) scaleY(2);
}

&:hover span:last-child {
  transform: translateX(-50%) translateY(-50%);
  opacity: 1;
  transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
}

`;


const Toolbar = ({dataCallback, ToolbarID}) => {
  
  const [filename, setFilename] = useState("");
    const { openFilePicker, filesContent, loading } = useFilePicker({
        accept: '.m',
        onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
          setFilename(filesContent[0].path);
          if(filesContent[0]) {
            if (isFunction(dataCallback)){
              dataCallback(filesContent[0], ToolbarID);
            }
          }    
        },
      });
    
    
    
    const getFileName = () => {
        if(filename !== "") {
            return (<><FileCodeIcon/> {filename}</>)
        }
        return (<><FileCodeIcon/> Nothing slected</>)
    }
    return (
        <div>
        <Button3 onClick={() => openFilePicker()}><span>{getFileName()}</span><span><UploadIcon/> Load file</span></Button3>
      </div>
    )

}

export default Toolbar


