export interface GetDataCommonResponse {
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: pageableResonese;
    size?: number;
    sort?: sortResponse[];
    totalElements?: number;
    totalPages?: number;
}

export interface pageableResonese {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    paged?: boolean;
    sort?: sortResponse[];
    unpaged?: boolean;
}

export interface sortResponse {
    empty?: boolean;
    sorted?: boolean;
    unsorted?: boolean;
}

export interface GetPageableResponse {
    currentPage?: number;
    pageSize?: number;
    totalPage?: number;
    totalRecords?: number;
}