import cx from 'classnames'

import styled from "styled-components";
import { environment } from "apps/gambling/src/environments/environment";
import { MobileMainBoard } from "../../components/MobileMainBoard";
import { MobileTotalTable } from "../../components/MobileTotalTable";
import { MobileDailyTable } from "../../components/MobileDailyTable";
import { IMobilePanel } from '../..';


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
      </section>

      <section className={"mb-4"}>

        <MobileTotalTable isProxy={isProxy} data={totalInviteData} type={mobileTotalPanelMode} onClick={(type) => setMobileTotalPanelMode(type as "1" | "2" | "3")} />
      </section>

      <section className={"mb-4"}>

        <MobileDailyTable isProxy={isProxy} records={dailyData} type={mobileDailyPanelMode} onClick={(type) => setMobileDailyPanelMode(type as "1" | "2" | "3")} recordDate={orangeRecordDate} onRecordDateSelect={onOrangeRecordDateSelect} />
      </section>
    </div>
  )
}
