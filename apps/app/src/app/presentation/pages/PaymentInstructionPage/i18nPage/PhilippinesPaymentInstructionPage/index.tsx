import React from 'react';
import Barcode from 'react-barcode';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { PostRepayCreateResponse } from '../../../../../api/loanService/PostRepayCreateResponse';
import { getToken } from '../../../../../modules/querystring/getToken';
import { tcx } from '../../../../../modules/tailwindcss';
import { CopyButton } from '../../../../components/Buttons';
import Divider from '../../../../components/Divider';
import Money from '../../../../components/Money.tsx';
import { PageContent } from '../../../../components/layouts/PageContent';
import { PagePathEnum } from '../../../PagePathEnum';
import { RepaymentDetailPageUseCaseActions } from '../../../RepaymentDetailPage/userUsecaseSaga';
import { i18nPaymentInstructionPage } from '../../translations';
import { getPlatformValue } from './getPlatformValue';

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
  orderNo,
}: PostRepayCreateResponse) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation(i18nPaymentInstructionPage.namespace);

  const platform = 'PeysoPay';
  const referenceNumberBarcode = '2023-7461-5898';

  return (
    <PageContent className="grow p-0">
      <div className="grow overflow-auto py-3 px-6">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 font-bold">
            <div className="text-ctext-primary">{t('repayAt')}</div>
            <div className="text-primary-main">{platform}</div>
          </div>
          <img
            className="my-2 h-8 object-fill"
            alt="logo"
            src={Logo(`payment_logo_${getPlatformValue(platform, 'logo')}.png`)}
          />
        </div>
        <Divider />
        <Item
          title={t('Total payment')}
          content={<Money money={payload?.orderAmount || 0} />}
        />

        {!getPlatformValue(platform, 'isOnline') && (
          <Item title={t('receiver')} content="711" />
        )}

        {referenceNumberBarcode &&
        !getPlatformValue(platform, 'isOnline') ? null : (
          <Item
            className="mb-1"
            title={t('referenceNumber')}
            content="ABCE12345678"
            extra={
              getPlatformValue(platform, 'isOnline') ? (
                <div className="h-4/5 w-1/4">
                  <CopyButton
                    className="w-full rounded-full bg-[#E85D75] py-2 px-4 active:border active:border-[#E85D75] active:bg-white active:text-[#E85D75]"
                    value="ABCE12345678"
                    text="Copy"
                  />
                </div>
              ) : null
            }
          />
        )}

        {referenceNumberBarcode && (
          <div className="mt-2 flex justify-center">
            <Barcode value={referenceNumberBarcode} height={70} />
          </div>
        )}

        <div
          className={tcx('text-ctext-tertiary text-xs leading-[14px]', [
            'my-4 text-center',
            referenceNumberBarcode,
          ])}
        >
          <div>This reference number expires in 24 hours</div>
          <div>Expires: Friday mm-dd-yyyy at hh:00 PM</div>
        </div>

        {!getPlatformValue(platform, 'isOnline') && !referenceNumberBarcode && (
          <div className="text-cstate-error-main mt-2 mb-3 text-xs leading-[14px]">
            {t('notice')}
          </div>
        )}

        <Divider />

        {(getPlatformValue(platform, 'isOnline') || referenceNumberBarcode) && (
          <div className="my-4 text-xs">
            <div className="text-ctext-primary font-bold">Payment tips</div>
            <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <li key={index}>{t(`paymentTips${index}`)}</li>
              ))}
            </ul>
          </div>
        )}

        {!getPlatformValue(platform, 'isOnline') && !referenceNumberBarcode && (
          <div>
            <div className="text-ctext-primary mb-2 text-xs font-bold">
              instructions
            </div>
            <ul className="text-ctext-secondary list-outside list-decimal pl-4 text-xs">
              {[1, 2, 3, 4].map((index) => (
                <li key={index} className="mb-2">
                  <div className="text-ctext-primary text-sm font-bold leading-[12px]">
                    {getPlatformValue(platform, `instruction${index}Title`)}
                  </div>

                  <div className="mt-[2px] leading-[12px]">
                    {getPlatformValue(platform, `instruction${index}Content`)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="py-3 px-5">
        <button
          className="w-full rounded-full bg-[#E85D75] px-2.5 py-4 text-center text-sm font-bold text-white"
          onClick={() => {
            navigate(
              `${
                PagePathEnum.RepaymentDetailPage
              }?token=${getToken()}&orderNo=${orderNo}`,
              { replace: true }
            );
            dispatch(
              RepaymentDetailPageUseCaseActions.system.showReservation()
            );
          }}
        >
          Payment Completed. Proceed to the next step
        </button>
      </div>
    </PageContent>
  );
};

export default PhilippinesPaymentInstructionPage;
