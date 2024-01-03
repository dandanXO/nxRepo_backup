import React from "react";
import { tcx } from "../../../../utils/tcx";
import { Progress } from "../../components/Progress";
import { environment } from "../../../../../../environments/environment";


interface IProgressBarProps {
  progress: number
  className?: string
  rounded?: string
  children?: React.ReactNode
  backgroundImageUrl?: string
  progressColor?: string
}


export const ProgressBar = ({
  progress,
  className,
  rounded,
  children,
  backgroundImageUrl,
  progressColor,
}: IProgressBarProps) => {
  return (
    <div className={tcx('relative flex-auto overflow-hidden', className, rounded)}>
      <Progress
        className={rounded}
        progress={progress > 1 ? 100 : progress * 100}
        backgroundImageUrl={backgroundImageUrl || `assets/${environment.assetPrefix}/process_bar.png`}
        progressColor={progressColor}
      />
      <span className={tcx('absolute font-bold top-0 left-0 w-full h-full', rounded)}>
        {children}
      </span>
    </div>
  )
}
