import { API } from "../../shared/api";
import { GetLoginAccountListRequestQuery, GetLoginAccountListResponse } from "./types/LoginAccountManageTypes/getLoginAccountList";
import { PostLogoutRequestBody } from "./types/LoginAccountManageTypes/postLogout";

const LoginAccountManageApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/user/account/manage 登入帳號管理
        getLoginAccountList: builder.query<GetLoginAccountListResponse, GetLoginAccountListRequestQuery>({
            query: (requestBody: GetLoginAccountListRequestQuery) => ({
                url: `/user/account/manage`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/user/account/logout 登出帳號
        postLogout: builder.mutation<null, PostLogoutRequestBody>({
            query: (requestBody: null) => ({
                url: `/user/account/logout`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
});
export const {
    useLazyGetLoginAccountListQuery,
    usePostLogoutMutation
} = LoginAccountManageApi;
