/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HsUserResponse } from "./HsUserResponse";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_HsUserResponse_ = {
    content?: Array<HsUserResponse>;
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
