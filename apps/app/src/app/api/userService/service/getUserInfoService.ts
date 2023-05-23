import { runAxios } from '../../base/runAxios';
import { GetUserInfoServiceRequest } from '../GetUserInfoServiceRequest';
import { GetUserInfoServiceResponse } from '../GetUserInfoServiceResponse';

export const getUserInfoService = async (params: GetUserInfoServiceRequest) => {
  const { data }: { data: GetUserInfoServiceResponse } = await runAxios('/api', '/v2/login/info', 'get', null, {});
  return data;
};
