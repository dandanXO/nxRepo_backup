import {PayloadAction, createSlice, createSelector, createDraftSafeSelector} from '@reduxjs/toolkit';
import { IUserStore } from '../gateway/socket';
import {AppLocalStorage} from "../persistant/localstorage";
import {RootState} from "./index";
import {AppLocalStorageKey} from "../persistant/AppLocalStorageKey";


interface IMaintenance{
  flag: number;
  start: string;
  end: string;
}
export type InitialState = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUserMoneyStatusLoading: boolean;
  isLogin: boolean;
  isUILoading: boolean;
  userStore?: IUserStore;
  isShowLoginModal: boolean;
  isShowMobileLogoutModal: boolean;
  isShowTelegramModal: boolean;
  isShowDepositModal: boolean;
  isShowInviteBonusModal: boolean;
  isShowMaintenanceModal: boolean;
  isShowTelegramMobileModal: boolean;
  isShowiOSDownloadPopover: boolean;
  messageCount: number;
  vip_level: number;
  globalMessage: null | string;
  withdrawBegin: string
  withdrawEnd: string;
  maintenance: IMaintenance;
};

const userStore$3: IUserStore= {
  userAmount: 0,
  // setUserAmount: (amount: number) => {
  //   console.log("setUserAmount: " + amount)
  // }
  websocketTipsDialog: false,
  loadingShow: false,
  user: {
    token: "",
    withdrawAmount: 0,
  },
  userinfo: {
    vip_level: null,
  },
  rechargeInfo: "",
  rechargeSuccessDialog: false,
  messageInfo: "",
  popCount: 0,
  messageDialog: false,
  withdrawInfo: "",
  widthdrawSuccessDialog: false,
  isUpgrade: false,
  vipUpgrade: {
    show: false,
    totalReward: 0,
    upLevelList: undefined,
  },
  balances: {
    type1: 0,
    type2: 0,
    type3: 0
  },
}

const initialState: InitialState = {
  globalMessage: null,
  vip_level: 0,
  isUILoading: true,
  isUserMoneyStatusLoading: false,
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isLogin: !!AppLocalStorage.getItem(AppLocalStorageKey.token),
  userStore: userStore$3,
  isShowLoginModal: false,
  isShowMobileLogoutModal: false,
  isShowTelegramModal: false,
  isShowDepositModal: false,
  isShowInviteBonusModal: false,
  isShowMaintenanceModal: false,
  isShowTelegramMobileModal: false,
  isShowiOSDownloadPopover: false,
  messageCount: 0,
  withdrawBegin: "00:00",
  withdrawEnd: "00:00",
  maintenance: {
    flag: 0,
    start: "",
    end: "",
  }
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalMessage: (state: InitialState, action: PayloadAction<string | null>) => {
      state.globalMessage = action.payload;
    },
    setIsUILoading: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isUILoading = action.payload;
    },
    setIsUserMoneyStatusLoading: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isUserMoneyStatusLoading = action.payload;
    },
    setIsLogin: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setUserVIPLevel: (state: InitialState, action: PayloadAction<number>) => {
      state.vip_level = action.payload;
    },
    setUserStore: (state: InitialState, action: PayloadAction<IUserStore>) => {
      state.userStore = action.payload;
    },
    showLoginDrawerOrModal:  (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowLoginModal = action.payload;
    },
    showMobileLogoutModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowMobileLogoutModal = action.payload;
    },
    setShowTelegramModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowTelegramModal = action.payload;
    },
    setShowDepositModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowDepositModal = action.payload;
    },
    setIsShowInviteBonusModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowInviteBonusModal = action.payload;
    },
    setShowMaintenanceModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowMaintenanceModal = action.payload;
    },
    setShowTelegramMobileModal: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isShowTelegramMobileModal = action.payload;
    },
    setIsMobile: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setIsTablet: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isTablet = action.payload;
    },
    setIsDesktop: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isDesktop = action.payload;
    },
    setMessageCount: (state: InitialState, action: PayloadAction<number>) => {
      state.messageCount = action.payload;
    },
    setWithdrawBegin: (state: InitialState, action: PayloadAction<string>) => {
      state.withdrawBegin = action.payload
    },
    setWithdrawEnd: (state: InitialState, action: PayloadAction<string>) => {
      state.withdrawEnd = action.payload
    },
    setMaintenance: (state: InitialState, action: PayloadAction<IMaintenance>) => {
      state.maintenance = action.payload
      if (Number(action.payload.flag) === 1) {
        state.isShowMaintenanceModal = true
      }
    },
    setShowiOSDownloadPopover: (state: InitialState, action: PayloadAction<boolean>) => {
     state.isShowiOSDownloadPopover = action.payload;
    },
  },
});

// 充值余额
export const type1Selector =  (state: RootState) => state.app?.userStore?.balances?.type1 || 0;

// 可提现余额
export const type2Selector = (state: RootState) => state.app?.userStore?.balances?.type2 || 0;

// 奖励余额
export const type3Selector = (state: RootState) => state.app?.userStore?.balances?.type3 || 0;

export const totalBalanceSheetSelector = createDraftSafeSelector(
  type1Selector,
  type2Selector,
  type3Selector,
  (type1, type2, type3) => parseFloat((type1 + type2 + type3).toFixed(2))
)
export const totalReasableSelector = createDraftSafeSelector(
  type2Selector,
  type3Selector,
  (type2, type3) => parseFloat((type2 + type3).toFixed(2))
)
export const toDepositAccountSwingSelector = createDraftSafeSelector(
  type1Selector,
  type2Selector,
  (type1, type2) => parseFloat((type1 + type2).toFixed(2))
)
export const toDepositAccountRemovableSelector = type2Selector

export const accountPromotedSwingSelector = type3Selector
export const accountPromotedWithdrawableSelector = type3Selector


