import React from "react";
import { CloseOutlined } from "@ant-design/icons";

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
        </div>
      </div>
    </div>
  )
}
