import { ExternelEndpoint } from './types';
import { Page } from './types/Page';

type WithdrawHistoryListEndpointRequest = {
  limit: number;
  page: number;
  token: string;
};

export type WithdrawHistoryListEndpointResponseData = {
  id: number;
  user_id: number;
  pay_serial_no: string;
  pay_channel: string;
  status: number;
  fee: string;
  amount: string;
  created_at: string;
};

type WithdrawHistoryListEndpointResponse = {
  code: number;
  msg: string;
  data: WithdrawHistoryListEndpointResponseData[];
  page: Page;
};

export const WithdrawHistoryListEndpoint = (builder: ExternelEndpoint) =>
  builder.mutation<
    WithdrawHistoryListEndpointResponse,
    WithdrawHistoryListEndpointRequest
  >({
    query: (data: WithdrawHistoryListEndpointRequest) => ({
      method: 'post',
      url: `/prod-api/payment/balance-less/list`,
      data,
    }),
  });
