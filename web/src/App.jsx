import styled from 'styled-components';
import CodeWindow from './components/CodeWindow';
import Toolbar from './components/Toolbar';
import { XIcon } from '@primer/octicons-react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { cloneDeep, isFunction } from 'lodash';
import Stats from './components/Stats';
import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import "./components/styles/custom.css";
import Modal from './components/Modal';


const ContainerDiv = styled.div`
border-radius: 2em;
display: grid; 
grid-auto-flow: row dense; 
grid-template-columns: 1fr 1fr; 
grid-template-rows: 1.4em 0.1fr 2.3fr 0.6fr; 
gap: 0px 4px; 
grid-template-areas: 
  "window window"
  "Tool-A Tool-B"
  "Code-A Code-B"
  "output output";   
position: fixed; top: 0; left: 0; right: 0; bottom: 0;
background: #21252B;
animation: fadeIn 30ms ease-in-out;
animation-fill-mode: forwards;  
`;

/*
const TypedDiv = styled.div.attrs(({type}) => ({
  gridArea : type
}))``;
*/

const GridDiv = styled.div`
grid-area: ${props => props.type} ;
`;

const FrameLessToolbar = styled.div`
user-select: none;
grid-area: ${props => props.type} ;
display: flex;
flex-direction: row;
max-width: 100%;
max-height: 1.8em;
color: #74767a;
`;


const ProgrammIcon = styled.img`
max-width: 1em;
max-height: 1em;
padding: 0.2em;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    background-color: transparent;
    border: none;
    border-bottom-left-radius: 0.2em;
    //border-radius: 0.3em;
    user-select: none;
    color: white;
    padding: 0.05em 0.4em 0.1em 0.4em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    max-width: 3em;
    height: 1.25em;
    transition: 0.2s ease-in-out;

  &:hover{
    background-color: #E22A27; 
  }
  
`;


function App() {

  const [files, setFiles] = useState({'A' : "", 'B': ""});
  const [isInfoOpen, setInfoOpen] = useState(false);
  const [stats, setStats] = useState({});

  const FileCallBack = (FileContent, ToolbarID) => {
    let _files = cloneDeep(files);
    _files[ToolbarID] = FileContent
    setFiles(_files)
  }

  const _closeWindow = () => {
    if(isFunction(window?.pywebview?.api?.kill)){
      window.pywebview.api.kill();
    }
  }
  
  useEffect(() => {
    if(files['A'] && files['B']){

      if(isFunction(window?.pywebview?.api?.compute_comparison)){
        toast.promise(
          window?.pywebview.api.compute_comparison(files['A'], files['B']),
          {
            pending: 'Analyzing code...',
            success: 'Analysis completed!',
            error: 'Analysis failed!'
          })
      }
      //setStats()
    }
  }, [files])



  const _info = [["Web", "Marcel Skumantz"], ["App", "Maxi Smidt"], ["Version", "0.30.1"]]
  return (
    <>

    <ContainerDiv>
      <FrameLessToolbar type="window">
        <ProgrammIcon onClick={()=>setInfoOpen(true)} src="/favicon.ico" />
        <span onClick={()=>setInfoOpen(true)}>Plagiator</span>
        <CloseButton onClick={() => _closeWindow()}><XIcon/></CloseButton>
      </FrameLessToolbar>


      <GridDiv type="Tool-A" >
        <Toolbar data={files['A']} dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'A'}/>
      </GridDiv>
      <GridDiv type="Tool-B">
        <Toolbar data={files['B']} dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'B'}/>
      </GridDiv>
        <CodeWindow fileCallback={(FileContent) => FileCallBack(FileContent, 'A')} gridArea="Code-A" fileName={files['A']?.path || ""} code={files['A']?.content || ""}/>
        <CodeWindow fileCallback={(FileContent) => FileCallBack(FileContent, 'B')} gridArea="Code-B" fileName={files['B']?.path || ""} code={files['B']?.content || ""}/>
      <GridDiv type="output">
        <Stats stats={stats}/>
      </GridDiv>
    </ContainerDiv>
    <ToastContainer 
    position="bottom-right"
    autoClose={3000}
    closeOnClick
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    theme="dark"
    />
    <Modal isOpen={isInfoOpen} onClose={() => setInfoOpen(false)} 
    title={"Plagiator"}
    tableContent={_info} 
    useTable/>
    </>
  );
}

export default App;
