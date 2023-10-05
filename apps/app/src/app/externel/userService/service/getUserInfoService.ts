import { gateway } from '../../gateway/gateway';
import { GetUserInfoServiceRequest } from '../GetUserInfoServiceRequest';
import { GetUserInfoServiceResponse } from '../GetUserInfoServiceResponse';

export const getUserInfoService = async (params: GetUserInfoServiceRequest) => {
  const { data }: { data: GetUserInfoServiceResponse } = await gateway('/api', '/v2/login/info', 'get', null, {});
  return data;
};
