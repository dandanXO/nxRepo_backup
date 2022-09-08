/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pageable } from "./Pageable";
import type { RefusedReasonResponse } from "./RefusedReasonResponse";
import type { Sort } from "./Sort";

export type Page_RefusedReasonResponse_ = {
    content?: Array<RefusedReasonResponse>;
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
