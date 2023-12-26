
import cx from "classnames";
import { environment } from "../../../../../environments/environment";
import { tcx } from "../../../utils/tcx";

type IICON = {
  className?: string;
}
export const NoData = (props: IICON) => {
  return (
    <img className={tcx('h-[100px]', props.className)} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
  )
}
