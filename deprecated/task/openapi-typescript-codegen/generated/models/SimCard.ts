/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SimCardsItem } from "./SimCardsItem";

export type SimCard = {
    cardSlotCount?: number;
    gsmCid?: string;
    gsmLac?: string;
    isExists?: boolean;
    phoneNumber?: string;
    simCards?: Array<SimCardsItem>;
    simOperator?: string;
    simOperatorName?: string;
};
