import { useNavigate } from "react-router";
import { Bonus } from "../../components/Bonus";

import styled from "styled-components";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { useAllowLoginRouterRules } from "../../router/hooks/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment";
import { BackNavigation } from "../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../router/hooks/usePageNavigate";
import { VIPBorderStyleContainer } from "../../components/VIPBorderStyleContainer";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { renderByUVersion } from "../../utils/renderByUVersion";
import { FragmentContainer } from "../../components/FragmentContainer";
import cx from 'classnames';
import { Banner } from "../../components/Banner";
import { TelegramButton } from "../../components-bs/Buttons/TelegramButton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appSlice } from "../../../reduxStore/appSlice";
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { TelegramPage as CTelegramPage } from "./env/coco/TelegramPage";
import { TelegramPage as WTelegramPage } from "./env/wild/TelegramPage";
import { TelegramPage as RTelegramPage } from "./env/riojungle/TelegramPage";
import { TelegramPage as PTelegramPage } from "./env/pernambucana/TelegramPage";


export interface ITelegramPage {
  handleClickToTelegram: ()=>void;
}

const GoToTelegram = styled.div`
  cursor: pointer;
  background: linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);
  border-radius: 8px;
  /* width: 300px; */
  /* height: 60px; */
  padding: 14px 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px auto 64px;
`


export const TelegramPage = () => {
  useAllowLoginRouterRules();

  const { isMobile } = useBreakpoint();

  const telegramId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);
  const userInfoString = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';
  const telegramUrl = `https://t.me/${telegramId}?start=${user_id}`

  const { onClickToIndex } = usePageNavigate();



  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(appSlice.actions.setShowTelegramModal(true))
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, []);

  const handleClickToTelegram = () => {
    window.open(telegramUrl, '_blank')
  }

  return renderByUVersion(
    {
      "u1": <CTelegramPage handleClickToTelegram={handleClickToTelegram} />,
      "wild777bet": <WTelegramPage handleClickToTelegram={handleClickToTelegram} />,
      "u2": <RTelegramPage handleClickToTelegram={handleClickToTelegram} />,
    },
    <PTelegramPage handleClickToTelegram={handleClickToTelegram} />,
  );
}
