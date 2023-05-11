import { useNavigate, useLocation, Navigate } from 'react-router';
import { Overlay } from '@frontend/mobile/shared/ui';
import { MdRadioButtonChecked } from '@react-icons/all-files/md/MdRadioButtonChecked';
import { MdRadioButtonUnchecked } from '@react-icons/all-files/md/MdRadioButtonUnchecked';
import Coupon from '../../components/Coupon';
import { useEffect, useState } from 'react';
import { ICouponProps } from '../../components/Coupon';
import { useLazyGetCouponApplicableListQuery } from '../../../api/rtk';
import { Navigation } from '../../components/layouts/Navigation';
import NoData from './NoData.svg';
import { Button } from '../../components/layouts/Button';
import { getToken } from '../../../modules/location/getToken';
import { PagePathEnum } from '../../pages/PagePathEnum';
import { environment } from 'apps/app/src/environments/environment';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';

type ICouponOption = ICouponProps & {
  isChecked: boolean;
  index: number;
};
const RepamentCouponModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNo, paymentAmount, paymentMethod } = location.state || {};
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
      paymentAmount,
      paymentMethod,
    });
  }, []);

  const applicableCouponList =
    currentData && currentData.length > 0
      ? currentData?.filter((i) => i.applicable === true)
      : [];
  const unApplicableCouponList =
    currentData && currentData.length > 0
      ? currentData?.filter((i) => i.applicable === false)
      : [];
  const [checkedCoupon, setCheckedCoupon] = useState(-1);
  // console.log('RepamentCouponModal-----------',location.state)

  const CouponOption = (props: ICouponOption) => {
    return (
      <div
        className={`flex justfy-center items-center`}
        onClick={() => setCheckedCoupon(props.index)}
      >
        <Coupon {...props} />
        {props.isChecked ? (
          <MdRadioButtonChecked className={`fill-sky-500`} />
        ) : (
          <MdRadioButtonUnchecked className={`fill-sky-500`} />
        )}
      </div>
    );
  };

  const NotUsingCoupon = (props: ICouponOption) => {
    return (
      <div
        className={`flex justfy-center items-center ml-2 mb-7`}
        onClick={() => setCheckedCoupon(props.index)}
      >
        <div className="grow text-left text-xs">
          Not using a coupon for this repayment.
        </div>
        {props.isChecked ? (
          <MdRadioButtonChecked className={`fill-sky-500`} />
        ) : (
          <MdRadioButtonUnchecked className={`fill-sky-500`} />
        )}
      </div>
    );
  };

  const renderNoCoupon = () => {
    return (
      <>
        <div className={`grow flex flex-col justify-center items-center`}>
          <img src={NoData} alt="" />
          <div className={`mt-5`}>There are currently no coupon</div>
        </div>
        <div className="p-2">
          <Button
            text={'Back'}
            className="w-full"
            onClick={() => navigate(-1)}
          />
        </div>
      </>
    );
  };

  const renderCouponList = () => {
    return (
      <>
        <div className={`grow`}>
          {applicableCouponList.length > 0 && (
            <>
              <NotUsingCoupon index={-1} isChecked={-1 === checkedCoupon} />
              <div className="text-xs font-bold text-left ml-2 ">
                Choose one coupon
              </div>
              {applicableCouponList?.map((i, index) => {
                return (
                  <>
                    {/* 不選優惠券 checkedCoupon & index給-1 */}
                    {/* {index === 0 && <NotUsingCoupon index={-1} isChecked={-1 === checkedCoupon}/>} */}
                    <CouponOption
                      expireTime={i.expireTime}
                      discountAmount={i.discountAmount}
                      isChecked={index === checkedCoupon}
                      couponType={i.couponType}
                      couponName={i.couponName}
                      couponContent={i.couponContent}
                      index={index}
                      status="normal"
                      key={i.id}
                      layoutType={
                        environment.country !== IndiaCountry.country ? 1 : 2
                      }
                    />
                  </>
                );
              })}
              <div className="m-2 mb-4 bg-[#ECECEC] h-2 mx-[-20px]"></div>
            </>
          )}
          {unApplicableCouponList.length > 0 && (
            <>
              <div className="text-xs font-bold text-left ml-2 ">
                Not applicable to usage conditions
              </div>
              {unApplicableCouponList.map((i, index) => (
                <Coupon
                  expireTime={i.expireTime}
                  discountAmount={i.discountAmount}
                  couponType={i.couponType}
                  couponName={i.couponName}
                  couponContent={i.couponContent}
                  status="unUsable"
                  key={i.id}
                  layoutType={
                    environment.country === IndiaCountry.country ? 1 : 2
                  }
                />
              ))}
            </>
          )}
        </div>
        <div className="p-2">
          <Button
            text={'Confirm'}
            className="bg-primary-main w-full  text-white"
            onClick={() =>
              navigate(
                `${
                  PagePathEnum.RepaymentDetailPage
                }/repayment-modal?token=${getToken()}`,
                {
                  state: {
                    ...location.state,
                    coupon:
                      applicableCouponList.length > 0 && checkedCoupon > -1
                        ? applicableCouponList[checkedCoupon]
                        : null,
                  },
                }
              )
            }
          />
        </div>
      </>
    );
  };
  return (
    <Overlay
      show={true}
      enableClose={false}
      onCancel={() => navigate(-1)}
      content={(hide: () => void) => {
        return (
          <div className={`flex flex-col h-[85vh]`}>
            <div className={`ml-[-8px] `}>
              <Navigation
                title={''}
                back={() => {
                  navigate(-1);
                }}
              />
            </div>
            {currentData && currentData.length > 0
              ? renderCouponList()
              : renderNoCoupon()}
          </div>
        );
      }}
    />
  );
};

export default RepamentCouponModal;
