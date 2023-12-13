import {DownOutlined, UpOutlined} from '@ant-design/icons';
import cx from 'classnames';
import React, {useEffect, useState} from 'react';

import {
  GetLetterResponseData,
  useGetLetterListMutation,
  useGetMailCountMutation,
  usePostLetterReadMutation,
} from '../../../../external';
import {AppLocalStorage} from '../../../../persistant/localstorage';
import {
  NotificationItemContainer,
  NotificationItemExpandable,
  NotificationItemRedDot,
  NotificationItemTitle,
} from '../../../components/NotificationItem';
import {useDispatch} from "react-redux";
import {appSlice} from "../../../../reduxStore/appSlice";

import {NotificationContainer as PNotificationContainer} from "./env/pernambucana/NotificationContainer";
import {NotificationContainer as WNotificationContainer} from "./env/wild/NotificationContainer";
import {NotificationContainer as CNotificationContainer} from "./env/coco/NotificationContainer";

import {renderByPlatform} from "../../../utils/renderByPlatform";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";

const NotificationContainer = renderByPlatform({
  "wild777bet": WNotificationContainer,
  "coco777bet": CNotificationContainer,
}, PNotificationContainer);

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
          token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '',
          mailId,
        });
        triggerGetMailCount({ token: AppLocalStorage.getItem(AppLocalStorageKey.token) || '' })

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
        'z-[1000] fixed right-0 top-0 bottom-0 left-0 w-full bg-[#090B0F] bg-[rgba(0,0,0,0.6)]',
        {}
      )}
      onClick={(event) => {
        event.stopPropagation();
        props.closeDrawer();
      }}
    >
      <NotificationContainer>
        <div className={'mb-2 text-2xl font-bold text-[var(--white)]'} >
          Centro de Notificação
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
                  className="item flex flex-row items-center"
                  expand={expandableIndex === index}
                  last={
                    index === messages.length - 1 ||
                    (expandableIndex !== null && index === expandableIndex - 1)
                  }
                >
                  <div className='flex items-center w-2/3'>
                    {message.is_read === 0 && <NotificationItemRedDot />}
                    <div className="text-ellipsis overflow-hidden">{message.title}</div>
                  </div>

                  <div className='flex items-center w-1/3'>
                    <div className={'date mr-2'}>{message.created_at}</div>
                    {expandableIndex !== index ? (
                      <DownOutlined style={{ fontSize: '14px' }} />
                    ) : (
                      <UpOutlined style={{ fontSize: '14px' }} />
                    )}
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
      </NotificationContainer>
    </div>
  );
};
