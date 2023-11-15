import { Input } from "../../components/Inputs/Input";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { SectionContainer } from "../../components/container/SectionContainer";
import styled from "styled-components";
import useBreakpoint from "../../hooks/useBreakpoint";
import cx from "classnames";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { RechargeResponseConfig, GetRechargeResponseOption } from "../../../external/RechargeInfoGetEndpoint";
import { environment } from "../../../../environments/environment";
import { ButtonPro, ProButton } from "../../components/Buttons/Button";
import { tcx } from "../../utils/tcx";
import { DepositNoticeSection } from "./env/DepositNoticeSection";
import { DepositButton } from "./env/DepositButton";
import { DepositInput } from "./env/DepositInput";


const Item = styled.div.attrs((props) => ({
  className: cx(props.className, ""),
}))`
`


const MobileTagImg = styled.img`
  //background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  //background-size: 82px;
  //background-position: center 23px;
  font-size: 26px;
  color: #fff;
  position: absolute;
  top: -27px;
`

// const DepoisitButton = styled.button.attrs<{ active: boolean; }>((props) => ({
//   className: props.className,
// })) <{
//   bgActive?: boolean;
// }>`
//  ${(props) => props.bgActive
//   ? `
//     background:linear-gradient(to bottom, var(--btn-gradient1-from) 0%, var(--btn-gradient1-to) 100%);
//     color: var(--main);
//   `
//   : `
//     background: var(--medium);
//     color: var(--white);
//  `};

// `

export const MobileDepositConfirmButton = styled.div`
  //width: 4.46rem;
  //height: 0.8rem;
  //width: 100px;
  //border: none;
  //border-radius: 0.15rem;
  //margin: 0.2rem auto 0.4rem;
  background: url("assets/${environment.assetPrefix}/btn_green4.png") center center no-repeat;
  //box-shadow: 0 0.04rem #036a02, inset 0 0.02rem 0.06rem rgba(255,255,255,.5);
`


interface IDepositPanel {
  data?: {
    config: RechargeResponseConfig[],
    options: GetRechargeResponseOption;
  }
}
// let clicked = false;
export const DepositPanel = (props: IDepositPanel) => {

  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexConfig, setSelectedIndexConfig] = useState<RechargeResponseConfig>();
  const [inputValue, setInputValue] = useState('');

  // NOTE: bd
  const { recharge_options_default = 0, recharge_options = [] } = props?.data?.options || {};

  const getConfig = (rechargeValue: number) => {
    const configs = props.data?.config?.filter((configItem) => {
      if (Number(configItem.amount_min) <= Number(rechargeValue) && Number(rechargeValue) <= Number(configItem.amount_max)) {
        return true;
      } else {
        return false;
      }
    }) || []
    return configs[0];
  }
  useEffect(() => {
    const defaultIndex = recharge_options.indexOf(Number(recharge_options_default))
    setSelectedIndex(defaultIndex);
    setInputValue(String(recharge_options_default))
    const config = getConfig(recharge_options_default);
    setSelectedIndexConfig(config);
    // console.log(`rechargeValue:${recharge_options_default}`)
    // console.log("configs:", config);
  }, [props?.data, recharge_options_default, recharge_options])


  const depositButtonProps = (rechargeValue: number, rate: string) => {
    if (environment.assetPrefix === 'coco777bet') {
      return {
        rechargeValue: `R$ ${rechargeValue}`,
        rechargeClassName: 'text-base items-baseline',
        className: `min-h-[50px] ${isMobile ? 'pt-3' : ''} rounded-md shadow-[0_0px_2px_#000c27,0_1px_2px_rgba(187,160,255,0.76)_inset,0_-2px_1px_rgba(39,8,74,0.76)_inset]`,
        activeRechargeClassName: 'text-[#7a2800]',
        bgClassName: 'bg-gradient-to-b from-[#5A16B7] to-[#7800FF]',
        activeBgClassName: 'bg-gradient-to-t from-[#FB7000] to-[#FFC000] shadow-[0_0px_2px_#000c27,0_1px_2px_rgba(255,243,160,0.76)_inset,0_-2px_2px_rgba(122,40,0,0.76)_inset]',
        rate: `+ R$ ${rate}`,
        rateClassName: `${!isMobile ? 'text-[#fff600]' : ''}`,
        activeRateClassName: `${!isMobile ? 'text-[#7a2800]' : ''}`,
        isRateTag: isMobile,
        rateTagClassName: 'text-xs pt-0.5 pr-1 text-[#fbd81e] absolute bg-gradient-to-r from-[transparent] via-[#FF3838]  to-[#FF3838] top-0 right-0 rounded-tr-lg',
      }
    } else {
      return {
        rechargeValue: `${rechargeValue}`,
        rate: `+ ${rate}`,
        className: 'italic'
      }
    }
  }

  return (
    <SectionContainer id={"deposit-section"}>
      <DepositNoticeSection />
      <section className={"flex flex-col w-full"}>
        {recharge_options && recharge_options.length > 0 && <DepositInput inputValue={inputValue} selectedIndexConfig={selectedIndexConfig} />}
        <div className={tcx("flex m-auto flex-row flex-wrap w-full justify-between items-stretch", [`mb-20 justify-start`, !isMobile])}>
          {recharge_options?.map((rechargeValue, index) => {
            const config = getConfig(rechargeValue);
            const isShowRate = Number(config?.rate) !== 0;
            const rate = config && config?.rate && parseFloat(config?.rate) !== 0 ? (Number(rechargeValue) * Number(config?.rate)).toFixed(2) : ""
            return (
              <DepositButton
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  setInputValue(String(rechargeValue))
                  setSelectedIndexConfig(config);
                }}
                isActive={selectedIndex === index}
                isShowRate={isShowRate}
                {...depositButtonProps(rechargeValue, rate)}
              />
            )
          })}
        </div>

        {isMobile ? (
          <section className={" fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(1,62,66,0.6)] py-4 z-10"}>
            <ButtonPro
              size="small"
              onClick={() => {
                if (!clicked) {
                  setClicked(true);
                  navigate(PageOrModalPathEnum.WalletDepositNextPage, {
                    state: {
                      amount: Number(inputValue),
                      configID: selectedIndexConfig ? selectedIndexConfig?.id : ""
                    }
                  });
                }
              }}
            >
              DEPÓSITO
            </ButtonPro>
          </section>
        ) : (
          <section className={"flex flex-col justify-center items-center w-full"}>
            <ProButton
              className={"bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)] text-main-primary-varient font-bold text-2xl"}
              onClick={() => {
                if (!clicked) {
                  setClicked(true);
                  navigate(PageOrModalPathEnum.WalletDepositNextPage, { state: { amount: Number(inputValue), configID: selectedIndexConfig ? selectedIndexConfig?.id : "" } });
                }
              }}
            >
              Depósito
            </ProButton>
          </section>
        )}
      </section>
    </SectionContainer>
  )
}
