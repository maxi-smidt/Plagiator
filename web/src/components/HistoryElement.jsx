import React from "react";
import styled from "styled-components";
import { has_failed } from "./Stats";
import { log } from "../utils/util";

const Card = styled.div`
  margin-right: 0.5em;
  background-color: #333842; 
  border: none;
  border-radius: 0.3em;
  color: white;
  padding: 0.25em 0.5em 0.25em 0.5em;
  text-align: left;
  text-decoration: none;
  display: inline-block;
  font-size: 1em;
  transition: 0.2s ease-in-out;
  min-width: 10em;
  max-height: 5.5em;

  
  &:hover{
    background-color: #757982; 
  }
  
`;


const HistoryElement = ({file_1, file_2, result, time_stamp}) => {
    
    const info = JSON.parse(result);
    console.log(info)
    let rs = "";
    if(info.error == "No match found"){
        rs = info.error
    }else if(info.error == ""){
        rs = has_failed(info.data[0].match, info.data[1].match) ? "Plagiat" : "Original"
    }else{
        rs = info.error 
    }

    console.log(rs);

    return (<Card>
        <div>{time_stamp}</div>
        <div>{file_1}</div>
        <div>{file_2}</div>
        <div>{rs}</div>
        </Card>)
};

export default HistoryElement
