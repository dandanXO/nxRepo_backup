import {DownOutlined, UpOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  GetLetterResponseData,
  useGetLetterListMutation,
  usePostLetterReadMutation,
} from '../../../external';
import { AppLocalStorage } from '../../../persistant/localstorage';
import {
  NotificationItemContainer,
  NotificationItemExpandable,
  NotificationItemRedDot,
  NotificationItemTitle,
} from '../../components/NotificationItem';
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";

export const NotificationPage = () => {
  useAllowLoginRouterRules();

  const [messages, setMessages] = useState<GetLetterResponseData[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<null | number>(0);
  const [triggerGetLetter, { data }] = useGetLetterListMutation({});
  const [triggerPostLetterRead] = usePostLetterReadMutation();

  const navigate = useNavigate();

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
          token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
          mailId,
        });

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
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.data);
    }
  }, [data]);

  return (
      <div className="flex h-full flex-col px-3 py-3 text-white">

        <BackNavigation
          onClick={() => {
            navigate(PageOrModalPathEnum.IndexPage);
          }}
          title={
            <div className="pl-10 text-lg font-bold text-[var(--white)]">
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
  );
};
