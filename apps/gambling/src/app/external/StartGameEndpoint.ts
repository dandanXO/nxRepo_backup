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
  "link": string;
  "html"?: any;
  "code": number;
}

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
