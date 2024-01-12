
import { ReactElement, ReactNode } from "react";
import { SearchNotice as CSearchNotice } from "../env/u1/SearchNotice";
import { SearchNotice as RSearchNotice } from "../env/u2/SearchNotice";
import { renderByUVersion } from "../../../utils/renderByUVersion";



export const SearchNotice = () => {
  return renderByUVersion({
    "u1": <CSearchNotice />,
    "u2": <RSearchNotice />
  }, <CSearchNotice />)
}

