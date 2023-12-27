
import {IInitialChargeModal} from "../../index";

export const SharedInviteBonusModal = (props: IInitialChargeModal) => {
  return (
    <div
      className={"z-[1005] fixed left-0 top-0 right-0 bottom-0 flex flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"}
      onClick={(event) => {
        props.close();
      }}
    >
      <div
        className={
          // NOTE:
          "w-[90vw] max-w-[336px] h-auto"
        }
        onClick={(event: any) => {

        }}
      >
        <div id="NewRootRoot" className="flex flex-row w-full items-start">
          <div
            id="Alert1"
            className="bg-[linear-gradient(145deg,_#8547eb_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col pb-4 gap-5 w-full items-start rounded-lg p-4"
          >
            <div className="flex flex-col w-full items-start mt-[-48px]">
              <div className="flex flex-row ml-[108px] gap-20 w-2/3 items-start">
                <img
                  src="https://file.rendit.io/n/BNH9SwsC8CxPBeTY9hIF.png"
                  alt="Image1"
                  id="Image1"
                  className="w-24"
                />
                <img
                  style={{
                    left: "-11px",
                    position: "relative",
                    top: "-11px",
                  }}
                  src="https://file.rendit.io/n/quh2LBV1P1lsK5SJUZ94.svg"
                  alt="XCircle"
                  id="XCircle"
                  className="mt-12 w-10"
                  onClick={() => {
                    props.close();
                  }}
                />
              </div>
              <img
                src="https://file.rendit.io/n/g0h2r60bWpPVXrQuhBYs.png"
                alt="Image2"
                id="Image2"
              />
            </div>

            <div className="flex flex-col gap-4 w-full items-start">
              <div className="flex flex-col justify-between gap-2 w-full items-start">
                <div className="text-center font-['Inter'] font-medium leading-[24px] text-white h-12">
                  Bônus de primeira recarga para usuários convidados
                </div>

                <div className="border-solid border-white/20 shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-gray-200 flex flex-row justify-between w-full h-16 items-start pt-2 px-2 rounded-lg">
                  <div className="flex flex-col w-2/5 items-start">
                    <div className="font-['Inter'] font-bold leading-[24px] text-white">
                      Convidar 1-10
                    </div>
                    <div className="text-sm font-['Inter'] font-medium leading-[20px] text-white">
                      Prêmio
                    </div>
                  </div>
                  <div className="text-right font-['Inter'] font-bold leading-[24px] text-white mt-2">
                    R$ 15,00
                  </div>
                </div>

                <div className="border-solid border-white/20 shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-black/10 flex flex-row justify-between w-full h-16 items-start pt-2 px-2 rounded-lg">
                  <div className="flex flex-col w-2/5 items-start">
                    <div className="font-['Inter'] font-bold leading-[24px] text-white">
                      Convidar 11-20
                    </div>
                    <div className="text-sm font-['Inter'] font-medium leading-[20px] text-white">
                      Prêmio
                    </div>
                  </div>
                  <div className="text-right font-['Inter'] font-bold leading-[24px] text-white mt-2">
                    R$ 20,00
                  </div>
                </div>

                <div className="border-solid border-white/20 shadow-[inset_0px_4px_4px_0px_rgba(0,_0,_0,_0.25)] bg-black/10 flex flex-row justify-between w-full h-16 items-start pt-2 px-2 rounded-lg">
                  <div className="flex flex-col w-2/5 items-start">
                    <div className="font-['Inter'] font-bold leading-[24px] text-white">
                      Convidar 11-20
                    </div>
                    <div className="text-sm font-['Inter'] font-medium leading-[20px] text-white">
                      Prêmio
                    </div>
                  </div>
                  <div className="text-right font-['Inter'] font-bold leading-[24px] text-white mt-2">
                    R$ 20,00
                  </div>
                </div>


              </div>

              <div className="flex flex-row gap-3 items-start w-full">
                <button
                  id="Btn"
                  className="text-sm font-['Inter'] font-medium leading-[20px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] flex flex-row justify-center pt-2 w-1/2 h-10 cursor-pointer items-start rounded-lg"
                >
                  Ganhar Dinheiro
                </button>
                <button
                  id="Btn1"
                  className="text-sm font-['Inter'] font-medium leading-[20px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center pt-2 w-1/2 h-10 cursor-pointer items-start rounded-lg"
                >
                  Convide Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
