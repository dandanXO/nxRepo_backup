import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown';
import { IoIosArrowUp } from '@react-icons/all-files/io/IoIosArrowUp';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { GetLoanDetailResponse } from '../../../../../../api/loanService/GetLoanDetailResponse';
import { GetLoanDetailChargeFeeDetailItems } from '../../../../../../api/rtk/old/getLoanDetail';
import { Status } from '../../../../../../modules/statusEnum';
import { tcx } from '../../../../../../modules/tailwindcss';
import { RootState } from '../../../../../../reduxStore';
import Divider from '../../../../../components/Divider';
import ListItem from '../../../../../components/ListItem';
import Money from '../../../../../components/Money.tsx';
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
  const [detailExpanded, setDetailExpaned] = useState(true);

  const { t } = useTranslation(i18nLoanDetailsPage.namespace);
  const modalState = useSelector((state: RootState) => state.model);

  const finalItems = useDynamicChargeFeeList(
    currentData?.chargeFeeDetail?.items
  );

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

  const formatDate = (dateString: string) =>
    moment(dateString).format('MM-DD-YYYY');

  const expandable = !['EXTEND', 'PAY_OFF'].includes(status);

  return (
    <>
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
      </div>
      <div className="text-ctext-primary px-5">
        <div className="border-ctext-divider border-t border-b">
          {expandable && (
            <div
              className={tcx('flex items-center justify-between pt-3', [
                'pb-3',
                !detailExpanded,
              ])}
              onClick={() => setDetailExpaned(!detailExpanded)}
            >
              <div className="font-medium">{t('Payment Details')}</div>
              {detailExpanded ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
            </div>
          )}
          {(detailExpanded || !expandable) && (
            <div
              className={tcx('mb-2 mt-2 text-sm', [
                'bg-cbg-primary p-3',
                expandable,
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
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PhilippinesRepaymentDetailPage;
