import { createSelector } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../gateway/axiosBaseQuery';
import { GetGameListEndpoint } from './GetGameListEndpoint';
import { StartGameEndpoint } from './StartGameEndpoint';
import { DownloadEndpoint } from './DownloadEndpoint';
import {environment} from "../../environments/environment";
import { WithdrawEndpoint } from './WithdrawEndpoint';
import {SendForgetPasswordSMSCodeEndpoint} from "./SendForgetPasswordSMSCodeEndpoint";
import {Page} from "./types/Page";
import { GetBoxInfoEndpoint } from "./GetBoxInfoEndpoint";
import { GetBoxReceiveEndpoint } from "./GetBoxReceiveEndpoint";
import { GetBoxReceiveRecordEndpoint } from "./GetBoxReceiveRecordEndpoint";
import { ForgetPasswordEndpoint, GetVIPInfoEndpoint, LoginEndpoint, RegisterEndpoint } from "./UserEndpoint";
import { GetMailCountEndpoint, GetMailListEndpoint, PostMailReadEndpoint } from "./MailEndpoint";
import { GetGlobalConfigEndpoint, GetMaintenanceEndpoint, GetRechargeConfig } from "./SystemEndpoint";
import {
  GetRechargeRecordEndpoint,
  GetWithdrawLimitEndpoint,
  GetWithdrawRecordEndpoint,
  PostRechargeEndpoint
} from "./PaymentEndpoint";

type GetInviteConfigRequestData = {
  id: number;
  proxyType: number;
  firstRecharge: number;
  bindReward: number;
  level1FlowRate: number;
  level2FlowRate: number;
  level3FlowRate: number;
  level1RewdRate: string;
  level2RewdRate: string;
  level3RewdRate: string;
  fbFlag: number;
  googleFlag: number;
  phoneFlag: number;
  level1RewdRateDisplay: any;
  jobPeriod: number;
  firstRechargeLevel: string;
  level1FlowRateDisplay: number;
  level2FlowRateDisplay: number;
  level3FlowRateDisplay: number;
  level2RewdRateDisplay: any;
  level3RewdRateDisplay: any;
};
type GetInviteConfigRequest = {};

type GetInviteConfigResponse = {
  code: number;
  msg: any;
  data: GetInviteConfigRequestData[];
  total: 0;
};

type GetBoxInfoRequest = {};

type GetBoxInfoContextVo = {
  amount: number;
  number: number;
  receiveFlag: number;
};

type GetBoxInfoResponse = {
  code: number;
  msg: any;
  data: {
    id: number;
    contentVoList: GetBoxInfoContextVo[];
    status: number;
    number: number;
    receiveAmount: number;
  };
  total: number;
};

type GetBoxSimpleBalanceRequest = {};
type GetBoxSimpleBalanceResponse = {
  code: number;
  msg: any;
  data: {
    amount: number;
    withdrawAmount: number;
    inviteAmount: number;
  };
  total: number;
};

type MailCountRequest = {
  token: string;
};


type ExtraInfoRequest = {
  //
};
type ExtraInfoResponse = {
  code: number;
  msg: any;
  data: {
    teleStatus: string;
    rechargeStatus: string;
  };
  total: number;
};

type GetDamaRequest = {};

type GetDamaResponse = {
  code: number;
  msg: any;
  data: any;
  total: number;
};

type GetBankRequest = {
  token: string;
};

type GetBankResponse = {
  code: number;
  msg: string;
  data: any;
};

type GetInviteRewardDataRequest = {
  //
};

