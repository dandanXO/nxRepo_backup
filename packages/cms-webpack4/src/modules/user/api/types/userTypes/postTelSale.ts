export interface PostTelSaleRequestQuerystring {
    // 註冊時間結束
    addEndTime?: string;

    // 註冊時間開始
    addStartTime?: string;

    // 注册时的app名称
    appName?: string;

    // 渠道名稱
    channelId?: string;

    // 姓名
    nameTrue?: string;

    // 結清未複借
    noLoanAgain?: boolean;

    // 結清未複借終止天數
    noLoanAgainEndDays?: number;

    // 結清未複借起始天數
    noLoanAgainStartDays?: number;

    // 手機號
    phoneNo?: string;

    // 用户风控等级
    riskRank?: '' | 'REJECT' | 'ORDINARY' | 'NORMAL' | 'GOOD' | 'EXCELLENT';

    // 狀態
    status?: number | string;
}
