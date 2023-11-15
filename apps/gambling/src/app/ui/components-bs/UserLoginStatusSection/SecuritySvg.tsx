import {ISVGComponent} from "../../ISVGComponent";
import {environment} from "../../../../environments/environment";

export const SecuritySvg = (props: ISVGComponent) => {
  return (
      <img className={props.className} src={`assets/${environment.assetPrefix}/Property 1=ic_verify.png`} alt="Phone Icon" />
  )
}
