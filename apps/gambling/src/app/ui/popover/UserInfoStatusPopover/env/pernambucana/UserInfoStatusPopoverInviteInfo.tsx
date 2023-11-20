import React from "react";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { Button } from "../../../../components/Buttons/Button";
import { ContaContainer, IUserInfoStatusPopoverInviteInfoProps } from "../../index";
import { useNavigate } from "react-router";

export const UserInfoStatusPopoverInviteInfo = ({
  totalPrize,
  bonusAwaitingSettlement,
  fullWithdrawable
}: IUserInfoStatusPopoverInviteInfoProps) => {
  const navigate = useNavigate();

  return (
    <ContaContainer className={'mt-3'} onClick={() => {
      navigate(PageOrModalPathEnum.InvitePage)
    }}>
      <Button className={"text-sm mb-4 !shadow-none"}>
        <span className={"text-base"}>Conta Promovida</span>
        <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
      </Button>

      <div className={"flex flex-row justify-between items-start px-3"}>
        <div className={"flex flex-col mr-2"}>
          <span className={"text-main-primary-main text-lg"}>{totalPrize}</span>
          <span className={"text-white"}>Prêmio total</span>
        </div>

        <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

        <div className={"flex flex-col  mr-2"}>
          <span className={"text-main-primary-main text-lg"}>{bonusAwaitingSettlement}</span>
          <span className={"text-white"}>
              Bônus aguardando
              <br/>
              liquidação
            </span>
        </div>

        <div className={"w-[1px] h-[30px] bg-[rgba(255,255,255,.1)] self-center mr-1"}/>

        <div className={"flex flex-col"}>
          {/*<span className={"text-[#FF7D03] text-lg"}>{accountPromotedSwingValue}</span>*/}
          <span className={"text-main-primary-main text-lg"}>{fullWithdrawable}</span>
          <span className={"text-white"}>Retirável Total</span>
        </div>
      </div>
    </ContaContainer>
  )
}
