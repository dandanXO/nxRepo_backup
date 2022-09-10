import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import queryString from 'query-string';

const useLocationOrderQueryString = () => {
  const location = useLocation();
  const pageQueryString = useMemo(() => {
    const parsedQueryString: {
      token?: string;
      orderNo?: string;
      cardholderName?: string;
    } = queryString.parse(location.search);
    return {
      token: parsedQueryString.token,
      orderNo: parsedQueryString.orderNo,
      cardholderName: parsedQueryString.cardholderName,
    };
  }, [location]);
  return pageQueryString;
};

export default useLocationOrderQueryString;
