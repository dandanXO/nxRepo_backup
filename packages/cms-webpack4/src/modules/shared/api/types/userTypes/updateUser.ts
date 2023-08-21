export type UpdateUserRequestBody = {
    id: number;
    collectGroupId?: number;
    collectTeamId?: number;
    departmentId?: number;
    deptManager?: boolean;
    enabled?: number;
    googleAuthFlag?: number;
    merchantId?: number;
    password?: string;
    passwordLogin?: number;
    phoneNo?: string;
    roleId?: number;
    trueName?: string;
    userName?: string;
};
