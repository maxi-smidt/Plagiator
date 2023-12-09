import React from 'react';
import styled from 'styled-components';
import { XIcon } from '@primer/octicons-react';

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #21252B;
  padding: 20px;
  border: none;
  border-radius: 0.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    background-color: transparent;
    top: 0;
    border: none;
    border-bottom-left-radius: 0.2em;
    border-top-right-radius: 0.5em;
    user-select: none;
    color: white;
    padding: 0;
    /* padding: 0.05em 0.4em 0.1em 0.4em; */
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1em;
    width: 2em;
    height: 1.5em;
    transition: 0.2s ease-in-out;
    z-index: 1000;
  &:hover{
    background-color: #E22A27; 
  }
  
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;


const ModalTable = styled.table`
width: 100%;
border-collapse: collapse;

tr td:first-child {
  font-weight: bold;
  padding-right: 2em;
}
`;

const Title = styled.h2`
margin-top : 0em;
`;


const Modal = ({ isOpen, onClose, title, tableContent, useTable, children }) => {
    if (!isOpen) return null;

    console.log(tableContent)
    return (
        <>
            <Overlay onClick={onClose} />
            <ModalWrapper>
                <CloseButton onClick={onClose}><XIcon /></CloseButton>
                <Title>{title}</Title>
                {useTable &&
                    <ModalTable>
                        <tbody>
                            {tableContent.map((element) => {
                                return (
                                    <tr key={element}>
                                        <td>{element[0] || ""}</td>
                                        <td>{element[1] || ""}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </ModalTable>
                }
                {children}
            </ModalWrapper>
        </>
    );
};

export default Modal;