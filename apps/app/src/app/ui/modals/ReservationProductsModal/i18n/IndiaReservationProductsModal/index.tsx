import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {formatPrice} from '../../../../../modules/format/formatPrice';
import {RootState} from '../../../../../reduxStore';
import {modalInitialState, modalSlice} from '../../../../../reduxStore/modalSlice';
import {Product} from '../../../../components/Product';
import {Button} from '../../../../core-components/Button';
import Modal from '../../../../core-components/Modal';
import {RepaymentDetailPageUseCaseActions} from '../../../../pages/RepaymentDetailPage/userUsecaseSaga';
import {LoanAgreementModal} from '../../../QRLoanAgreementModal';
import {i18nReservationProductsModal} from '../.././translations';
import {formatDate} from '../../../../../modules/format/formatDate';
import moment from 'moment';
import AdSVG from '../IndiaReservationProductsModal/coupon_demo.svg';
import handAdSVG from '../IndiaReservationProductsModal/ic_hand.svg';
import cx from "classnames";
import {Checkbox} from "../../../../core-components/Checkbox";
import {AiFillCheckSquare} from "@react-icons/all-files/ai/AiFillCheckSquare";


const IndiaReservationProductsModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.model);

  const {t} = useTranslation(i18nReservationProductsModal.namespace);

  const {availableAmount} = modalState.reservationProductsModal;

  const products = modalState.reservationProductsModal.products.map((i) => {
    return {
      logoUrl: i.logoUrl,
      productId: i.productId,
      productName: i.productName,
      max: 0,
      min: 0,
      platformChargeFeeRate: 0,
      terms: i.terms,
      required: i.required,
      calculating: {
        finalLoanPrice: i.productAmount,
        terms: 0,
        disbursalPrice: i.disbursalAmount,
        dueDate: i.dueDate,
        interestPrice:
          i.terms && i.productAmount ? i.productAmount * 0.001 * i.terms : 0,
      },
      chargeFeeDetails: i.chargeFeeDetails,
    };
  });
  const initProductAmount = products.reduce(
    (prev, curr) => prev + curr.calculating.finalLoanPrice,
    0
  );
  const [selectedProducts, setSelectedProducts] = useState(products);
  const [productAmount, setProductAmount] = useState(initProductAmount || 0);

  const handleProductSelection = (isChecked: boolean, product: any) => {
    if (isChecked) {
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter(
          (selected) => selected.productId !== product.productId
        )
      );
    }
  };

  useEffect(() => {
    const totalAmout = selectedProducts.reduce((total, product) => {
      return total + product.calculating.finalLoanPrice;
    }, 0);
    setProductAmount(totalAmout);

    const totalDisbursalAmount = selectedProducts.reduce((total, product) => {
      return total + product.calculating.disbursalPrice;
    }, 0);

    const chargeFeeDetails = selectedProducts && selectedProducts[0]?.chargeFeeDetails?.reduce((acc: any, item) => {
      acc[item.key] = item.counting;
      return acc;
    }, {});

    dispatch(
      modalSlice.actions.updateLoanAgreementModal({
        show: false,
        urlParams: {
          'loanDate': formatDate(moment()) || '',
          'loanAmount': totalAmout || 0,
          'disbursalAmount': totalDisbursalAmount || 0,
          'loanTerms': selectedProducts[0]?.terms || '',
          'repayAmount': totalAmout || 0,
          'repaymentDate': selectedProducts[0]?.calculating.dueDate || '',
          ...chargeFeeDetails
        }
      })
    );

  }, [selectedProducts]);

  const handleReserveProducts = () => {
    const reservationDetail = selectedProducts.map((product) => {
      return {
        applyAmount: product.calculating.finalLoanPrice,
        productId: product.productId,
      };
    });
    dispatch(
      RepaymentDetailPageUseCaseActions.user.reserve({
        reservationDetail,
      })
    );
  };

  const handleCanleReserveProducts = () => {
    dispatch(
      modalSlice.actions.updateReservationProductsModal({
        ...modalInitialState.reservationProductsModal,
      })
    );
  };

  return (
    <div className="reservationProducts-modal">
      <Modal className="h-full " maskclassName={'py-5 px-5'}>
        <div className="flex flex-col items-center overflow-auto p-4">
          <div className="text-ctext-primary mb-4 text-base font-bold">
            {t('Good News')}
          </div>
          <div className="text-center text-sm leading-none">
            {t(
              'Congratulations! Your credit has been upgraded! We have selected some excellent options for you. Please choose the product you want to reserve based on your needs'
            )}
          </div>
          <div className="border-cstate-disable-main mt-3 mb-5 w-full rounded-lg border border-solid p-4">
            <div className="text-base">{t('Amount')}</div>
            <div className="text-2xl font-bold">{`₹ ${formatPrice(
              productAmount
            )}`}</div>
          </div>
          <div className={`mb-3 flex h-1/2 w-full flex-col overflow-auto`}>
            {products.map((product: any, index) => {
              return (
                <Product
                  key={index}
                  product={product}
                  checkable={false}
                  checkboxProps={{
                    disable: false,
                    checked: true,
                    onClick: (isChecked) =>
                      handleProductSelection(isChecked, product),
                  }}
                  chargeFeeDetails={product.chargeFeeDetails}
                />
              );
            })}
          </div>

          <div className={`mb-3 flex w-full flex-row`}>
            <div className={`mr-1.5 w-full`}>
              <Button
                text={t('Cancel')}
                onClick={handleCanleReserveProducts}
              />
            </div>
            <div className={` ml-1.5 w-full whitespace-nowrap`}>
              <Button
                text={t('Apply and Get Coupon')}
                onClick={handleReserveProducts}
              />
            </div>
          </div>

          <div className={`mb-2 relative w-full`}>
            <img className={`w-full mt-2`} src={AdSVG}/>
            <img className={`pr-2 absolute top-0 right-0 justify-self-end animate-bounce`} src={handAdSVG}/>
          </div>

          <div
            className={`text-ctext-secondary text-left text-xs leading-none`}
          >
            <div className="text-left text-sm leading-none">
              {t('Notes')}
            </div>
            <ul className="list-outside list-decimal pl-3 pt-1">
              <li className="mb-2">
                <span className="font-normal">{t('Click')}</span>
                <span className="font-bold">{t('"Account" >"My Coupons"')}</span>
                <span className="font-normal">{t('to view your coupons.')}</span>
              </li>
              <li className="mb-2">
                {t(
                  'Once your reservation order is approved, funds will be disbursed directly, and you can view your order on the "Payment" page.'
                )}
              </li>
              <li className="mb-2">
                {t(
                  'We encourage you to uphold good credit, repay on time, and stand a chance to receive more coupons after repayment.'
                )}
              </li>
              <li className="mb-2">
                {t('By continuing, you agree and acknowledge the')}
                <a
                  className={'text-blue-500 underline'}
                  onClick={() => {
                    dispatch(
                      modalSlice.actions.updateLoanAgreementModal({
                        ...modalState.loanAgreementModal,
                        show: true,
                      })
                    );
                  }}
                >
                  {' '}
                  {t('Loan Agreement')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      {modalState.loanAgreementModal.show && (
        <LoanAgreementModal
          onClose={() => {
            dispatch(
              modalSlice.actions.updateLoanAgreementModal({
                ...modalState.loanAgreementModal,
                show: false,
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default IndiaReservationProductsModal;
