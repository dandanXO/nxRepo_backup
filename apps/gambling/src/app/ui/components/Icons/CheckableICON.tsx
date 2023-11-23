import {environment} from "../../../../environments/environment";

type ICheckableICON = {
  isChecked: boolean;
}
export const CheckableICON = (props: ICheckableICON) => {
  return (
    <>
      {!props.isChecked ? (
        <img src={`assets/${environment.assetPrefix}/Property 1=uncheck.png`} />
      ) : (
        <img src={`assets/${environment.assetPrefix}/Property 1=check.png`} alt="Checked" />
      )}
    </>
  )
}
