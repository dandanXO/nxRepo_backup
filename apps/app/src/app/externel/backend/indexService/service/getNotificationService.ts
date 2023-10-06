import {gateway} from '../../../../gateway';
import {GetNotificationResponse} from '../GetNotificationResponse';

export const getNotificationService = async (params: null): Promise<GetNotificationResponse> => {
  const { data }: { data: GetNotificationResponse } = await gateway('/api', '/v3/notification', 'get', null, params);
  return data;
};
