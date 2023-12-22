import { DesktopBoard } from "../../components/DesktopBoard";
import { useNavigate } from "react-router";
import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';
import { DesktopDailyTable } from "./DesktopDailyTable";
import { IDesktopPanel } from "../..";
import { Container } from "apps/gambling/src/app/ui/components/container/Container";
import { DesktopTotalTable } from "./DesktopTotalTable";
import { TabItem } from "apps/gambling/src/app/ui/components/TabItem/env/riojungle/TabItem";

export const DesktopPanel = ({
  isProxy,
  totalRewardData,

  totalInviteData,
  // mobileTotalPanelMode,
  // setMobileTotalPanelMode,
  totalPanelMode,
  setTotalPanelMode,

  dailyData,
  // mobileDailyPanelMode,
  // setMobileDailyPanelMode,
  dailyPanelMode,
  setDailyPanelMode,
}: IDesktopPanel) => {

  const navigate = useNavigate();
  return (
    <Container>
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
            {isProxy!==undefined && <div className="text-[#3B82F6]">Dividends:R$ {totalInviteData?.dividendos!==undefined && totalInviteData?.dividendos}</div>}
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
            {isProxy !== undefined && <div className="text-[#3B82F6]">Dividends:R$ {dailyData!==undefined ? dailyData[0]?.dividendos : ''}</div>}
            <div className="text-[#F59E0B]">Atualize a cada 30 minutos</div>
          </div>
        </div>

        <div className={"mb-4"}>
          <DesktopDailyTable isProxy={isProxy} type={dailyPanelMode} records={dailyData} />
        </div>

      </section>
    </Container>
  )
}
