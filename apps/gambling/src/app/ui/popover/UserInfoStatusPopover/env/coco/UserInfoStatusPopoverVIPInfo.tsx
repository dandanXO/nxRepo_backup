import React from "react";
import {
  IUserInfoStatusPopoverVIPInfoProps,
  ProgressBar1,
  ProgressBar2,
  VIPBorderStyleContainer,
  VIPContainer
} from "../../index";
import { environment } from "../../../../../../environments/environment";
import { RightOutlined } from "@ant-design/icons";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import CurrentVIPIcon from "../../../../components/CurrentVIPIcon";
import ProgressBar from "../../../../pages/VIPGradePage/env/coco/VIPGradePage/ProgressBar";

export const UserInfoStatusPopoverVIPInfo = ({
  userVIPInfo,
  currentLevel
}: IUserInfoStatusPopoverVIPInfoProps) => {
  const navigate = useNavigate();

  const vipScore = userVIPInfo?.data?.vip_score || 0
  const nextLevelScore = userVIPInfo?.data?.next_level_score || 1
  const flowProgress = userVIPInfo?.data?.flow_progress || 0
  const flow = userVIPInfo?.data?.flow || 0
  const nextLevelFlow = userVIPInfo?.data?.next_level_flow || 0


  const depositPercent = ((vipScore / nextLevelScore) * 100)

  return (
    <div
      className='w-full border-2 border-[var(--primary-assistant)] bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)] rounded-lg px-3 pt-2 pb-4 cursor-pointer'
      onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}
    >
      <div className='flex items-center text-white justify-between'>
        <CurrentVIPIcon
          className='flex-row justify-start gap-3'
          imageClassName='w-[54px]'
          textClassName='w-[53px]'
          level={currentLevel}
        />
        <RightOutlined />
      </div>

      <div className='flex flex-col gap-2 text-sm'>
        <div className='mt-2 flex flex-col gap-2'>
          <div className='flex justify-between'>
            <div className='text-white'>Próximo nível: {depositPercent > 100 ? 100 : depositPercent.toFixed(0)}%</div>
            <div className='text-[var(--secondary-assistant)]'>Depósitos totais: R$ {vipScore?(vipScore / 100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}) : 0}</div>
          </div>
          <ProgressBar
            className='h-6 bg-white'
            rounded='rounded-full'
            progress={vipScore / nextLevelScore}
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='flex justify-between px-4 h-full items-center text-[var(--text-deposit)]'>
              <div>VIP{currentLevel}</div>
              <div>R$ {vipScore ? (vipScore/100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}): '0,00'}/R$ {
                nextLevelScore ? (nextLevelScore/100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}): '0,00'
              }</div>
              <div>VIP{currentLevel+1}</div>
            </div>
          </ProgressBar>
        </div>

        <div className='mt-2 flex flex-col gap-2'>
          <div className='flex justify-between'>
            <div className='text-white'>Próximo nível: {flowProgress}%</div>
            <div className='text-[var(--secondary-assistant)]'>Pontos de apostas: R$ {flow? (flow/100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}) : '0,00'}</div>
          </div>
          <ProgressBar
            className='h-6 bg-white'
            rounded='rounded-full'
            progress={flowProgress / 100}
            progressColor='linear-gradient(180deg,var(--secondary-main-from),var(--secondary-main-to))'
          >
            <div className='flex justify-between px-4 h-full items-center text-[var(--text-deposit)]'>
              <div>VIP{currentLevel}</div>
              <div>R$ {flow ? (flow/100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}): '0,00'}/R$ {
                nextLevelFlow ? (nextLevelFlow/100).toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2}): '0,00'
              }</div>
              <div>VIP{currentLevel+1}</div>
            </div>
          </ProgressBar>
        </div>
      </div>

    </div>
  )
}
