import {EndpointBuilder} from "@reduxjs/toolkit/src/query/endpointDefinitions";
import {BaseQueryFn} from "@reduxjs/toolkit/src/query/baseQueryTypes";

export type ExternelEndpoint = EndpointBuilder<BaseQueryFn, string, string>
