import { DownOutlined, UpOutlined } from '@ant-design/icons';
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
          token: AppLocalStorage.getItem('token') || '',
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
      token: AppLocalStorage.getItem('token') || '',
    });
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.data);
    }
  }, [data]);

  return (
    <>
      <div className="flex h-full flex-col px-3 py-3 text-white">
        <img
          onClick={() => navigate('/my')}
          className="h-10 w-10"
          alt="back"
          src="data:image/png;base64,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"
        />
        <div className="mb-5 pl-3 text-left text-3xl font-bold italic text-white">
          Centro de Notificação
        </div>

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
    </>
  );
};
