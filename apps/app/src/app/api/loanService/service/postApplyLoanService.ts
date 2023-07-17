import axios from 'axios';

import { alertModal } from '../../base/alertModal';
import { runAxios } from '../../base/runAxios';
import { LoanServiceRequest } from '../LoanServiceRequest';

export const postApplyLoanService = async (req: LoanServiceRequest) => {
  try {
    const { data, success }: { data: LoanServiceResponse; success: boolean } = await runAxios(
      '/api',
      '/v3/loan/apply',
      'post',
      req
    );
    // console.log('data', data);
    return {
      data,
      success,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      alertModal((error.response as any).data?.message);
    }
    return error;
  }
};

export type LoanServiceResponse = {
  //
};
