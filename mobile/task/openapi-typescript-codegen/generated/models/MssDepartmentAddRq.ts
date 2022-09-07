/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type MssDepartmentAddRq = {
    /**
     * 负责人id
     */
    managerUserId?: number;
    /**
     * 部门名称
     */
    name?: string;
    /**
     * 上级部门id
     */
    pid?: number;
    /**
     * 备注
     */
    remark?: string;
};
