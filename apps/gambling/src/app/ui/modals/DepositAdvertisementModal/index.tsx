import React from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import styled from "styled-components";
import { environment } from "../../../../environments/environment";
import { tcx } from "../../utils/tcx";
import { CloseCircleOutlined } from "@ant-design/icons";


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

  return (
    <div className={"z-[999] fixed left-0 top-0 right-0 bottom-0 flex-col flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.65)]"} onClick={(event) => {
      close();
    }}>

      <Container
        className={tcx(
          "w-[410px] w-min-[80vh] w-max-[400px] h-auto bg-[black] rounded-2xl flex flex-col items-center relative px-5 py-8",
          ['w-[240px] px-3 py-4', isMobile]
        )}
        onClick={(event) => {
          event.stopPropagation();
        }}>

        <div className={tcx(
          "flex flex-row justify-end mb-2 absolute right-[20px]",
          ['top-[20px]', !isMobile],
          ['right-[50%] translate-x-[50%] bottom-0 translate-y-[50px]', isMobile]
        )}>
          <button onClick={() => {
            close();
          }}>
            {
              isMobile ?
                <CloseCircleOutlined style={{ color: "white", width: '18px', height: '18px'}} />:
                <img
                  className="w-[20px] h-[20px]" alt={"close"} src={"data:image/png;base64,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"}
                />
            }
          </button>
        </div>

        <div className={tcx('text-white text-3xl mt-5 font-extrabold', ['text-base mt-0', isMobile])}>Equilíbrio insuficiente!</div>

        <img
          alt='icon'
          className={tcx('w-[220px] mt-6 mb-3', ['w-[100px] mt-3 mb-2', isMobile])}
          src={`assets/${environment.assetPrefix}/ic_advertisement_deposit.png`}
        />

        <div className={tcx("mb-4 text-white text-center text-lg font-medium mt-4", ['text-xs mt-1', isMobile])}>
          Caros clientes VIP, você pode obter até {20}% de recompensa ao recarregar. Quanto mais você recarrega, mais bônus você recebe! Sem limite de tempo!
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
