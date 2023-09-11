import moment from 'moment/moment';
import React from 'react';

import { tcx } from '../../../../../modules/tailwindcss';
import Money from '../../../Money.tsx';
import { ICouponProps } from '../../index';

interface IPhilippinesCouponProps extends ICouponProps {
  redeemedTime?: string;
}

const PhilippinesCoupon = ({
  status,
  couponType,
  couponName,
  couponContent,
  expireTime,
  discountAmount = '',
  onClick,
  buttonText = 'USE NOW',
  redeemedTime,
}: IPhilippinesCouponProps) => {
  const expiredDate = moment(expireTime);
  const notifyDate = expiredDate.subtract(3, 'days');
  const shouldNotify = moment() > notifyDate;

  const disable = ['USED', 'EXPIRED'].includes(status || 'EXPIRED');

  return (
    <div
      className={tcx(
        'mb-3 flex w-full rounded-lg',
        ['opacity-50', status === 'unUsable'],
        ['bg-coupon', !disable],
        [
          'border-cstate-disable-variant bg-cstate-disable-assistant border',
          disable,
        ]
      )}
    >
      <div className="w-2/3 break-all py-2 px-3 text-left">
        <div
          className={tcx('flex flex-col gap-[3px] text-white', [
            'text-cstate-disable-variant',
            disable,
          ])}
        >
          <div className="text-xs font-bold">{couponType}</div>
          <div className="text-sm font-bold">{couponName}</div>
          <div className="text-xs">{couponContent}</div>
        </div>
        <div
          className={tcx(
            'mt-[7px] text-[10px] text-white',
            ['text-cstate-error-main', status !== 'unUsable' && shouldNotify],
            ['text-cstate-disable-variant', disable]
          )}
        >
          {status === 'USED' ? (
            <>Used on {moment(redeemedTime).format('MM-DD-YYYY HH:mm')}</>
          ) : (
            moment(expireTime).format('MM-DD-YYYY HH:mm')
          )}
        </div>
      </div>
      <div
        className={tcx(
          'flex w-1/3 flex-col items-center justify-center border-l border-white px-2 ',
          ['border-state-disable-variant', disable]
        )}
      >
        <div
          className={tcx('font-bold text-white', [
            'text-cstate-disable-variant',
            disable,
          ])}
        >
          <Money money={discountAmount} isNagetive negativePosition="inner" />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          className={tcx(
            'bg-tertiary-main mt-[6px] w-full rounded-[3px] py-1 text-xs font-bold text-white',
            ['bg-cstate-disable-variant', disable]
          )}
        >
          {['USED', 'EXPIRED'].includes(status || '') ? status : buttonText}
        </button>
      </div>
    </div>
  );
};

export default PhilippinesCoupon;
