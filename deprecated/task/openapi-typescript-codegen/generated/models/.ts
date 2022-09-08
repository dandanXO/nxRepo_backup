/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type  = {
    /**
     * 跨区域请求
     */
    crossRegionIp?: boolean;
    /**
     * 開關: 相片品質決策  default: IQC
     */
    imageQualityStrategy?: 'IQC/IQA';
    /**
     * KYC廠商
     */
    kycProvider?: string;
    /**
     * 借款总览
     */
    loanSummary?: ;
    /**
     * 跑馬燈文字
     */
    marquee?: string;
    /**
     * 開關: 老客客強下
     */
    oldUserForceApply?: boolean;
    /**
     * 產品推薦列表
     */
    products?: Array<>;
    /**
     * 放款额度(FOR 單包測試帳號)
     */
    quotaInfo?: ;
};

export namespace  {

    /**
     * 開關: 相片品質決策  default: IQC
     */
    export enum imageQualityStrategy {
        IQC_IQA = 'IQC/IQA',
    }


}

