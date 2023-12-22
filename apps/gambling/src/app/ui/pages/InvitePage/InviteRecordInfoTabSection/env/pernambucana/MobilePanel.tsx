import cx from 'classnames'

import styled from "styled-components";
import { environment } from "apps/gambling/src/environments/environment";
import { MobileMainBoard } from "../../components/MobileMainBoard";
import { MobileTotalTable } from "../../components/MobileTotalTable";
import { MobileDailyTable } from "../../components/MobileDailyTable";
import { IMobilePanel } from '../..';


const GreenHRline = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg,transparent,#FFF600,#4FFB0C,transparent);
`

export const MobilePanel = ({
  isProxy,
  totalRewardData,
  totalInviteData,
  mobileTotalPanelMode,
  setMobileTotalPanelMode,
  dailyData,
  mobileDailyPanelMode,
  setMobileDailyPanelMode,
  orangeRecordDate,
  onOrangeRecordDateSelect
}: IMobilePanel) => {

  return (
    <div>
      <section className={"mb-4"}>
        <MobileMainBoard data={totalRewardData} />
        <GreenHRline className={"my-4"} />
      </section>

      <section className={"mb-4"}>
        <div className={cx(" text-base text-left mb-1 text-[#4E91EF] font-bold", {})}>
          <span className="font-bold mr-2">Dados totais</span><span className={"text-sm"}>(Atualize a cada 30 minutos)</span></div>
        <MobileTotalTable isProxy={isProxy} data={totalInviteData} type={mobileTotalPanelMode} onClick={(type) => setMobileTotalPanelMode(type as "1" | "2" | "3")} />
      </section>

      <section className={"mb-4"}>
        <div className={cx("  text-base text-left mb-1 text-[#EE9544] font-bold", {})}>
          <span className="font-bold mr-2">Dados diários</span><span className={"text-sm"}>(Atualize a cada 30 minutos)</span></div>
        <MobileDailyTable isProxy={isProxy} records={dailyData} type={mobileDailyPanelMode} onClick={(type) => setMobileDailyPanelMode(type as "1" | "2" | "3")} recordDate={orangeRecordDate} onRecordDateSelect={onOrangeRecordDateSelect} />
      </section>
    </div>
  )
}
