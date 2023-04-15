import queryString from "query-string";

export const getOrderNo = (): string => {
  const parsedQueryString = queryString.parse(window.location.search);
  const orderNo = parsedQueryString["orderNo"] ? (parsedQueryString["orderNo"] as string) : "";
  return orderNo;
};
