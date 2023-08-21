import { API } from './index';
import { GetUsersQueryParameters, GetUsersRequestBody, GetUsesResponse } from './types/userTypes/getUsers';
import { UpdateUserRequestBody } from './types/userTypes/updateUser';

const UserApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // [POST] 取得使用者清單
        getUsers: builder.query<GetUsesResponse, { parameters: GetUsersQueryParameters; body: GetUsersRequestBody }>({
            query: ({ parameters, body }) => ({
                url: '/user/list',
                method: 'post',
                data: body,
                params: parameters,
            }),
        }),
        // [POST] 修改用户
        updateUser: builder.mutation<null, UpdateUserRequestBody>({
            query: (body: UpdateUserRequestBody) => ({
                url: '/user/update',
                method: 'post',
                data: body,
            }),
        }),
    }),
});

export const { useLazyGetUsersQuery, useUpdateUserMutation } = UserApi;
