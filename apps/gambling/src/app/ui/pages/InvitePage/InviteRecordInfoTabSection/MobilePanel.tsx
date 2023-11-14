import {MobileCommonGreenTable} from "./MobileCommonGreenTable";
import {MobileCommonBlueTable} from "./MobileCommonBlueTable";
import {MobileCommonOrangeTable} from "./MobileCommonOrangeTable";
import styled from "styled-components";

const GreenHRline = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,transparent,#FFF600,#4FFB0C,transparent);
`

type IMobilePanel = {
  isProxy: boolean;

  totalRewardData: any;

  totalInviteData: any;
  mobileTotalPanelMode: any;
  setMobileTotalPanelMode: (value: "1" | "2" | "3") => void;

  dailyData: any;
  mobileDailyPanelMode: any;
  setMobileDailyPanelMode: (value: "1" | "2" | "3") => void;
}
export const MobilePanel = ({
                              isProxy,
                              totalRewardData,
                              totalInviteData,
                              mobileTotalPanelMode,
                              setMobileTotalPanelMode,

                              dailyData,
                              mobileDailyPanelMode,
                              setMobileDailyPanelMode,
                            }: IMobilePanel) => {
  return (
    <div>
      <section className={"mb-4"}>
        <MobileCommonGreenTable data={totalRewardData}/>
        <GreenHRline className={"my-4"}/>
      </section>

      <section className={"mb-4"}>
        <div className={"text-[#4E91EF] font-bold text-lg text-left mb-2"}>Dados totais<span className={"text-xs"}>(Atualize a cada 30 minutos)</span></div>
        <MobileCommonBlueTable isProxy={isProxy} data={totalInviteData} type={mobileTotalPanelMode} onClick={(type) => setMobileTotalPanelMode(type as "1" | "2" | "3")} />
      </section>

      <section className={"mb-4"}>
        <div className={"text-[#EE9544] font-bold text-lg text-left mb-2"}>Dados diários<span className={"text-xs"}>(Atualize a cada 30 minutos)</span></div>
        <MobileCommonOrangeTable isProxy={isProxy} records={dailyData} type={mobileDailyPanelMode} onClick={(type) => setMobileDailyPanelMode(type as "1" | "2" | "3")} />
      </section>
    </div>
  )
}
