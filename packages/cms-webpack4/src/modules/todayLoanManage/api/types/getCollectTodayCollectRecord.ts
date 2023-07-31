import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetCollectTodayCollectRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string;
}

export interface GetCollectTodayCollectRecordResponse extends GetPageableResponse {
    records: CollectTodayCollectRecordItem[];
}

export interface CollectTodayCollectRecordItem {}
