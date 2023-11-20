import { Tooltip } from 'react-tooltip';
import React from "react";

interface IIconTooltipProps {
  id: string
  content: string
  icon: React.ReactNode
  className?: string
  tooltipStyle?: React.CSSProperties
}

export const IconTooltip = ({
  id,
  content,
  icon,
  className,
  tooltipStyle
}: IIconTooltipProps) => {
  return (
    <a data-tooltip-id={id} className={className}>
      {icon}
      <Tooltip
        arrowColor='transparent'
        style={{ width: "400px", whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 'normal', color: 'white' ,...tooltipStyle}}
        id={id}
        content={content}
      />
    </a>
  )
}
