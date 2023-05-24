import { environment } from 'apps/app/src/environments/environment';
import { IndiaCountry } from 'libs/shared/domain/src/country/IndiaCountry';
import { useEffect, useState } from 'react';

import { useLazyGetCouponListQuery } from '../../../api/rtk';
import { GetCouponListRequest } from '../../../api/userService/GetCouponListRequest';
import Coupon from '../../components/Coupon';
import { Tags } from '../../components/Tag';
import { Page } from '../../components/layouts/Page';
import { Navigation } from '../../components/layouts/Navigation';
import { useNavigate } from 'react-router';
import { PagePathEnum } from '../PagePathEnum';
import { getToken } from '../../../modules/querystring/getToken';

const MyCouponListPage = () => {
  const [listStatus, setListStatus] = useState('Usable');
  const navigate = useNavigate();

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
       <Navigation
        title={'My Coupon'}
        back={() => {
          navigate(`${PagePathEnum.PersonalInfoPage}?token=${getToken()}`);
        }}
      />
      <div className={`sticky top-[0px] flex flex-row justify-between bg-white py-3 px-5`}>
        <Tags
          items={['Usable', 'Used', 'Expired']}
          layoutType={2}
          style={` text-sm mx-1`}
          onClick={(i: any) => setListStatus(['Usable', 'Used', 'Expired'][i])}
        />
      </div>
      <div className="mx-4">
        {currentData && currentData.records && currentData.records.length > 0 ? (
          currentData?.records?.map((i) => {
            return (
              <Coupon
                expireTime={i.expiredTime}
                discountAmount={i.discountAmount}
                couponType={i.couponType}
                couponName={i.couponName}
                couponContent={i.couponContent}
                status={listStatus === 'Usable' ? 'normal' : 'disabled'}
                key={i.couponId}
                buttonText={listStatus === 'Usable' ? 'USE NOW' : i.redeemed ? 'USED' : 'EXPIRED'}
              />
            );
          })
        ) : (
          <div className="flex grow items-center justify-center p-3">There are no orders currently</div>
        )}
      </div>
    </Page>
  );
};

export default MyCouponListPage;
