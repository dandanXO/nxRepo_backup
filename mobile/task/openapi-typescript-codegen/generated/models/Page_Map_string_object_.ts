/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_Map_string_object_ = {
    content?: Array<Record<string, any>>;
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
