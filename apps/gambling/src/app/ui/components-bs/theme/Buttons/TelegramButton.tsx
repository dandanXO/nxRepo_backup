import {environment} from "../../../../../environments/environment";
import {IButton} from "./IButton";

export const TelegramButton = (props: IButton) => {
  return (
    <button
      className={`rounded-lg mx-auto my-4 sm:hidden w-[90%] flex-1 py-2 text-center
            items-center justify-center text-white text-xl flex
            bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]`
      }
      onClick={props.onClick}
    >
      <img className={"w-[30px] mr-4"} src={`assets/${environment.assetPrefix}/icon=telegram.png`} />
      Junte-se
    </button>
  )
}
