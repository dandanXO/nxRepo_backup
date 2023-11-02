import { ExternelEndpoint } from "./types";
type GetRequest = {
    id: number
}
export type GetGameListResponseData = {
    "Fishing": GameData;
    "label": any;
    "slots": GameData;
    "type": TypeData;
    "viver": GameData;
    "vivo": GameData;
    [key: string]: any;
}

export type GameData = {
    [key: string]: {
        gameId: number;
        name: string;
        level: string;
        label: string;
        type: string;
        order: number;
    }[];
};

type TypeData = {
    [key: string]: string[]
}

type Label = "slots" | "vivo" | "viver" | "Fishing";

type GetResponse = {
    "code": number;
    "msg": string;
    "data": GetGameListResponseData;
  }
  
  // 获取充值需要的配置项
  export const GetGameListEndpoint = (builder: ExternelEndpoint) => builder.query<GetResponse, GetRequest>({
    query: (requestData: GetRequest) => ({
      method: 'get',
      url: `/japi/user/game/getGameList`,
      params: requestData,
    }),
  });