import { DesktopBoard } from "../../components/DesktopBoard";
import { useNavigate } from "react-router";
import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';
import { DesktopDailyTable } from "./DesktopDailyTable";
import { MobileDailyTable } from "./MobileDailyTable"
import { IDesktopPanel } from "../..";
import { Container } from "apps/gambling/src/app/ui/components/container/Container";
import { DesktopTotalTable } from "./DesktopTotalTable";
import { TabItem } from "apps/gambling/src/app/ui/components/TabItem/env/riojungle/TabItem";
import { BackNavigation } from "apps/gambling/src/app/ui/components/BackNavigation/BackNavigation";
import { IPanelMode } from "../../..";
import { PageOrModalPathEnum } from "apps/gambling/src/app/ui/PageOrModalPathEnum";
import useBreakpoint from "../../../../../hooks/useBreakpoint";

export const DesktopPanel = ({
  isProxy,
  totalRewardData,

  totalInviteData,
  // mobileTotalPanelMode,
  // setMobileTotalPanelMode,
  totalPanelMode,
  setTotalPanelMode,

  dailyData,
  mobileDailyPanelMode,
  setMobileDailyPanelMode,
  orangeRecordDate,
  onOrangeRecordDateSelect,
  dailyPanelMode,
  setDailyPanelMode,
  setPanelMode
}: IDesktopPanel) => {
  const { isTablet } = useBreakpoint();
  const navigate = useNavigate();
  return (
    <>
      <div className='flex justify-between items-center'>
        <BackNavigation
          className='pl-0 pt-5 pb-6 text-2xl'
          onClick={() => setPanelMode("howto")}
        />
        <button
          onClick={() => navigate(PageOrModalPathEnum.InviteSettlementRecordPage)}
          className="text-sm lg:text-lg leading-5 lg:leading-7 text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] relative flex flex-row justify-center py-2.5 lg:py-1.5 px-5 cursor-pointer rounded-[100px]"
        >
          Registro
        </button>
      </div>
      <DesktopBoard data={totalRewardData} />
      <section>

        <div className={"flex flex-col lg:flex-row justify-between items-center flex-wrap my-3 md:my-5 lg:my-8"}>
          <div id={"tab-item"} className="flex justify-start items-start ">
            <div className="bg-[#333333] flex flex-row rounded-[100px]">
              <TabItem active={totalPanelMode === "1"} onClick={() => setTotalPanelMode("1")} name={'Nível 1'} />
              <TabItem active={totalPanelMode === "2"} onClick={() => setTotalPanelMode("2")} name={'Nível 2'} />
              <TabItem active={totalPanelMode === "3"} onClick={() => setTotalPanelMode("3")} name={'Nível 3'} />
            </div>
          </div>
          <div className={"text-sm lg:text-base text-center lg:text-right mt-2 lg:mt-0 font-bold"}>
            {isProxy !== undefined && <div className="text-[#3B82F6]">Dividends:R$ {totalInviteData?.dividendos !== undefined && totalInviteData?.dividendos}</div>}
            <div className="text-[#F59E0B]">Atualize a cada 30 minutos</div>
          </div>
        </div>

        <div className={"mb-4"}>
          <DesktopTotalTable isProxy={isProxy} type={totalPanelMode} data={totalInviteData} />
        </div>

      </section>

      <section>

        <div className={"flex flex-col lg:flex-row justify-between items-center flex-wrap my-3 md:my-5 lg:my-8"}>
          <div id={"tab-item"} className="flex justify-start items-start">
            <div className="bg-[#333333] flex flex-row rounded-[100px]">
              <TabItem active={dailyPanelMode === "1"} onClick={() => setDailyPanelMode("1")} name={'Nível 1'} />
              <TabItem active={dailyPanelMode === "2"} onClick={() => setDailyPanelMode("2")} name={'Nível 2'} />
              <TabItem active={dailyPanelMode === "3"} onClick={() => setDailyPanelMode("3")} name={'Nível 3'} />
            </div>
          </div>
          <div className={"text-sm lg:text-base text-center lg:text-right mt-2 lg:mt-0 font-bold"}>
            {isProxy !== undefined && <div className="text-[#3B82F6]">Dividends:R$ {dailyData !== undefined ? dailyData[0]?.dividendos : ''}</div>}
            <div className="text-[#F59E0B]">Atualize a cada 30 minutos</div>
          </div>
        </div>

        <div className={"mb-4"}>
          {isTablet?(
            <MobileDailyTable isProxy={isProxy} records={dailyData} type={mobileDailyPanelMode} onClick={(type) => setMobileDailyPanelMode(type as "1" | "2" | "3")} recordDate={orangeRecordDate} onRecordDateSelect={onOrangeRecordDateSelect} />
          ):(
            <DesktopDailyTable isProxy={isProxy} type={dailyPanelMode} records={dailyData} />
          )}
          
        </div>

      </section>
    </>
  )
}
