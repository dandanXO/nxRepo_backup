
import { ReactElement, ReactNode } from "react";
import { SearchNotice as CSearchNotice } from "../env/coco/SearchNotice";
import { SearchNotice as RSearchNotice } from "../env/riojungle/SearchNotice";
import { renderByUVersion } from "../../../utils/renderByUVersion";



export const SearchNotice = () => {
  return renderByUVersion({
    "u1": <CSearchNotice />,
    "u2": <RSearchNotice />
  }, <CSearchNotice />)
}

