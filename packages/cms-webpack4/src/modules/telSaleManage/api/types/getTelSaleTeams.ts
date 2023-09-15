export type GetTelSaleTeamsResponse = TelSaleTeamsItem[];

export type TelSaleTeamsItem = {
    id?: number;
    name?: string;
    enabled?: boolean;
    groups?: TelSaleGroupsItem[];
};

export type TelSaleGroupsItem = {
    id: number;
    name: string;
    telTeamId: number;
};
