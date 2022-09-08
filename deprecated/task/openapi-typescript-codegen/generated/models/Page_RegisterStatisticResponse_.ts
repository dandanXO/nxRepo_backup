/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pageable } from "./Pageable";
import type { RegisterStatisticResponse } from "./RegisterStatisticResponse";
import type { Sort } from "./Sort";

export type Page_RegisterStatisticResponse_ = {
    content?: Array<RegisterStatisticResponse>;
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
