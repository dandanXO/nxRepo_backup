/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MssMenuUpdateRq = {
    /**
     * 路由
     */
    actionUrl?: string;
    /**
     * 是否启用
     */
    enabled?: number;
    /**
     * 图标
     */
    iconCss?: string;
    /**
     * id
     */
    id?: number;
    /**
     * 描述
     */
    menuDesc?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 上级id
     */
    parentId?: number;
    /**
     * 排序
     */
    sortOrder?: number;
};