// 已結算的團隊獎勵
export type GetInviteRewardDataResponse = {
  code: number;
  msg: any;
  data: {
    userId: number; // 用户编号
    inviteId: number; // 弃用
    reward: number; // 团队总奖励
    reward1: number;  // 一级总奖励
    reward2: number;  // 二级总奖励
    reward3: number;  // 三级总奖励
    rewd: number; // 团队充提差
    rewdReward: number; // 团队充提差奖励
    bindReward: number; // 团队注册奖励
    firstRechargeReward: number; // 团队首充奖励
    firstRechargeReward2: any;
    rechargeAmount: number; // 团队充值金额
    recharge1Amount: any;
    withdrawAmount: number; // 团队提现金额
    withdraw1Amount: any;
    flow: number; // 团队流水
    flowReward: number; // 团队流水奖励
    flow1: number;  // 一级流水
    flow1Reward: number;  // 一级流水奖励
    rewd1: number;  // 一级充提差
    rewd1Reward: number;  // 一级充提差奖励
    flow2: number;  // 二级流水
    flow2Reward: number;  // 二级流水奖励
    flow3: number;  // 三级流水
    flow3Reward: number;  // 三级流水奖励
    recharge2Amount: number;  // 二级充值金额
    recharge3Amount: number;  // 三级充值金额
    withdraw2Amount: number;  // 二级提现金额
    withdraw3Amount: number;  // 三级提现金额
    rewd2: number;  // 二级充提差
    rewd3: number;  // 三级充提差
    rewd2Reward: number;  // 二级充提差奖励
    rewd3Reward: number;  // 三级充提差奖励
    num1: number; // 一级人数
    num2: number; // 二级人数
    num3: number; // 三级人数
    num: number;  // 团队人数
    numRecharge: number;  // 团队充值人数
    num1Recharge: number; // 一级充值人数
    num2Recharge: number; // 二级充值人数
    num3Recharge: number; // 三级充值人数
    inviteUrl: string;
    inviteDsUrl: string;
    proxyType: number;
    boxReward: number;
    nextSettleDate: string;
    nowTime: string;
    selfWithdrawAmount: number;
  };
  total: number;
};

type GetUnsettleInviteRewardDataRequest = {
  //
};

// 未結算的團隊獎勵
export type GetUnsettleInviteRewardDataResponse = {
  code: number;
  msg: any;
  data: {
    userId: number; // 用户编号
    inviteId: number; // 弃用
    reward: number; // 团队总奖励
    reward1: number;  // 一级总奖励
    reward2: number;  // 二级总奖励
    reward3: number;  // 三级总奖励
    rewd: number; // 团队充提差
    rewdReward: number; // 团队充提差奖励
    bindReward: number; // 团队注册奖励
    firstRechargeReward: number; // 团队首充奖励
    firstRechargeReward2: any;
    rechargeAmount: number; // 团队充值金额
    recharge1Amount: any;
    withdrawAmount: number; // 团队提现金额
    withdraw1Amount: any;
    flow: number; // 团队流水
    flowReward: number; // 团队流水奖励
    flow1: number;  // 一级流水
    flow1Reward: number;  // 一级流水奖励
    rewd1: number;  // 一级充提差
    rewd1Reward: number;  // 一级充提差奖励
    flow2: number;  // 二级流水
    flow2Reward: number;  // 二级流水奖励
    flow3: number;  // 三级流水
    flow3Reward: number;  // 三级流水奖励
    recharge2Amount: number;  // 二级充值金额
    recharge3Amount: number;  // 三级充值金额
    withdraw2Amount: number;  // 二级提现金额
    withdraw3Amount: number;  // 三级提现金额
    rewd2: number;  // 二级充提差
    rewd3: number;  // 三级充提差
    rewd2Reward: number;  // 二级充提差奖励
    rewd3Reward: number;  // 三级充提差奖励
    num1: number; // 一级人数
    num2: number; // 二级人数
    num3: number; // 三级人数
    num: number;  // 团队人数
    numRecharge: number;  // 团队充值人数
    num1Recharge: number; // 一级充值人数
    num2Recharge: number; // 二级充值人数
    num3Recharge: number; // 三级充值人数
    inviteUrl: any;
    inviteDsUrl: any;
    proxyType: any;
    boxReward: any;
    nextSettleDate: any;
    nowTime: any;
    selfWithdrawAmount: number;
  };
  total: number;
};

type GetVIInfoPRequest = {
  token: string;
};

export type GetUserVIPAllInfoResponseData = {
  level: number;
  rechargeAmountLimit: number;
  flowLimit: number;
  withdrawAmountLimitDay: number;
  withdrawTimesLimitDay: number;
  receiveAmountLimitDay: number;
  display: number;
  upRewardAmout: number;
}

export type GetUserVIPAllInfoResponse = {
  code: number;
  msg: string;
  total: number;
  data: GetUserVIPAllInfoResponseData[];
};

export type GetSignInConfigResponse = {
  code: number;
  msg: string;
  data: {
    vipLevel: number;
    todayIsSignIn: boolean;
    signInTotalDays: number;
    signInRefreshTimestamp: number;
    signInConfig: {
      days: number;
      cashback: number;
      bonus: number;
      bonus_finish: number;
    }[];
    signInAllConfig?: {
      identifier: string;
      value: string;
    }[];
  };
};

export type GetSignInRecordResponseData = {
  id: string;
  user_id: string;
  vip_level: string;
  days: number;
  cashback: number;
  bonus: string;
  bonus_finish: string;
  created_at: string;
}

