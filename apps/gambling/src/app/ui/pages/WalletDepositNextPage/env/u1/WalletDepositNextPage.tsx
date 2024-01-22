import styled from "styled-components";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRechargeMutation } from "../../../../../external";
import { useLocation, useNavigate } from "react-router";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import QRCode from 'react-qr-code';
import copy from 'copy-to-clipboard';
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { environment } from "../../../../../../environments/environment";
import { notification } from "antd";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { tcx } from "../../../../utils/tcx";
import cx from "classnames";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import {ButtonPro} from "../../../../components-bs/Buttons/ButtonPro";
import { formatLocaleMoney } from "../../../../utils/format";
import { QRcodeCopyButton } from "../../../../components-bs/Buttons/env/u1/QRcodeCopyButton";
import { DepositNextPageBackButton } from "../../../../components-bs/Buttons/env/u1/DepositNextPageBackButton";

const ShadowContainer = styled.div.attrs<{
  className?: string;
}>(props => ({
  className: cx("", props.className)
}))`
  /* box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);
  border-color: var(--stroke-textfields);
  border-width: 1px;
  border-style: solid;
  align-items: center;
  color: white;
  border-radius: 8px; */
`

const COUNT_DOWN = 900

export const WalletDepositNextPage = () => {
  useAllowLoginRouterRules();
  const { isMobile, isDesktop } = useBreakpoint();
  const [countdown, setCountdown] = useState(COUNT_DOWN); // 15分钟的秒数

  // const [triggerRecharge, { data, isLoading, isSuccess, isError }] = useRechargeMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const {onClickToWallet} = usePageNavigate();
  const data = location.state.data || {};
  const amount = location.state.amount || 0;
  const [api, contextHolder] = notification.useNotification();

  const current = useMemo(()=> moment().format('YYYY-MM-DD HH:mm:ss'), [])

  const onClickToCopy = () => {
    copy(data?.data?.channelData?.paymentLink || '');
    api.success({
      message: "Copiado!"
    })
  }

  useEffect(() => {
    if (location.state.amount === 0) {
      handleToWalletPage()
    }
  }, [location.state.amount])




  const handleToWalletPage = () => {
    onClickToWallet({'panelType':'deposit'})
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        handleToWalletPage()
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const message = `Ordem de pagamento criada com sucesso, pague em ${ isDesktop ? COUNT_DOWN / 60: moment().startOf('day').seconds(countdown).format('mm:ss')} minutos!`;

  const baseStyle = `
  flex flex-row justify-between
  bg-[var(--background-dashboard-secondary)]
  border-b border-solid border-[var(--stroke-dashboard-main)]
  `
  const mobileShadowContainerStyle = `
  py-3 px-3.5 mb-2 text-sm
  rounded-lg
  ${baseStyle}
  `;

  const deskTopShadowContainerStyle = `
  p-5 mb-4 text-lg rounded-xl
  ${baseStyle}
  `;


  const shadowContainerStyle = isMobile ? mobileShadowContainerStyle : deskTopShadowContainerStyle



  return (
      <div className={cx("px-4 pb-14 md:px-24")}>
        {contextHolder}

        <BackNavigation
          title={isMobile && (
            <span className={cx("text-white text-lg text-center flex-1 font-bold")}>{"Depósito"}</span>
          )}
          onClick={()=>onClickToWallet({'panelType':'deposit'})}
        />

        {isMobile && (
          <div className={"text-3xl text-center text-[var(--secondary-assistant)] font-bold mb-5 mt-6"}>R$ {formatLocaleMoney(Number(amount))}</div>
        )}

        <div className={cx("text-sm text-[var(--secondary-assistant)] leading-5 mb-4 text-center",
          {
            'md:text-3xl md:mb-6': !isMobile
          })}>
          {message}
        </div>

        <section className={cx("flex flex-col w-full", { "md:flex-row": !isMobile })}>
          <section className={cx("mr-10 w-full", { "md:w-[60%]": !isMobile })}>
            <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-left text-white"}>Data de criaqao</div>
              <div className={"text-white"}>{current}</div>
            </ShadowContainer>

            {!isMobile && <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-left text-white"}>Tempo</div>
              <div className={"text-white"}>{moment().startOf('day').seconds(countdown).format('mm:ss')}</div>
            </ShadowContainer>}

            <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-white"}>Numero solicitado</div>
              <div className={"text-white"}>{data?.data?.orderId || ''}</div>
            </ShadowContainer>


            {!isMobile && (<ShadowContainer className={cx(shadowContainerStyle, 'flex-col items-center')}>
              <div className={"text-white text-left mb-4 w-full"}>Pague a corda</div>
              <div className={"text-white break-all mb-4"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <QRcodeCopyButton onClick={onClickToCopy}/>
            </ShadowContainer>
            )}

          </section>

          {!isMobile && (
            <section className={cx("w-full mb-4 ", { "md:w-[40%]": !isMobile })}>
              <ShadowContainer className={`${shadowContainerStyle} flex-col items-center h-full`}>
                <div className={"text-white text-center font-bold w-full rounded-xl text-4xl py-4 text-[var(--secondary-assistant)]"}>R${amount}</div>
                <div className="h-full flex justify-center items-center">
                  <QRCode className={cx("w-full min-w-[100px] max-w-[280px] mb-5",)} value={String(data?.data?.channelData?.paymentLink || '')} />
                </div>
              </ShadowContainer>
            </section>
          )}
          {isMobile && (
            <ShadowContainer className={`${baseStyle} rounded-lg flex-col items-center justify-center p-6 h-full`}>
            <div className={"text-white text-base mb-2.5 w-full text-center"}>Data de criaqao</div>
              <div className={"text-white text-sm break-all mb-4"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <div className="h-full flex justify-center items-center">
                <QRCode className={cx("w-[228px] min-w-[100px] max-w-[280px] mb-6",)} value={String(data?.data?.channelData?.paymentLink || '')} />
              </div>
              <QRcodeCopyButton onClick={onClickToCopy}/>
            </ShadowContainer>
          )}

        </section>

        {!isMobile && (<section className={"flex justify-center items-center mt-4"}>
          <DepositNextPageBackButton onClick={handleToWalletPage} />
        </section>
        )}

      </div>
  )
}
