import cx from 'classnames';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router';

import { AmountPaidIcon } from '@frontend/mobile/shared/ui';

import { getOrderNo } from '../../../../../../modules/querystring/getOrderNo';
import { getToken } from '../../../../../../modules/querystring/getToken';
import { Status } from '../../../../../../modules/statusEnum';
import Divider from '../../../../../components/Divider';
import ListItem from '../../../../../components/ListItem';
import Money from '../../../../../components/Money.tsx';
import { Button } from '../../../../../components/layouts/Button';
import { GetLoanDetailResponse } from '../../../../../../api/loanService/GetLoanDetailResponse';
import {useEffect, useMemo} from "react";
import {useDynamicChargeFeeList} from "../../../hooks/useDynamicChargeFeeList";
import {GetLoanDetailChargeFeeDetailItems} from "../../../../../../api/rtk/old/getLoanDetail";
import {formatDate} from "../../../../../../modules/format/formatDate";
import defaultVipIcon from '../../../../../components/images/VipIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import PaymentProgressingModal from '../../../../../modals/PaymentProgressingModal';
import { RootState } from '../../../../../../reduxStore';
import ReservationProductsModal from '../../../../../modals/ReservationProductsModal';
import ReservationSuccessModal from '../../../../../modals/ReservationSuccessModal';
import { modalInitialState, modalSlice } from '../../../../../../reduxStore/modalSlice';
import { useTranslation } from 'react-i18next';
import { i18nLoanDetailsPage } from '../../../translations';
import { NativeAppInfo } from 'apps/app/src/app/persistant/nativeAppInfo';

