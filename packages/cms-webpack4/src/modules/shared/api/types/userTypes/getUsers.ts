import * as buffer from 'buffer';

export type GetUsersQueryParameters = {
    collectManage?: boolean; // 取得催收相關人員
    telManage?: boolean; // 取得電銷相關人員
};

export type GetUsersRequestBody = {
    collectGroupId?: number; // 催收組別
    departmentId?: number; // 部門id
    enabled?: string; // 是否啟用
    googleAuthFlag?: string; // 是否启用google auth
    merchantId?: number; // 戶ID
    pageEnable?: boolean; // 啟用分頁
    pageNum?: number; // 页码
    pageSize?: number; // record/page
    phoneNo?: string; // 手机号
    roleId?: number; // 角色id
    telGroupId?: number; // 电销組別
    telTeamId?: number; // 电销团队
    trueName?: string; // 真是姓名
    userName?: string; // 账号
};

export type GetUsesResponse = {
    code: number; // 返回码
    message: string;
    data: UsersItem[];
    pageNum: number;
    pageSize: string;
    total: number;
};

export type UsersItem = {
    addTime?: number;
    collectGroupId?: number;
    collectGroupName?: string;
    collectTeamId?: number;
    collectTeamName?: string;
    departmentId?: number;
    departmentStr?: string;
    deptManager?: boolean;
    enabled?: number;
    googleAuthFlag?: number;
    id?: number;
    isOnline?: number;
    lastIp?: string;
    lastLogin?: number;
    loginCount?: number;
    merchantId?: number;
    merchantName?: string;
    password?: string;
    passwordLogin?: number;
    phoneNo?: string;
    regionId?: number;
    roleId?: number;
    roleStr?: string;
    salt?: string;
    skinName?: string;
    stationId?: number;
    trueName?: string;
    userName?: string;
};
