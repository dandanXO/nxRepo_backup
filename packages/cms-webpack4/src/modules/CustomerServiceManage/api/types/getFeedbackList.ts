import { GetPageableResponse } from '../../../shared/api/commonReponse';
import { GetDataPageRequestQuerystring } from '../../../shared/api/commonRequest';

export interface GetFeedbackListQueryString extends GetDataPageRequestQuerystring {
    appName?: string;
    category?: number;
    createTimeBegin?: string;
    createTimeEnd?: string;
    name?: string;
    phoneNo?: string;
}

export interface FeedbackListItem {
    appName?: string; // APP名称
    category?: string; // 问题分类
    createTime?: string; // 创建时间
    feedback?: string; // 用户反馈内容
    name?: string; // 姓名
    phoneNo?: string; // 手机号
}

export interface GetFeedbackListResponse extends GetPageableResponse {
    records: FeedbackListItem[];
}
