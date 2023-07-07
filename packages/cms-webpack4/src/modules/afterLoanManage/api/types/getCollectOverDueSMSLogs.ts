import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";


export interface GetCollectOverDueSMSLogsQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetCollectOverDueSMSLogsResponse extends GetPageableResponse {
    records: CollectOverDueSMSLogsItem[];
}

export interface CollectOverDueSMSLogsItem {

}
