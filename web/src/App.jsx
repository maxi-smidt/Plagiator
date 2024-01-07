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
import { LOG_LEVEL, log } from './utils/util';

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
z-index: 100;
user-select: none;
grid-area: ${props => props.type} ;
display: flex;
flex-direction: row;
max-width: 100%;
max-height: 1.8em;
color: #74767a;
transition: color 100ms ease-in-out;
`;

const ProgrammName = styled.span`
&:hover{
  color: #a5a9b1;
}
`;



const ProgrammIcon = styled.img`
z-index: 100;
max-width: 1em;
max-height: 1em;
padding: 0.2em;
`;

const CloseButton = styled.button`
    z-index: 100;
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
  const [stats, setStats] = useState([]);
  const [lineHighlights, setLineHighlights] = useState({'A' : [0, 0], 'B' : [0, 0]})

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
      console.log('test');
      if(isFunction(window?.pywebview?.api?.compute_comparison)){
        toast.promise(
          window?.pywebview.api.compute_comparison([files['A'], files['B']]).then(
              (result) => {
                let rjson = JSON.parse(result);
                if(rjson.error){
                  log(rjson.error, LOG_LEVEL.ERROR)
                }else {
                  setStats(rjson.data);
                  log(rjson, LOG_LEVEL.INFO);
                }
              })
              .catch((error) => {
                log(error);
              })
              .finally(() => {
                log('Analysis process completed.', LOG_LEVEL.INFO);
              }
          ),
          {
            pending: 'Analyzing code',
            success: 'Analysis completed!',
            error: 'Analysis failed!'
          })
      }
      //setStats()
    }
  }, [files])


  useEffect(()=>{
    console.log("stats", stats)
    if(stats.length < 2) return;
    try{
      let fileA = stats[0].match_history[0] //TODO: replace with more generic path I guess?  
      let fileB = stats[1].match_history[0]
      const newLineHighlights = {'A' : [fileA.start, fileA.end], 'B' : [fileB.start, fileB.end]}
      setLineHighlights(cloneDeep(newLineHighlights)) 
      console.log("hln", newLineHighlights)
    }
    catch(e){
      log(e, LOG_LEVEL.WARNING);
      setLineHighlights(cloneDeep({'A' : [0, 0], 'B' : [0, 0]}));
    }
  }, [stats])

  const _info = [["Web", "Marcel Skumantz"], ["App", "Maxi Smidt"], ["Version", "0.30.1"]]
  return (
    <>

    <ContainerDiv>
      <FrameLessToolbar type="window">
        <ProgrammIcon onClick={()=>setInfoOpen(true)} src="/favicon.ico" />
        <ProgrammName onClick={()=>setInfoOpen(true)}>Plagiator {/*new Date().toLocaleString()*/}</ProgrammName>
        <CloseButton onClick={() => _closeWindow()}><XIcon/></CloseButton>
      </FrameLessToolbar>


      <GridDiv type="Tool-A" >
        <Toolbar data={files['A']} dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'A'}/>
      </GridDiv>
      <GridDiv type="Tool-B">
        <Toolbar data={files['B']} dataCallback={(FileContent, ToolbarID) => FileCallBack(FileContent, ToolbarID)} ToolbarID={'B'}/>
      </GridDiv>
        <CodeWindow 
        gridArea="Code-A" 
        fileCallback={(FileContent) => FileCallBack(FileContent, 'A')} 
        fileName={files['A']?.path || ""} 
        code={files['A']?.content || ""}
        lines={lineHighlights.A}
        />
        <CodeWindow 
        gridArea="Code-B" 
        fileCallback={(FileContent) => FileCallBack(FileContent, 'B')} 
        fileName={files['B']?.path || ""} 
        code={files['B']?.content || ""}
        lines={lineHighlights.B}
        />
      <GridDiv type="output">
        <Stats stats={stats}/>
      </GridDiv>
    </ContainerDiv>
    <ToastContainer 
    position="bottom-right"
    autoClose={3000}
    closeOnClick
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    draggable={true}
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
