import { ArrowLeft } from "../../../../components-bs/Icons/ArrowLeft"
import { ArrowRight } from "../../../../components-bs/Icons/ArrowRight"
import { IPrevAndNextButtons } from "../../components/PrevAndNextButtons"

export const PrevAndNextButtons = (props: IPrevAndNextButtons) => {
  return (
    <div className='flex '>
      <button onClick={props.handleClickToLeft}><ArrowLeft /></button>
      <button onClick={props.handleClickToRight}><ArrowRight /></button>
    </div>
  )
}