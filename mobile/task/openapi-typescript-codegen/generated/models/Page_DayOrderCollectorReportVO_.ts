/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DayOrderCollectorReportVO } from "./DayOrderCollectorReportVO";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_DayOrderCollectorReportVO_ = {
    content?: Array<DayOrderCollectorReportVO>;
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
