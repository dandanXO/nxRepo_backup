/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";
import type { Statistics2Response } from "./Statistics2Response";

export type Page_Statistics2Response_ = {
    content?: Array<Statistics2Response>;
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
