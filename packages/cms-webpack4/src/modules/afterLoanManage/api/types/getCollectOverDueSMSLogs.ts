import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetCollectOverDueSMSLogsQueryString extends GetDataPageRequestQuerystring {
    userId: string;
}

export interface GetCollectOverDueSMSLogsResponse extends GetPageableResponse {
    records: CollectOverDueSMSLogsItem[];
}

export interface CollectOverDueSMSLogsItem {}
