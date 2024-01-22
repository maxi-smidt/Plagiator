import { CheckCircleIcon, GoalIcon, GraphIcon, XCircleIcon, RocketIcon, VersionsIcon } from "@primer/octicons-react";
import Tab, { TabItem } from "./Tabs";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { isEmpty, isFunction } from "lodash";
import HistoryElement from "./HistoryElement";


const StatsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    background-color: #21252B;
    align-items: start;
    justify-content: left;
    width: 100%;
    grid-area: ${props => props.type} ;
`;

const ResultPage = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 0px;
  margin-top: 0px;
`;

const HistoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: start;
  padding: 0.25em 0.25em 0em 0.25em ;
  overflow: scroll auto;
  scrollbar-gutter: stable;
  height: 100%;
`;

export const has_failed = (a, b) => {
  const max_match = Math.max(a, b);
  const avg_match = Math.round((a * b) / 2);
  return (max_match > 50 || avg_match > 50)
}

const Stats = ({ stats, files, type, selectedHistoryCallback }) => {


  const [history, setHistory] = useState([]);



  const _getHistory = () => {
    if (isFunction(window?.pywebview?.api?.get_history)) {
      window.pywebview.api.get_history().then(
        (result) => {
          setHistory(result);
        }
      );
    }
  }

  useEffect(()=> {
    setHistory(_getHistory());
  },[stats])

  

  const _getDashboard = () => {
    const a_match = stats[0].match;
    const b_match = stats[1].match;
    const failed = has_failed(a_match, b_match);
    return (
      <>
        <h3>
          {failed ?
            <span><XCircleIcon size={24} /> One of the scripts seems to be a plagiarism.</span>
            :
            <span><CheckCircleIcon size={24} /> The scripts are likely original works. </span>
          }
        </h3>
        <Paragraph>The files are up to {max_match}% similar.</Paragraph>
      </>
    )
  }

  //match calculation?


  const RenderTab = (index) => {
    switch (index) {
      default:
      case 0:
        return (
          <ResultPage>
            {isEmpty(stats) &&
              <>
                <h3><span><RocketIcon size={24} /> Welcome to Plagiator</span></h3>
                <Paragraph>Upload matlab scripts to get started. You can use either drag n' drop or the upload button to browse this computer for files. </Paragraph>
              </>

            }

            {!isEmpty(stats) && _getDashboard()}
          </ResultPage>
        );
      case 1:
        return (
          <ResultPage>
            <h3>Statistics</h3>
            <Paragraph>
              <i>MOSS</i> reports a match of {stats[0].match}% for file "{files["A"].path}" and a match of {stats[1].match}% for file "{files["B"].path}".
            </Paragraph>
          </ResultPage>
        )
      case 2:
        return (
          <HistoryWrapper>
           {history.map(element => {
            return <HistoryElement {...element} key={element.time_stamp}/>
           })}
          </HistoryWrapper>
        )
    }


  }
  const [selectedTab, setSelectedTab] = useState(0)

  const onTabSelected = (index) => {
    setSelectedTab(index)
  };

  return (
    <StatsContainer type={type}>
      <Tab onTabSelected={onTabSelected}>
        <TabItem><GoalIcon /> Result</TabItem>
        <TabItem disabled={isEmpty(stats)}><GraphIcon /> Statistics</TabItem>
        <TabItem disabled={false}><VersionsIcon /> History</TabItem>
      </Tab>
      {RenderTab(selectedTab)}
    </StatsContainer>
  );
};


export default Stats;