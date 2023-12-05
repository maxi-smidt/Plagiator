import { CheckCircleIcon, GoalIcon, GraphIcon, XCircleIcon } from "@primer/octicons-react";
import Tab, { TabItem } from "./Tabs";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { isEmpty } from "lodash";

const StatsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    background-color: #21252B;
    align-items: start;
    justify-content: left;
    width: 100%;
`;



const ResultPage = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const PassedCard = styled.div`
 display: inline-block;
  position: relative;
  border: $line-width solid currentColor;
  border-radius: 50%;
  font-size: 0.4px;
  width: 50em;
  height: 50em;
  color: #8fcf8f;
  transform: rotate(40deg);
  
  &::before,
  &::after {
    content: '';
    background-color: currentColor;
    position: absolute;
    width: $line-width;
    border-radius: 3px;
  }
  
  &::before {
    height: 33em;
    left: 50%;
    top: 50%;
    margin-left: 2em;
    margin-top: -18em;
  }
  
  &::after {
    height: 15em;
    transform: rotate(90deg);
    top: 50%;
    left: 50%;
    margin-top: 5em;
    margin-left: -6em;
  }
`;



const FailedCard = styled.div`
  display: inline-block;
  position: relative;
  border: $line-width solid currentColor;
  border-radius: 50%;
  font-size: 0.4px;
  width: 50em;
  height: 50em;
  color: #e27d7a;
  
  &::before,
  &::after{
    content: '';
    width: $line-width;
    height: 34em;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -17em;
    margin-left: -2em;
    background-color: currentColor;
    border-radius: 3px;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`;



const Stats = ({stats}) => {
    let _stats = stats

    if(isEmpty(stats)){
        _stats = {passed: true, similarity: 0.43, timestamp: Date.now()}
    }
    
    const RenderTab = (index) => {
        switch(index){
            case 0:
                return (
                    <ResultPage>
                       
                        <h3>
                            {_stats.passed ?
                            <span><CheckCircleIcon size={24}/> The scripts are likely original works. </span>
                             : 
                            <span><XCircleIcon size={24}/> One of the scripts seems to be a plagiarism.</span>}    
                        </h3>
                        <p style={{marginBottom:"0px", marginTop: "0px"}}>The files are {_stats.similarity*100}% similar</p>
                        
                        <PassedCard/>
                    </ResultPage>
                );
            case 1:
            case 2:
            default:
                return (
                    <>
                    Seite 2
                    </>
                )
    
        }
    
    
    }
    const [selectedTab, setSelectedTab] = useState(0)

    const onTabSelected = (index) => {
        setSelectedTab(index)
      };
    
    return (
      <StatsContainer>
        <Tab onTabSelected={onTabSelected}>
            <TabItem><GoalIcon/> Result</TabItem>
            <TabItem><GraphIcon/> Statistics</TabItem>
            <TabItem disabled>In depth</TabItem>
        </Tab>
        {RenderTab(selectedTab)}
      </StatsContainer>
    );
};


export default Stats;