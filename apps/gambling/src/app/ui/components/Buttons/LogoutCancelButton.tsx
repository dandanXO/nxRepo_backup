import {IButton} from "./IButton";

export const LogoutCancelButton = (props: IButton) => {
  return (
    <button className={"text-white mr-2 px-4 py-1 bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-[--var(white)] rounded-md"}
            onClick={props.onClick}
    >
      Cancelar</button>
  )
}
