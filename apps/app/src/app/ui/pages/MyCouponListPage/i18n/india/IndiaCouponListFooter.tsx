import React from "react";


export const IndiaCouponListFooter = () => {
  return (
    <div className='mx-4 my-3 p-2 rounded-lg border border-ctext-divider shadow-[0px_4px_4px_0px_rgba(0,_0,_0,_0.25)]'>
      <div className='text-sm font-bold text-center'>Coupon Usage Rules</div>
      <ol className='mt-2 list-decimal pl-6 text-ctext-secondary text-xs'>
        <li>Coupons have no expiration date.</li>
        <li>All orders, including overdue ones, can use coupons during repayment.</li>
        <li>Only one coupon can be used per order.</li>
      </ol>
    </div>
  )
}
