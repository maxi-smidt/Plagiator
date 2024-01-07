import { CheckCircleIcon, GoalIcon, GraphIcon, XCircleIcon, RocketIcon } from "@primer/octicons-react";
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



const Stats = ({ stats }) => {
  let _stats = stats


  const _getDashboard = () => {
    let a_match = stats[0].match;
    let b_match = stats[1].match;
    let max_match = Math.max(a_match, b_match);
    let avg_match =  Math.round((a_match * b_match) /2);

    let failed = (max_match > 50 || avg_match > 50)
    return (
      <>
                  <h3>
                    {failed ?
                      <span><XCircleIcon size={24} /> One of the scripts seems to be a plagiarism.</span>
                      :
                      <span><CheckCircleIcon size={24} /> The scripts are likely original works. </span>
                      }
                  </h3>
                  <p style={{ marginBottom: "0px", marginTop: "0px" }}>The files are up to {max_match}% similar.</p>
    </>
    )
  } 

  //match calculation?


  const RenderTab = (index) => {
    switch (index) {
      case 0:
        return (
          <ResultPage>
            {isEmpty(_stats) && 
                <>
                <h3><span><RocketIcon size={24}/> Welcome to Plagiator</span></h3>
                <p style={{ marginBottom: "0px", marginTop: "0px" }}>Upload matlab scripts to get started. You can use either drag n' drop or the upload button to browse this computer for files. </p>
                </>
              
            }

            {!isEmpty(_stats) &&_getDashboard()}

            <PassedCard />
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
        <TabItem><GoalIcon /> Result</TabItem>
        <TabItem><GraphIcon /> Statistics</TabItem>
        <TabItem disabled>In depth</TabItem>
      </Tab>
      {RenderTab(selectedTab)}
    </StatsContainer>
  );
};


export default Stats;