import {ISVGComponent} from "../../ISVGComponent";
import {environment} from "../../../../environments/environment";

export const KeySvg = (props: ISVGComponent) => {
  return (
      <img className={props.className} src={`assets/${environment.assetPrefix}/icon_password.png`} alt="Phone Icon" />
  )
}
