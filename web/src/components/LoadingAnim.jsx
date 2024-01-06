import styled, {keyframes} from 'styled-components';



const ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingAnimation = styled.div`
  z-index: 5;
  display: block;
  width: 100%;
  height: 100%;
  /*position: absolute;
  top: 0;
  */
  position: fixed;
  top: 0em;
  left:0;
  background: #00000062;
  --ring-size: 6em;
  --ring-width: 0.5em;
  overflow: hidden;


&:after {
  z-index: 6;
  position: absolute;
  top: calc(50% - var(--ring-size)/2 - var(--ring-width));
  left: calc(50% - var(--ring-size)/2 - var(--ring-width));
  z-index: 10;
  content: " ";
  display: block;
  width: var(--ring-size);
  height: var(--ring-size); 
  margin: 0px;
  border-radius: 50%;
  border: var(--ring-width) solid #fff;
  border-color: #fff #fff #ffffff6b ;  
  animation: ${ring} 600ms linear infinite;
}
`;

export default LoadingAnimation;