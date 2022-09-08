/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelVisitorResponse } from "./ChannelVisitorResponse";
import type { Pageable } from "./Pageable";
import type { Sort } from "./Sort";

export type Page_ChannelVisitorResponse_ = {
    content?: Array<ChannelVisitorResponse>;
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
