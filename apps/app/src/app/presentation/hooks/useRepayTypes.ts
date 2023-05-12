import { useCallback, useEffect, useState } from 'react';
import { useLazyGetRepayTypesQuery } from '../../api/rtk';
import { environment } from 'apps/app/src/environments/environment';
import { IndiaCountry } from '../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../libs/shared/domain/src/country/PakistanCountry';


type paymentMethodValueType = {
  value: string;
  label: string;
};

const useRepayTypes = () => {
  const [
    triggerGetList,
    {
      currentData: repayTypesData,
      isLoading,
      isFetching: isRepayTypesFetching,
      isSuccess,
      isError,
      isUninitialized,
    },
  ] = useLazyGetRepayTypesQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  const [repayTypesList, setRepayTypesList] = useState<
    paymentMethodValueType[]
  >([]);
  const [repayType, setRepayType] = useState(repayTypesList[0]);

  useEffect(() => {
    if (repayTypesData !== undefined) {
      const options =
        repayTypesData &&
        repayTypesData?.map((item: any) => {
          return { value: item.payType, label: item.payTypeAlias };
        });
      setRepayTypesList(options);
      const initRepayType = environment.country === IndiaCountry.country ? options[0] : { value: '', label: '' };
      setRepayType(initRepayType);
    }
  }, [isSuccess]);

  return {
    triggerGetList,
    isRepayTypesFetching,
    repayTypesList,
    repayType,
    setRepayType,
  };
};
export default useRepayTypes;
