import React from "react";
import { PageOrModalPathEnum } from "../../../../../PageOrModalPathEnum";
import { IUserInfoStatusPopoverInviteInfoProps } from "../../index";
import { useNavigate } from "react-router";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { formatLocaleMoney } from "../../../../../utils/format";

const Container = styled.div`
  background: rgb(from var(--primary-assistant) r g b / 20%);
`

export const UserInfoStatusPopoverInviteInfo = ({
  totalPrize,
  bonusAwaitingSettlement,
  fullWithdrawable
}: IUserInfoStatusPopoverInviteInfoProps) => {
  const navigate = useNavigate();

  return (
    <div
      className='rounded-xl text-white'
    >
      <div
        className='flex justify-between items-center py-3 px-[14px] text-base bg-[rgba(255,255,255,30%)] rounded-t-xl cursor-pointer'
        onClick={()=>navigate(PageOrModalPathEnum.InvitePage)}
      >
        <div>Conta Promovida</div>
        <RightOutlined />
      </div>

      <Container
        className='rounded-b-xl flex text-xs text-center py-3 gap-2'
      >
        <div className='w-1/3'>
          <div className='text-base'>R$ {formatLocaleMoney(totalPrize)}</div>
          <div>Prêmio total</div>
        </div>
        <div className='w-1/3'>
          <div className='text-base'>R$ {formatLocaleMoney(bonusAwaitingSettlement)}</div>
          <div>Bônus aguardando liquidação</div>
        </div>
        <div className='w-1/3'>
          <div className='text-base'>R$ {formatLocaleMoney(fullWithdrawable)}</div>
          <div>Bônus já liquidados</div>
        </div>
      </Container>
    </div>
  )
}
