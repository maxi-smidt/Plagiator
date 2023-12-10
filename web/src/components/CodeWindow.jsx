import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import matlab from 'react-syntax-highlighter/dist/esm/languages/prism/matlab';
import PlagiatorStyle from "./Tabs/CodeStyles/plagiatorstyle";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { isFunction } from 'lodash';
import { logF } from '../utils/util';

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

const CodeWindow = ({ code, highlightData, fileCallback }) => {

  const [_style, setStyle] = useState({})

  const _handleOverEnter = (e) => {
    e.preventDefault();
    let newStyle = { ..._style }
    newStyle["outline"] = "3px dashed #cbcbcb";
    newStyle["borderRadius"] = "1em";
    newStyle["outlineOffset"] = "-5px";
    setStyle(newStyle);
  }

  const _handleLeave = (e) => {
    const newStyle = { ..._style }
    newStyle["outline"] = "none";
    newStyle["borderRadius"] = "0em";
    setStyle(newStyle)
  }

  const _handleDrop = async (e) => {
    e.preventDefault();
    let fc = e.dataTransfer.files[0] || {};
    let newStyle = { ..._style }

    toast.promise(
        async (resolve, reject) => {
            const mType = fc.type;
            if (mType == 'application/matlab' || mType == 'application/x-matlab-data' || fc.name.split('.').pop().toLowerCase() == "m") {
                fc["uploaded"] = Date.now();
                fc["path"] = fc.name;

                try {
                    const fileContent = await readFileAsync(fc);
                    fc["content"] = fileContent;
                    fc["contentLength"] = fc.content.length;
                    newStyle["borderRadius"] = "0em";
                    newStyle["outline"] = "0px solid green";
                    setStyle(newStyle);
                    logF("Succesfully selected file", "info")
                    fileCallback({ ...fc });
                } catch (error) {
                    logF(error, "warning")
                }
            } else {
                toast.warn("Unknown file type");
                logF("Skipping unknown file-type dropped", "warning")
                newStyle["outline"] = "0px solid red";
                newStyle["borderRadius"] = "0em";
                setStyle(newStyle);
            }
        },
        {
            pending: "File \"" + fc.name + "\" is being checked",
            success: () => {  newStyle["borderRadius"] = "0em";
            newStyle["outline"] = "0px solid green";
            setStyle(newStyle);
            return "File \"" + fc.name + "\" was selected"}
        }
    );
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


  return (
    <CodeWrapper style={_style} onDragOver={_handleOverEnter} onDragEnter={_handleOverEnter} onDragLeave={_handleLeave} onDrop={_handleDrop}>
      <SyntaxHighlighter language="matlab" style={PlagiatorStyle} lineNumberStyle={{ minWidth: "0em" }} showLineNumbers>
        {code ? code : "%Click the upload button or drop a matlab file to get started "}
      </SyntaxHighlighter>
    </CodeWrapper>
  );

}

export default CodeWindow;