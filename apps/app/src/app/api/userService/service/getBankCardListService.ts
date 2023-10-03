import { runAxios } from '../../base/runAxios';
import { GetBankCardListResponse } from '../GetBankCardListResponse';

export const GetBankCardListService = async (params: null) => {
  const { data }: { data: GetBankCardListResponse } = await runAxios('/api', '/v2/user/bank-card', 'get', null, {});
  return data;
};
