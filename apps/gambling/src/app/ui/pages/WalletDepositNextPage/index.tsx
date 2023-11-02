import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRechargeMutation } from "../../../external";
import { useLocation, useNavigate } from "react-router";
import { AppLocalStorage } from "../../../persistant/localstorage";
import QRCode from 'react-qr-code';
import copy from 'copy-to-clipboard';
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {environment} from "../../../../environments/environment";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {notification} from "antd";

const Notice = styled.div`
  height: 60px;
  //font-size: 26px;
  color: #f7ba17;
  text-align: center;
  background: linear-gradient(90deg,rgba(31,35,50,.16) 0%,rgba(247,186,23,.16) 54%,rgba(31,35,50,.16) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`
const ShadowContainer = styled.div`
  //display: flex;
  //justify-content: space-between;
  //height: 52px;
  box-shadow: inset 0 0 36px 5px rgba(255,255,255,.08);
  border-radius: 10px;
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
  font-size: 36px;
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
    const {updateBalance} = useAutoUpdateBalance();

    const [countdown, setCountdown] = useState(900); // 15分钟的秒数
    const [triggerRecharge, { data, isLoading, isSuccess, isError }] = useRechargeMutation();
    const location = useLocation();
    const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

    const onClickToCopy = () => {
    copy(data?.data?.channelData?.paymentLink||'');
    api.success({
      message: "Copiado!"
    })
  }

    const amount = location.state.amount || 0
    const configID = location.state.configID || "";

    // const [notidicationAPI, contextHolder] = notification.useNotification();

    useEffect(() => {
      if(location.state.amount === 0) {
        navigate(PageOrModalPathEnum.WalletPage)
      }
    }, [location.state.amount])

    useEffect(() => {
        triggerRecharge({
            amount: amount,
            appPackageName: environment.appPackageName,
            appVersion: environment.appVersion,
            configId: configID,
            phone: AppLocalStorage.getItem("kPhone") || '',
            qr: 1,
            token: AppLocalStorage.getItem("token") || ''
        })
        // .unwrap().then(data => {
        //   updateBalance();
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

  return (
    <>
      {contextHolder}
      <div className={"p-10"}>
        <button className={"flex flex-row mb-8 items-center"}  onClick={() => {
          navigate(PageOrModalPathEnum.WalletPage);
        }}>
          <img className={"w-[21px] h-[21px] mr-3"} alt={"back"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=="}/>
          <span className={"text-white text-2xl"}>Retornar</span>
        </button>

        <Notice className={"text-2xl"}>Ordem de pagamento criada com sucesso, pague em 15 minutos!</Notice>

        <section className={"flex flex-row"}>

          <section className={"w-[70%] mr-10"}>

            <ShadowContainer className={"flex flex-row justify-between p-4 mb-4"}>
              <div className={"text-[gray]"}>Data de criaqao</div>
              <div className={"text-white"}>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
            </ShadowContainer>

            <ShadowContainer className={"flex flex-row justify-between p-4 mb-4"}>
              <div className={"text-[gray]"}>Tempo</div>
              <div className={"text-white"}>{moment().startOf('day').seconds(countdown).format('mm:ss')}</div>
            </ShadowContainer>

            <ShadowContainer className={"flex flex-row justify-between p-4 mb-4"}>
              <div className={"text-[gray]"}>Numero solicitado</div>
              <div className={"text-white"}>{data?.data?.orderId||''}</div>
            </ShadowContainer>

            <ShadowContainer className={"flex flex-col justify-between p-4 mb-4"}>
              <div className={"text-[gray] text-left mb-4 w-full"}>Pague a corda</div>
              <div className={"text-white break-all mb-4"}>{data?.data?.channelData?.paymentLink||''}</div>
              <CopyButton className={"rounded-xl text-white"} onClick={onClickToCopy} >Copiar código de pix</CopyButton>
            </ShadowContainer>

          </section>

          <section className={"w-[30%]"}>
            <ShadowContainer className={"flex flex-col justify-center items-center"}>
              <MoneyLabel className={"mb-4 w-full"}>R${amount}</MoneyLabel>
              <div className={"w-full"}>
                <QRCode className="w-[100%] h-[100%]" value={String(data?.data?.channelData?.paymentLink || '')} />
                {/* <img className={"w-[100%] h-[100%]"} src={"https://cdn.britannica.com/17/155017-050-9AC96FC8/Example-QR-code.jpg"}/> */}
              </div>
            </ShadowContainer>
          </section>
        </section>

        <section className={"flex justify-center items-center"}>
          <RechargeButton className={"flex flex-row justify-between text-white p-8"} onClick={handleToWalletPage}>
            <span>Ja pago</span>
            <img className="w-[26px] h-[26px]" alt={"arrow"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA2CAMAAAC/bkrSAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAPhcPyvQHuX8wC/ruwc2zFNGUfXFUTUY7H6zobTwAAAB2SURBVEjH7dNLDoAgDEVRFQTFH/61+1+okTBSQ3yMjOkdNjmjtgnH/So1WNxo6i1uiFqBobKmCLXlp5KgSp1qDKbWKkYtUWp2Sqvr3GShJnpUBb2oUyjyCkdSoOi+4j0NNXqDHQUb1PjP9QZUzqBKi4TjuI91AAuTGKj61zQSAAAAAElFTkSuQmCC"}/>
          </RechargeButton>

        </section>

      </div>



    </>
  )
}