export type GetSignInRecordResponse = {
  code: number;
  msg: string;
  data: GetSignInRecordResponseData[];
  page: Page;
}

export type GetSignInRecordRequest = {
  limit: number;
  page: number;
  token: string;
}

type GetUserGameRecordRequest = {
  dayMin: string;
  dayMax: string;
  pageNum: number;
  pageSize: number;
  token: string;
};

export type GetUserGameRecordResponse = {
  total: number;
  rows: {
    gameId: number;
    roomId: number;
    userId: number;
    bet: number;
    win: number;
    jackpotWin: number;
    currentBalance: number;
    createTime: string;
    day: number;
    gameName: number;
    provider: number;
  }[];
  code: number;
  msg: string;
};

type GetInviteUserDayReportDataRequest = {
  pageNum: string;
  pageSize: string;
  token: string;
  userId: string;
  dayMin: string;
  dayMax: string;
};

type GetInviteUserDayReportData = {
  bindReward: number;
  day: number;
  firstRechargeReward: number;
  flow: number;
  flow1: number;
  flow1Reward: number;
  flow2: number;
  flow2Reward: number;
  flow3: number;
  flow3Reward: number;
  flowReward: number;
  inviteId: number;
  num1: number;
  num1FirstRecharge: number;
  num1Recharge: number;
  num2: number;
  num2FirstRecharge: number;
  num2Recharge: number;
  num3: number;
  num3FirstRecharge: number;
  num3Recharge: number;
  recharge1Amount: number;
  recharge2Amount: number;
  recharge3Amount: number;
  rechargeAmount: number;
  reward: number;
  reward1: number;
  reward2: number;
  reward3: number;
  rewd: number;
  rewd1: number;
  rewd1Reward: number;
  rewd2: number;
  rewd2Reward: number;
  rewd3: number;
  rewd3Reward: number;
  rewdReward: number;
  userId: number;
  withdraw1Amount: number;
  withdraw2Amount: number;
  withdraw3Amount: number;
  withdrawAmount: number;
}

