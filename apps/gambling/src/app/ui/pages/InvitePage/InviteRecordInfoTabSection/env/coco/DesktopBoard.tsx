import { useNavigate } from "react-router";
import { IBoardData } from "../.."
import { RecordButton3 } from "apps/gambling/src/app/ui/components/Buttons/RecordButton";
import { PageOrModalPathEnum } from "apps/gambling/src/app/ui/PageOrModalPathEnum";
import { IBoardContainer } from "../../components/DesktopBoard";

export const DesktopBoard = (props: IBoardData) => {
  const navigate = useNavigate();
  const BoardContainer = (props: IBoardContainer) => {
    return (<div className={`
    flex flex-col flex-1 rounded-2xl justify-center items-center text-white
    mx-1
    basis-[30%]
    h-[140px]
    text-center
    bg-gradient-to-b
    from-[var(--background-dashboard-main-from)]
    via-[var(--background-dashboard-main-via)]
    to-[var(--background-dashboard-main-to)]
    border border-solid border-[var(--background-dashboard-main-to)]
    shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25),4px_4px_4px_0px_rgba(255,255,255,0.25)_inset,-4px_-4px_4px_0px_rgba(255,255,255,0.25)_inset]
    `}>
      {props.children}
    </div>)
  }
  return (
    <>
      <section className={"flex flex-row justify-end mb-4"}>
        <RecordButton3
          onClick={() => { navigate(PageOrModalPathEnum.InviteSettlementRecordPage) }}
          className={"text-white px-4 py-2"}>
          Registro
        </RecordButton3>
      </section>
      <section className={"flex flex-row w-full mb-4"}>
        <BoardContainer>
          <div className={"text-4xl text-white"}>R${props.data.totalReward}</div>
          <div className={"text-base text-white mt-3"}>Prêmio total</div>
        </BoardContainer>
        <BoardContainer>
          <div className={"text-4xl text-white"}>R${props.data.paidReward}</div>
          <div className={"text-base text-white mt-3"}>Bônus já liquidados</div>
        </BoardContainer>
        <BoardContainer>
          <div className={"text-4xl text-white"}>R${props.data.waitForCalReward}</div>
          <div className={"text-base text-white leading-none mt-3"}>Bônus aguardando liquidação</div>
          <div className={"text-base text-white "}>(Atualizar a cada 24 horas)</div>
        </BoardContainer>
      </section>
    </>
  )
}