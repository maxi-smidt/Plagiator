import styled from 'styled-components';
import CodeWindow from './components/CodeWindow';
import Toolbar from './components/Toolbar';
import { useEffect, useState } from 'react';
import { cloneDeep, isFunction } from 'lodash';
import Stats from './components/Stats';
import React from 'react';

const ContainerDiv = styled.div`
display: grid; 
grid-auto-flow: row dense; 
grid-template-columns: 1fr 1fr; 
grid-template-rows: 0.1fr 2.3fr 0.6fr; 
gap: 0px 4px; 
grid-template-areas: 
  "Tool-A Tool-B"
  "Code-A Code-B"
  "output output";   
position: fixed; top: 0; left: 0; right: 0; bottom: 0;
background: #21252B;
`;

/*
const TypedDiv = styled.div.attrs(({type}) => ({
  gridArea : type
}))``;
*/

const GridDiv = styled.div`
grid-area: ${props => props.type} ;
`;

;



function App() {

  const [files, setFiles] = useState({'A' : "", 'B': ""});

  const [stats, setStats] = useState({});

  const FileCallBack = (FileContent, ToolbarID)=> {
    let _files = cloneDeep(files);
    _files[ToolbarID] = FileContent
    console.log(_files)
    setFiles(_files)
  }


  useEffect(() => {
    if(files['A'] && files['B']){

      if(isFunction(window?.pywebview.api.compute_comparison)){
        window?.pywebview.api.compute_comparison(files['A'], files['B']);
      }

      //TODO: call Server
      
      //setStats()
    }
  }, [files])


  return (
    <ContainerDiv>
      <GridDiv type="Tool-A" >
      <Toolbar dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'A'}/>
      </GridDiv>
      <GridDiv type="Tool-B">
      <Toolbar dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'B'}/>
      </GridDiv>
      <CodeWindow gridArea="Code-A" code={files['A']?.content || ""}/>
      <CodeWindow gridArea="Code-B" code={files['B']?.content || ""}/>
      <GridDiv type="output">
        <Stats stats={stats}/>
      </GridDiv>
    </ContainerDiv>
  );
}

export default App;
