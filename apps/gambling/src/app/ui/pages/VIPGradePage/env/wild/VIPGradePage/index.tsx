import React from "react";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { tcx } from "../../../../../utils/tcx";
import CurrentLevelInfoCard from "./CurrentLevelInfoCard";
import { GetUserVIPAllInfoResponse } from "../../../../../../external";
import LevelInfoCard from "./LevelInfoCard";
import {PageContainer} from "../../../../../components-bs/PageContainer";
import {BackNavigation} from "../../../../../components-bs/BackNavigation/BackNavigation";
import { GetVIPInfoResponse } from "../../../../../../external/UserEndpoint";
import { GetPunchInConfigResponse } from "../../../../../../external/PunchInEndpoint";

interface ICoco777betVIPGradePageProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
  isMobile: boolean
  allLevelInfo: GetUserVIPAllInfoResponse['data'];
  allSignInConfig?: GetPunchInConfigResponse['data']['signInAllConfig']
}


const Coco777betVIPGradePage = ({
  isMobile,
  userVIPInfo,
  currentLevel,
  allLevelInfo,
  allSignInConfig
}:ICoco777betVIPGradePageProps) => {

  const navigate = useNavigate();

  const allLevelInfoWithBonus = allLevelInfo?.map((info)=>{
    const currentLevelSignInConfigData = allSignInConfig?.find((config)=> {
      return config.identifier.split('::')[2].replace('V', '') === `${info.level}`
    })


    const currentLevelSignInConfig = JSON.parse(currentLevelSignInConfigData?.value || '[]');
    const signInBonus = currentLevelSignInConfig?.reduce(
      (acc: number, current: { cashback: number }) => acc + current.cashback,
      0
    );

    return {
      ...info,
      signInBonus
    }
  })



  return (
    <PageContainer>

      <BackNavigation
        onClick={() => {
          navigate(PageOrModalPathEnum.IndexPage);
        }}
      />

      <section className='mt-2'>
        <div className={tcx('text-start text-4xl py-5', ['text-base py-2', isMobile])}>Meu progresso VIP</div>
        <CurrentLevelInfoCard userVIPInfo={userVIPInfo} currentLevel={currentLevel} />
      </section>

      <section className='mt-2'>
        <div className={tcx('text-start text-4xl py-5', ['text-base py-2', isMobile])}>Descrição do nível VIP</div>
        {
          allLevelInfoWithBonus?.map((info) => (
            <LevelInfoCard className='mb-2' {...info} />
          ))
        }
      </section>
    </PageContainer>
  )
}

export default Coco777betVIPGradePage;
