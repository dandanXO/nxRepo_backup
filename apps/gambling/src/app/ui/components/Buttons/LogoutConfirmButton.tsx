import {IButton} from "./IButton";

export const LogoutConfirmButton = (props: IButton) => {
  return (
    <button className={"text-white px-4 py-1 bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)] text-[--var(white)] rounded-md"}
            onClick={props.onClick}>Confirme</button>
  )
}
