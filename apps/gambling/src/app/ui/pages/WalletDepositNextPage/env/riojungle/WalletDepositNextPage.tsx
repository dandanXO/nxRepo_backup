import styled from "styled-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import QRCode from 'react-qr-code';
import copy from 'copy-to-clipboard';
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { notification } from "antd";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import cx from "classnames";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { formatLocaleMoney } from "../../../../utils/format";
import { QRcodeCopyButton } from "../../../../components-bs/Buttons/env/coco/QRcodeCopyButton";
import { DepositNextPageBackButton } from "../../../../components-bs/Buttons/env/coco/DepositNextPageBackButton";
import { PageContainer } from "../../../../components-bs/PageContainer";
import { Button } from "../../../../components-bs/Buttons/env/riojungle/Button";
import { CopyIcon } from "../../../../components-bs/Icons/CopyIcon";
import { environment } from "apps/gambling/src/environments/environment";

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


export const WalletDepositNextPage = () => {
  useAllowLoginRouterRules();
  const { isMobile } = useBreakpoint();
  const [countdown, setCountdown] = useState(900); // 15分钟的秒数

  // const [triggerRecharge, { data, isLoading, isSuccess, isError }] = useRechargeMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { onClickToWallet } = usePageNavigate();
  const data = location.state.data || {};
  const amount = location.state.amount || 0;
  const [api, contextHolder] = notification.useNotification();

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
    onClickToWallet({ 'panelType': 'deposit' })
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

  const message = `Ordem de pagamento criada com sucesso, pague em ${moment().startOf('day').seconds(countdown).format('mm:ss')} minutos!`;

  const baseStyle = `
    flex flex-row justify-between
    bg-[#333]
  `
  const mobileShadowContainerStyle = `
    p-2 mb-2 text-sm
    rounded-lg
    ${baseStyle}
  `;

  const deskTopShadowContainerStyle = `
    p-5 mb-3 lg:mb-5 text-lg rounded-xl
    ${baseStyle}
  `;

  const titleStyle = `
  text-left text-[#B3B3B3] text-sm lg:text-xl
  `
  const textStyle = `
  text-sm md:text-base lg:text-xl text-right text-white
  `
  const shadowContainerStyle = isMobile ? mobileShadowContainerStyle : deskTopShadowContainerStyle

  return (
    <PageContainer >
      {contextHolder}

      <BackNavigation
        onClick={() => onClickToWallet({ 'panelType': 'deposit' })}
      />

      <div className="md:mt-2 lg:mt-4 mb-5 py-2 px-3 lg:py-3 lg:px-5 px-text-sm md:text-base lg:text-xl text-[#10b98f] border-solid border-[#4d4d4d] bg-[#1a1a1a] flex flex-row w-full border rounded-lg">
        {message}
      </div>

      <section className={cx("flex flex-col w-full", { "md:flex-row": !isMobile })}>
        <section className={cx("mr-4 lg:mr-5 w-full", { "md:w-[60%]": !isMobile })}>
          <ShadowContainer className={shadowContainerStyle}>
            <div className={titleStyle}>Data de criaqao</div>
            <div className={textStyle}>{moment().format('YYYY-MM-DD HH:mm:ss')}</div>
          </ShadowContainer>

          {!isMobile && <ShadowContainer className={shadowContainerStyle}>
            <div className={titleStyle}>Tempo</div>
            <div className={textStyle}>{moment().startOf('day').seconds(countdown).format('mm:ss')}</div>
          </ShadowContainer>}

          <ShadowContainer className={shadowContainerStyle}>
            <div className={titleStyle}>Numero solicitado</div>
            <div className={textStyle}>{data?.data?.orderId || ''}</div>
          </ShadowContainer>


          <ShadowContainer className={cx(shadowContainerStyle, 'flex-col items-center')}>
            <div className={`${titleStyle} mb-1 md:mb-3 lg:mb-4.5 w-full`}>Pague a corda</div>
            <div className={`${textStyle} break-all mb-3 lg:mb-5`}>{data?.data?.channelData?.paymentLink || ''}</div>
            <Button className={'bg-[#10B98F] w-full rounded-[100px] py-2.5 lg:py-1.5'} onClick={onClickToCopy}
              text={<div className="text-white flex items-center justify-center">
                <img className="mr-2 w-[20px] h-[20px]" src={`assets/${environment.assetPrefix}/icon=copy.png`} alt="copy" />
                Copy
              </div>
              }
            />
          </ShadowContainer>


        </section>
        <section className={cx("w-full mb-3 lg:mb-5", { "md:w-[40%]": !isMobile })}>
          <ShadowContainer className={`flex bg-[#333] rounded-lg flex-col items-center h-full`}>
            <div className="pt-2 pb-2.5 md:pt-3 md:pb-3.5 lg:pt-3.5 lg:pb-5 opacity-80 bg-[#4d4d4d] flex flex-col justify-center  w-full  rounded-tl-lg rounded-tr-lg">
              <div className="text-sm md:text-base lg:text-xl leading-5 md:leading-6 lg:leading-7 text-white text-center mb-[2px] md:mb-3.5 lg:mb-5">Quantia</div>
              <div className="text-center text-base md:text-xl lg:text-3xl font-bold leading-6 md:leading-7 lg:leading-9 text-white">
                R$ {formatLocaleMoney(amount)}
              </div>
            </div>
            <div className="flex justify-center items-center flex-1 p-3 md:p-5 lg:px-[56px] lg:py-0">
              <QRCode className={cx("w-full min-w-[100px] max-w-[280px]",)} value={String(data?.data?.channelData?.paymentLink || '')} />
            </div>
          </ShadowContainer>
        </section>
      </section>
      <Button className={'my-5 md:my-8 lg:my-10 bg-[#8547EB] w-full rounded-lg py-3 text-sm md:text-base lg:text-xl'} onClick={handleToWalletPage} text={'Ja pago'} />
    </PageContainer>
  )
}
