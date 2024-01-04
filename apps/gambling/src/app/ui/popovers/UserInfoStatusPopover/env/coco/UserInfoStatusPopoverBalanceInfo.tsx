import React from "react";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { IUserInfoStatusPopoverBalanceInfoProps } from "../../index";
import { useNavigate } from "react-router";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { formatLocaleMoney } from "../../../../utils/format";
import {PopoverDepositButton} from "../../../../components-bs/Buttons/env/coco/PopoverDepositButton";
import {PopoverWithdrawButton} from "../../../../components-bs/Buttons/env/coco/PopoverWithdrawButton";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";

const Container = styled.div`
  background: rgb(from var(--primary-assistant) r g b / 20%);
`

export const UserInfoStatusPopoverBalanceInfo = ({
  totalBalanceSheetValue,
  totalReasableValue
}: IUserInfoStatusPopoverBalanceInfoProps) => {
  const navigate = useNavigate();
  const {onClickToWallet} = usePageNavigate();


  return (
    <div
      className='rounded-xl text-white'
    >
      <div
        className='flex justify-between items-center py-3 px-[14px] text-base bg-[rgba(255,255,255,30%)] rounded-t-xl cursor-pointer'
        onClick={()=>onClickToWallet({'panelType':'deposit'})}
      >
        <div>Total Da Conta</div>
        <RightOutlined />
      </div>

      <Container
        className='rounded-b-xl flex text-sm text-center'
      >
        <div className='w-1/2 px-3 pb-4 pt-2 flex flex-col gap-2'>
          <div className='text-lg'>R$ {formatLocaleMoney(totalBalanceSheetValue)}</div>
          <div >Balanço Total</div>
          <PopoverDepositButton onClick={()=>onClickToWallet({'panelType':'deposit'})}/>
        </div>
        <div className='w-1/2 px-3 pb-4 pt-2 flex flex-col gap-2'>
          <div className='text-lg'>R$ {formatLocaleMoney(totalReasableValue)}</div>
          <div >Retirável Total</div>
          <PopoverWithdrawButton onClick={()=>onClickToWallet({'panelType':'withdraw'})} />
        </div>
      </Container>
    </div>
  )
}
