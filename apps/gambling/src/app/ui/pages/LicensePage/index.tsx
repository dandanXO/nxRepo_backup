import { LicensePage as RioLicensePage } from './env/u2'
import { LicensePage as CocoLicensePage } from './env/u1'
import { renderByUVersion } from "../../utils/renderByUVersion";

export const LicensePage = () => {
  return renderByUVersion({
    "u1": <CocoLicensePage />,
    "u2": <RioLicensePage />
  }, <RioLicensePage />)
}
