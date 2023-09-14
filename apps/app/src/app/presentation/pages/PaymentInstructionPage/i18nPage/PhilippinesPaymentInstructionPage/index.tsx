import React from 'react';
import { useTranslation } from 'react-i18next';

import { PostRepayCreateResponse } from '../../../../../api/loanService/PostRepayCreateResponse';
import { tcx } from '../../../../../modules/tailwindcss';
import Divider from '../../../../components/Divider';
import Money from '../../../../components/Money.tsx';
import { i18nPaymentInstructionPage } from '../../translations';

const Item = ({
  title,
  content,
  className,
}: {
  title: string;
  content: string | number | React.ReactNode;
  className?: string;
}) => (
  <div className={tcx('mb-2', className)}>
    <div className="text-ctext-secondary">{title}</div>
    <div className="text-xl font-bold">{content}</div>
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
      </div>
      <Divider />
      <Item
        title={t('Total payment')}
        content={<Money money={payload?.orderAmount || 0} />}
      />
      <Item title={t('receiver')} content="711" />
      <Item title={t('referenceNumber')} content="ABCE12345678" />

      <div className="text-ctext-tertiary text-center text-xs">
        This reference number expires in 24
      </div>
    </div>
  );
};

export default PhilippinesPaymentInstructionPage;
