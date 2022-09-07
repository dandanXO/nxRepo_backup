/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Serializable } from "./Serializable";

export type Page_Map_string_Serializable_ = {
    currentPage?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
    nextPage?: number;
    pageSize?: number;
    previousPage?: number;
    records?: Array<Record<string, Serializable>>;
    start?: number;
    totalPage?: number;
    totalRecords?: number;
};
