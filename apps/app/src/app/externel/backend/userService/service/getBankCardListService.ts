import { gateway } from '../../../../gateway';
import { GetBankCardListResponse } from '../GetBankCardListResponse';

export const GetBankCardListService = async (params: null) => {
  const { data }: { data: GetBankCardListResponse } = await gateway(
    '/api',
    '/v2/user/bank-card',
    'get',
    null,
    {}
  );
  return data;
};
