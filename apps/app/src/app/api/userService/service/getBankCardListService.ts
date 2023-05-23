import { GetBankCardListResponse } from '../GetBankCardListResponse';
import { runAxios } from '../../base/runAxios';
import axios from 'axios';
import { alertModal } from '../../base/alertModal';

export const GetBankCardListService = async (params: null) => {
  try {
    const { data }: { data: GetBankCardListResponse } = await runAxios('/api', '/v2/user/bank-card', 'get', null, {});
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alertModal((error.response as any).data?.message);
    }
    return null;
  }
};
