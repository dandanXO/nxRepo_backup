import moment from 'moment/moment';
import React from 'react';
import Barcode from 'react-barcode';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../../../application/getToken';
import { PostRepayCreateResponse } from '../../../../../externel/backend/loanService/PostRepayCreateResponse';
import { tcx } from '../../../../../modules/ui/tailwindcss';
import { PageOrModalPathEnum } from '../../../../PageOrModalPathEnum';
import Money from '../../../../components/Money';
import Divider from '../../../../core-components/Divider';
import { PageContent } from '../../../../core-components/PageContent';
import { RepaymentDetailPageUseCaseActions } from '../../../RepaymentDetailPage/userUsecaseSaga';
import CopyButton from '../../components/CopyButton';
import { i18nPaymentInstructionPage } from '../../translations';
import { PayPlatformDocument } from './PayPlatformDocument';
import getPlatformValue from './getPlatformValue';

const Logo = (path: string) => {
  let logo = '';

  try {
    logo = require(`./logo/${path}.png`);
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
  <div className={tcx('mb-2 flex flex-row items-center gap-4', className)}>
    <div className={tcx(['w-3/4 break-all', !!extra])}>
      <div className="text-ctext-secondary">{title}</div>
      <div className="text-xl font-bold">{content}</div>
    </div>
    {extra}
  </div>
);

const PhilippinesPaymentCheckoutPage = ({
  payload,
  orderNo,
  repayAmount,
  payTypeName,
  payPlatName,
  upstreamChannel,
}: PostRepayCreateResponse) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { t } = useTranslation(i18nPaymentInstructionPage.namespace);

  const { referenceNo, qrCode, barcode } = payload;

  const expireDate = moment().add(1, 'days');

  const payPlatformDocument = new PayPlatformDocument(upstreamChannel || '');
  const { getPayMethodDocument } = payPlatformDocument;

  return (
    <PageContent className="grow p-0">
      <div className="grow overflow-auto py-3 px-6">
        <div className="flex items-center justify-between ">
          <div className="flex gap-2 font-bold">
            <div className="text-ctext-primary">{t('repayAt')}</div>
            <div className="text-primary-main">{payTypeName}</div>
          </div>
          <img
            className="my-2 h-8 object-fill"
            alt="logo"
            src={Logo(
              `payment_logo_${getPayMethodDocument(payTypeName, 'logo')}`
            )}
          />
        </div>

        <Divider />

        <Item
          title={t('Total payment')}
          content={<Money money={repayAmount || 0} />}
        />

        {!getPayMethodDocument(payTypeName, 'isOnline') && (
          <Item
            title={
              (getPayMethodDocument(payTypeName, 'receiverTitle') as string) ||
              'Name of Receiver'
            }
            content={
              getPayMethodDocument(payTypeName, 'receiverContent') as string
            }
          />
        )}

        {barcode && !getPayMethodDocument(payTypeName, 'isOnline') ? null : (
          <Item
            className="mb-1"
            title={
              (getPayMethodDocument(
                payTypeName,
                'referenceNumberTitle'
              ) as string) || 'Reference Number'
            }
            content={referenceNo}
            extra={
              getPlatformValue(payTypeName, 'isOnline') ? (
                <div className="h-4/5 w-1/4">
                  <CopyButton
                    className="w-full rounded-full bg-[#E85D75] py-2 px-4 active:border active:border-[#E85D75] active:bg-white active:text-[#E85D75]"
                    value={referenceNo || ''}
                    text="Copy"
                  />
                </div>
              ) : null
            }
          />
        )}

        {qrCode && (
          <div className="my-5 flex justify-center">
            <QRCode className="h-[200px] w-[200px]" value={qrCode} />
          </div>
        )}

        {barcode && (
          <div className="mt-2 flex justify-center">
            <Barcode value={barcode} height={70} />
          </div>
        )}

        <div
          className={tcx('text-ctext-tertiary my-2 text-xs leading-[14px]', [
            'my-4 text-center',
            barcode,
          ])}
        >
          <div>This reference number expires in 24 hours</div>
          <div>
            Expires: {expireDate.format('ddd MM-DD-yyyy ')}at
            {expireDate.format(' HH:mm a')}
          </div>
        </div>

        {!getPlatformValue(payTypeName, 'isOnline') && !barcode && (
          <div className="text-cstate-error-main mt-2 mb-3 text-xs leading-[14px]">
            {t('notice')}
          </div>
        )}

        <Divider />

        {(getPayMethodDocument(payTypeName, 'isOnline') || barcode) && (
          <div className="my-4 text-xs">
            {payTypeName === 'GCash' || payTypeName === 'Paymaya' ? (
              (getPayMethodDocument(payTypeName, 'contents') as any).map(
                (i: any) => {
                  // console.log('PayMaya',i)
                  return (
                    <div className="mb-2">
                      <div className="text-ctext-primary text-xs font-bold">
                        {i.title}
                      </div>
                      {i.content}
                    </div>
                  );
                }
              )
            ) : (
              <div>
                <div className="text-ctext-primary font-bold">Payment tips</div>
                <ul className="text-ctext-secondary mt-2 list-outside list-decimal pl-5">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <li key={index}>{t(`paymentTips${index}`)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {!getPlatformValue(payTypeName, 'isOnline') &&
          !barcode &&
          payTypeName !== '7-ELEVEN' && (
            <div>
              <div className="text-ctext-primary mb-2 text-xs font-bold">
                instructions
              </div>
              <ul className="text-ctext-secondary list-outside list-decimal pl-4 text-xs">
                {[1, 2, 3, 4].map((index) => (
                  <li key={index} className="mb-2">
                    <div className="text-ctext-primary text-sm font-bold leading-[12px]">
                      {
                        getPlatformValue(
                          payTypeName,
                          `instruction${index}Title`
                        ) as any
                      }
                    </div>

                    <div className="mt-[2px] leading-[12px]">
                      {
                        getPlatformValue(
                          payTypeName,
                          `instruction${index}Content`
                        ) as any
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {payTypeName === '7-ELEVEN' && (
          <div>
            <div className="text-ctext-primary mb-2 text-xs font-bold">
              instructions
            </div>
            <ul className="text-ctext-secondary list-outside list-decimal pl-4 text-xs">
              <li className="mb-2">
                Visit any <span className="font-bold">7-11</span> Branch, and
                tell staff that you need to pay{' '}
                <span className="font-bold">“SkyPay Bill”</span>.
              </li>
              <li className="mb-2">
                Go to Machine, select{' '}
                <span className="font-bold">“BILLS PAYMENT”</span>, then{' '}
                <span className="font-bold">“MORE BILLERS”</span>, tap
                <span className="font-bold">“Loans”</span> and select{' '}
                <span className="font-bold">“SKYPAY”</span>.
              </li>
              <li className="mb-2">
                Input <span className="font-bold">Contract Number</span> when
                making your repayment.
              </li>
              <li className="mb-2">Please keep the receipt.</li>
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
                PageOrModalPathEnum.RepaymentDetailPage
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

export default PhilippinesPaymentCheckoutPage;
