import flow1Image from "./add to home screen first_1.png";
import flow2Image from "./add to home screen first_2.png";
import {useDispatch} from "react-redux";
import {rootState} from "../../../../../../../packages/dlh-web/src/store/root";
import {appSlice} from "../../../reduxStore/appSlice";

export const IOSDownloadModal = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={"z-[1002] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
      }}
    >
      <div
        className={
          // NOTE:
          "w-full h-auto fixed bottom-0 "
        }
        onClick={(event: any) => {
          event.stopPropagation();
          dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
        }}
      >
        <div className={"shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[linear-gradient(145deg,_#8547eb_-7%,#10b98f_109%)] bg-cover bg-50%_50% flex flex-col px-4 py-8 rounded-tl-3xl rounded-tr-3xl"}>
          <div
            className="text-[var(--secondary-assistant)] text-center text-lg font-bold leading-[28px] text-white mb-6"
          >
            Adicione à tela inicial
          </div>

          <div className="text-sm leading-5 text-white mb-4">
            1. Toque no ícone “Mais” e, em seguida, toque em Adicionar ao ecrã principal
          </div>

          <img className="w-full mb-9" src={flow1Image}/>

          <div className="text-sm leading-5 text-white mb-4">
            2.Clique em Adicionar e selecione ”Adicionar”
          </div>
          <img className="w-full" src={flow2Image}/>

        </div>
      </div>
    </div>
  )
}
