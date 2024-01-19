import { MdExpandLess } from '@react-icons/all-files/md/MdExpandLess';
import { MdExpandMore } from '@react-icons/all-files/md/MdExpandMore';
import cx from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AmountPaidIcon } from '@frontend/mobile/shared/ui';

import { getToken } from '../../../../../../application/getToken';
import { GetLoanDetailResponse } from '../../../../../../externel/backend/loanService/GetLoanDetailResponse';
import { GetLoanDetailChargeFeeDetailItems } from '../../../../../../externel/backend/rtk/old/getLoanDetail';
import { getOrderNo } from '../../../../../../externel/window/querystring/getOrderNo';
import { formatDate } from '../../../../../../modules/format/formatDate';
import { RootState } from '../../../../../../reduxStore';
import {
  modalInitialState,
  modalSlice,
} from '../../../../../../reduxStore/modalSlice';
import Money from '../../../../../components/Money';
import { Button } from '../../../../../core-components/Button';
import Divider from '../../../../../core-components/Divider';
import ListItem from '../../../../../core-components/ListItem';
import { PageContent } from '../../../../../core-components/PageContent';
import PaymentProgressingModal from '../../../../../modals/PaymentProgressingModal';
import ReservationProductsModal from '../../../../../modals/ReservationProductsModal';
import ReservationSuccessModal from '../../../../../modals/ReservationSuccessModal';
import { Status } from '../../../../../statusEnum';
import { useDynamicChargeFeeList } from '../../../hooks/useDynamicChargeFeeList';
import { i18nLoanDetailsPage } from '../../../translations';
import VipIcon from '../../component/VipIcon';
import { repaymentDetailPageInitialState, repaymentDetailPageSlice } from 'apps/app/src/app/reduxStore/repaymentDetailPageSlice';
import IndiaReservationProductsModal from '../../../../../modals/ReservationProductsModal/i18n/IndiaReservationProductsModal';

