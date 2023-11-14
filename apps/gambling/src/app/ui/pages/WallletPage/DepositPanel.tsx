import { Input } from "../../components/Inputs/Input";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { SectionContainer } from "../../components/container/SectionContainer";
import styled from "styled-components";
import useBreakpoint from "../../hooks/useBreakpoint";
import { depositData } from "./depositData";
import cx from "classnames";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { BlueBoard } from "./BlueBoard";
import { WithdrawMobileInput } from "../../components/Inputs/WithdrawMobileInput";
import { RechargeResponseConfig, GetRechargeResponseOption } from "../../../external/RechargeInfoGetEndpoint";
import { environment } from "../../../../environments/environment";
import {ButtonPro, ProButton} from "../../components/Buttons/Button";
import { tcx } from "../../utils/tcx";
import {TotalSectionContainer} from "./TotalSectionContainer";
import {DepositConfirmButton} from "../../components/Buttons/DepositConfirmButton";


const Item = styled.div.attrs((props) => ({
  className: cx(props.className, ""),
}))`
`

const InputTag = styled.div`
  position: absolute;
  top: -24px;
  right: -10px;
  border-radius: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 0 8px;
  height: 96px;
  color: #fff;
  min-width: 117px;
  z-index: 1;
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-repeat: no-repeat;
  background-position: center center;
`;

const MobileTagImg = styled.img`
  //background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  //background-size: 82px;
  //background-position: center 23px;
  font-size: 26px;
  color: #fff;
  position: absolute;
  top: -27px;
`
const MobileTag = styled(InputTag)`
  background-image: url("assets/${environment.assetPrefix}/giveaway.png");
  background-size: 82px;
  //background-size: 100px;
  background-position: center 23px;
  //font-size: 26px;
  font-size: 18px;
  color: #fff;
  position: absolute;
  top: -27px;
`

const DepoisitButton = styled.button.attrs<{ active: boolean; }>((props) => ({
  className: props.className,
})) <{
  bgActive?: boolean;
}>`
 ${(props) => props.bgActive
  ? `
    background:linear-gradient(to bottom, var(--btn-gradient1-from) 0%, var(--btn-gradient1-to) 100%);
    color: var(--main);
  `
  : `
    background: var(--medium);
    color: var(--white);
 `};

`

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


  return (
    <SectionContainer id={"deposit-section"}>
      <div className={tcx("text-main-primary-main text-base leading-5 text-left my-5", [`text-xl my-10`, !isMobile])}>
        Prezado usuário, quando o valor da primeira recarga ultrapassar 50 reais, você receberá até 20% de recompensa de recarga. A partir da segunda recarga, se o valor da recarga ultrapassar R$ 50, você receberá um bônus de recarga de até 10%! 6 vezes ao dia, quanto maior o valor da recarga, maior a proporção de presentes!
      </div>
      <section className={"flex flex-col w-full"}>
        <div className={tcx("relative",[`my-10`,!isMobile])}>
          {isMobile ? (
            <WithdrawMobileInput value={inputValue} className={"w-full h-[35px] bg-white !py-0 border-white"} />
          ) : (
            <Input value={inputValue} className={"w-full bg-white border-white"} themeStyle={"normal"} />
          )}
          {
            selectedIndexConfig && selectedIndexConfig?.rate && parseFloat(selectedIndexConfig?.rate) > 0 &&
            (
              isMobile ? (
                <MobileTag className={"text-base font-bold"}>
                  <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(0).toString()}</span>
                </MobileTag>
              ) : (
                <InputTag className={cx({
                  // "background-[linear-gradient(90deg,#FFF600 0%,#4FFB0C 100%)]": isMobile,
                })}
                >
                  <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(0).toString()}</span>
                </InputTag>
              )
            )
          }
        </div>

        <div className={tcx("flex flex-row flex-wrap w-full justify-start items-stretch",[`mb-20`,!isMobile])}>
          {recharge_options?.map((rechargeValue, index) => {
            const config = getConfig(rechargeValue);
            return (
              <Item
                key={index}
                className={cx("flex flex-col px-2 mb-2 w-1/3", {

                })}
                onClick={() => {
                  setSelectedIndex(index);
                  setInputValue(String(rechargeValue))
                  setSelectedIndexConfig(config);
                }}
              >
                <DepoisitButton
                  bgActive={selectedIndex === index}
                  className={cx(`p-2 flex italic font-bold lg:flex-row flex-col`,
                    "justify-around items-center min-h-[55px] whitespace-nowrap",
                    {
                      "rounded-2xl border-[1px] border-[var(--medium)]": selectedIndex !== index,
                      "border-[1px] rounded-2xl border-white ": selectedIndex === index,
                    })}
                >
                  <span className={cx("value items-baseline text-base xl:text-4xl lg:text-2xl md:text-lg md:mr-2", {
                    "text-white": selectedIndex !== index,
                    "text-main-primary-varient": selectedIndex === index,
                  })}>
                    {rechargeValue}
                  </span>

                  {Number(rechargeValue) >= Number(config?.amount_min) && (
                    <span className={cx("text-base lg:text-2xl md:text-base", {
                      "text-main-secondary-main": selectedIndex !== index,
                      "text-varient ": selectedIndex === index,
                    })}>
                      {config && config?.rate && parseFloat(config?.rate) !== 0 ? "+" + (Number(rechargeValue) * Number(config?.rate)).toFixed(2) : ""}
                    </span>
                  )}
                  { }
                </DepoisitButton>
              </Item>
            )
          })}
        </div>

        {isMobile ? (
          <section className={" fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(1,62,66,0.6)] py-4 z-10"}>
            <ButtonPro
              size="small"
              onClick={() => {
                if(!clicked) {
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
