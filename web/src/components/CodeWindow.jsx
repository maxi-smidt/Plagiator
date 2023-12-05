import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import matlab from 'react-syntax-highlighter/dist/esm/languages/prism/matlab';
import PlagiatorStyle from "./Tabs/CodeStyles/plagiatorstyle";
import React from "react";

SyntaxHighlighter.registerLanguage('matlab', matlab);

const CodeWindow = ({code, highlightData}) => {
  return (
    <SyntaxHighlighter language="matlab" style={PlagiatorStyle} lineNumberStyle={{minWidth: "0em"}} showLineNumbers  >
      {code ? code : "% load matlab file to get started."}
    </SyntaxHighlighter>
    );

}

export default CodeWindow;