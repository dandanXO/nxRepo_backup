import React from "react";
import cx from "classnames";
import {INotificationDrawer} from "../../types/INotificationDrawer";

import {NotificationContainer} from "./NotificationContainer";
import {useNotificationDrawer} from "../../hooks/useNotificationDrawer";
import { NotificationElement } from "../../../../components-bs/NotificationElement";
import XCircle from './images/XCircle.png';

export const NotificationDrawer = ({
  closeDrawer,
}: INotificationDrawer) => {
  const {
    messages,
    expandableIndex,
    handleClick,
  } = useNotificationDrawer();

  return (
    <div
      className={cx(
        'z-[1000] fixed right-0 top-0 bottom-0 left-0 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]',
        {}
      )}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <NotificationContainer>
        <img alt='close' src={XCircle} className='h-10 w-10 cursor-pointer' onClick={()=>closeDrawer()}/>

        <div className={'mt-3 mb-5 text-lg text-[var(--white)]'} >
          Centro de Notificação
        </div>

        <div className={'overflow-y-auto text-white text-xs lg:text-sm'}>
          indexexpandableIndex{expandableIndex}
          {
            messages.map((message, index) => (
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

          {/*{messages &&*/}
          {/*  messages.map((message, index) => (*/}
          {/*    <NotificationItemContainer*/}
          {/*      key={message.id}*/}
          {/*      expand={expandableIndex === index}*/}
          {/*      first={*/}
          {/*        index === 0 ||*/}
          {/*        (expandableIndex !== null && index === expandableIndex + 1)*/}
          {/*      }*/}
          {/*      last={*/}
          {/*        index === messages.length - 1 ||*/}
          {/*        (expandableIndex !== null && index === expandableIndex - 1)*/}
          {/*      }*/}
          {/*      onClick={(event) => {*/}
          {/*        handleClick(event, index, message.is_read === 0, message.id);*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <NotificationItemTitle*/}
          {/*        className="item flex flex-row items-center"*/}
          {/*        expand={expandableIndex === index}*/}
          {/*        last={*/}
          {/*          index === messages.length - 1 ||*/}
          {/*          (expandableIndex !== null && index === expandableIndex - 1)*/}
          {/*        }*/}
          {/*      >*/}
          {/*        <div className='flex items-center w-2/3'>*/}
          {/*          {message.is_read === 0 && <NotificationItemRedDot />}*/}
          {/*          <div className="text-ellipsis overflow-hidden">{message.title}</div>*/}
          {/*        </div>*/}

          {/*        <div className='flex items-center w-1/3'>*/}
          {/*          <div className={'date mr-2'}>{message.created_at}</div>*/}
          {/*          {expandableIndex !== index ? (*/}
          {/*            <DownOutlined style={{ fontSize: '14px' }} />*/}
          {/*          ) : (*/}
          {/*            <UpOutlined style={{ fontSize: '14px' }} />*/}
          {/*          )}*/}
          {/*        </div>*/}
          {/*      </NotificationItemTitle>*/}
          {/*      {expandableIndex === index && (*/}
          {/*        <NotificationItemExpandable>*/}
          {/*          {message.content}*/}
          {/*        </NotificationItemExpandable>*/}
          {/*      )}*/}
          {/*    </NotificationItemContainer>*/}
          {/*  ))}*/}
        </div>
      </NotificationContainer>
    </div>
  )
}
