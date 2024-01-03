import cx from 'classnames'

import styled from "styled-components";
import { environment } from "apps/gambling/src/environments/environment";
import { MobileMainBoard } from "../../components/MobileMainBoard";
import { MobileTotalTable } from "../../components/MobileTotalTable";
import { MobileDailyTable } from "../../components/MobileDailyTable";
import { IMobilePanel } from '../..';
import { BackNavigation } from '../../../../../components-bs/BackNavigation/BackNavigation';
import { useNavigate } from 'react-router';
import { PageOrModalPathEnum } from 'apps/gambling/src/app/ui/PageOrModalPathEnum';


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
  onOrangeRecordDateSelect,
  setPanelMode
}: IMobilePanel) => {
  const navigate = useNavigate();

  return (
    <>
      <div className='flex justify-between items-center'>
        <BackNavigation
          className='text-base mb-3'
          onClick={() => setPanelMode("howto")}
        />
        <button
          onClick={() => navigate(PageOrModalPathEnum.InviteSettlementRecordPage)}
          className="text-sm lg:text-lg leading-5 lg:leading-7 text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] relative flex flex-row justify-center py-2.5 lg:py-1.5 px-5 cursor-pointer rounded-[100px]"
        >
          Registro
        </button>
      </div>

      <MobileMainBoard data={totalRewardData} />
      <MobileTotalTable isProxy={isProxy} data={totalInviteData} type={mobileTotalPanelMode} onClick={(type) => setMobileTotalPanelMode(type as "1" | "2" | "3")} />
      <MobileDailyTable isProxy={isProxy} records={dailyData} type={mobileDailyPanelMode} onClick={(type) => setMobileDailyPanelMode(type as "1" | "2" | "3")} recordDate={orangeRecordDate} onRecordDateSelect={onOrangeRecordDateSelect} />
    </>
  )
}
