
export type GetConfigListResponse = ConfigResponse[];

export interface ConfigResponse {
    configs: ConfigList[];
    group?: string;
}
export interface ConfigList {
    channelId?: number;
    group?: string;
    inputType?: string;
    key?: string;
    max?: number;
    min?: number;
    name?: string;
    options: options[];
    pattern?: string;
    remark?: string;
    scale?: number;
    value?: string;
}

export interface options {
    label?: string;
    value?: string;
}

