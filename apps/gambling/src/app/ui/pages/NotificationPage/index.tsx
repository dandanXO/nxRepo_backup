import {DownOutlined, LeftOutlined, UpOutlined} from '@ant-design/icons';
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
      <div className="flex h-full flex-col px-3 py-3 text-white">
        <LeftOutlined
            style={{ fontSize: '24px' }} // 調整箭頭圖示的大小
            className={'absolute left-[20px] top-[20px] text-[#ffffff] font-bold'}
            onClick={() => {
              navigate(PageOrModalPathEnum.IndexPage);
            }}
        />

        <div className="mb-5 pl-3 text-2xl font-bold italic " style={{color:'#FBFF3F'}}>
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
  );
};
