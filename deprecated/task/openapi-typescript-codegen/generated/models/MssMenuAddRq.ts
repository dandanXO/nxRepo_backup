/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MssMenuAddRq = {
    /**
     * 路由
     */
    actionUrl?: string;
    /**
     * 图标
     */
    iconCss?: string;
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
