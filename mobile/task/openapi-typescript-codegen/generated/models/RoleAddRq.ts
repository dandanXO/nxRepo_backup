/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RoleAddRq = {
    /**
     * 可分配角色id:1,2,3,4
     */
    assignRoles?: string;
    /**
     * 角色描述
     */
    desc?: string;
    /**
     * 菜单id:1,2,3,4
     */
    menuIds?: string;
    /**
     * 角色名称
     */
    name?: string;
};
