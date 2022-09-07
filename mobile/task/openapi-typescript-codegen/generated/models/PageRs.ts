/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PageRs = {
    /**
     * 返回码
     */
    code?: number;
    data?: any;
    /**
     * 返回结果描述
     */
    message?: string;
    /**
     * 页码
     */
    pageNum: number;
    /**
     * 一页条数
     */
    pageSize: number;
    /**
     * 总条数
     */
    total: number;
};
