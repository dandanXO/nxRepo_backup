import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetCollectOverDueContactListQueryString extends GetDataPageRequestQuerystring {
    userId: string;
}

export interface GetCollectOverDueContactListResponse extends GetPageableResponse {
    records: CollectOverDueContactListItem[];
}

export interface CollectOverDueContactListItem {}
