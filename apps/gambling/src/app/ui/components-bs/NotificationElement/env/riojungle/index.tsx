import CaretDown from './images/CaretDown.png';
import CaretUp from './images/CaretUp.png';
import { tcx } from "../../../../utils/tcx";

interface INotificationElementProps {
  title: string
  time: string
  content: string
  isRead: boolean
  isFirst: boolean
  isLast: boolean
  expanded: boolean
  isBeforeExpanded: boolean
  isAfterExpanded: boolean
  onClick: (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const NotificationElement = ({
  expanded,
  isFirst,
  isLast,
  isRead,
  isAfterExpanded,
  isBeforeExpanded,
  time,
  title,
  content,
  onClick
}: INotificationElementProps) => {
  return (
    <div
      className={tcx(
        'bg-[var(--grayscale-10)] w-full font-medium cursor-pointer',
        ['mb-5', expanded && !isLast],
        ['mt-5', expanded && !isFirst],
        ['rounded-t-lg', isAfterExpanded || isFirst || expanded],
        ['rounded-b-lg', isBeforeExpanded || isLast || expanded]
      )}
      onClick={(e)=>onClick(e)}
    >
      <div className={tcx('p-3 flex justify-between gap-5 items-center border-b border-[#333333]', ['text-[#808080]', isRead && !expanded])}>
        <div className='flex gap-2 flex-1 items-center'>
          {!isRead && <div className='h-2 w-2 bg-[var(--state-error-main)] rounded-full'/>}
          <div>{title}</div>
        </div>
        <div className='flex gap-2 flex-shrink-0 items-center'>
          <div>{time}</div>
          <img alt='caret' className='w-4 h-4' src={expanded?CaretUp:CaretDown}/>
        </div>
      </div>
      {
        expanded && <div className='text-[#B3B3B3] p-3'>{content}</div>
      }
    </div>
  )
}
