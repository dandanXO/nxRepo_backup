import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { useNotificationDrawer } from "../../../../drawers/NotificationDrawer/hooks/useNotificationDrawer";
import { NotificationElement } from "../../../../components-bs/NotificationElement";
import React from "react";
import {PageContainer} from "../../../../components-bs/PageContainer";


export const NotificationPage = () => {
  const {
    messages,
    expandableIndex,
    handleClick
  } = useNotificationDrawer();


  const { onClickToProfile } = usePageNavigate()

  return (
    <PageContainer className='text-white bg-[#333333] h-full'>
      <BackNavigation
        className='pt-0 pb-0'
        onClick={onClickToProfile}
      />

      <div className='my-3 text-sm'>Centro de Notificaciones</div>

      <div className='h-[80%] overflow-y-auto'>
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

    </PageContainer>
  )
}
