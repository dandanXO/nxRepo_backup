
import { ReactElement, ReactNode } from "react";
import { SearchNotice as CSearchNotice } from "../env/coco/SearchNotice";
import { SearchNotice as RSearchNotice } from "../env/riojungle/SearchNotice";
import { renderByPlatform } from "../../../utils/renderByPlatform";



export const SearchNotice = () => {
  return renderByPlatform({
    "u1": <CSearchNotice />,
    "u2": <RSearchNotice />
  }, <CSearchNotice />)
}

