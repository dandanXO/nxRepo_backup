import { createAsyncThunk } from '@reduxjs/toolkit';


import { runAxios } from '../../base/runAxios';
import { Service } from '../../index';
import { GetQuotaModelStatusRequest } from '../GetQuotaModelStatusRequest';
import { GetQuotaModelStatusResponse } from '../GetQuotaModelStatusResponse';

export const getQuotaModelStatusService = async (request: GetQuotaModelStatusRequest) => {
  const { data }: { data: GetQuotaModelStatusResponse } = await runAxios(
    '/api',
    '/v3/loan/quota-model-status',
    'get',
    request
  );
  return data;
};

// NOTE: 無使用
export const getQuotaModelStatusActions = createAsyncThunk<GetQuotaModelStatusRequest>(
  '/api/v3/loan/quota-model-status',
  async (thunkAPI) => {
    const response: GetQuotaModelStatusResponse | null = await Service.LoanService.getQuotaModelStatus({});
    return response;
  }
);
