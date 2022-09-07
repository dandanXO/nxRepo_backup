/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pageable } from "./Pageable";
import type { RiskControlModelResponse } from "./RiskControlModelResponse";
import type { Sort } from "./Sort";

export type Page_RiskControlModelResponse_ = {
    content?: Array<RiskControlModelResponse>;
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
