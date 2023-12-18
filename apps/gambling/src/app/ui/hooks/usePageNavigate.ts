import {useLocation, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reduxStore";
import {appSlice} from "../../reduxStore/appSlice";
import {PageOrModalPathEnum} from "../PageOrModalPathEnum";
import { GameItem } from "../components-bs/GameTypeSection";
import { AppLocalStorage } from "../../persistant/localstorage";
import { AppLocalStorageKey } from "../../persistant/AppLocalStorageKey";


export interface IQueryStringProps{
  [key: string]: string;
}
const queryStringParams = (queryString:IQueryStringProps) => {
  return queryString
    ? `?${Object.entries(queryString)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')}`
    : '';
}


export const usePageNavigate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLogin, isShowLoginModal} = useSelector((state: RootState) => state.app)

  const onClickToIndex = () => {
    navigate(PageOrModalPathEnum.IndexPage)
  }

  const onClickToSlot = () => {
    navigate(PageOrModalPathEnum.IndexSlotPage)
  }

  const onClickToFirstDeposit = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.InitialChargePage)
    }
  }
  const onClickToWallet = (queryString?:IQueryStringProps) => {

    if (!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(`${PageOrModalPathEnum.WalletPage}${queryStringParams(queryString || {})}`)
    }
  }

  const onClickToDepositCashback = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.RechargeActivityPage)
    }
  }

  const onClickToInvite = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.InvitePage)
    }
  }

  const onClickToVipGrade = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.VIPGradePage)
    }
  }

  const onClickToCheckInDaily = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.DailySignInPage)
    }
  }
  const onClickToTelegram = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.TelegramPage)
    }
  }
  const onClickToProfile = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.MyPage)
    }
  }

  const onClickToSearch = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.GameSearchPage)
    }
  }
  const onClickToGameRecord = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.GameRecordPage)
    }
  }
  const onClickToSetting = () => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(PageOrModalPathEnum.SettingPage)
    }
  }
  const onClickToPrivacyAgreement = () => {
    navigate(PageOrModalPathEnum.PrivacyAgreementPage)
  }

  const onClickGameItem = (item: GameItem) => {
    if(!isLogin) {
      dispatch(appSlice.actions.showLoginDrawerOrModal(true))
    } else {
      navigate(`${PageOrModalPathEnum.GamePage}?gameId=${item.gameId}&label=${item.type === "null" ? item.label : item.type}`)
      addGameToRecent(item)
    }
  }

  const addGameToRecent = (gameItem: GameItem) => {
    const gameRecentLocal = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.gameRecentLocal) || '[]')
    if(gameRecentLocal) {
      const indexInGameRecentLocal = gameRecentLocal.findIndex((recentGameItem: GameItem) => recentGameItem.gameId === gameItem.gameId)
      indexInGameRecentLocal != -1 && gameRecentLocal.splice(indexInGameRecentLocal, 1)
      gameRecentLocal.unshift(gameItem)
      AppLocalStorage.setItem(AppLocalStorageKey.gameRecentLocal, JSON.stringify(gameRecentLocal))
    } else {
      AppLocalStorage.setItem(AppLocalStorageKey.gameRecentLocal, JSON.stringify(gameItem))
    }
  }


  const telegramServiceId = AppLocalStorage.getItem(AppLocalStorageKey.telegramService);
  const telegramManagerId = AppLocalStorage.getItem(AppLocalStorageKey.telegramManager);
  const telegramGroupId = AppLocalStorage.getItem(AppLocalStorageKey.telegramGroup);

  const userInfoString = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo = userInfoString && userInfoString !== "undefined"  ? JSON.parse(userInfoString) : null;
  const user_id = userInfo?.user_id || '';

  const telegramServiceUrl=`https://t.me/${telegramServiceId}`
  const telegramManagerUrl=`https://t.me/${telegramManagerId}`
  const telegramGroupUrl=`https://t.me/${telegramGroupId}?start=${user_id}`


  const onClickToOpenTelegramService = () => {
    window.open(telegramServiceUrl,'_blank')
  }

  const onClickToOpenTelegramManager = () => {
    window.open(telegramManagerUrl,'_blank')
  }

  const onClickToOpenTelegramGroup = () => {
    window.open(telegramGroupUrl,'_blank')
  }


  const downloadUrl= AppLocalStorage.getItem(AppLocalStorageKey.downloadUrl) || ""
  const onClickToOpenDownload = () => {
    if(downloadUrl !== null) window.open(downloadUrl);
  }

  return {
    onClickToIndex,
    onClickToSlot,
    onClickToFirstDeposit,
    onClickToWallet,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
    onClickToProfile,
    onClickToSearch,
    onClickToGameRecord,
    onClickToSetting,
    onClickToPrivacyAgreement,
    onClickGameItem,
    onClickToOpenDownload,
    downloadUrl,
    // NOTE: window
    onClickToOpenTelegramService,
    onClickToOpenTelegramManager,
    onClickToOpenTelegramGroup,
  }
}
