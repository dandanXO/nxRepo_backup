/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OverdueStatistic2Response } from "./OverdueStatistic2Response";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_OverdueStatistic2Response_ = {
    content?: Array<OverdueStatistic2Response>;
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
