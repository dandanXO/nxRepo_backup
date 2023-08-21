import { API } from './index';
import { GetUsersQueryParameters, GetUsersRequestBody, GetUsesResponse } from './types/userTypes/getUsers';

const UserApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [GET] 取得使用者清單
        getUsers: builder.query<GetUsesResponse, { parameters: GetUsersQueryParameters; body: GetUsersRequestBody }>({
            query: ({ parameters, body }) => ({
                url: '/user/list',
                method: 'post',
                data: body,
                params: parameters,
            }),
        }),
    }),
});

export const { useLazyGetUsersQuery } = UserApi;
