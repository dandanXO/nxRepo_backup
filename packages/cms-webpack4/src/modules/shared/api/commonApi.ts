import { API } from './index';
import { GetAdminSwitchResponse } from './types/getAdminSwitch';

const CommonApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getAdminSwitch: builder.query<GetAdminSwitchResponse, null>({
            query: () => ({
                url: '/commons/admin-switch',
                method: 'get',
            }),
        }),
    }),
});

export const { useGetAdminSwitchQuery } = CommonApi;
