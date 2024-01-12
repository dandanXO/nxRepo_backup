import {renderByUVersion} from "../../utils/renderByUVersion";
import {CompanyProfilePage as CCompanyProfilePage} from "./env/u1/index";
import {CompanyProfilePage as RCompanyProfilePage} from "./env/u2/index";
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
