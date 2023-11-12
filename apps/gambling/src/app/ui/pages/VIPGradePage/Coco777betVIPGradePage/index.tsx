import React from "react";
import { useAutoUpdateBalance } from "../../../hooks/useAutoUpdateBalance";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { tcx } from "../../../utils/tcx";
import CurrentLabelInfoCard from "./CurrentLabelInfoCard";
import { GetVIPInfoResponse } from "../../../../external";

interface ICoco777betVIPGradePageProps {
  currentLevel: number
  userVIPInfo?: GetVIPInfoResponse
  isMobile: boolean
}


const Coco777betVIPGradePage = ({
  isMobile,
  userVIPInfo,
  currentLevel
}:ICoco777betVIPGradePageProps) => {

  const navigate = useNavigate();
  const { updateBalance } = useAutoUpdateBalance();

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
        <div className={tcx('text-start text-4xl py-5', ['text-base py-2', isMobile])}>Meu progresso VIP </div>
        <CurrentLabelInfoCard userVIPInfo={userVIPInfo} currentLevel={currentLevel} />
      </section>
    </main>
  )
}

export default Coco777betVIPGradePage;
