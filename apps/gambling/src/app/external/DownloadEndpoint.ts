import { ExternelEndpoint } from "./types";
import { DOWN_LOAD_URL } from "./ApiUrl";

export type DownloadResponse = {
  "code": number;
  "msg": string;
  "data": {
    "type": number,
    "url": string;
  };
  "total": number;
}

type DownloadRequest = {
  "packageName": string;
}

export const DownloadEndpoint = (builder: ExternelEndpoint) => builder.query<DownloadResponse, DownloadRequest>({
  query: (query: DownloadRequest) => ({
    method: 'get',
    url: DOWN_LOAD_URL,
    params: query,
  }),
});
