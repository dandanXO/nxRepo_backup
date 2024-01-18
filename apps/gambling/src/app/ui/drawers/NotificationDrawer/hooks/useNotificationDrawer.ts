import React, {useEffect, useState} from "react";
import {
  useLazyGetLetterListQuery,
  useLazyGetMailCountQuery,
  usePostLetterReadMutation
} from "../../../../external";
import {useDispatch} from "react-redux";
import {AppLocalStorage} from "../../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";
import {appSlice} from "../../../../reduxStore/appSlice";
import { GetMailListResponseData } from "../../../../external/MailEndpoint";

export const useNotificationDrawer = () => {
  const [messages, setMessages] = useState<GetMailListResponseData[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<null | number>(0);

  const [triggerGetLetter, { data }] = useLazyGetLetterListQuery({});
  const [triggerPostLetterRead] = usePostLetterReadMutation();
  const dispatch = useDispatch();
  const [triggerGetMailCount, { data: getMailCountData }] = useLazyGetMailCountQuery();


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
          mailId,
        });
        triggerGetMailCount(null)

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
    triggerGetLetter(null);
  }, []);

  useEffect(() => {
    if (data) {
      setMessages(data.data);    }
  }, [data]);

  useEffect(() => {
    if (getMailCountData?.data) {
      dispatch(appSlice.actions.setMessageCount(getMailCountData.data.mailCount || 0));
    }
  }, [getMailCountData]);

  return {
    messages,
    expandableIndex,
    handleClick
  }
}
