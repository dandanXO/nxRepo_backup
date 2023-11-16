
import { Tooltip } from 'react-tooltip';

export const IconTooltip = (props: any) => {
  const { id, className, icon, tooltipStyle, content } = props;
  return (
    <a data-tooltip-id={id} className={className}>
      {icon}
      <Tooltip
        style={{ width: "400px", whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 'normal', color: 'white' ,...tooltipStyle}}
        id={id}
        content={content}
      />
    </a>
  )
}