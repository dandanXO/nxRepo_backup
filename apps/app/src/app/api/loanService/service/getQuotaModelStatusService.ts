import { runAxios } from '../../base/runAxios';
import { GetQuotaModelStatusRequest } from '../GetQuotaModelStatusRequest';
import { GetQuotaModelStatusResponse } from '../GetQuotaModelStatusResponse';
import axios from 'axios';
import { alertModal } from '../../base/alertModal';

export const getQuotaModelStatusService = async (
  request: GetQuotaModelStatusRequest
) => {
  try {
    const { data }: { data: GetQuotaModelStatusResponse } = await runAxios(
      '/api',
      '/v3/loan/quota-model-status',
      'get',
      request
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alertModal((error.response as any).data?.message);
    }
    return null;
  }
};
