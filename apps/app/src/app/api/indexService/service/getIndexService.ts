import { runAxios } from '../../base/runAxios';
import { GetIndexRequest } from '../GetIndexRequest';
import { GetIndexResponse } from '../GetIndexResponse';

export const getIndexService = async (
  params: GetIndexRequest
): Promise<GetIndexResponse> => {
  const { data }: { data: GetIndexResponse } = await runAxios(
    '/api',
    '/v3/index',
    'get',
    null,
    params
  );
  return data;
};
