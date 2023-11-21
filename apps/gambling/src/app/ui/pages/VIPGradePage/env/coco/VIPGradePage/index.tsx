import React from "react";

import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { tcx } from "../../../../../utils/tcx";
import CurrentLevelInfoCard from "./CurrentLevelInfoCard";
import { GetSignInConfigResponse, GetUserVIPAllInfoResponse, GetVIPInfoResponse } from "../../../../../../external";
import LevelInfoCard from "./LevelInfoCard";
import {Container} from "../../../../../components/container/Container";
import {BackNavigation} from "../../../../../components/BackNavigation/BackNavigation";

interface ICoco777betVIPGradePageProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
  isMobile: boolean
  allLevelInfo: GetUserVIPAllInfoResponse['data']
  allSignInConfig?: GetSignInConfigResponse['data']['signInAllConfig']
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
    <Container>

      <BackNavigation
        onClick={() => {
          navigate(PageOrModalPathEnum.IndexPage);
        }}
      />

      <section>
        <div className={tcx('text-start text-4xl py-6 font-bold text-[var(--primary-assistant)]', ['text-lg py-2', isMobile])}>Meu progresso VIP</div>
        <CurrentLevelInfoCard userVIPInfo={userVIPInfo} currentLevel={currentLevel} />
      </section>

      <section className={isMobile?'mb-16':''}>
        <div className={tcx('text-start text-4xl py-6 font-bold text-[var(--primary-assistant)]', ['text-lg py-2', isMobile])}>Descrição do nível VIP</div>
        {
          allLevelInfoWithBonus?.map((info) => (
            <LevelInfoCard className={tcx('mb-6', ['mb-[14px]', isMobile])} {...info} />
          ))
        }
      </section>
    </Container>
  )
}

export default Coco777betVIPGradePage;
