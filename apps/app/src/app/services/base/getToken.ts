import queryString from "query-string";
import {alertModal} from "./alertModal";

export const getToken = (): string => {
  const parsedQueryString = queryString.parse(window.location.search);
  const TOKEN = parsedQueryString["token"]
    ? (parsedQueryString["token"] as string)
    : "";
  if (!TOKEN) {
    // console.log("error");
    alertModal("TOKEN is missing")
  }
  return TOKEN;
};
