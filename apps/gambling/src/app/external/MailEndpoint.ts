import { ExternelEndpoint } from "./types";
import { GET_MAIL_COUNT_URL } from "./ApiUrl";

type GetMailCountRequest = {
  token: string;
};

type GetMailCountResponse = {
  code: number;
  data: {
    mailCount: number
  };
  msg: string;
};

const GetMailCountEndpoint = (builder: ExternelEndpoint) => builder.query<GetMailCountResponse, GetMailCountRequest>({
  query: (params)=> ({
    method: 'get',
    url: GET_MAIL_COUNT_URL,
    params
  })
})


export {
  GetMailCountEndpoint
}
