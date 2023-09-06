import { IoMdRadioButtonOn } from '@react-icons/all-files/io/IoMdRadioButtonOn';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { environment } from '../../../../../../environments/environmentModule/environment';
import { RootState } from '../../../../../reduxStore';
import { RadioOption } from '../../../../components/RadioOption';
import { i18nRepaymentModal } from '../translations';

interface IPhilippinesRepaymentModalProps {
  radioValue: string;
  setRadioValue: React.Dispatch<React.SetStateAction<string>>;
  balanceValue: {
    data: string;
    errorMessage: string;
  };
  setBalanceValue: React.Dispatch<
    React.SetStateAction<{
      data: string;
      errorMessage: string;
    }>
  >;
  handleConfirm: () => void;
}

const PhilippinesRepaymentModal = ({
  radioValue,
  balanceValue,
  setRadioValue,
  setBalanceValue,
  handleConfirm,
}: IPhilippinesRepaymentModalProps) => {
  const { t } = useTranslation(i18nRepaymentModal.namespace);
  const repaymentData = useSelector(
    (state: RootState) => state.repaymentDetailPage.repaymentData
  );
  const { balance } = repaymentData;
  const payOptions = [
    { value: 'balance', label: t('Repay Full Amount') },
    { value: 'custom', label: t('Partial Repayment') },
  ];
  const handleRadioChange = (e: any) => {
    if (e === 'balance') {
      setBalanceValue({
        ...balanceValue,
        data: `${environment.currency} ${balance}`,
      });
    }
    setRadioValue(e);
  };

  return (
    <div className="px-4 text-left">
      <div className="mt-1 text-sm">
        <RadioOption
          options={payOptions}
          onChange={handleRadioChange}
          radioOnTheme="fill-cstate-info-main"
          radioOffTheme="fill-cstate-disable-main"
          onRadio={<IoMdRadioButtonOn />}
        />
      </div>
    </div>
  );
};

export default PhilippinesRepaymentModal;