type IRepaymentDetailPage = {
  currentData?: GetLoanDetailResponse;
  isFetching?: boolean;
}
const MexicoRepaymentDetailPage = (props: IRepaymentDetailPage) => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

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
    loanAmount  = 0,
    dailyFee = 0,
    balance = 0,
    applyDate = '',
  } = currentData ?? {};

  const VipIcon = require(`../../../../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_vip_card.png`);

  const repaymentDate = repayRecords.length > 0 ? repayRecords[repayRecords.length - 1].repayDate : '';

  const finalItems = useDynamicChargeFeeList(props.currentData?.chargeFeeDetail?.items || undefined);
  const { t } = useTranslation(i18nLoanDetailsPage.namespace);
  const renderStatusTag = (status: string) => {
    return <div className={`${Status(status)?.color} ${Status(status)?.bg} px-2 py-1  rounded-lg`}>{t(Status(status)?.text)}</div>;
  };

    useEffect(() => {
        dispatch(modalSlice.actions.updateReservationProductsModal({
            ...modalInitialState.reservationProductsModal
        }))
    }, [])
  return (
    <div>
      {modalState.paymentProgressingModal.show && <PaymentProgressingModal />}
      {modalState.reservationProductsModal.show && <ReservationProductsModal />}
      {modalState.reservationSuccessModal.show && <ReservationSuccessModal />}

      <div className={`px-6`}>
        <ListItem
          title={t('Product')}
          text={productName ?? ''}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Order No.')}
          text={orderNo ?? ''}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Status')}
          text={status ? renderStatusTag(status) : ''}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Apply Date')}
          text={applyDate ? formatDate(moment(applyDate)) : ''}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />
        <ListItem
          title={t('Due Date')}
          text={dueDate ? formatDate(moment(dueDate)): ''}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />

        {status === 'PAY_OFF' && (
          <ListItem
            title={t('Repayment Date')}
            text={repaymentDate ? formatDate(moment(repaymentDate)) : ''}
            titleColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        {status === 'EXTEND' && (
          <ListItem
            title={t('Extension Date')}
            text={extendDate ? formatDate(moment(extendDate)) : ''}
            titleColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        <Divider />

        {status !== 'EXTEND' && (
          <ListItem
            title={t('Disbursal Amount')}
            text={<Money money={loanAmount} />}
            titleColor="text-ctext-primary"
            isFetching={isFetching}
          />
        )}

        {status !== 'EXTEND' &&
          finalItems?.map((item: GetLoanDetailChargeFeeDetailItems, index: number) => {
            if (!item) return null;
            return (
              <ListItem
                key={index}
                title={item.itemName}
                text={<Money money={item.value} />}
                titleColor="text-ctext-primary"
                isFetching={isFetching}
              />
            );
          })}

        {status === 'EXTEND' && (
          <ListItem title={t('Extension Fee')} text={<Money money={extensionFee} />} titleColor="text-ctext-primary" isFetching={isFetching}/>
        )}
        <ListItem
          title={t('Overdue Days')}
          text={overdueDays ? overdueDays : "0"}
          titleColor="text-ctext-primary"
          textColor={status === 'OVERDUE' ? Status(status).color : ''}
          isFetching={isFetching}
        />
        <ListItem
          title={t('Overdue Fee')}
          text={<Money money={penaltyInterest} />}
          titleColor="text-ctext-primary"
          textColor={status === 'OVERDUE' ? Status(status).color : ''}
          isFetching={isFetching}
        />

        <Divider />

        <ListItem
          title={t('Reduction Amount')}
          text={<Money money={reductionAmount} isNagetive={true} />}
          titleColor="text-ctext-primary"
          isFetching={isFetching}
        />

        <ListItem
          titleColor="text-ctext-primary"
          title={
            <div className={`item-center flex flex-row items-center`}>
              <div className={` mr-1`}>{t('Amount Repaid')}</div>
              <div
                onClick={() => {
                  navigate(`amount-repaid-record-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                    state: { repayRecords },
                  });
                }}
              >
                <img src={AmountPaidIcon} />
              </div>
            </div>
          }
          text={<Money money={paidAmount} isNagetive={true} />}
          isFetching={isFetching}
        />

        <Divider />

        {/*NOTE: 總應還金額*/}
        {status !== 'EXTEND' && (
          <ListItem
            title={t('Repayment Amount')}
            text={<Money money={balance} />}
            titleColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            textColor={status === 'OVERDUE' ? Status(status).color : 'text-ctext-primary'}
            className="font-bold"
            isFetching={isFetching}
          />
        )}

        {/*NOTE: 總展期金額 (Extension Fee + Overdue Fee) 欄位後端有提供 狀態為EXTEND -> totalRepayAmount */}
        {status === 'EXTEND' && (
          <ListItem
            title={t('Total Extension Fee')}
            text={<Money money={totalRepayAmount} />}
            titleColor="text-ctext-primary"
            textColor="text-ctext-primary"
            className="font-bold"
            isFetching={isFetching}
          />
        )}

        {currentData && currentData?.status !== 'PAY_OFF' && currentData?.status !== 'EXTEND' && (
            <div className={`bg-primary-assistant text-primary-main py-2 px-4 text-left text-sm leading-none flex my-4`}>
                <div className='w-1/3 flex items-center'><img src={VipIcon || defaultVipIcon} alt="" /></div>
                <div className='ml-2'>
                    <span className='font-bold'> {t('VIP Benefits!')}</span> {t("You'll enjoy")}
                    <span className='font-bold'> {t('higher loan limits')}</span> {t('and')}
                    <span className='font-bold'> {t('lower interest rates')}</span>
                    {t('with responsible repayments!')}
                </div>

            </div>
        )}

        <div className={`my-3 flex flex-row text-white`}>
          {extendable !== undefined && extendable && (
            <div
              onClick={() => {
                navigate(`extend-confirm-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                  state: currentData,
                });
              }}
              className={`mr-1.5 grow`}
            >
              <Button outlineTheme={'round'} type={'secondary'} text={t('Extend')} />
            </div>
          )}

          {status !== 'PAY_OFF' && status !== 'EXTEND' && (
            <div
              onClick={() => {
                if (currentData === undefined) return;
                navigate(`repayment-modal?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                  state: currentData,
                });
              }}
              className={cx(`grow`, {
                'ml-1.5': extendable,
              })}
            >
              <Button outlineTheme={'round'} text={t('Repay')} />
            </div>
          )}
        </div>

        {(status === 'UNPAID' || status === 'OVERDUE') && (
          <>
            <div className={`text-ctext-secondary text-xs`}>
              <div>{t('Attention')}：</div>
              <ul className="list-outside list-decimal pl-3 pt-1">
                <li>{t('Before repayment, please make sure that you have enough balance on your bank account.')}</li>
                <li>{t('Overdue for more than')} <span className={`text-primary-main`}>{t('N days')}</span>
                  {t("will not be able to extend or re-loan，please ensure you make repayments on time to maintain uninterrupted access to our services.")}
                </li>
                <li>{t('Email us if you have any questions about your responsibilities or for more information.')}{' '}
                  <span className={`text-primary-main`}>mail@mail.com</span>
                </li>
              </ul>
            </div>
            <div className={`my-3 flex flex-col`}>
              <div className="bg-cstate-disable-assistant mx-[-24px] h-2.5 "></div>
              <div className={`text-ctext-primary my-3 text-xs leading-none text-center`}>
                {t('After completing the repayment, take a screenshot and upload your repayment receipt here ▼')}
              </div>
              {/*TODO: 先兼容 querystring*/}
              <div
                className={`mb-2 grow`}
                onClick={() => {
                  navigate(`/v2/upload-payment-receipt?token=${getToken()}&orderNo=${orderNo ?? getOrderNo()}`, {
                    state: { orderNo },
                  });
                }}
              >
                <Button type={'ghost'} outlineTheme={'round'} className={`w-full`} text={t('Upload Receipt')} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MexicoRepaymentDetailPage;
