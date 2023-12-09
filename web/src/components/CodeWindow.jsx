import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import matlab from 'react-syntax-highlighter/dist/esm/languages/prism/matlab';
import PlagiatorStyle from "./Tabs/CodeStyles/plagiatorstyle";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import styled from 'styled-components';


SyntaxHighlighter.registerLanguage('matlab', matlab);

const CodeWrapper = styled.div`
  outline: none;
  transition: outline 200ms ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: auto; /* Add scrollbars if content overflows */
  max-height: 100vh; /* Limit the height to the viewport height */
  > * {
    flex: 1;
  }
`;

const CodeWindow = ({code, highlightData, fileCallback}) => {

  const [_style, setStyle] = useState({})

  const _handleOverEnter = (e) => {
    e.preventDefault();
    let newStyle = {..._style}
    newStyle["outline"] = "4px dashed white";
    newStyle["borderRadius"] = "1em";
    newStyle["outlineOffset"] = "-5px";
    setStyle(newStyle);
  }
  
  const _handleLeave = (e) => {
    const newStyle = {..._style}
    newStyle["outline"] = "none";
    setStyle(newStyle)
  }
  const _handleDrop = async (e) =>{
    e.preventDefault();
    let fc = e.dataTransfer.files[0] || {};
    fc["uploaded"] = Date.now()

    let fr = new FileReader();
    fc["path"] = fc.name;
    fr.readAsText(e.dataTransfer.files[0]);
    fr.onload = () => {
      fc["content"] = fr.result;
      fc["contentLength"] = fc.content.length
      toast("File \"" + fc.path + "\" was selected...")
      const newStyle = {..._style}
      newStyle["outline"] = "0px solid white";
      newStyle["borderRadius"] = "0em";
      setStyle(newStyle)
      fileCallback({...fc});
    }
   
  }


  return (
    <CodeWrapper style={_style} onDragOver={_handleOverEnter} onDragEnter={_handleOverEnter} onDragLeave={_handleLeave}  onDrop={_handleDrop}>
    <SyntaxHighlighter language="matlab" style={PlagiatorStyle} lineNumberStyle={{minWidth: "0em"}} showLineNumbers>
      {code ? code : "% load matlab file to get started."}
    </SyntaxHighlighter>
    </CodeWrapper>
    );

}

export default CodeWindow;