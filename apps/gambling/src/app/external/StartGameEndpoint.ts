import {EndpointBuilder} from "@reduxjs/toolkit/src/query/endpointDefinitions";
import {ExternelEndpoint} from "./types";

type StartGameRequest = {
  clientType: string;
  exitStatus: number;
  gameId: number;
} & {
    gameBrand: string;
}

type StartGameResponse = {
  // "accountId"?: null;
  "code": number;
  // "error"?: null,
  "htmlContent"?: string,
  "link"?: string;
  "html"?: any;
  "startType": "HTML" | "LINK";
  // "status"?: string;
};

export const StartGameEndpoint = (builder: ExternelEndpoint) => builder.mutation<StartGameResponse, StartGameRequest>({
  query: (requestData: StartGameRequest) => {
    const { gameBrand, ...data } = requestData
    return {
    method: 'post',
    url: `/exapi/external-game/game/${gameBrand}/startGame`,
    data: data,
   }
  },
})
