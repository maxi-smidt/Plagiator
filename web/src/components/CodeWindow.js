import { Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import PlagiatorStyle from "./Tabs/CodeStyles/plagiatorstyle";
import React from "react";

const CodeWindow = ({code, highlightData}) => {
  return (
    <SyntaxHighlighter language="matlab" style={PlagiatorStyle} lineNumberStyle={{minWidth: "0em"}} showLineNumbers  >
      {code ? code : "% load matlab file to get started."}
    </SyntaxHighlighter>
    );

}

export default CodeWindow;