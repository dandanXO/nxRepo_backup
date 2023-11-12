import React from "react";
import { useAutoUpdateBalance } from "../../../hooks/useAutoUpdateBalance";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { tcx } from "../../../utils/tcx";
import CurrentLevelInfoCard from "./CurrentLevelInfoCard";
import { GetSignInConfigResponse, GetUserVIPAllInfoResponse, GetVIPInfoResponse } from "../../../../external";
import LevelInfoCard from "./LevelInfoCard";

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
  const { updateBalance } = useAutoUpdateBalance();

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
    <main className={tcx('px-10', ['px-1', isMobile])}>
      <nav
        className={tcx('flex items-center text-white text-2xl', ['hidden', isMobile])}
        onClick={() => {
          updateBalance();
          navigate(PageOrModalPathEnum.IndexPage);
        }}
      >
        <LeftOutlined />
        <div>Retornar</div>
      </nav>

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
    </main>
  )
}

export default Coco777betVIPGradePage;
