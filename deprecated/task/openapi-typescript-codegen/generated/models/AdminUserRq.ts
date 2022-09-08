/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdminUserRq = {
    begin?: number;
    /**
     * 催收組別
     */
    collectGroupId?: number;
    /**
     * 催收团队
     */
    collectTeamId?: number;
    /**
     * 部门id
     */
    departmentId?: number;
    /**
     * 是否启用
     */
    enabled?: number;
    /**
     * 是否启用google auth
     */
    googleAuthFlag?: number;
    pageEnable?: boolean;
    /**
     * 页码
     */
    pageNum?: number;
    /**
     * 一页条数
     */
    pageSize?: number;
    /**
     * 手机号
     */
    phoneNo?: string;
    /**
     * 角色id
     */
    roleId?: number;
    /**
     * 真是姓名
     */
    trueName?: string;
    /**
     * 账号
     */
    userName?: string;
};
