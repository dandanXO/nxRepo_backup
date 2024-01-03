import styled, { keyframes } from "styled-components";


const increment = (target: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${target}%;
  }
`;

export const Progress = styled.div.attrs((props)=>({
  className: props.className
}))<{ progress: number, backgroundImageUrl?: string, className?: string, progressColor?: string }>`
  background-image: url(${(props) => props.backgroundImageUrl && !props.progressColor ? props.backgroundImageUrl : ''});
  background-size: contain;
  height: inherit;
  animation: ${(props) => increment(props.progress)} 0.5s linear forwards;
  background: ${props => props.progressColor || ''};
`;
