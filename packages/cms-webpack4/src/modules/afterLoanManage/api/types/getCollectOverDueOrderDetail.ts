import { TPayOutMethod, TPayOutStatus } from '../../../shared/constants/useEnum';

export type GetCollectOverDueOrderDetailQueryString = {
    collectId?: string;
};

export type GetCollectOverDueOrderDetailResponse = {
    expireTime: string;
    amountDue: number;
    loanCertificate: {
        // 放款憑證
        account: string; // 收款帐户
        amount: number; // 放款金额
        createTime: string; // 放款启动时间
        finishTime: string; // 放款确认时间
        name: string; // 收款人姓名
        orderNo: string; // 订单编号
        payoutMethod: TPayOutMethod; // 收款方式
        status: TPayOutStatus; // 状态
    };
};
