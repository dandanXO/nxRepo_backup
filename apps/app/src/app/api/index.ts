import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./base/axiosBaseQuery";
import { AvailableQuotaBar } from "./models/AvailableQuotaBar";
import { PayableRecords } from "./models/PayableRecords";
import { PlatformChargeFeeRateDetail } from "./models/PlatformChargeFeeRateDetail";
import { PlatformProduct } from "./models/PlatformProduct";


type GetIndexRequest = {
  dummy: number;
}

type GetIndexResponse = {
  availableAmount: number;
  // 可用额度

  chargeFeeDetails: PlatformChargeFeeRateDetail[]
    // 平台费率项目占比(砍头金各项名目占比)

  customerServiceUrl:	string;
  // 線上客服連結

  marquee:	string;
  // 跑馬燈文字

  offerExpireTime:	string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 额度有效期限

  payableRecords: PayableRecords[];
  popupUrl:	string;
  // 公告彈窗H5

  products:	PlatformProduct[];
  // 平台產品

  quotaBar: AvailableQuotaBar;
  refreshable:	boolean;
  // 可否刷新額度: 用戶有可能風控拒絕多次 不給重新刷新

  refreshableUntil:	string;
  // example: yyyy-MM-dd'T'HH:mm:ss
  // 額度下次可刷新時間

  totalAmount: number;
  // 用户借款总额度

  usedAmount: number;
  // 已使用额度
}


export const API = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery({
        baseUrl: "/api/v2",
    }),
    // keepUnusedDataFor: 600,
    // keepUnusedDataFor: 1,
    // refetchOnMountOrArgChange: 60,
    endpoints: (builder) => ({
        // NOTE: 借款首頁
        getIndex: builder.query<GetIndexResponse, GetIndexRequest>({
            query: (query: GetIndexRequest) => ({
                method: "getiyihkln.  ",
                url: `/index`,
                params: query,
            }),
        }),
        // NOTE: 取得還款證明
        // post: builder.mutation<PostResponse, PostRequest>({
        //     query: (requestBody: FormData) => ({
        //         method: "post",
        //         url: `/repay/receipt`,
        //         data: requestBody,
        //     }),
        // }),
    }),
});

export const {
    useLazyGetIndexQuery,
} = API;
