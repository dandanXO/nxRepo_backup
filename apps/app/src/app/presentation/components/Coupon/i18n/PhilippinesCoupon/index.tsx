import moment from 'moment/moment';
import React from 'react';

import { tcx } from '../../../../../modules/tailwindcss';
import Money from '../../../Money.tsx';
import { ICouponProps } from '../../index';

const PhilippinesCoupon = ({
  status,
  couponType,
  couponName,
  couponContent,
  expireTime,
  discountAmount = '',
  onClick,
  buttonText = 'USE NOW',
}: ICouponProps) => {
  const expiredDate = moment(expireTime);
  const notifyDate = expiredDate.subtract(3, 'days');
  const shouldNotify = moment() > notifyDate;

  return (
    <div
      className={tcx('coupon mb-3 flex w-full rounded-lg', [
        'opacity-50',
        status === 'unUsable',
      ])}
    >
      <div className="w-2/3 py-2 px-3 text-left">
        <div className="flex flex-col gap-[3px] text-white">
          <div className="text-xs font-bold">{couponType}</div>
          <div className="text-sm font-bold">{couponName}</div>
          <div className="text-xs">{couponContent}</div>
        </div>
        <div
          className={tcx('mt-[7px] text-[10px] text-white', [
            'text-cstate-error-main',
            status !== 'unUsable' && shouldNotify,
          ])}
        >
          {moment(expireTime).format('MM-DD-YYYY HH:mm')}
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center border-l border-white">
        <div className="font-bold text-white">
          <Money money={discountAmount} isNagetive negativePosition="inner" />
        </div>
        <button
          // NOTE:優惠券不需點擊 (點擊功能先做保留)
          className="bg-tertiary-main mt-[6px] rounded-[3px] py-1 px-2 text-xs font-bold text-white"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PhilippinesCoupon;
