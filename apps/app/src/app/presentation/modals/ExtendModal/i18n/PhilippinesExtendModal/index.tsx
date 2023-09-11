import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { GetLoanDetailResponse } from '../../../../../api/loanService/GetLoanDetailResponse';
import { tcx } from '../../../../../modules/tailwindcss';
import Divider from '../../../../components/Divider';
import ListItem from '../../../../components/ListItem';
import Modal from '../../../../components/Modal';
import Money from '../../../../components/Money.tsx';
import Select from '../../../../components/Select';
import { Button } from '../../../../components/layouts/Button';
import { i18nExtendModal } from '../../translations';

type paymentMethodValueType = {
  value: string;
  label: string;
};

interface IPhilippinesExtendModalProps {
  currentData?: GetLoanDetailResponse;
  repayTypesList: paymentMethodValueType[];
  repayType: paymentMethodValueType;
  setRepayType: React.Dispatch<React.SetStateAction<paymentMethodValueType>>;
  isPostExtendCreateLoading?: boolean;
  handleConfirm: () => void;
}

const formatDate = (dateString: string) =>
  moment(dateString).format('MM-DD-YYYY');

const PhilippinesExtendModal = ({
  currentData,
  repayTypesList,
  repayType,
  setRepayType,
  isPostExtendCreateLoading,
  handleConfirm,
}: IPhilippinesExtendModalProps) => {
  const { t } = useTranslation(i18nExtendModal.namespace);
  const navigate = useNavigate();

  const {
    repayConfirmDetail,
    orderNo = '',
    productName = '',
    dueDate = '',
    overdueDays = '',
    penaltyInterest = '',
  } = currentData ?? {};

  const { extendDate, extensionPayAmount = '' } = repayConfirmDetail ?? {};

  const SelfListItem = ({
    titleKey,
    text,
    textColor = '',
    titleColor = '',
    translate = true,
    className,
  }: {
    titleKey: string;
    text?: string | React.ReactElement | number;
    textColor?: string;
    titleColor?: string;
    translate?: boolean;
    className?: string;
  }) => (
    <ListItem
      className={tcx('text-sm font-medium', className)}
      title={translate ? t(titleKey) : titleKey}
      text={text}
      textColor={textColor ? textColor : 'text-ctext-primary'}
      titleColor={titleColor ? titleColor : 'text-ctext-secondary'}
    />
  );

  console.log('RRRR');
  console.log(repayType);

  return (
    <Modal>
      <div className="p-6 pb-0">
        <div className="text-ctext-primary font-bold">{t('Extend')}</div>
        <div className="my-5">
          <SelfListItem titleKey="Product" text={productName} />
          <SelfListItem titleKey="orderNumber" text={orderNo} />
          <SelfListItem
            titleKey="Due Date"
            text={dueDate ? formatDate(dueDate) : ''}
          />
          <SelfListItem titleKey="Overdue Days" text={overdueDays ?? '0'} />
          <SelfListItem
            titleKey="Overdue Fee"
            text={<Money money={penaltyInterest} />}
            textColor={penaltyInterest ? 'text-cstate-error-main' : ''}
          />
          <SelfListItem
            titleKey="Extension Due Date"
            text={extendDate ? formatDate(extendDate) : ''}
            textColor="text-primary-main"
          />
        </div>
        <Divider />
        <div className="py-3">
          <SelfListItem
            className="font-bold"
            titleKey="extensionFee"
            text={<Money money={extensionPayAmount} />}
            titleColor="text-ctext-primary"
          />
        </div>
      </div>
      <div className="bg-ctext-divider -mx-[1.5px] my-5 h-2"></div>
      <div className="text-ctext-primary p-6 pt-0 text-left">
        <div className="t mb-1 text-xs font-medium">{t('Payment Method')}</div>
        <Select
          className="bg-cTextFields-background-main rounded-md text-sm focus:outline-0"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'transparent',
              border: 0,
              boxShadow: 'none',
              padding: '6px 8px',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              boxShadow: 'none',
              margin: 0,
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: 'none',
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: window.theme?.input?.placeholder,
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: window.theme?.text?.primary,
            }),
            option: (baseStyles, { isSelected }) => ({
              ...baseStyles,
              backgroundColor: isSelected ? '#F5F5F5' : '',
              color: 'black',
              ':hover': {
                backgroundColor: window.theme?.textFiled?.background?.main,
              },
            }),
            menuList: (baseStyles) => ({
              ...baseStyles,
              margin: 0,
              padding: 0,
            }),
          }}
          placeholder="Select"
          options={repayTypesList || []}
          value={repayType}
          onChange={(item) => setRepayType(item as paymentMethodValueType)}
        />
        <div className="mt-5 flex gap-2">
          <Button
            text={t('Cancel')}
            outlineTheme="round"
            type="ghost"
            ghostTheme="disable"
            onClick={() => navigate(-2)}
          />
          <Button
            text={t('Confirm')}
            outlineTheme="round"
            onClick={handleConfirm}
            disable={isPostExtendCreateLoading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PhilippinesExtendModal;
