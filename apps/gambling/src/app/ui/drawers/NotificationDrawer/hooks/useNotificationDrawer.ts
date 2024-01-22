import React, {useEffect, useState} from "react";
import {
  useLazyGetLetterListQuery,
  useLazyGetMailCountQuery,
  usePostLetterReadMutation
} from "../../../../external";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from '../../../../reduxStore';
import {AppLocalStorage} from "../../../../persistant/localstorage";
import {AppLocalStorageKey} from "../../../../persistant/AppLocalStorageKey";
import {appSlice} from "../../../../reduxStore/appSlice";
import { GetMailListResponseData } from "../../../../external/MailEndpoint";

export const useNotificationDrawer = () => {
  const [messages, setMessages] = useState<GetMailListResponseData[]>([]);
  const [expandableIndex, setExpandableIndex] = useState<null | number>(null);

  const [triggerGetLetter, { data }] = useLazyGetLetterListQuery({});
  const [triggerPostLetterRead] = usePostLetterReadMutation();
  const dispatch = useDispatch();
  const [triggerGetMailCount, { data: getMailCountData }] = useLazyGetMailCountQuery();
  const app = useSelector((state: RootState) => state.app);

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
        //改用前端自己去減少 messageCount
        // triggerGetMailCount(null)
        let count = app.messageCount
        count = count - 1
        dispatch(appSlice.actions.setMessageCount( count || 0));

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
