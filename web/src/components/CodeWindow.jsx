import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import matlab from 'react-syntax-highlighter/dist/esm/languages/prism/matlab';
import PlagiatorStyle from "./Tabs/CodeStyles/plagiatorstyle";
import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { log, LOG_LEVEL } from '../utils/util';
import LoadingAnimation from './LoadingAnim';

SyntaxHighlighter.registerLanguage('matlab', matlab);

const CodeWrapper = styled.div`
  position: relative;
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





const CodeWindow = ({ code, lines, fileCallback}) => {

  const [_style, setStyle] = useState({})
  const [showLoading, setLoading] = useState(false)

  const CodeWrapperRef = useRef(null)

  const _handleOverEnter = (e) => {
    e.preventDefault();
    let newStyle = { ..._style }
    newStyle["outline"] = "3px dashed #cbcbcb";
    newStyle["borderRadius"] = "1em";
    newStyle["outlineOffset"] = "-5px";
    setStyle(newStyle);
  }

  const _isCursorOverElement = (element, x, y) => {
    if (!element) return false;
    let rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  const _handleLeave = (e) => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;

    // Check if the cursor is over the drop target or a child element
    if (_isCursorOverElement(CodeWrapperRef.current, x, y)) {
      // Ignore the event if the cursor is over the drop target or a child element
      return;
    }
    
    let newStyle = { ..._style }
    newStyle["outline"] = "none";
    newStyle["borderRadius"] = "0em";
    setStyle(newStyle)
  }

  function dropPromise(e) {
    return new Promise((resolve, reject) => {
      let fc = e.dataTransfer.files[0] || {};
      
      let newStyle = { ..._style };
      const mType = fc.type;
  
      if (
        mType === 'application/matlab' ||
        mType === 'application/x-matlab-data' ||
        fc.name.split('.').pop().toLowerCase() === 'm'
      ) {
        fc.uploaded = Date.now();
        fc.path = fc.name;
  
        readFileAsync(fc)
          .then((fileContent) => {
            fc.content = fileContent;
            fc.contentLength = fc.content.length;
  
            newStyle.borderRadius = '0em';
            newStyle.outline = '0px solid green';
            setStyle(newStyle);
  
            log('Successfully selected file', LOG_LEVEL.INFO);
            setLoading(false);
            fileCallback({ ...fc });
            resolve(); // Resolve the promise here
          })
          .catch((reason) => {
            log(reason, LOG_LEVEL.WARNING);
            reject(reason); // Reject the promise if there is an error
          });
  
        // Don't forget to remove the `return` statement here
      } else {
        toast.warn('Unknown file type');
        log('Skipping unknown file-type dropped', LOG_LEVEL.WARNING);
  
        newStyle.outline = '0px solid red';
        newStyle.borderRadius = '0em';
        setStyle(newStyle);
  
        setLoading(false);
        reject(); // Reject the promise here as well
      }
    });
  }

  const _handleDrop = async (e) => {
    setLoading(true);
    e.preventDefault();
    let fc = e.dataTransfer.files[0] || {};
    toast.promise(
      dropPromise(e),
      {
            pending: "File \"" + fc.name + "\" is being checked",
            success:  "File \"" + fc.name + "\" was selected",
            error: "File \"" + fc.name + "\" was rejected"
      }
    )
}

// Helper function for reading file content asynchronously
const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = reject;
        fr.readAsText(file);
    });
};

const _getLineStyles = (lineNumber) => {
    const style = { display: "block", width: "fit-content" };
    if (lines[0] <= lineNumber && lines[1] >= lineNumber) {
      style.backgroundColor = "#fc1d005a";
    }
    return { style };
}

  return (
    <CodeWrapper ref={CodeWrapperRef} style={_style} onDragOver={_handleOverEnter} onDragEnter={_handleOverEnter} onDragLeave={_handleLeave} onDrop={_handleDrop}>
      
      {showLoading && <LoadingAnimation/>}
      <SyntaxHighlighter language="matlab" style={PlagiatorStyle} lineNumberStyle={{ minWidth: "0em" }} showLineNumbers={true} wrapLines={true}
      lineProps={(lineNumber) => _getLineStyles(lineNumber)}
      >
        {code ? code : "%Click the upload button or drop a matlab file to get started "}
      </SyntaxHighlighter>
    </CodeWrapper>
  );

}

export default CodeWindow;