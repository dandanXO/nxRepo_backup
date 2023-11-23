import { environment } from "../../../../environments/environment";
import {ISVGComponent} from "../../ISVGComponent";

export const SearchICON = (props: ISVGComponent) => {
  return (
      <img className={props.className} src={`assets/${environment.assetPrefix}/ic_search.png`}/>
  )
}
