import {renderByPlatform} from "../../utils/renderByPlatform";
import {CompanyProfilePage as CCompanyProfilePage} from "./env/coco/index";
import {CompanyProfilePage as RCompanyProfilePage} from "./env/riojungle/index";
export const CompanyProfilePage = () => {
  return renderByPlatform({
    "u1": (
      <CCompanyProfilePage/>
    ),
    "u2": (
      <RCompanyProfilePage/>
    ),
  }, <CCompanyProfilePage/>)
}
