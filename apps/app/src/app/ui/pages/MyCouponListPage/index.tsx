import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getToken } from '../../../application/getToken';
import { isShowNavigation } from '../../../device/isShowNavigation';
import { useLazyGetCouponListQuery } from '../../../externel/backend/rtk';
import { GetCouponListRequest } from '../../../externel/backend/userService/GetCouponListRequest';
import { loadingSlice } from '../../../reduxStore/loadingSlice';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import Coupon from '../../components/Coupon';
import { Navigation } from '../../core-components/Navigation';
import { Page } from '../../core-components/Page';
import { Tags } from '../../core-components/Tag';
import { renderByCountry } from "../../../modules/i18n";
import { IndiaCountry } from "@frontend/shared/domain";
import { IndiaCouponListFooter } from "./i18n/india/IndiaCouponListFooter";
import { InfoCircleOutlined } from "@ant-design/icons";
import { IndiaCouponUseInfoModal } from "./i18n/india/IndiaCouponUseInfoModal";

const MyCouponListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listStatus, setListStatus] = useState('Usable');
  const [couponInfoOpen, setCouponInfoOpen] = useState(false);

  const [triggerGetList, { currentData, isFetching }] =
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

  useEffect(() => {
    dispatch(loadingSlice.actions.updatePageLoading(isFetching));
  }, [isFetching]);

  return (
    <Page className="fixed h-full w-full flex flex-col">
      {isShowNavigation() && (
        <Navigation
          title={'My Coupon'}
          back={() => {
            navigate(
              `${PageOrModalPathEnum.PersonalInfoPage}?token=${getToken()}`, { replace: true }
            );
          }}
        />
      )}

      {
        renderByCountry({
          [IndiaCountry.country]: (
            <div className='flex justify-end items-center px-5 gap-1' onClick={()=> setCouponInfoOpen(true)}>
              <div className='text-xs text-cstate-info-main underline'>Coupon Usage Guide</div>
              <InfoCircleOutlined style={{ fontSize : '12px'}} />
            </div>
          )
        }, <></>)
      }

      {
        couponInfoOpen && renderByCountry({
          [IndiaCountry.country]: (
            <IndiaCouponUseInfoModal onClose={()=> setCouponInfoOpen(false)} />
          )
        }, <></>)
      }

      <div
        className={`sticky top-[0px] flex flex-row justify-between bg-white py-3 px-5`}
      >
        <Tags
          items={['Usable', 'Used', 'Expired']}
          layoutType={2}
          style={` text-sm mx-1`}
          onClick={(i: any) => setListStatus(['Usable', 'Used', 'Expired'][i])}
        />
      </div>

      <div className='grow h-full overflow-y-scroll'>
        <div className="mx-5 flex flex-col items-center justify-center">
          {currentData &&
          currentData.records &&
          currentData.records.length > 0 ? (
            currentData?.records?.map((coupon, index) => {
              return (
                <Coupon
                  key={listStatus + coupon.couponId + index}
                  expireTime={
                    coupon.redeemed
                      ? coupon.redeemedTime
                      : coupon.expiredTime || ''
                  }
                  discountAmount={coupon.discountAmount || ''}
                  couponType={coupon.couponType || ''}
                  couponName={coupon.couponName || ''}
                  couponContent={coupon.couponContent || ''}
                  status={listStatus === 'Usable' ? 'normal' : 'disabled'}
                  buttonText={
                    listStatus === 'Usable'
                      ? 'USE NOW'
                      : coupon.redeemed
                        ? 'USED'
                        : 'EXPIRED'
                  }
                  onClick={() =>
                    navigate(
                      `${PageOrModalPathEnum.RepaymentPage}?token=${getToken()}`
                    )
                  }
                />
              );
            })
          ) : (
            <div className="mt-5 flex h-[50%] flex-col items-center justify-center p-3">
              {/* <img src={NoDataImage} alt="" /> */}
              <div className={`text-cstate-disable-main mt-5 text-sm`}>
                There are currently no coupon
              </div>
            </div>
          )}
        </div>
      </div>

      {
        renderByCountry({
          [IndiaCountry.country]: (
            <IndiaCouponListFooter />
          )
        }, <></>)
      }
    </Page>
  );
};

export default MyCouponListPage;
