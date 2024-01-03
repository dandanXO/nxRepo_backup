import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { useNotificationDrawer } from "../../../../drawers/NotificationDrawer/hooks/useNotificationDrawer";
import { NotificationElement } from "../../../../components-bs/NotificationElement";
import React from "react";


export const NotificationPage = () => {
  const {
    messages,
    expandableIndex,
    handleClick
  } = useNotificationDrawer();


  const { onClickToProfile } = usePageNavigate()

  return (
    <div className='flex flex-col w-full h-screen fixed bg-[#333333] py-5 px-4 text-white'>
      <BackNavigation
        className='pt-0 pb-0'
        onClick={onClickToProfile}
      />

      <div className='my-3 text-sm'>Centro de Notificaciones</div>

      <div className='grow h-full overflow-y-auto mb-20'>
        {
          messages.map((message, index)=>(
            <NotificationElement
              key={message.id}
              isRead={message.is_read === 1}
              title={message.title}
              time={message.created_at}
              content={message.content}
              expanded={expandableIndex === index}
              isFirst={index === 0}
              isLast={index === messages.length - 1}
              isBeforeExpanded={expandableIndex !== null && index === expandableIndex - 1}
              isAfterExpanded={expandableIndex !== null && index === expandableIndex + 1}
              onClick={(event: React.MouseEvent<HTMLDivElement>) => handleClick(event, index, message.is_read === 0, message.id)}
            />
          ))
        }

      </div>

    </div>
  )
}
