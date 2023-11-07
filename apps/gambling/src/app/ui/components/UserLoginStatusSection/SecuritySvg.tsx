import {ISVGComponent} from "../../ISVGComponent";
import {environment} from "../../../../environments/environment";

export const SecuritySvg = (props: ISVGComponent) => {
  return (
      <img className={props.className} src={`assets/${environment.assetPrefix}/icon_verify.png`} alt="Phone Icon" />
  )
}
