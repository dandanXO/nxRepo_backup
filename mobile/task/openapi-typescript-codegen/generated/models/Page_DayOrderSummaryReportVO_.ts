/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DayOrderSummaryReportVO } from "./DayOrderSummaryReportVO";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_DayOrderSummaryReportVO_ = {
    content?: Array<DayOrderSummaryReportVO>;
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
