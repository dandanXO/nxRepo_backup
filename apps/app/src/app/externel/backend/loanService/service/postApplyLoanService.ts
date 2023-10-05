import { gateway } from '../../../../gateway';
import { LoanServiceRequest } from '../LoanServiceRequest';

export const postApplyLoanService = async (req: LoanServiceRequest) => {
  const { data, success }: { data: LoanServiceResponse; success: boolean } = await gateway(
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
};

export type LoanServiceResponse = {
  //
};
