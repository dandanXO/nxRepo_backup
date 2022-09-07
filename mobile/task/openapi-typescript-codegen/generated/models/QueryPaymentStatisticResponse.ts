/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentStatisticData } from "./PaymentStatisticData";

export type QueryPaymentStatisticResponse = {
    /**
     * 統計資料
     */
    paymentStatisticList?: Array<PaymentStatisticData>;
};
