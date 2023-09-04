import React from 'react';

import { useGetPHBindCardDropListQuery } from '../../../../../api/rtk';
import AddEWalletForm from "./AddEWalletForm";

const PhilippinesBindBankAccountPage = () => {
  const { currentData } = useGetPHBindCardDropListQuery(null);

  return (
    <div className="px5 pt-2.5">
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
      <AddEWalletForm walletVendors={currentData?.availableWalletVendors || []} />
    </div>
  );
};

export default PhilippinesBindBankAccountPage;
