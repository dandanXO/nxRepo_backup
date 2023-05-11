import queryString from 'query-string';

export const getToken = (): string => {
  const parsedQueryString = queryString.parse(window.location.search);
  const TOKEN = parsedQueryString['token']
    ? (parsedQueryString['token'] as string)
    : '';
  if (!TOKEN) {
    // alertModal("TOKEN is missing")
    console.log('[app] TOKEN is missing');
  }
  return TOKEN;
};
