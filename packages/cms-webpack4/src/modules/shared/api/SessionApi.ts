import { API } from './index';
import { LoginRequest, LoginResponse } from './postLogin';

const SessionApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: POST /hs/admin/auth/login
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials: LoginRequest) => ({
                url: '/auth/login',
                method: 'POST',
                data: {
                    phoneNo: credentials.phoneNo,
                    code: credentials.code,
                },
            }),
        }),
    }),
});
export const { useLoginMutation } = SessionApi;
