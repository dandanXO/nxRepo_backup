import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import NoDataImage from '../../../../assets/NoData.svg';
import { useLazyGetCouponListQuery } from '../../../api/rtk';
import { GetCouponListRequest } from '../../../api/userService/GetCouponListRequest';
import { isShowNavigation } from '../../../modules/window/isShowNavigation';
import Coupon from '../../components/Coupon';
import { Tags } from '../../components/Tag';
import { Navigation } from '../../components/layouts/Navigation';
import { Page } from '../../components/layouts/Page';

const MyCouponListPage = () => {
  const navigate = useNavigate();
  const [listStatus, setListStatus] = useState('Usable');

  const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] =
    useLazyGetCouponListQuery({
      pollingInterval: 0,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });

  const statusEnum = {
    Usable: 'UNUSED',
    Used: 'USED',
    Expired: 'EXPIRED',
  } as { [key: string]: string };

  useEffect(() => {
    triggerGetList({
      pageNumber: 0,
      pageSize: 500,
      status: statusEnum[listStatus] as GetCouponListRequest['status'],
    });
  }, [listStatus]);

  return (
    <Page className="flex flex-col">
      {!isShowNavigation() && (
        <Navigation
          title={'My Coupon'}
          back={() => {
            navigate(-1);
          }}
        />
      )}

      <div className={`sticky top-[0px] flex flex-row justify-between bg-white py-3 px-5`}>
        <Tags
          items={['Usable', 'Used', 'Expired']}
          layoutType={2}
          style={` text-sm mx-1`}
          onClick={(i: any) => setListStatus(['Usable', 'Used', 'Expired'][i])}
        />
      </div>

      <div className="mx-4 grow flex flex-col justify-center items-center ">
        {currentData && currentData.records && currentData.records.length > 0 ? (
          currentData?.records?.map((coupon) => {
            return (
              <Coupon
                key={coupon.couponId}
                expireTime={coupon.expiredTime || ''}
                discountAmount={coupon.discountAmount || ''}
                couponType={coupon.couponType || ''}
                couponName={coupon.couponName || ''}
                couponContent={coupon.couponContent || ''}
                status={listStatus === 'Usable' ? 'normal' : 'disabled'}
                buttonText={listStatus === 'Usable' ? 'USE NOW' : coupon.redeemed ? 'USED' : 'EXPIRED'}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center p-3 mt-5">
            <img src={NoDataImage} alt="" />
            <div className={`mt-5`}>There are currently no coupon</div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default MyCouponListPage;
