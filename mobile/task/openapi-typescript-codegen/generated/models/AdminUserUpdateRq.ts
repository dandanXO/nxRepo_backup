/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AdminUserUpdateRq = {
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
     * 是否启用GoogleAuth
     */
    googleAuthFlag?: number;
    /**
     * 用户ID
     */
    id?: number;
    /**
     * 密碼
     */
    password?: string;
    /**
     * 是否启用密碼
     */
    passwordLogin?: number;
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
