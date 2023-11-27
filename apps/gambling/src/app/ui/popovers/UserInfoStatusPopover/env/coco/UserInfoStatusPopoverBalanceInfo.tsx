import React from "react";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { IUserInfoStatusPopoverBalanceInfoProps } from "../../index";
import { useNavigate } from "react-router";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { format } from "../../../../utils/format";
import {PopoverDepositButton} from "../../../../components/Buttons/env/coco/PopoverDepositButton";
import {PopoverWithdrawButton} from "../../../../components/Buttons/env/coco/PopoverWithdrawButton";

const Container = styled.div`
  background: rgb(from var(--primary-assistant) r g b / 20%);
`

export const UserInfoStatusPopoverBalanceInfo = ({
  totalBalanceSheetValue,
  totalReasableValue
}: IUserInfoStatusPopoverBalanceInfoProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='rounded-xl text-white'
    >
      <div
        className='flex justify-between items-center py-3 px-[14px] text-base bg-[rgba(255,255,255,30%)] rounded-t-xl cursor-pointer'
        onClick={()=>navigate(PageOrModalPathEnum.WalletPage)}
      >
        <div>Total Da Conta</div>
        <RightOutlined />
      </div>

      <Container
        className='rounded-b-xl flex text-sm text-center'
      >
        <div className='w-1/2 px-3 pb-4 pt-2 flex flex-col gap-2'>
          <div className='text-lg'>R$ {format(totalBalanceSheetValue)}</div>
          <div >Balanço Total</div>
          <PopoverDepositButton onClick={()=>navigate(PageOrModalPathEnum.WalletPage)}/>
        </div>
        <div className='w-1/2 px-3 pb-4 pt-2 flex flex-col gap-2'>
          <div className='text-lg'>R$ {format(totalReasableValue)}</div>
          <div >Retirável Total</div>
          <PopoverWithdrawButton onClick={()=>navigate(PageOrModalPathEnum.WalletPage)} />
        </div>
      </Container>
    </div>
  )
}
