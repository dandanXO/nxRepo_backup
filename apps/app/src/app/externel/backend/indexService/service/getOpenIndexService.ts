import axios from 'axios';

import { gateway } from '../../../../gateway';
import { alertModal } from '../../../../ui/components/alertModal';
import { GetOpenIndexRequest } from '../GetOpenIndexRequest';
import { GetOpenIndexResponse } from '../GetOpenIndexResponse';

export const getOpenIndexService = async (params: GetOpenIndexRequest) => {
  try {
    const { data }: { data: GetOpenIndexResponse } = await gateway(
      '/api',
      '/v3/open-index',
      'get',
      null,
      params
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alertModal((error.response as any).data?.message);
    }
    return error;
  }
};