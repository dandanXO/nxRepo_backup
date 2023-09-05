import React from 'react';

import { useGetPHBindCardDropListQuery } from '../../../../../api/rtk';
import AddEWalletForm from './AddEWalletForm';

const PhilippinesBindBankAccountPage = () => {
  const { currentData } = useGetPHBindCardDropListQuery(null);

  const walletVendorOption = currentData?.availableWalletVendors.reduce(
    (acc, current) => {
      acc.push({
        value: current.code,
        label: current.displayName,
      });
      return acc;
    },
    [] as { value: string; label: string }[]
  );

  return (
    <div className="flex h-full grow flex-col  px-1 pt-3">
      <div className="bg-cstate-info-assistant text-cstate-info-main rounded py-2 px-3 text-xs leading-[14px]">
        <span className="font-bold underline ">
          Once added, it cannot be edited anymore.
        </span>
        <span>
          {
            ' Please ensure that the account belongs to you, and that all information is correct and accurate.'
          }
        </span>
      </div>
      <AddEWalletForm walletVendorOption={walletVendorOption || []} />
    </div>
  );
};

export default PhilippinesBindBankAccountPage;
