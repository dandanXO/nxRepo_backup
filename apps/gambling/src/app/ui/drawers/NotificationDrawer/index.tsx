import { DownOutlined, UpOutlined } from '@ant-design/icons';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  GetLetterResponseData,
  useGetLetterListMutation,
  useGetMailCountMutation,
  usePostLetterReadMutation,
} from '../../../external';
import { AppLocalStorage } from '../../../persistant/localstorage';
import {
  NotificationItemContainer,
  NotificationItemExpandable,
  NotificationItemRedDot,
  NotificationItemTitle,
} from '../../components/NotificationItem';
import {useDispatch} from "react-redux";
import {appSlice} from "../../../reduxStore/appSlice";
import {environment} from "../../../../environments/environment";

export type INotificationDrawer = {
  closeDrawer: () => void;
};

export const NotificationDrawer = (props: INotificationDrawer) => {
  const [messages, setMessages] = useState<GetLetterResponseData[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<null | number>(0);

  const [triggerGetLetter, { data }] = useGetLetterListMutation({});
  const [triggerPostLetterRead] = usePostLetterReadMutation();
  const dispatch = useDispatch();
  const [triggerGetMailCount, { data: messageData }] = useGetMailCountMutation();


  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
    unRead: boolean,
    mailId: number
  ) => {
    event.stopPropagation();
    if (expandableIndex === index) {
      setExpandableIndex(null);
    } else {
      if (unRead) {
        triggerPostLetterRead({
          token: AppLocalStorage.getItem('token') || '',
          mailId,
        });
        triggerGetMailCount({ token: AppLocalStorage.getItem('token') || '' })

        const tempMessages = [...messages];
        const tempMessage = { ...messages[index] };
        tempMessage.is_read = 1;
        tempMessages[index] = tempMessage;

        setMessages(tempMessages);
      }
      setExpandableIndex(index);
    }
  };

  useEffect(() => {
    triggerGetLetter({
      token: AppLocalStorage.getItem('token') || '',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.data);    }
  }, [data]);

  useEffect(() => {
    if (messageData) {
      dispatch(appSlice.actions.setMessageCount(messageData?.mailCount || 0));
    }
  }, [messageData]);

  return (
    <div
      className={cx(
        'fixed right-0 top-0 bottom-0 left-0 z-30 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]',
        {}
      )}
      onClick={(event) => {
        event.stopPropagation();
        props.closeDrawer();
      }}
    >
      <div
        className={cx(
          'flex-between fixed right-0 top-0 bottom-0 z-10 flex w-[450px] flex-col bg-[#090B0F] p-4 text-left',
          {}
        )}
        style={{background: `url("assets/${environment.assetPrefix}/bg_web_login_1.png")`}}
      >
        <div className={'mb-2 text-lg font-bold text-white'} style={{color:'var(--main-secondary-main)'}}>
          Centro de Notificaciones
        </div>

        <div className={'overflow-y-auto text-base text-white'}>
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
                  className="item flex flex-row items-center justify-between"
                  expand={expandableIndex === index}
                  last={
                    index === messages.length - 1 ||
                    (expandableIndex !== null && index === expandableIndex - 1)
                  }
                >
                  {message.is_read === 0 && <NotificationItemRedDot />}
                  <div className="title">{message.title}</div>
                  <div className={'flex flex-row'}>
                    <div className={'date mr-2'}>{message.created_at}</div>
                    <div className={'leading-[16px]'}>
                      {expandableIndex !== index ? (
                        <DownOutlined style={{ fontSize: '14px' }} />
                      ) : (
                        <UpOutlined style={{ fontSize: '14px' }} />
                      )}
                    </div>
                  </div>
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
    </div>
  );
};
