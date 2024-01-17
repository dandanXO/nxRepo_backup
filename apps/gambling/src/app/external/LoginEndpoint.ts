import {ExternelEndpoint} from "./types";
import { CommonLoginRequestData, PostRegisterResponse } from "./UserEndpoint";

export type PostLoginRequest = CommonLoginRequestData;
export type PostLoginResponse = PostRegisterResponse;

export const LoginEndpoint = (builder: ExternelEndpoint) => builder.mutation<PostLoginResponse, PostLoginRequest>({
  query: (requestData: PostLoginRequest) => ({
    method: 'post',
    url: `/prod-api/player/sign-in`,
    data: requestData,
  }),
});
