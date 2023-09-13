import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AmountPaidIcon } from '@frontend/mobile/shared/ui';

import { GetLoanDetailResponse } from '../../../../../../api/loanService/GetLoanDetailResponse';
import { GetLoanDetailChargeFeeDetailItems } from '../../../../../../api/rtk/old/getLoanDetail';
import { getOrderNo } from '../../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../../modules/querystring/getToken';
import { Status } from '../../../../../../modules/statusEnum';
import { tcx } from '../../../../../../modules/tailwindcss';
import { NativeAppInfo } from '../../../../../../persistant/nativeAppInfo';
import { RootState } from '../../../../../../reduxStore';
import Divider from '../../../../../components/Divider';
import ListItem from '../../../../../components/ListItem';
import Money from '../../../../../components/Money.tsx';
import DefaultVIPIcon from '../../../../../components/images/VipIcon.svg';
import { Button } from '../../../../../components/layouts/Button';
import { PageContent } from '../../../../../components/layouts/PageContent';
import PaymentProgressingModal from '../../../../../modals/PaymentProgressingModal';
import ReservationProductsModal from '../../../../../modals/ReservationProductsModal';
import ReservationSuccessModal from '../../../../../modals/ReservationSuccessModal';
import { useDynamicChargeFeeList } from '../../../hooks/useDynamicChargeFeeList';
import { i18nLoanDetailsPage } from '../../../translations';

interface IPhilippinesRepaymentDetailPage {
  currentData?: GetLoanDetailResponse;
  isFetching?: boolean;
}