type IRepaymentDetailPage = {
  currentData?: GetLoanDetailResponse;
  isFetching?: boolean;
};
const IndiaRepaymentDetailPage = (props: IRepaymentDetailPage) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);
  const { app } = useSelector((state: RootState) => state);
  const { currentData, isFetching = true } = props || {};
  const {
    status = '',
    productName = '',
    orderNo = '',
    dueDate = '',
    overdueDays = '',
    paidAmount = '',
    repayRecords = [],
    totalRepayAmount = '',
    chargeFeeDetail,
    extendDate = '',
    extensionFee = '',
    totalDueAmount = '',
    extendable,
    reductionAmount = 0,
    penaltyInterest = 0,
    loanAmount = 0,
    dailyFee = 0,
    balance = 0,
    coupon = 0,
    applyDate = '',
  } = currentData ?? {};

  const repaymentDate =
    repayRecords.length > 0
      ? repayRecords[repayRecords.length - 1].repayDate
      : '';

  const finalItems = useDynamicChargeFeeList(
    props.currentData?.chargeFeeDetail?.items || undefined
  );
  const { t } = useTranslation(i18nLoanDetailsPage.namespace);

  const [expand, setExpand] = useState(false);
  const renderStatusTag = (status: string) => {
    return (
      <div className={`${Status(status)?.color} ${Status(status)?.bg} px-1`}>
        {t(Status(status)?.text)}
      </div>
    );
  };

  useEffect(() => {
    dispatch(
      modalSlice.actions.updateReservationProductsModal({
        ...modalInitialState.reservationProductsModal,
      })
    );
  }, []);

  const listTitleStyle = 'text-ctext-primary text-sm';
  const listTextStyle = 'text-ctext-primary text-sm';
  return (
    <PageContent className={'w-full pb-0'}>
      <IndiaReservationProductsModal />
      {modalState.paymentProgressingModal.show && <PaymentProgressingModal />}
      {modalState.reservationProductsModal.show && <IndiaReservationProductsModal />}
      {modalState.reservationSuccessModal.show && <ReservationSuccessModal />}
      {/*{currentData && currentData?.status === "UNPAID" || currentData?.status === 'OVERDUE' && (*/}
      {/*  <div className={`bg-cstate-info-variant text-cstate-info-main py-2 text-center text-sm`}>*/}
      {/*    Get more amount after instant payment*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className={`flex grow flex-col `}>
        <div className={'grow'}>
          <ListItem
            title={t('Product')}
            text={productName ?? ''}
            titleColor={listTitleStyle}
            textColor={listTextStyle}
            isFetching={isFetching}
          />
          <ListItem
            title={t('Order No.')}
            text={orderNo ?? ''}
            titleColor={listTitleStyle}
            textColor={listTextStyle}
            isFetching={isFetching}
          />
          <ListItem
            title={t('Status')}
            text={status ? renderStatusTag(status) : ''}
            titleColor={listTitleStyle}
            textColor={listTextStyle}
            isFetching={isFetching}
          />
          <ListItem
            title={t('Apply Date')}
            text={applyDate ? formatDate(moment(applyDate)) : ''}
            titleColor={listTitleStyle}
            textColor={listTextStyle}
            isFetching={isFetching}
          />
          <ListItem
            title={t('Due Date')}
            text={dueDate ? formatDate(moment(dueDate)) : ''}
            titleColor={listTitleStyle}
            textColor={listTextStyle}
            isFetching={isFetching}
          />

          {status === 'PAY_OFF' && (
            <ListItem
              title={t('Repayment Date')}
              text={repaymentDate ? formatDate(moment(repaymentDate)) : ''}
              titleColor={listTitleStyle}
              textColor={listTextStyle}
              isFetching={isFetching}
            />
          )}

          {status === 'EXTEND' && (
            <ListItem
              title={t('Extension Date')}
              text={extendDate ? formatDate(moment(extendDate)) : ''}
              titleColor={listTitleStyle}
              textColor={listTextStyle}
              isFetching={isFetching}
            />
          )}

          <Divider />

          <div onClick={() => setExpand(!expand)}>
            <ListItem
              title={'Payment Details'}
              text={
                expand ? (
                  <MdExpandLess
                    size={30}
                    className={'fill-cstate-disable-main'}
                  />
                ) : (
                  <MdExpandMore
                    size={30}
                    className={'fill-cstate-disable-main'}
                  />
                )
              }
              titleColor={listTitleStyle}
              textColor={listTextStyle}
            />
          </div>

          {/*NOTICE: 合同金*/}
          {/*<ListItem title={'Loan Amount'} text={<Money money={orderAmount}/>} titleColor="text-black-400" />*/}

          {expand && (
            <div className="-mt-2 bg-[#F8f8f8] p-3 pb-1">
              {status !== 'EXTEND' && (
                <ListItem
                  title={t('Disbursal Amount')}
                  text={<Money money={loanAmount} />}
                  titleColor={listTitleStyle}
                  textColor={listTextStyle}
                  isFetching={isFetching}
                />
              )}

              {status !== 'EXTEND' &&
                finalItems?.map(
                  (item: GetLoanDetailChargeFeeDetailItems, index: number) => {
                    if (!item) return null;
                    return (
                      <ListItem
                        key={index}
                        title={item.itemName}
                        text={<Money money={item.value} />}
                        titleColor={listTitleStyle}
                        textColor={listTextStyle}
                        isFetching={isFetching}
                      />
                    );
                  }
                )}
              {status !== 'EXTEND' && (
                <ListItem
                  title={t('Daily Fee')}
                  text={
                    <div className="flex">
                      <Money money={dailyFee} />
                    </div>
                  }
                  titleColor={listTitleStyle}
                  textColor={listTextStyle}
                  isFetching={isFetching}
                />
              )}

              {status === 'EXTEND' && (
                <ListItem
                  title={t('Extension Fee')}
                  text={<Money money={extensionFee} />}
                  titleColor={listTitleStyle}
                  textColor={listTextStyle}
                  isFetching={isFetching}
                />
              )}
              <ListItem
                title={t('Overdue Days')}
                text={overdueDays ? overdueDays : '0'}
                titleColor={listTitleStyle}
                textColor={`text-sm ${
                  status === 'OVERDUE'
                    ? Status(status).color
                    : 'text-ctext-primary'
                }`}
                isFetching={isFetching}
              />
              <ListItem
                title={'Overdue Fee'}
                text={<Money money={penaltyInterest} />}
                titleColor="text-ctext-primary"
                textColor={status === 'OVERDUE' ? Status(status).color : ''}
                isFetching={isFetching}
              />

              <Divider />

              {status !== 'EXTEND' && (
                <ListItem
                  title={t('coupon')}
                  text={<Money money={coupon} isNagetive={true} />}
                  titleColor={listTitleStyle}
                  textColor={listTextStyle}
                  isFetching={isFetching}
                />
              )}

              <ListItem
                title={t('Reduction Amount')}
                text={<Money money={reductionAmount} isNagetive={true} />}
                titleColor={listTitleStyle}
                textColor={listTextStyle}
                isFetching={isFetching}
              />

              <ListItem
                title={
                  <div className={`item-center flex flex-row items-center`}>
                    <div className={` mr-1`}>{t('Amount Repaid')}</div>
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
                      <img src={AmountPaidIcon} alt={''} />
                    </div>
                  </div>
                }
                text={<Money money={paidAmount} isNagetive={true} />}
                titleColor={listTitleStyle}
                textColor={listTextStyle}
                isFetching={isFetching}
              />
            </div>
          )}

          <Divider />

          {/*NOTE: 總應還金額*/}
          {status !== 'EXTEND' && (
            <ListItem
              title={t('Repayment Amount')}
              text={<Money money={balance} />}
              titleColor={`text-sm ${
                status === 'OVERDUE'
                  ? Status(status).color
                  : 'text-ctext-primary'
              }`}
              textColor={`text-sm ${
                status === 'OVERDUE'
                  ? Status(status).color
                  : 'text-ctext-primary'
              }`}
              className="font-bold"
              isFetching={isFetching}
            />
          )}

          {/*NOTE: 總展期金額 (Extension Fee + Overdue Fee) 欄位後端有提供 狀態為EXTEND -> totalRepayAmount */}
          {status === 'EXTEND' && (
            <ListItem
              title={t('Total Extension Fee')}
              text={<Money money={totalRepayAmount} />}
              className="font-bold"
              titleColor={listTitleStyle}
              textColor={listTextStyle}
              isFetching={isFetching}
            />
          )}

          {currentData &&
            currentData?.status !== 'PAY_OFF' &&
            currentData?.status !== 'EXTEND' && (
              <div
                className={`bg-primary-assistant text-primary-main my-4 flex py-2 px-4 text-left text-sm leading-none`}
              >
                <div className="flex w-[80px] items-center">
                  <img className={''} src={VipIcon()} alt="" />
                </div>
                <div className="ml-2">
                  <span className="font-bold"> VIP Benefits!</span> You'll enjoy
                  <span className="font-bold"> higher loan limits</span> and
                  <span className="font-bold"> lower interest rates</span>
                  with responsible repayments!
                </div>
              </div>
            )}

          <div className={`my-3 flex flex-row text-white`}>
            {extendable !== undefined && extendable && (
              <div
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
                className={`mr-1.5 grow`}
              >
                <Button type={'secondary'} text={t('Extend')} />
              </div>
            )}

            {status !== 'PAY_OFF' && status !== 'EXTEND' && (
              <div
                onClick={() => {
                  if (currentData === undefined) return;
                  dispatch(repaymentDetailPageSlice.actions.updateRepaymentData({
                    ...repaymentDetailPageInitialState.repaymentData,
                  }));
                  navigate(`repayment-modal?token=${getToken()}&orderNo=${ orderNo ?? getOrderNo()}`,
                    {
                      state: currentData,
                    }
                  );
                }}
                className={cx(`grow`, {
                  'ml-1.5': extendable,
                })}
              >
                <Button text={'Repay'} />
              </div>
            )}
          </div>

          {(status === 'UNPAID' || status === 'OVERDUE') && (
            <div className={`text-ctext-secondary text-xs`}>
              <div>{t('Attention')}：</div>
              <ul className="list-outside list-decimal pl-3 pt-1  leading-none">
                <li>{t('Before repayment, please make sure that you have enough balance on your bank account.')}</li>
                <li>
                  {t('Overdue for more than')}{' '}
                  <span className={`text-cstate-info-main`}>{t('7 days')}{' '}</span>
                  {t('will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.')}
                </li>
                {app?.init?.csEmail?.trim() && (
                  <li>
                    {t('Email us if you have any questions about your responsibilities or for more information.')}{' '}
                    <span className={`text-cstate-info-main`}>
                      {app?.init?.csEmail}
                    </span>
                  </li>
                )}
                <li className="font-bold">
                  {t('After completing your repayment, if your loan is not fully settled within 10 minutes, please upload the UTR and a screenshot for our manual review.')}
                </li>
              </ul>
            </div>
          )}
        </div>

        {(status === 'UNPAID' || status === 'OVERDUE') && (
          <div className={`bg-primary-assistant -mx-4 mt-6 flex flex-col py-4 px-5`}>
            {/*<div className="bg-cstate-disable-assistant mx-[-24px] h-2.5 "></div>*/}
            <div className={`text-ctext-primary mb-3 text-xs leading-none`}>
              {t('After completing the repayment, take a screenshot and upload your repayment receipt here ▼')}
            </div>
            {/*TODO: 先兼容 querystring*/}
            <div
              className={`my-2 grow`}
              onClick={() => {
                navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`,
                  { state: { orderNo } }
                );
              }}
            >
              <Button
                type={'ghost'}
                className={`w-full bg-[#fff]`}
                text={t('Upload Receipt')}
              />
            </div>
          </div>
        )}
      </div>
    </PageContent>
  );
};

export default IndiaRepaymentDetailPage;
