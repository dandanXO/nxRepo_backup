import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetCollectOverDueCollectRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string;
}

export interface GetCollectOverDueCollectRecordResponse extends GetPageableResponse {
    records: CollectOverDueCollectRecordItem[];
}

export interface CollectOverDueCollectRecordItem {}
