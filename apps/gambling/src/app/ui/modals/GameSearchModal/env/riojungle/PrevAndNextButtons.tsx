import { ArrowLeft } from "../../../../components-bs/Icons/ArrowLeft"
import { ArrowRight } from "../../../../components-bs/Icons/ArrowRight"
import { IPrevAndNextButtons } from "../../components/PrevAndNextButtons"

export const PrevAndNextButtons = (props: IPrevAndNextButtons) => {
  return (
    <div className='flex '>
      <button className="w-[32px] h-[32px] flex items-center justify-center mr-2 bg-[#10b98f80] hover:bg-[#10B98F] rounded" onClick={props.handleClickToLeft}><ArrowLeft /></button>
      <button className="w-[32px] h-[32px] flex items-center justify-center bg-[#10b98f80] hover:bg-[#10B98F] rounded" onClick={props.handleClickToRight}><ArrowRight /></button>
    </div>
  )
}