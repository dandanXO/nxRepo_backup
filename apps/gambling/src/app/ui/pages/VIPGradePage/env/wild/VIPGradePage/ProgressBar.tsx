import React from "react";
import { tcx } from "../../../../../utils/tcx";
import styled, { keyframes } from "styled-components";
import { environment } from "../../../../../../../environments/environment";



const increment = (target: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${target}%;
  }
`;

const Progress = styled.div.attrs((props)=>({
  className: props.className
}))<{ progress: number, backgroundImageUrl?: string, className?: string, progressColor?: string }>`
  background-image: url(${(props) => props.backgroundImageUrl && !props.progressColor ? props.backgroundImageUrl : ''});
  background-size: contain;
  height: inherit;
  animation: ${(props) => increment(props.progress)} 0.5s linear forwards;
  background: ${props => props.progressColor || ''};
`;

interface IProgressBarProps {
  progress: number
  className?: string
  rounded?: string
  children?: React.ReactNode
  backgroundImageUrl?: string
  progressColor?: string
}

const ProgressBar = ({
  progress,
  className,
  rounded,
  children,
  backgroundImageUrl,
  progressColor
}:IProgressBarProps) => {
  return (
    <div className={tcx('relative flex-auto overflow-hidden', className, rounded)}>
      <Progress
        className={rounded}
        progress={progress > 1 ? 100 : progress * 100}
        backgroundImageUrl={backgroundImageUrl || `assets/${environment.uVersion}/process_bar.png`}
        progressColor={progressColor}
      />
      <span className={tcx('absolute font-bold top-0 left-0 w-full h-full', rounded)}>
        {children}
      </span>
    </div>
  )
}

export default ProgressBar;
