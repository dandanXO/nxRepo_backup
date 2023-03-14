import styled from 'styled-components';
import cls from 'classnames';
import {CSSProperties} from "react";

interface LoadingProps {
  className?: string;
  style?: CSSProperties;
  bg?: string;
}
const Loading = (props: LoadingProps) => (
  <div className={cls('loadingio-spinner-spinner-e19blwp8l9', props.className)} style={props.style}>
    <div className="ldio-h9984kb9q2p">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
const StyledLoading = styled(Loading)`
  position: relative;
  top: 0;
  left: 50%;
  height: 100px;

  @keyframes ldio-h9984kb9q2p {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .ldio-h9984kb9q2p div {
    //left: 96px;
    //top: 57px;
    position: absolute;
    animation: ldio-h9984kb9q2p linear 0.9900990099009901s infinite;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
    width: 8px;
    height: 14px;
    border-radius: 4px / 4.48px;
    transform-origin: 4px 43px;
  }
  .ldio-h9984kb9q2p div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.93185789167152s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(2) {
    transform: rotate(21.176470588235293deg);
    animation-delay: -0.87361677344205s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(3) {
    transform: rotate(42.35294117647059deg);
    animation-delay: -0.81537565521258s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(4) {
    transform: rotate(63.529411764705884deg);
    animation-delay: -0.75713453698311s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(5) {
    transform: rotate(84.70588235294117deg);
    animation-delay: -0.69889341875364s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(6) {
    transform: rotate(105.88235294117646deg);
    animation-delay: -0.64065230052417s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(7) {
    transform: rotate(127.05882352941177deg);
    animation-delay: -0.5824111822947s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(8) {
    transform: rotate(148.23529411764707deg);
    animation-delay: -0.52417006406523s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(9) {
    transform: rotate(169.41176470588235deg);
    animation-delay: -0.46592894583576s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(10) {
    transform: rotate(190.58823529411765deg);
    animation-delay: -0.40768782760629s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(11) {
    transform: rotate(211.76470588235293deg);
    animation-delay: -0.34944670937682s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(12) {
    transform: rotate(232.94117647058823deg);
    animation-delay: -0.29120559114735s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(13) {
    transform: rotate(254.11764705882354deg);
    animation-delay: -0.23296447291788s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(14) {
    transform: rotate(275.29411764705884deg);
    animation-delay: -0.17472335468841s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(15) {
    transform: rotate(296.47058823529414deg);
    animation-delay: -0.11648223645894s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(16) {
    transform: rotate(317.6470588235294deg);
    animation-delay: -0.05824111822947s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .ldio-h9984kb9q2p div:nth-child(17) {
    transform: rotate(338.8235294117647deg);
    animation-delay: 0s;
    background: ${(props) => props.bg ? props.bg : "#0a0a0a"};
  }
  .loadingio-spinner-spinner-e19blwp8l9 {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    //background: #f1f2f3;
  }
  .ldio-h9984kb9q2p {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .ldio-h9984kb9q2p div {
    box-sizing: content-box;
  }
`;

export default StyledLoading;
