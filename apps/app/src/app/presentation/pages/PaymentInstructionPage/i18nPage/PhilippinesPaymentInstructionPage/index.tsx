import React from 'react';
import Barcode from 'react-barcode';
import { useTranslation } from 'react-i18next';

import { PostRepayCreateResponse } from '../../../../../api/loanService/PostRepayCreateResponse';
import { tcx } from '../../../../../modules/tailwindcss';
import { CopyButton } from '../../../../components/Buttons';
import Divider from '../../../../components/Divider';
import Money from '../../../../components/Money.tsx';
import { i18nPaymentInstructionPage } from '../../translations';

const Logo = (path: string) => {
  let logo = '';

  try {
    logo = require(`./logo/${path}`);
  } catch (error) {
    //
  }

  return logo;
};

const Item = ({
  title,
  content,
  className,
  extra,
}: {
  title: string;
  content: string | number | React.ReactNode;
  className?: string;
  extra?: React.ReactNode;
}) => (
  <div className={tcx('mb-2 flex flex-row items-center gap-3', className)}>
    <div>
      <div className="text-ctext-secondary">{title}</div>
      <div className="text-xl font-bold">{content}</div>
    </div>
    {extra}
  </div>
);

const PhilippinesPaymentInstructionPage = ({
  payload,
}: PostRepayCreateResponse) => {
  const { t } = useTranslation(i18nPaymentInstructionPage.namespace);

  return (
    <div className="py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 font-bold">
          <div className="text-ctext-primary">{t('repayAt')}</div>
          <div className="text-primary-main">7-11</div>
        </div>
        <img
          className="h-8 object-fill"
          alt="logo"
          src={Logo('payment_logo_7eleven.png')}
        />
      </div>
      <Divider />
      <Item
        title={t('Total payment')}
        content={<Money money={payload?.orderAmount || 0} />}
      />
      <Item title={t('receiver')} content="711" />
      <Item
        className="mb-1"
        title={t('referenceNumber')}
        content="ABCE12345678"
        extra={
          <div className="h-4/5 w-1/4">
            <CopyButton
              className="w-full rounded-full bg-[#E85D75] py-2 px-4 active:border active:border-[#E85D75] active:bg-white active:text-[#E85D75]"
              value="ABCE12345678"
              text="Copy"
            />
          </div>
        }
      />

      <div className="text-ctext-tertiary text-xs leading-[14px]">
        <div>This reference number expires in 24</div>
        <div>Expires: Friday mm-dd-yyyy at hh:00 PM</div>
      </div>
      <div className="mt-5 flex justify-center">
        <Barcode value="2023-7461-5898" height={70} />
      </div>
    </div>
  );
};

export default PhilippinesPaymentInstructionPage;
