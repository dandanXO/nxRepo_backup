import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import React from "react";
import {
  NotificationItemContainer, NotificationItemExpandable,
  NotificationItemRedDot,
  NotificationItemTitle
} from "../../../../components/NotificationItem";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useNotificationDrawer } from "../../../../drawers/NotificationDrawer/hooks/useNotificationDrawer";


export const NotificationPage = () => {
  const {
    messages,
    expandableIndex,
    handleClick
  } = useNotificationDrawer();

  const { onClickToIndex } = usePageNavigate();

  return (
    <div className="flex h-full flex-col px-3 py-3 text-white">
      <BackNavigation
        onClick={onClickToIndex}
        title={
          <div className="absolute left-0 w-full text-center text-lg font-bold text-[var(--white)]">
            Centro de Notificação
          </div>
        }
      />

      <div className="grow overflow-y-auto">
        {messages &&
          messages.map((message, index) => (
            <NotificationItemContainer
              key={message.id}
              expand={expandableIndex === index}
              first={
                index === 0 ||
                (expandableIndex !== null && index === expandableIndex + 1)
              }
              last={
                index === messages.length - 1 ||
                (expandableIndex !== null && index === expandableIndex - 1)
              }
              onClick={(event) => {
                handleClick(event, index, message.is_read === 0, message.id);
              }}
            >
              <NotificationItemTitle
                expand={expandableIndex === index}
                last={
                  index === messages.length - 1 ||
                  (expandableIndex !== null && index === expandableIndex - 1)
                }
              >
                <div className='flex justify-between items-center'>
                  <div className='flex items-center w-11/12'>
                    {message.is_read === 0 && <NotificationItemRedDot />}
                    <div className="text-ellipsis overflow-hidden">{message.title}</div>
                  </div>
                  {expandableIndex !== index ? (
                    <DownOutlined style={{ fontSize: '14px' }} />
                  ) : (
                    <UpOutlined style={{ fontSize: '14px' }} />
                  )}
                </div>
                <div>{message.created_at}</div>
              </NotificationItemTitle>
              {expandableIndex === index && (
                <NotificationItemExpandable>
                  {message.content}
                </NotificationItemExpandable>
              )}
            </NotificationItemContainer>
          ))}
      </div>
    </div>
  )
}
