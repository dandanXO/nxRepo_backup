import { ExternelEndpoint } from "./types";

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
    url: `/japi/invite/api/finger/download`,
    params: query,
  }),
});