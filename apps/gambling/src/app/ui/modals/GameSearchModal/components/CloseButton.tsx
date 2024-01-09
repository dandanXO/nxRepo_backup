

import { CloseICON } from "../../../components-bs/Icons/CloseICON";
import { renderByPlatform } from "../../../utils/renderByPlatform";



export const CloseButton = () => {
  return renderByPlatform({
    "u1": <CloseICON  />,
    "u2": <CloseICON className="w-[40px] h-[40px] text-[#B3B3B3]" outLined={true} btnClassName={'p-0'} />
  }, <CloseICON />)
}

