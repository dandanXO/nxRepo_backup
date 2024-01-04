import React from "react";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { Button } from "../../../../components-bs/Buttons/Button";
import { ContaContainer, IUserInfoStatusPopoverBalanceInfoProps } from "../../index";
import { useNavigate } from "react-router";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";

export const UserInfoStatusPopoverBalanceInfo = ({
  totalBalanceSheetValue,
  totalReasableValue
}: IUserInfoStatusPopoverBalanceInfoProps) => {
  const navigate = useNavigate();
  const {onClickToWallet} = usePageNavigate();

  return (
    <ContaContainer onClick={()=>onClickToWallet({'panelType':'deposit'})}>
      <Button className={"text-sm mb-4 !shadow-none"} >
        <span className={"text-base"}>Total Da Conta</span>
        <img className="w-[22px] h-[22px]" alt="arrow" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAPFBMVEUAAAD////////////////////////////////////////////////////////////////////////////YSWgTAAAAE3RSTlMAwBAHqS747+PUj1hAtbQdc3Icl2kucgAAAG9JREFUOMvtk0sWgCAMA1UQPyiCc/+7eoVxwY6s572maToNdVBYJXgTgwSZFwMuMxyvMhlhd0ZP2C5FVkhZkTlBU+S1wanIdUcG+hx/Ai0WvPVou4yMRwZeBdcgZVsKWzNZ3EfMLfZyhRjsuw711QcU+AVTejTE/gAAAABJRU5ErkJggg=="}/>
      </Button>

      <div className={"flex flex-row justify-center items-center px-7"}>
        <div className={"flex flex-col mr-24"}>
          <span className={"text-main-primary-main text-lg"}>{totalBalanceSheetValue}</span>
          <span className={"text-white"}>Balanço Total</span>
        </div>
        <div className={"flex flex-col"}>
          <span className={"text-main-primary-main text-lg"}>{totalReasableValue}</span>
          <span className={"text-white"}>Retirável Total</span>
        </div>
      </div>
    </ContaContainer>
  )
}
