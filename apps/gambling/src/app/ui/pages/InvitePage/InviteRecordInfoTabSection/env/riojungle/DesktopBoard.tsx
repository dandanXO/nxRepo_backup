import { useNavigate } from "react-router";
import { IBoardData } from "../.."
import { RecordButton3 } from "apps/gambling/src/app/ui/components/Buttons/RecordButton";
import { PageOrModalPathEnum } from "apps/gambling/src/app/ui/PageOrModalPathEnum";
import { IBoardContainer } from "../../components/DesktopBoard";

export const DesktopBoard = (props: IBoardData) => {
  const navigate = useNavigate();
  const BoardContainer = (props: IBoardContainer) => {
    return (<div className={`
    boardContainer
    p-3 md:py-5 md:px-3 lg:py-8 lg:px-10
    mt-2 md:mt-0
    shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] 
    bg-[#333333] flex flex-col w-full items-center justify-start rounded-lg 
    `}>
      {props.children}
    </div>)
  }
  return (
    <>
      {/* <section className={"flex flex-row justify-end mb-4"}>
        <button
          onClick={() => { navigate(PageOrModalPathEnum.InviteSettlementRecordPage) }}
          className=" leading-[28px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] flex flex-row justify-center py-1.5 px-5 cursor-pointer  rounded-[100px]"
        >
          Registro

        </button>
      </section> */}
      <section className={"flex flex-col md:flex-row w-full mb-4 [&>*:nth-child(2)]:md:mx-5 "}>
        <BoardContainer>
          <div className={"text-base md:text-xl lg:text-3xl text-white"}>R${props.data.totalReward}</div>
          <div className={"text-sm lg:text-lg text-white md:mt-5"}>Prêmio total</div>
        </BoardContainer>
        <BoardContainer>
          <div className={"text-base md:text-xl lg:text-3xl text-white"}>R${props.data.paidReward}</div>
          <div className={"text-sm lg:text-lg text-white md:mt-5"}>Bônus já liquidados</div>
        </BoardContainer>
        <BoardContainer>
          <div className={"text-base md:text-xl lg:text-3xl text-white"}>R${props.data.waitForCalReward}</div>
          <div className={"text-sm lg:text-lg text-center text-white leading-5 lg:leading-7 md:mt-5"}>Bônus aguardando liquidação</div>
          <div className={"text-sm lg:text-lg text-center text-white leading-5 lg:leading-7"}>(Atualizar a cada 24 horas)</div>
        </BoardContainer>
      </section>
    </>
  )
}