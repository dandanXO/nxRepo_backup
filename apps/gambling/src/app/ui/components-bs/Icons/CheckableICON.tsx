import {environment} from "../../../../environments/environment";

type ICheckableICON = {
  isChecked: boolean;
}
export const CheckableICON = (props: ICheckableICON) => {
  return (
    <>
      {!props.isChecked ? (
        <img className="w-[24px] h-[24px]" src={`assets/${environment.uVersion}/icon=uncheckbox.png`} />
      ) : (
        <img className="w-[24px] h-[24px]" src={`assets/${environment.uVersion}/icon=checkbox.png`} alt="Checked" />
      )}
    </>
  )
}
