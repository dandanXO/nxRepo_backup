
import cx from "classnames";
import { environment } from "../../../../environments/environment";

type IICON = {
  className?: string;
}
export const NoData = (props: IICON) => {
  return (
    <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
  )
}