const PhilippinesRepaymentDetailPage = ({
  currentData,
  isFetching,
}: IPhilippinesRepaymentDetailPage) => {
  const [detailExpanded, setDetailExpanded] = useState(false);

  const { t } = useTranslation(i18nLoanDetailsPage.namespace);
  const navigate = useNavigate();
  const modalState = useSelector((state: RootState) => state.model);

  const finalItems = useDynamicChargeFeeList(
    currentData?.chargeFeeDetail?.items
  );

  const VIPIcon = require(`../../../../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_vip_card.png`);

  const {
    status = '',
    productName = '',
    orderNo = '',
    dueDate = '',
    overdueDays = '',
    paidAmount = '',
    repayRecords = [],
    totalRepayAmount = '',
    extendDate = '',
    extensionFee = '',
    extendable,
    reductionAmount = 0,
    penaltyInterest = 0,
    loanAmount = 0,
    balance = 0,
    applyDate = '',
  } = currentData || {};
  const repaymentDate =
    repayRecords.length > 0
      ? repayRecords[repayRecords.length - 1].repayDate
      : '';

  const StatusTag = ({ status }: { status: string }) => (
    <div
      className={`${Status(status)?.color} ${
        Status(status)?.bg
      } px-2 py-1  font-medium`}
    >
      {t(Status(status)?.text)}
    </div>
  );

  const SelfListItem = ({
    titleKey,
    text,
    textColor = '',
    translate = true,
  }: {
    titleKey: string;
    text?: string | React.ReactElement | number;
    textColor?: string;
    translate?: boolean;
  }) => (
    <ListItem
      className="text-sm font-medium"
      title={translate ? t(titleKey) : titleKey}
      text={text}
      titleColor="text-ctext-secondary"
      textColor={textColor ? textColor : 'text-ctext-primary'}
      isFetching={isFetching}
    />
  );

  const ShowRecordItem = ({
    show = false,
    titleKey,
    text,
    titleColor = '',
    textColor = '',
  }: {
    show?: boolean;
    titleKey: string;
    titleColor?: string;
    textColor?: string;
    text?: string | React.ReactElement | number;
  }) => (
    <ListItem
      className="mb-0 text-sm font-medium"
      titleColor={titleColor ? titleColor : 'text-ctext-secondary'}
      textColor={textColor ? textColor : 'text-ctext-primary'}
      title={
        !show ? (
          t(titleKey)
        ) : (
          <div className="flex items-center gap-2">
            <div>{t(titleKey)}</div>
            <div
              onClick={() => {
                navigate(
                  `amount-repaid-record-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: { repayRecords },
                  }
                );
              }}
            >
              <img src={AmountPaidIcon} alt="amountPaid" />
            </div>
          </div>
        )
      }
      text={text}
    />
  );

  const formatDate = (dateString: string) =>
    moment(dateString).format('MM-DD-YYYY');

  const notExtendAndPayOff = !['EXTEND', 'PAY_OFF'].includes(status);

  return (
    <PageContent className="p-0">
      {modalState.paymentProgressingModal.show && <PaymentProgressingModal />}
      {modalState.reservationProductsModal.show && <ReservationProductsModal />}
      {modalState.reservationSuccessModal.show && <ReservationSuccessModal />}
      <div className="py-2 px-5">
        <SelfListItem titleKey="Product" text={productName} />
        <SelfListItem titleKey="Order No." text={orderNo} />
        <SelfListItem
          titleKey="Status"
          text={status ? <StatusTag status={status as string} /> : ''}
        />
        <SelfListItem
          titleKey="Apply Date"
          text={applyDate ? formatDate(applyDate) : ''}
        />
        <SelfListItem
          titleKey="Due Date"
          text={applyDate ? formatDate(dueDate) : ''}
        />
        {status === 'PAY_OFF' && (
          <SelfListItem
            titleKey="Repayment Date"
            text={repaymentDate ? formatDate(repaymentDate) : ''}
          />
        )}
        {status === 'EXTEND' && (
          <SelfListItem
            titleKey="Extension Date"
            text={extendDate ? formatDate(extendDate) : ''}
          />
        )}
      </div>
      <div className="text-ctext-primary px-5">
        <div className="border-ctext-divider border-t border-b">
          {notExtendAndPayOff && (
            <div
              className={tcx('flex items-center justify-between pt-3', [
                'pb-3',
                !detailExpanded,
              ])}
              onClick={() => setDetailExpanded(!detailExpanded)}
            >
              <div className="font-medium">{t('Payment Details')}</div>
              {detailExpanded ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </div>
          )}
          {(detailExpanded || !notExtendAndPayOff) && (
            <div
              className={tcx('mb-3 mt-2 text-sm', [
                'bg-cbg-primary p-3 ',
                notExtendAndPayOff,
              ])}
            >
              {status !== 'EXTEND' && (
                <>
                  <SelfListItem
                    titleKey="Disbursal Amount"
                    text={<Money money={loanAmount} />}
                  />
                  {finalItems?.map(
                    (item: GetLoanDetailChargeFeeDetailItems) => {
                      if (!item) return null;
                      return (
                        <SelfListItem
                          key={item.itemName}
                          titleKey={item.itemName}
                          text={<Money money={item.value} />}
                        />
                      );
                    }
                  )}
                </>
              )}
              {status === 'EXTEND' && (
                <SelfListItem
                  titleKey="Extension Fee"
                  text={<Money money={extensionFee} />}
                />
              )}
              <SelfListItem
                titleKey="Overdue Days"
                text={overdueDays ?? '0'}
                textColor={status === 'OVERDUE' ? Status(status).color : ''}
              />
              <SelfListItem
                titleKey="Overdue Fee"
                text={<Money money={penaltyInterest} />}
                textColor={status === 'OVERDUE' ? Status(status).color : ''}
              />

              <Divider />

              <SelfListItem
                titleKey="Reduction Amount"
                text={<Money money={reductionAmount} isNagetive />}
              />
              <ShowRecordItem
                show={!notExtendAndPayOff}
                titleKey="Amount Repaid"
                text={<Money money={paidAmount} isNagetive />}
              />
            </div>
          )}
        </div>
      </div>

      <div className="py-3 px-5">
        {status !== 'EXTEND' && (
          <ShowRecordItem
            show={notExtendAndPayOff}
            titleKey="Repayment Amount"
            text={<Money money={balance} />}
            titleColor={
              status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'
            }
            textColor={
              status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'
            }
          />
        )}
        {status === 'EXTEND' && (
          <ShowRecordItem
            show={false}
            titleKey="Total Extension Fee"
            text={<Money money={totalRepayAmount} />}
            titleColor="text-ctext-primary"
            textColor="text-ctext-primary"
          />
        )}
      </div>

      {notExtendAndPayOff && (
        <>
          <div className="bg-primary-assistant text-primary-main flex items-center gap-2 py-2 px-5 text-left text-sm">
            <div className="w-fit">
              <img alt="vip" src={VIPIcon || DefaultVIPIcon} />
            </div>

            <div>
              <span className="font-bold"> {t('VIP Benefits!')}</span>{' '}
              {t("You'll enjoy")}
              <span className="font-bold"> {t('higher loan limits')}</span>{' '}
              {t('and')}
              <span className="font-bold"> {t('lower interest rates')}</span>
              {t('with responsible repayments!')}
            </div>
          </div>

          <div className="flex gap-2 py-3 px-5">
            {extendable !== undefined && extendable && (
              <Button
                text={t('Extend')}
                outlineTheme="round"
                type="ghost"
                ghostTheme="primary"
                onClick={() => {
                  navigate(
                    `extend-confirm-modal?token=${getToken()}&orderNo=${
                      orderNo ?? getOrderNo()
                    }`,
                    {
                      state: currentData,
                    }
                  );
                }}
              />
            )}
            <Button
              text={t('Repay')}
              outlineTheme="round"
              onClick={() => {
                if (currentData === undefined) return;
                navigate(
                  `repayment-modal?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: currentData,
                  }
                );
              }}
            />
          </div>
          <div className="text-ctext-secondary mb-3 grow px-5 text-xs">
            <div>Attention：</div>
            <ul className="list-outside list-decimal pl-3 pt-1">
              <li>
                Before repayment, please make sure that you have enough balance
                on your bank account.
              </li>
              <li>
                {'Overdue for more than '}
                <span className="text-cstate-info-main">{'N days '}</span>
                will not be able to extend or re-loan，please ensure you make
                repayments on time to maintain uninterrupted access to our
                services.
              </li>
              <li>
                {
                  'Email us if you have any questions about your responsibilities or for more information. '
                }
                <span className="text-cstate-info-main">mail@mail.com</span>
              </li>
              <li>
                <div className="font-bold">
                  After completing your repayment, if your loan is not fully
                  settled within 10 minutes, please upload the screenshot for
                  our manual review.
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-secondary-assistant py-3 px-5">
            <div className="text-ctext-primary text-xs">
              After completing the repayment, take a screenshot and upload your
              repayment receipt here ▼
            </div>
            <Button
              className="mt-3"
              text={t('Upload Receipt')}
              type="ghost"
              ghostTheme="secondary"
              outlineTheme="round"
              onClick={() => {
                navigate(
                  `/v2/upload-payment-receipt?token=${getToken()}&orderNo=${
                    orderNo ?? getOrderNo()
                  }`,
                  {
                    state: { orderNo },
                  }
                );
              }}
            />
          </div>
        </>
      )}
    </PageContent>
  );
};

export default PhilippinesRepaymentDetailPage;
