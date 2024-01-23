import React from "react";
import styled from "styled-components";
import { has_failed } from "./Stats";
import { log } from "../utils/util";
import { FileCodeIcon } from "@primer/octicons-react";

const Card = styled.div`
  margin-right: 0.5em;
  background-color: #333842; 
  border: none;
  border-radius: 0.3em;
  color: white;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  padding: 0.5em 0.5em 0.25em 0.5em;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  transition: 0.2s ease-in-out;
  min-width: 10em;
  max-height: 5.5em;
  box-shadow: inset 0px 0px 5px ${props => props.boxshadow_color};
  background: ${props => props.background};
  
  &:hover{
    background-color: #757982; 
  }
  
`;

const FileSpan = styled.span`
    color: #CBCBCB;
    
`;


const errorBackground = `
repeating-linear-gradient(
  45deg,
  #44485f,
  #44485f 10px,
  #3c4058 10px,
  #3c4058 20px
);
`;



const HistoryElement = ({file_1, file_2, result, time_stamp, callback}) => {
    
    const info = JSON.parse(result);
    let background = "#333842";
    let boxshadow_color = "#333842"
    let disabled = false;
    if(info.error == "No match found"){
      boxshadow_color = "#00ff00";
    }else if(info.error == ""){
      if (has_failed(info.data[0].match, info.data[1].match)){
        boxshadow_color = "#ff0000";
      }else{
        boxshadow_color =  "#00ff00";
      }
    }
    else {
      disabled = true;
      background = errorBackground
    }

    const _handleClick = (e) => {
      if(disabled)
        return;
      callback(file_1, file_2, result);
    }

    return (<Card background={background} boxshadow_color={boxshadow_color} disabled={disabled} onClick={(e) => _handleClick(e)}>
        <b>{time_stamp}</b><br/>
        <FileSpan><FileCodeIcon size={14}/> {file_1}</FileSpan><br/>
        <FileSpan><FileCodeIcon size={14}/> {file_2}</FileSpan>
        </Card>)
};

export default HistoryElement
