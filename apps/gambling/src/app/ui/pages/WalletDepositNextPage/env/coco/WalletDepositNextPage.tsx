import styled from "styled-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRechargeMutation } from "../../../../../external";
import { useLocation, useNavigate } from "react-router";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import QRCode from 'react-qr-code';
import copy from 'copy-to-clipboard';
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
import { environment } from "../../../../../../environments/environment";
import { notification } from "antd";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { tcx } from "../../../../utils/tcx";
import cx from "classnames";
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {BackNavigation} from "../../../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import {ButtonPro} from "../../../../components/Buttons/ButtonPro";

const ShadowContainer = styled.div.attrs<{
  className?: string;
}>(props => ({
  className: cx("rounded-2xl", props.className)
}))`
  /* box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);
  border-color: var(--stroke-textfields);
  border-width: 1px;
  border-style: solid;
  align-items: center;
  color: white;
  border-radius: 8px; */
`


export const WalletDepositNextPage = () => {
  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();
  const [countdown, setCountdown] = useState(900); // 15分钟的秒数
  const [triggerRecharge, { data, isLoading, isSuccess, isError }] = useRechargeMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = () => {
    copy(data?.data?.channelData?.paymentLink || '');
    api.success({
      message: "Copiado!"
    })
  }

  const amount = location.state.amount || 0
  const configID = location.state.configID || "";

  // const [notidicationAPI, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (location.state.amount === 0) {
      navigate(PageOrModalPathEnum.WalletPage)
    }
  }, [location.state.amount])

  useEffect(() => {
    triggerRecharge({
      amount: amount,
      appPackageName: environment.appPackageName,
      appVersion: environment.appVersion,
      configId: configID,
      phone: AppLocalStorage.getItem(AppLocalStorageKey.kPhone) || '',
      qr: 1,
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || ''
    })
    // .unwrap().then(data => {

    //   notidicationAPI.info({
    //     message: data?.msg
    //   })
    // }).catch((error) => {
    //   notidicationAPI.error(({
    //     message: JSON.stringify(error)
    //   }))
    // })
  }, [])

  const handleToWalletPage = () => {
    navigate(PageOrModalPathEnum.WalletPage)
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

  const message = 'Ordem de pagamento criada com sucesso, pague em 15 minutos!';

  const mobileShadowContainerStyle = `
  p-4 mb-3 text-sm
  flex flex-row justify-between
  bg-[var(--primary-variant)]
  border border-solid border-[var(--stroke-textfields)]
  shadow-[inset_0_0_36px_5px_rgba(255,255,255,0.08)]
  `;

  const deskTopShadowContainerStyle = `
  flex flex-row justify-between
  p-5 mb-4 text-lg rounded-xl
  bg-[var(--background-dashboard-secondary)]
  border-b border-solid border-[var(--primary-assistant)]
  `;


  const shadowContainerStyle = isMobile ? mobileShadowContainerStyle : deskTopShadowContainerStyle

  const {onClickToWallet} = usePageNavigate();

  return (
    <div className={"p-5 md:p-10 md:pt-0 w-full"}>
      <div className={cx("", { " md:bg-[var(--game-block)] md:rounded-2xl md:py-5 md:px-14 ": !isMobile })}>
        {contextHolder}

        <BackNavigation
          title={(
            <span className={cx("ml-2 text-white text-xl font-bold text-center md:text-left flex-1")}>{isMobile ? "Depósito" : "Retornar"}</span>
          )}
          onClick={()=> onClickToWallet()}
        />

        {isMobile && (
          <div className={"text-3xl text-center text-[var(--secondary-assistant)]"}>R$ {amount}</div>
        )}

        <div className={cx("text-sm text-[var(--secondary-assistant)] leading-5 mb-4 mt-2 text-center",
          {
            'md:text-3xl md:mb-6 md:text-white': !isMobile
          })}>
          {message}
        </div>

        <section className={cx("flex flex-col w-full", { "md:flex-row": !isMobile })}>
          <section className={cx("mr-10 w-full", { "md:w-[60%]": !isMobile })}>
            <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-left text-white"}>Data de criaqao</div>
              <div className={"text-white"}>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
            </ShadowContainer>

            {!isMobile && <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-left text-white"}>Tempo</div>
              <div className={"text-white"}>{moment().startOf('day').seconds(countdown).format('mm:ss')}</div>
            </ShadowContainer>}

            <ShadowContainer className={shadowContainerStyle}>
              <div className={"text-white"}>Numero solicitado</div>
              <div className={"text-white"}>{data?.data?.orderId || ''}</div>
            </ShadowContainer>


            {!isMobile && (<ShadowContainer className={cx(shadowContainerStyle, 'flex-col items-center border-b-4 border-[var(--stroke-dashboard-main)]')}>
              <div className={"text-white text-left mb-4 w-full"}>Pague a corda</div>
              <div className={"text-white break-all mb-4"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <ButtonPro className="w-1/2 whitespace-nowrap" type="blue" size="medium" onClick={onClickToCopy}>Copiar código de pix</ButtonPro>
            </ShadowContainer>
            )}

          </section>

          {!isMobile && (
            <section className={cx("w-full mb-4 ", { "md:w-[40%]": !isMobile })}>
              <ShadowContainer className={"flex flex-col justify-between items-center h-full bg-[var(--background-dashboard-secondary)] border-b-4 border-[var(--primary-assistant)]"}>
                <div className={"text-white text-center font-bold w-full rounded-xl text-4xl py-4 text-[var(--secondary-assistant)]"}>R${amount}</div>
                <div className="h-full flex justify-center items-center">
                  <QRCode className={cx("w-[80%] min-w-[100px] max-w-[280px] mb-5",)} value={String(data?.data?.channelData?.paymentLink || '')} />
                </div>
              </ShadowContainer>
            </section>
          )}
          {isMobile && (
            <div className={"mt-2 rounded-lg flex flex-col justify-between items-center h-full px-4 py-5 text-center bg-[var(--background-dashboard-secondary)]"}>
              <div className={"text-white text-base mb-2.5 w-full font-bold"}>Data de criaqao</div>
              <div className={"text-white text-sm break-all mb-4"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <div className="h-full flex justify-center items-center">
                <QRCode className={cx("w-[80%] min-w-[100px] max-w-[280px] mb-6",)} value={String(data?.data?.channelData?.paymentLink || '')} />
              </div>
              <ButtonPro className="whitespace-nowrap !px-4" type="green" size="small" onClick={onClickToCopy}>Copiar código de pix</ButtonPro>
            </div>
          )}

        </section>

        {!isMobile && (<section className={"flex justify-center items-center mt-12"}>
          <ButtonPro onClick={handleToWalletPage}>Ja pago</ButtonPro>
        </section>
        )}

      </div>
    </div>
  )
}
