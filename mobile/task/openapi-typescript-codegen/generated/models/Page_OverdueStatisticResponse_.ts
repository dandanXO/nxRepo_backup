/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OverdueStatisticResponse } from "./OverdueStatisticResponse";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_OverdueStatisticResponse_ = {
    content?: Array<OverdueStatisticResponse>;
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: Pageable;
    size?: number;
    sort?: Sort;
    totalElements?: number;
    totalPages?: number;
};
