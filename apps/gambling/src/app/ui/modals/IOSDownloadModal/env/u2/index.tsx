import {useDispatch} from "react-redux";
import {appSlice} from "../../../../../reduxStore/appSlice";
import {environment} from "../../../../../../environments/environment";
import {CloseICON} from "../../../../components-bs/Icons/CloseICON";
import { MenuSmallLogo } from "../../../../components-bs/Logos/env/u2/MenuSmallLogo";

export const RiojungleIOSDownloadModal = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={"flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
      }}
    >
      <div
        className={
          // NOTE:
          "w-full max-h-[600px] sm:max-h-[740px] overflow-auto  fixed bottom-0 px-4"
        }
        onClick={(event) => {
          event.stopPropagation();
          dispatch(appSlice.actions.setShowiOSDownloadPopover(false));
        }}
      >
        <div className={"w-full h-full shadow-[inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] relative bg-gradient-144 from-[var(--liner-main-from)] to-[var(--liner-main-to)] bg-cover bg-50%_50% flex flex-col px-6 rounded-tl-3xl rounded-tr-3xl"}>
          <CloseICON  className="w-[32px] h-[32px]" btnClassName="p-0 mt-5 -mr-4 flex justify-end"/>
          <div
            className="text-white text-center text-xl font-bold leading-[28px] mb-5 -mt-3"
          >
            Adicione à tela inicial
          </div>

          <div className={"max-h-full overflow-y-auto -mb-2"}>
            <div className="text-base leading-5 text-white mb-4">
              Toque no ícone “Mais” e, em seguida, toque em Adicionar ao ecrã principal
            </div>

            <img className="w-full mb-5" alt="guid-line"  src={`assets/${environment.uVersion}/add to home screen first_1.png`}/>

            <div className="text-base leading-5 text-white mb-5">
              Clique em Adicionar e selecione ”Adicionar”
            </div>
            {/*<img className="w-full" src={flow2Image}/>*/}

            <div className="flex flex-row w-full items-start">
              <div className="bg-[#f2f2f6] flex flex-col justify-center gap-2 w-full items-start py-3 rounded-lg">

                <div className="flex flex-row w-full justify-around items-start px-2">
                  <div className="text-sm md:text-xl font-medium leading-7 text-[#1678ff] mr-2">
                    Cancelar
                  </div>

                  <div className="text-sm md:text-xl font-medium leading-7 mr-2">
                    Adicione à tela inicial
                  </div>

                  <div className="relative flex flex-row justify-center items-start">
                    <div className="text-sm md:text-xl font-medium leading-7 text-[#1678ff] relative border-solid border-[var(--primary-main-from)] border-2 rounded-lg px-1">
                      Adicionar
                    </div>
                    <img
                      src={`assets/${environment.uVersion}/hand3.png`}
                      alt="hand icon"
                      className="w-12 h-12 absolute top-6 left-[20px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full items-start">
                  <div className="bg-white flex flex-row justify-start w-full items-center px-3 py-4">

                    <MenuSmallLogo className={"w-[54px] h-[54px] mr-2"}/>

                    <div className="flex flex-col items-start overflow-auto ml-3">
                      <div className="flex flex-col w-full items-start">
                        <div className="text-sm: md:text-xl font-medium	 leading-[28px] text-[#1c1c1c]">
                          {environment.platformName}
                        </div>
                        <div
                          id="Line"
                          className="border-solid border-t border-[#e5e7eb] w-full h-px"
                        />
                      </div>
                      <div className="flex flex-col w-full items-start">
                        <div className="text-sm: md:text-xl font-medium  leading-[28px] text-[#1c1c1c]">
                          {`${window.location.protocol}//${window.location.host}`}
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="text-sm font-medium leading-[20px] text-[#bebebe] w-full px-3 py-2">
                    Será adicionado um ícone inicial para aceder rapidamente a este website.
                  </div>
                </div>
              </div>
            </div>
            <img
                  src={`assets/${environment.uVersion}/hand1.png`}
                  alt="hand icon"
                  className="w-12 h-12 relative left-[50%] -translate-x-2/4 bottom-2"
                />
          </div>
        </div>
      </div>
    </div>
  )
}
