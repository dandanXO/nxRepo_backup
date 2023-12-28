import React from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import styled from "styled-components";
import { environment } from "../../../../environments/environment";
import { tcx } from "../../utils/tcx";
import { CloseCircleOutlined } from "@ant-design/icons";
import {CloseICON} from "../../components-bs/Icons/CloseICON";
import {RootState} from "../../../reduxStore";
import { useDispatch, useSelector } from "react-redux";


const Container = styled.div`
  //width: 100%;
  //height: 100%;
  //background-image: url(assets/${environment.assetPrefix}/ad_bg_2.png);
  background: linear-gradient(180deg, var(--background-modal-from), var(--background-modal-to));
  //background-repeat: no-repeat;
  //background-size: cover;
  border: 2px solid var(--stroke-modal);
  border-radius: 20px;
`;

const ModalTitle = styled.div`
  text-align: center;
  line-height: 26px;
  //text-shadow: 0px 3px 0px #0461D6;
`

const ModalButton = styled.button`
  border-radius: 25px;
  background: linear-gradient(180deg,var(--secondary-main-from) 0%,var(--secondary-main-to) 100%);
  //position: absolute;
  //bottom: 34px;
  //left: 50%;
  //margin-left: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
`

interface IDepositAdvertisementModalProps {
  close: () => void;
  onConfirm: () => void
}

export const DepositAdvertisementModal = ({
  close,
  onConfirm
}:IDepositAdvertisementModalProps) => {

  const { isMobile } = useBreakpoint();
  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);

  return (
    <div className={"z-[1005] fixed left-0 top-0 right-0 bottom-0 flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event) => {
      close();
    }}>

      <Container
        className={tcx(
          "bg-[black] rounded-2xl flex flex-col items-center relative px-5 py-8",
          "w-[90vw] max-w-[400px] h-auto",
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}>

        <div className={tcx(
          "flex flex-row justify-end mb-2 absolute right-[20px]",
          ['top-[20px]', !isMobile],
          ['right-[50%] translate-x-[50%] bottom-0 translate-y-[50px]', isMobile]
        )}>
          <div
            onClick={() => {
              close();
            }}
          >
            <CloseICON outLined={isMobile}/>
          </div>
        </div>

        <div className={tcx('text-white text-3xl mt-5 font-extrabold', ['text-base mt-0', isMobile])}>Equilíbrio insuficiente!</div>

        <img
          alt='icon'
          className={tcx('w-[220px] h-[220px] mt-6 mb-3', ['w-[100px] h-[100px] mt-3 mb-2', isMobile])}
          src={`assets/${environment.assetPrefix}/ic_advertisement_deposit.png`}
        />

        <div className={tcx("mb-4 text-white text-center text-lg font-medium mt-4", ['text-xs mt-1', isMobile])}>
          Caros clientes VIP, você pode obter até {recharge_first_cashback_rate} de recompensa ao recarregar. Quanto mais você recarrega, mais bônus você recebe! Sem limite de tempo!
        </div>

        <div className={"flex flex-col justify-center items-center"}>
          <ModalButton
            className={tcx('text-lg w-[168px] h-[52px]', ['text-sm w-[99px] h-[31px]', isMobile])}
            onClick={() => onConfirm() }
          >
            {/*<img alt={"telegram"} className="w-[14px] h-[10px] mr-4"/>*/}
            <span className={"font-bold"}>Depósito</span>
          </ModalButton>
        </div>


      </Container>
    </div>
  )
}
