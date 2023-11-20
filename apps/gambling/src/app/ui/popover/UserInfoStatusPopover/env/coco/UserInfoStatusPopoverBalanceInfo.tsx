import React from "react";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { IUserInfoStatusPopoverBalanceInfoProps } from "../../index";
import { useNavigate } from "react-router";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
          <div className='text-lg'>R$ {totalBalanceSheetValue.toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
          <div >Balanço Total</div>
          <button
            className='w-full bg-gradient-to-r from-[var(--button-deposit-from)] to-[var(--button-deposit-to)] py-[10px] rounded-lg'
            onClick={()=>navigate(PageOrModalPathEnum.WalletPage)}
          >
            Depósito
          </button>
        </div>
        <div className='w-1/2 px-3 pb-4 pt-2 flex flex-col gap-2'>
          <div className='text-lg'>R$ {totalReasableValue.toLocaleString('pt-BR', {maximumFractionDigits:2, minimumFractionDigits:2})}</div>
          <div >Retirável Total</div>
          <button
            className='w-full bg-gradient-to-r from-[var(--button-withdraw-from)] to-[var(--button-withdraw-to)] py-[10px] rounded-lg'
            onClick={()=>navigate(PageOrModalPathEnum.WalletPage)}
          >
            Retirar
          </button>
        </div>
      </Container>
    </div>
  )
}
