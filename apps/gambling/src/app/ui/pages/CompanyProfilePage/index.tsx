import {renderByUVersion} from "../../utils/renderByUVersion";
import {CompanyProfilePage as CCompanyProfilePage} from "./env/coco/index";
import {CompanyProfilePage as RCompanyProfilePage} from "./env/riojungle/index";
export const CompanyProfilePage = () => {
  return renderByUVersion({
    "u1": (
      <CCompanyProfilePage/>
    ),
    "u2": (
      <RCompanyProfilePage/>
    ),
  }, <CCompanyProfilePage/>)
}
