import {renderByPlatform} from "../../utils/renderByPlatform";
import {CompanyProfilePage as CCompanyProfilePage} from "./env/coco/index";
import {CompanyProfilePage as RCompanyProfilePage} from "./env/riojungle/index";
export const CompanyProfilePage = () => {
  return renderByPlatform({
    "coco777bet": (
      <CCompanyProfilePage/>
    ),
    "riojungle777bet": (
      <RCompanyProfilePage/>
    ),
  }, <CCompanyProfilePage/>)
}
