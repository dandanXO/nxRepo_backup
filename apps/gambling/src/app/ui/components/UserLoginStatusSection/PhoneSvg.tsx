import {ISVGComponent} from "../../ISVGComponent";
import {environment} from "../../../../environments/environment";

export const PhoneSvg = (props: ISVGComponent) => {
  return (
      <img className={props.className} src={`assets/${environment.assetPrefix}/icon_phone.png`} alt="Phone Icon" />
  )
}
