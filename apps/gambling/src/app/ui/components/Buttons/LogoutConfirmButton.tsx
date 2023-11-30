import {IButton} from "./IButton";

export const LogoutConfirmButton = (props: IButton) => {
  return (
    <button className={"flex-1 text-white px-5 py-1 bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)] text-[--var(white)] rounded-md"}
            onClick={props.onClick}>Confirme</button>
  )
}
