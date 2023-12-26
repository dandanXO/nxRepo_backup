import flow1Image from "./add to home screen first_1.png";
import handImage from "./hand.svg";
import {useDispatch} from "react-redux";
import {rootState} from "../../../../../../../packages/dlh-web/src/store/root";
import {appSlice} from "../../../reduxStore/appSlice";
import {environment} from "../../../../environments/environment";
import {LoadingLogo} from "../../components-bs/theme/Logos/LoadingLogo";

export const IOSDownloadModal = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={"z-[1002] fixed left-0 top-0 right-0 bottom-0  flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
      }}
    >
      <div
        className={
          // NOTE:
          "w-full h-[98%] max-h-[740px] fixed bottom-0"
        }
        onClick={(event: any) => {
          event.stopPropagation();
          dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
        }}
      >
        <div className={"w-full h-full shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] bg-cover bg-50%_50% flex flex-col px-4 pt-8 rounded-tl-3xl rounded-tr-3xl"}>
          <div
            className="text-[var(--secondary-assistant)] text-center text-lg font-bold leading-[28px] text-white mb-6"
          >
            Adicione à tela inicial
          </div>

          <div className={"max-h-full overflow-y-auto pb-4"}>
            <div className="text-sm leading-5 text-white mb-4">
              1. Toque no ícone “Mais” e, em seguida, toque em Adicionar ao ecrã principal
            </div>

            <img className="w-full mb-9" src={flow1Image}/>

            <div className="text-sm leading-5 text-white mb-4">
              2.Clique em Adicionar e selecione ”Adicionar”
            </div>
            {/*<img className="w-full" src={flow2Image}/>*/}

            <div className="flex flex-row w-full items-start">
              <div className="bg-[#f2f2f6] flex flex-col justify-center gap-2 w-full items-start py-3 rounded-lg">

                <div className="flex flex-row w-full justify-around items-start px-2">
                  <div className="text-sm md:text-xl font-medium leading-7 text-[#1678ff] mr-2">
                    Cancelar
                  </div>

                  <div className="text-sm md:text-xl font-medium leading-7 mr-2">
                    Adicionar à tela inicial
                  </div>

                  <div className="relative flex flex-row justify-center items-start">
                    <div className="text-sm md:text-xl font-medium leading-7 text-[#1678ff] relative border-solid border-[#f05151] border-2 rounded-lg px-1">
                      Adicionar
                    </div>
                    <img
                      src={handImage}
                      alt="hand icon"
                      className="w-8 h-12 absolute top-6 left-[24px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full items-start">
                  <div className="bg-white flex flex-row justify-start w-full items-center px-3 py-4">

                    <LoadingLogo className={"w-[54px] h-[54px] mr-2"}/>

                    <div className="flex flex-col w-3/4 items-start">
                      <div className="flex flex-col w-full items-start">
                        <div className="text-sm: md:text-xl font-medium leading-[28px] text-[#1c1c1c]">
                          {environment.platformName}
                        </div>
                        <div
                          id="Line"
                          className="border-solid border-t border-[#e5e7eb] w-full h-px"
                        />
                      </div>
                      <div className="text-sm: md:text-xl font-medium leading-[28px] text-[#1c1c1c]">
                        {`${window.location.protocol}//${window.location.host}`}
                      </div>
                    </div>

                  </div>

                  <div className="text-sm font-medium leading-[20px] text-[#bebebe] w-full px-3 py-2">
                    Será adicionado um ícone inicial para aceder rapidamente a este website.
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
