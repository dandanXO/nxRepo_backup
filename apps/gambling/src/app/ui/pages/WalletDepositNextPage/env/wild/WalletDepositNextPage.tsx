import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
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
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { ButtonPro } from "../../../../components-bs/Buttons/ButtonPro";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";

const Notice = styled.div`
  height: 60px;
  //font-size: 26px;
  color: var(--main-state-warning);
  text-align: center;
  background: linear-gradient(90deg,rgba(31,35,50,.16) 0%,rgba(247,186,23,.16) 54%,rgba(31,35,50,.16) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`
const ShadowContainer = styled.div.attrs<{
  className?: string;
}>(props => ({
  className: cx("rounded-2xl", props.className)
}))`
  //display: flex;
  //justify-content: space-between;
  //height: 52px;
  box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);
  //border-radius: 10px;
  border-color: var(--main-primary-main);
  border-width: 1px;
  border-style: solid;
  //padding: 0 30px 0 20px;
  //margin-bottom: 20px;
  align-items: center;
  //font-size: 18px;
  color: #6c7083;
`

const MoneyLabel = styled.div`
  background: linear-gradient(45deg,#466AC5 0%,#46B5FB 100%);
  box-shadow: inset 6px -8px 22px #49b5ff;
  border-radius: 10px;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  margin-bottom: 35px;
`
const CopyButton = styled.button`
  background-color: rgb(36, 125, 255);
  height: 50px;
  width: 210px;
`

const RechargeButton = styled.button`
  cursor: pointer;
  background: linear-gradient(58deg,#FF4E05 0%,#FF995A 100%);
  border-radius: 14px;
  width: 400px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const WalletDepositNextPage = () => {
  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();
  const [countdown, setCountdown] = useState(900); // 15分钟的秒数
  const location = useLocation();
  const navigate = useNavigate();
  const {onClickToWallet} = usePageNavigate();
  const [api, contextHolder] = notification.useNotification();
  const data = location.state.data || {};
  const amount = location.state.amount || 0;
  const onClickToCopy = () => {
    copy(data?.data?.channelData?.paymentLink || '');
    api.success({
      message: "Copiado!"
    })
  }

  useEffect(() => {
    if (location.state.amount === 0) {
      handleToWalletPage();
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

  const message = 'Ordem de pagamento criada com sucesso, pague em 15 minutos!'
  return (
    <div className={"p-5 md:p-10 md:pt-0 w-full"}>
      <div className={cx("", { "md:border md:border-solid md:border-main-primary-main md:mt-10 md:bg-[var(--game-block)] md:rounded-2xl md:py-16 md:px-14 ": !isMobile })}>
        {contextHolder}

        <button className={cx("flex flex-col mb-4", { 'md:flex-row md:mb-10': !isMobile })} onClick={handleToWalletPage}>
          <img className={cx("w-[21px] h-[21px] mr-3 mb-5", { "md:mb-0": !isMobile })} alt={"back"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=="} />
          <span className={cx("text-white text-xl font-bold", { "text-2xl": !isMobile })}>Depósito</span>
        </button>

        {isMobile && (
          <div className={"text-3xl text-main-state-warning font-bold"}>R$ {amount}</div>
        )}

        <div className={cx("text-base text-main-state-warning leading-none mb-4 mt-2", { 'md:text-4xl md:text-bold md:mb-14': !isMobile })}>
          {isMobile ? message : message.toLocaleUpperCase()}</div>

        <section className={cx("flex flex-col w-full", { "md:flex-row": !isMobile })}>
          <section className={cx("mr-10 w-full", { "md:w-[60%]": !isMobile })}>
            <ShadowContainer className={cx("flex flex-row justify-between p-4 mb-3 text-sm bg-varient", { "md:text-lg md:mb-5 md:p-5": !isMobile })}>
              <div className={"text-main-state-warning text-left"}>Data de criaqao</div>
              <div className={"text-white"}>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
            </ShadowContainer>

            <ShadowContainer className={cx("flex flex-row justify-between p-4 mb-3 text-sm bg-varient", { "md:text-lg md:mb-5 md:p-5": !isMobile })}>
              <div className={"text-main-state-warning text-left"}>Tempo</div>
              <div className={"text-white"}>{moment().startOf('day').seconds(countdown).format('mm:ss')}</div>
            </ShadowContainer>

            <ShadowContainer className={cx("flex flex-row justify-between p-4 mb-3 text-sm bg-varient", { "md:text-lg md:mb-5 md:p-5": !isMobile })}>
              <div className={"text-white"}>Numero solicitado</div>
              <div className={"text-white"}>{data?.data?.orderId || ''}</div>
            </ShadowContainer>


            {!isMobile && (<ShadowContainer className={cx("flex flex-col justify-between p-4 mb-4 bg-varient", { "md:text-lg md:mb-5 md:p-5": !isMobile })}>
              <div className={"text-white text-left mb-4 w-full"}>Pague a corda</div>
              <div className={"text-white break-all mb-4"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <ButtonPro className="w-1/2 whitespace-nowrap" type="blue" size="medium" onClick={onClickToCopy}>Copiar código de pix</ButtonPro>
            </ShadowContainer>
            )}

          </section>

          {!isMobile && (
            <section className={cx("w-full mb-4 ", { "md:w-[40%]": !isMobile })}>
              <ShadowContainer className={"flex flex-col justify-between items-center h-full bg-varient"}>
                <div className={"text-white font-bold w-full rounded-xl text-4xl py-4 bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)]"}>R${amount}</div>
                <div className="h-full flex justify-center items-center">
                  <QRCode className={cx("w-[80%] min-w-[100px] max-w-[280px] mb-5",)} value={String(data?.data?.channelData?.paymentLink || '')} />
                </div>
              </ShadowContainer>
            </section>
          )}
          {isMobile && (
            <ShadowContainer className={"flex flex-col justify-between items-center h-full px-4 py-5 text-center bg-varient"}>
              <div className={"text-white text-sm mb-4 w-full"}>Pague a corda</div>
              <div className={"text-white text-sm break-all mb-5"}>{data?.data?.channelData?.paymentLink || ''}</div>
              <div className="h-full flex justify-center items-center">
                <QRCode className={cx("w-[80%] min-w-[100px] max-w-[280px] mb-5",)} value={String(data?.data?.channelData?.paymentLink || '')} />
              </div>
              <ButtonPro className="whitespace-nowrap !px-4" type="green" size="small" onClick={onClickToCopy}>Copiar código de pix</ButtonPro>
            </ShadowContainer>
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
