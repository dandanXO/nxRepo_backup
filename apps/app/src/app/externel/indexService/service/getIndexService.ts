import { gateway } from '../../gateway/gateway';
import { GetIndexRequest } from '../GetIndexRequest';
import { GetIndexResponse } from '../GetIndexResponse';

export const getIndexService = async (params: GetIndexRequest): Promise<GetIndexResponse> => {
  const { data }: { data: GetIndexResponse } = await gateway('/api', '/v3/index', 'get', null, params);
  return data;
};
