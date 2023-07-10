import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetCollectTodaySMSLogsQueryString extends GetDataPageRequestQuerystring {
    userId: string;
}

export interface GetCollectTodaySMSLogsResponse extends GetPageableResponse {
    records: CollectTodaySMSLogsItem[];
}

export interface CollectTodaySMSLogsItem {}