type GetInviteUserDayReportDataResponse = {
  code: number;
  msg: any;
  data: {
    records: GetInviteUserDayReportData[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    searchCount: boolean;
    countId: any;
    maxLimit: any;
    pages: number;
  };
  total: number;
};

type GetRewardRecordRequest = {
  userId: string;
  pageNum: string;
  pageSize: string;
  startTime: string;
  endTime: string;
};

type GetRewardRecordData = {
  id: number;
  settleId: number;
  userId: number;
  reward: number;
  recharge1Amount: number;
  recharge2Amount: number;
  flow1: number;
  flow1Reward: number;
  flow2: number;
  flow2Reward: number;
  rewd1: number;
  rewd1Reward: number;
  rewd2: number;
  rewd2Reward: number;
  updateTime: string;
}
type GetRewardRecordResponse = {
  total: number;
  rows: GetRewardRecordData[];
  code: number;
  msg: string;
};

type UpdateUserInfoRequest = {
  token: string
  nickname: string
  avatar: string
}

type UpdateUserInfoResponse = {
  code: number;
  msg: string;
  data: {
    user_info: {
      user_id: number;
      player_id: number;
      nickname: string;
      avatar: string;
      fb_avatar: string;
      phone: string;
      pay_account_id: number;
      vip_level: number;
      vip_level_max: number;
      card_back: number;
      avatar_frame: number;
      app_package_name: string;
      bind: number[];
      invite_user_id: string;
      invite_code: string;
      invite: any;
      recharge_amount: number;
      withdraw_amount: number;
      is_register: number;
      token: string;
      enable: number;
      s_player: number;
      c_player: number;
      withdraw_model: number;
      total_rounds: number;
      bind_bank_reward: number;
      first_rw_reward: number;
      withdraw_control: number;
      created_at: number;
      tag: number;
    };
    bank: any;
    pay_account: {
      email: string;
      phone: string;
      name: string;
    };
    token: string;
    connection: {
      ip: string;
      port: number;
      server_id: number;
      api: string;
    };
  };
};

export type GetBalanceRequest = {
  token: string;
}

export type GetBalanceData = {
  balances: {
    type: string;
    amount: number;
  }[]
}

export type GetBalanceResponse = {
  code: number;
  msg: string;
  data: GetBalanceData;
}
export const API = createApi({
  reducerPath: 'api',
  // baseQuery:(
  //   args,
  //   { signal, dispatch, getState },
  //   extraOptions
  // ) => {
  //   console.log("getState", getState())
  //   if (Math.random() > 0.5) return { error: 'Too high!' }
  //   return { data: 'All good!' }
  // },
  baseQuery: axiosBaseQuery({
    baseUrl: environment.baseUrl
  }),
  // baseQuery: async (
  //   args,
  //   { signal, dispatch, getState },
  //   extraOptions
  // ) => {
  //   console.log("getState", getState())
  //
  //   // if (Math.random() > 0.5) return { error: 'Too high!' }
  //   // return { data: 'All good!' }
  //
  //   return await axiosBaseQuery({
  //     baseUrl: environment.baseUrl
  //   }, {
  //     signal,
  //     dispatch,
  //     getState,
  //   })
  //
  // },
  refetchOnReconnect: true,
  // NOTICE: 有些需要 token 的 api 也會更新...先暫時取消
  refetchOnFocus: false,
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: 60,
  endpoints: (builder) => {
    return ({
      getConfig: GetGlobalConfigEndpoint(builder),
      register: RegisterEndpoint(builder),
      sendForgetPasswordSMSCode: SendForgetPasswordSMSCodeEndpoint(builder),
      forgetPassword: ForgetPasswordEndpoint(builder),
      login: LoginEndpoint(builder),
      getRecharge: GetRechargeConfig(builder),
      recharge: PostRechargeEndpoint(builder),
      rechargeHistoryList: GetRechargeRecordEndpoint(builder),
      getWithdrawLimit: GetWithdrawLimitEndpoint(builder),
      withdraw: WithdrawEndpoint(builder),
      withdrawHistoryList: GetWithdrawRecordEndpoint(builder),
      getBalance: builder.query<GetBalanceResponse, GetBalanceRequest>({
        query: (data: GetBalanceRequest) => ({
          method: 'get',
          url: `/japi/user/balance`,
          data,
        })
      }),
      startGame: StartGameEndpoint(builder),
      getGameList: GetGameListEndpoint(builder),
      download: DownloadEndpoint(builder),
      getBoxInfo: GetBoxInfoEndpoint(builder),
      getBoxReceive: GetBoxReceiveEndpoint(builder),
      getBoxReceiveRecordEndpoint: GetBoxReceiveRecordEndpoint(builder),
      getVIPInfo: GetVIPInfoEndpoint(builder),
      getUserVIPAllInfo: builder.query<GetUserVIPAllInfoResponse, null>({
        query: () => ({
          method: 'get',
          url: '/japi/user/vip/getAllDisplayVo',
        }),
      }),
      getSignInConfig: builder.mutation<
        GetSignInConfigResponse,
        { token: string; onlyGetSignInConfig: boolean }
      >({
        query: (data: { token: string; onlyGetSignInConfig: boolean }) => ({
          method: 'post',
          url: '/prod-api/sign-in/sign-in',
          data,
        }),
      }),
      getSignInRecord: builder.mutation<GetSignInRecordResponse, GetSignInRecordRequest>({
        query: (reqeustData: GetSignInRecordRequest) => ({
          method: 'post',
          url: '/prod-api/sign-in/record-list',
          data: reqeustData
        })
      }),
      getMailCount: GetMailCountEndpoint(builder),
      getExtraInfo: builder.query<ExtraInfoResponse, ExtraInfoRequest>({
        query: (query: MailCountRequest) => ({
          method: 'get',
          url: `/japi/user/getExtraInfo`,
          params: query,
        }),
      }),
      getInviteConfig: builder.query<
        GetInviteConfigResponse,
        GetInviteConfigRequest
      >({
        query: (query: GetInviteConfigRequest) => ({
          method: 'get',
          url: `/japi/invite/userInvite/getInviteConfig`,
          params: query,
        }),
      }),
      getSimpleBalance: builder.query<
        GetBoxSimpleBalanceResponse,
        GetBoxSimpleBalanceRequest
      >({
        query: (query: GetBoxSimpleBalanceRequest) => ({
          method: 'get',
          url: `/japi/user/balance/querySimpleBalance`,
          params: query,
        }),
      }),
      Mains: GetMaintenanceEndpoint(builder),
      getDama: builder.query<GetDamaResponse, GetDamaRequest>({
        query: (query: GetDamaRequest) => ({
          method: 'get',
          url: `/japi/user/getDama`,
          params: query,
        }),
      }),
      postLetterRead: PostMailReadEndpoint(builder),
      getLetterList: GetMailListEndpoint(builder),

      getBank: builder.query<GetBankResponse, GetBankRequest>({
        query: (query: GetDamaRequest) => ({
          method: 'get',
          url: `/prod-api/pay-service/bank`,
          params: query,
        }),
      }),

      getInviteRewardData: builder.query<
        GetInviteRewardDataResponse,
        GetInviteRewardDataRequest
      >({
        query: (query: GetInviteRewardDataRequest) => ({
          method: 'get',
          url: `/japi/invite/userInvite/queryInviteRewardData`,
          params: query,
        }),
      }),
      getUnsettleInviteRewardData: builder.query<
        GetUnsettleInviteRewardDataResponse,
        GetUnsettleInviteRewardDataRequest
      >({
        query: (query: GetInviteRewardDataRequest) => ({
          method: 'get',
          url: `/japi/invite/userInvite/queryUnsettleInviteRewardData`,
          params: query,
        }),
      }),
      getUserGameRecord: builder.mutation<
        GetUserGameRecordResponse,
        GetUserGameRecordRequest
      >({
        query: (query: GetInviteRewardDataRequest) => ({
          method: 'post',
          url: `/prod-api/playGame/queryUserGameRecord`,
          data: query,
        }),
      }),
      getInviteUserDayReportData: builder.query<
        GetInviteUserDayReportDataResponse,
        GetInviteUserDayReportDataRequest
      >({
        query: (query: GetInviteUserDayReportDataRequest) => ({
          method: 'get',
          // url: `/japi/invite/userInvite/queryInviteDayReportData?pageNum=${query.pageNum}&pageSize=${query.pageSize}&token=${query.token}&userId=${query.userId}&dayMin=${query.dayMin}&dayMax=${query.dayMax}`,
          url: `/japi/invite/userInvite/queryInviteDayReportData`,
          params: query,
        }),
      }),
      getUserInviteRewardRecord: builder.query<
        GetRewardRecordResponse,
        GetRewardRecordRequest
      >({
        query: (query: GetRewardRecordRequest) => ({
          method: 'get',
          // url: `/japi/invite/userInvite/getRewardRecordList?userId=${query.userId}&pageNum=${query.pageNum}&pageSize=${query.pageSize}&startTime=${query.startTime}&endTime=${query.endTime}`,
          url: `/japi/invite/userInvite/getRewardRecordList`,
          params: query,
        }),
      }),
      updateUserInfo: builder.mutation<
        UpdateUserInfoResponse,
        UpdateUserInfoRequest
      >({
        query: (data: UpdateUserInfoRequest) => ({
          method: 'post',
          url: '/prod-api/player/update',
          data,
        }),
      }),
    });
  },
});

export const {
  useLazyGetConfigQuery,
  useLazyGetGameListQuery,
  useLoginMutation,
  useLazyGetBalanceQuery,
  useLazyGetSimpleBalanceQuery,
  useGetUserGameRecordMutation,
  useRegisterMutation,
  useSendForgetPasswordSMSCodeMutation,
  useForgetPasswordMutation,
  useLazyGetRechargeQuery,
  useUpdateUserInfoMutation,
  useRechargeMutation,
  useLazyGetLetterListQuery,
  useRechargeHistoryListMutation,
  useLazyGetInviteConfigQuery,
  useLazyGetInviteRewardDataQuery,
  useLazyGetInviteUserDayReportDataQuery,
  useLazyGetUnsettleInviteRewardDataQuery,
  useLazyGetUserInviteRewardRecordQuery,
  useGetWithdrawLimitMutation,
  useWithdrawMutation,
  useWithdrawHistoryListMutation,
  useGetSignInConfigMutation,
  useGetSignInRecordMutation,
  useLazyGetUserVIPAllInfoQuery,
  useLazyGetVIPInfoQuery,
  useLazyDownloadQuery,
  usePostLetterReadMutation,
  useLazyGetMailCountQuery
} = API;

export const API3 = createApi({
  reducerPath: 'api3',
  baseQuery: axiosBaseQuery({
    baseUrl: environment.baseUrl
  }),
  // keepUnusedDataFor: 600,
  // keepUnusedDataFor: 1,
  // refetchOnMountOrArgChange: 60,
  endpoints: (builder) => ({
    startGame: StartGameEndpoint(builder),
  }),
});

export const { useStartGameMutation } = API3;
export const selectConfigResult = API.endpoints.getConfig.select({} as any);

// const selectUsersData = createSelector(
//   selectConfigResult,
//   usersResult => usersResult.data
// )
