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

export const UserInfoStatusPopoverVIPInfo = ({
 userVIPInfo,
 currentLevel
}: IUserInfoStatusPopoverVIPInfoProps) => {
  const navigate = useNavigate();

  return (
    <VIPContainer>
      <div className={"mt-4 flex flex flex-row items-center"}>
        <img className="w-9 h-9 mr-3 ml-3" src={`assets/${environment.uVersion}/ic_vip01.png`}/>
        <span className="text-3xl font-bold pr-4 mr-7" style={{ background: 'linear-gradient(45deg, var(--btn-gradient-vip-from), var(--btn-gradient-vip-to))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VIP{currentLevel}</span>
        <RightOutlined className="ml-40" style={{ fontSize: 25, color: 'white', fontWeight: 1000 }} onClick={() => navigate(PageOrModalPathEnum.VIPGradePage)}/>
      </div>

      <VIPBorderStyleContainer className={'flex flex-row'}>
        <div className={'relative mr-5 h-[30px] w-[310px] flex-auto rounded-3xl  text-left'}>
          <ProgressBar1
            progress={
              (userVIPInfo?.data?.vip_score || 0) /
              (userVIPInfo?.data?.next_level_score || 1)
            }
            currentLevel={currentLevel}
            userVIPInfo={userVIPInfo}
          />
        </div>
      </VIPBorderStyleContainer>

      <VIPBorderStyleContainer className={'flex flex-row'}>
        <div className={'relative mr-5 h-[30px] w-[310px] flex-auto rounded-3xl  text-left'}>
          <ProgressBar2
            progress={
              userVIPInfo?.data?.flow_progress
                ? userVIPInfo?.data?.flow_progress / 100
                : 0
            }
            currentLevel={currentLevel}
            userVIPInfo={userVIPInfo}
          />
        </div>
      </VIPBorderStyleContainer>
    </VIPContainer>
  )
}
