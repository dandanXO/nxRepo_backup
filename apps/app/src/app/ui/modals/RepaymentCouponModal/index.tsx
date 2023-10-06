import { MdRadioButtonChecked } from '@react-icons/all-files/md/MdRadioButtonChecked';
import { MdRadioButtonUnchecked } from '@react-icons/all-files/md/MdRadioButtonUnchecked';
import { MexicoCountry } from 'libs/shared/domain/src/country/MexicoCountry';
import { PakistanCountry } from 'libs/shared/domain/src/country/PakistanCountry';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import NoDataImage from '../../components/images/NoData.svg';
import { environment } from '../../../../environments/environmentModule/environment';
import { useLazyGetCouponApplicableListQuery } from '../../../externel/backend/rtk';
import { getToken } from '../../../application/getToken';
import { RootState } from '../../../reduxStore';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import { repaymentDetailPageSlice } from '../../../reduxStore/repaymentDetailPageSlice';
import Coupon, { ICouponProps } from '../../components/Coupon';
import Modal from '../../core-components/Modal';
import { Button } from '../../core-components/Button';
import { Navigation } from '../../core-components/Navigation';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { i18nRepaymentCouponModal } from './i18n/translations';
import {getOrderNo} from "../../../externel/window/querystring/getOrderNo";

type ICouponOption = ICouponProps & {
  isChecked: boolean;
  index: number;
};
const RepaymentCouponModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const repaymentDetailPageState = useSelector(
    (state: RootState) => state.repaymentDetailPage
  );
  const { t } = useTranslation(i18nRepaymentCouponModal.namespace);
  const { orderNo = getOrderNo(), balance } = repaymentDetailPageState.repaymentDetail || {};
  const { payType = 'MOBILE_WALLET' } = repaymentDetailPageState.repaymentData || {};
  const { paymentAmount, paymentMethod } = location.state || {};
  const [
    triggerGetList,
    { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized },
  ] = useLazyGetCouponApplicableListQuery({
    pollingInterval: 0,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    triggerGetList({
      isFullRepay: true,
      orderNo,
      paymentAmount: Number(balance || paymentAmount),
    });
  }, []);

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(isFetching));
  }, [isFetching]);

  const applicableCouponList =
    currentData && currentData.length > 0
      ? currentData?.filter((i) => i.applicable === true)
      : [];

  const unApplicableCouponList =
    currentData && currentData.length > 0
      ? currentData?.filter((i) => i.applicable === false)
      : [];

  const [checkedCoupon, setCheckedCoupon] = useState(-1);

  const CouponOption = (props: ICouponOption) => {
    return (
      <a
        className={`justfy-center mx-4 flex items-center`}
        onClick={() => setCheckedCoupon(props.index)}
      >
        <Coupon {...props} />
        <div className="ml-2">
          {props.isChecked ? (
            <MdRadioButtonChecked className={`fill-sky-500`} />
          ) : (
            <MdRadioButtonUnchecked className={`fill-sky-500`} />
          )}
        </div>
      </a>
    );
  };

  const NotUsingCoupon = (props: ICouponOption) => {
    return (
      <a
        className={`justfy-center  mx-4 mb-7 flex items-center `}
        onClick={() => setCheckedCoupon(props.index)}
      >
        <div className="text-ctext-primary grow text-left text-xs font-bold">
          {t('Not using a coupon for this repayment.')}
        </div>
        {props.isChecked ? (
          <MdRadioButtonChecked className={`fill-sky-500`} />
        ) : (
          <MdRadioButtonUnchecked className={`fill-sky-500`} />
        )}
      </a>
    );
  };

  const NoCouponSection = () => {
    return (
      <>
        <div className={`flex grow flex-col items-center justify-center`}>
          <div className={'text-ctext-secondary mt-5'}>
            {t('There are currently no coupon')}
          </div>
        </div>
        <div className="p-5">
          <Button
            text={t('Back')}
            className="w-full"
            primaryTypeGradient={
              environment.country === PakistanCountry.country
            }
            outlineTheme={
              [MexicoCountry.country, PhilippinesCountry.country].includes(
                environment.country
              )
                ? 'round'
                : undefined
            }
            onClick={() => navigate(-1)}
          />
        </div>
      </>
    );
  };

  const renderCouponList = () => {
    return (
      <>
        <div className={`grow overflow-y-auto overflow-x-hidden`}>
          {applicableCouponList.length > 0 && (
            <>
              {/* 不選優惠券 checkedCoupon & index給-1 */}
              <NotUsingCoupon index={-1} isChecked={-1 === checkedCoupon} />
              <div className="text-ctext-primary mx-4 mb-2 text-left text-xs font-bold">
                {t('Choose one coupon')}
              </div>
              {applicableCouponList?.map((i, index) => {
                return (
                  <CouponOption
                    key={i.id}
                    expireTime={i.expireTime}
                    discountAmount={i.discountAmount}
                    isChecked={index === checkedCoupon}
                    couponType={i.couponType}
                    couponName={i.couponName}
                    couponContent={i.couponContent}
                    index={index}
                    status="normal"
                  />
                );
              })}
              <div className="bg-ctext-divider mx-[-18px] mb-4 h-2"></div>
            </>
          )}
          {unApplicableCouponList.length > 0 && (
            <>
              <div className="text-ctext-primary mx-4 mb-2 text-left text-xs font-bold">
                {t('Not applicable to usage conditions')}
              </div>
              {unApplicableCouponList.map((i, index) => (
                <div className="mx-4">
                  <Coupon
                    key={i.id}
                    expireTime={i.expireTime}
                    discountAmount={i.discountAmount}
                    couponType={i.couponType}
                    couponName={i.couponName}
                    couponContent={i.couponContent}
                    status="unUsable"
                  />
                </div>
              ))}
            </>
          )}
        </div>
        <div className="px-5 py-3">
          <Button
            text={t('Confirm')}
            primaryTypeGradient={
              environment.country === PakistanCountry.country
            }
            outlineTheme={
              [MexicoCountry.country, PhilippinesCountry.country].includes(
                environment.country
              )
                ? 'round'
                : undefined
            }
            className="w-full"
            onClick={() => {
              dispatch(
                repaymentDetailPageSlice.actions.updateRepaymentData({
                  ...repaymentDetailPageState.repaymentData,
                  coupon:
                    applicableCouponList.length > 0 && checkedCoupon > -1
                      ? applicableCouponList[checkedCoupon]
                      : null,
                })
              );
              navigate(
                `${
                  PageOrModalPathEnum.RepaymentDetailPage
                }/repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
                {
                  state: {
                    ...location.state,
                    coupon:
                      applicableCouponList.length > 0 && checkedCoupon > -1
                        ? applicableCouponList[checkedCoupon]
                        : null,
                  },
                }
              );
            }}
          />
        </div>
      </>
    );
  };

  return (
    <Modal className="h-full ">
      <Navigation
        title={''}
        back={() => {
          navigate(
            `${
              PageOrModalPathEnum.RepaymentDetailPage
            }/repayment-modal?token=${getToken()}&orderNo=${getOrderNo()}`,
            {
              state: {
                ...location.state,
              },
            }
          );
        }}
      />
      {currentData && currentData.length > 0 ? renderCouponList() : <NoCouponSection />}
    </Modal>
  );
};

export default RepaymentCouponModal;
