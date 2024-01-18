import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import Guide1 from './image/coupon_guide_01.svg'
import Guide2 from './image/coupon_guide_02.svg'
import Guide3 from './image/coupon_guide_03.svg'
import Guide4 from './image/coupon_guide_04.svg'

interface IndiaCouponUseInfoModalProps {
  onClose: () => void
}

export const IndiaCouponUseInfoModal = ({
  onClose
}: IndiaCouponUseInfoModalProps) => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 bg-black/50 z-[9999] flex justify-center items-center'>
      <div className='relative bg-white rounded-[10px] w-[95%] h-[90%] px-4 pb-4 pt-6 flex flex-col'>
        <CloseOutlined style={{ fontSize: '16px'}} className='absolute right-4 top-3' onClick={onClose} />
        <div className='text-center text-sm font-bold'>Coupon Usage Guide</div>
        <div className='grow h-full overflow-y-scroll mt-3 text-xs'>
          <div>1. Entering the Order Details page, and click “Repay”.</div>
          <img alt='guide1' className='w-full mt-2' src={Guide1}/>
          <div className='mt-2'>2. Find the option for "Coupon", and click it.</div>
          <img alt='guide2' className='w-full mt-2' src={Guide2}/>
          <div className='mt-2'>3. Select the desired coupon and click on "Confirm" to proceed.</div>
          <img alt='guide3' className='w-full mt-2' src={Guide3}/>
          <div className='mt-2'>4. Successfully applying the coupon, continue with the order payment process.</div>
          <img alt='guide4' className='w-full mt-2' src={Guide4}/>
        </div>
      </div>
    </div>
  )
}
