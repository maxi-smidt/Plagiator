import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  width: fit-content;
  background: transparent;
  justify-content: left;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const selectedColor = "#D7DAE0";
const greyedColor = "#757982";
const defaultColor = "transparent";
const lighterColor = "#333842";

export const TabItem = styled.div`
  color: ${(props) => (props.selected ? selectedColor : greyedColor)};
  text-decoration-line: ${props => props.disabled ? "line-through" : "none"};
  background-color: ${lighterColor};
  width: 5.5em;
  flex-wrap: nowrap;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  border-left: 2px solid ${(props) => (props.selected ? selectedColor : defaultColor)};
`;
