import {Input} from "../../components/Input";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {SectionContainer} from "../../components/SectionContainer";
import {DepositConfirmButton, DepositSectionNotice} from "./index";
import styled from "styled-components";
import useBreakpoint from "../../hooks/useBreakpoint";
import { depositData } from "./depositData";
import cx from "classnames";
import { useNavigate } from "react-router";
import {useEffect, useMemo, useState} from "react";
import { BlueBoard } from "./BlueBoard";
import { MobileInput } from "./MobileInput";
import { RechargeResponseConfig, GetRechargeResponseOption } from "../../../external/RechargeInfoGetEndpoint";


const Item = styled.div.attrs((props) => ({
    className: cx(props.className, ""),
}))`
`

const InputTag = styled.div`
  position: absolute;
  top: -24px;
  right: -10px;
  background: rgba(255, 255, 255, 0);
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
  font-family: MavenPro-SemiBold;
  background-image: url("assets/001/giveaway.png");
`;

const MobileTag = styled(InputTag)`
  background-image: url("assets/001/giveaway.png");
  color: #fff;
`

const DepoisitButton = styled.button.attrs<{ active: boolean; }>((props) => ({
    className: props.className,
})) <{
    bgActive?: boolean;
}>`
 ${(props) => props.bgActive && `
    background: linear-gradient(45deg,#00B125 0%,#00FE5A 100%);
    text-shadow: 0 2px 0 #fff;
    color: #ffa403;
 `};

`

export const MobileDepositConfirmButton = styled.div`
  //width: 4.46rem;
  //height: 0.8rem;
  //width: 100px;
  //border: none;
  //border-radius: 0.15rem;
  //margin: 0.2rem auto 0.4rem;
  background: url("assets/001/btn_green4.png") center center no-repeat;
  //box-shadow: 0 0.04rem #036a02, inset 0 0.02rem 0.06rem rgba(255,255,255,.5);
`


interface IDepositPanel {
    data?: {
        config: RechargeResponseConfig[],
        options: GetRechargeResponseOption;
    }
}
export const DepositPanel = (props: IDepositPanel) => {
    const navigate = useNavigate();
    const { isMobile } = useBreakpoint();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexConfig, setSelectedIndexConfig] = useState<RechargeResponseConfig>();
    const [inputValue,setInputValue] = useState('');

    // NOTE: bd
    const { recharge_options_default = 0, recharge_options=[] } = props?.data?.options || {};

    const getConfig = (rechargeValue: number) => {
      const configs = props.data?.config?.filter((configItem) => {
        if(Number(configItem.amount_min) <= Number(recharge_options_default) && Number(recharge_options_default) <= Number(configItem.amount_max)) {
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
    }, [props?.data])


    return (
        <SectionContainer id={"deposit-section"}>

            {isMobile && (
                <BlueBoard />
            )}

            <DepositSectionNotice>
                Prezado usuário, quando o valor da primeira recarga ultrapassar 50 reais, você receberá até 20% de recompensa de recarga. A partir da segunda recarga, se o valor da recarga ultrapassar R$ 50, você receberá um bônus de recarga de até 10%! 6 vezes ao dia, quanto maior o valor da recarga, maior a proporção de presentes!
            </DepositSectionNotice>

            <section className={"flex flex-col w-full"}>

                <div className={"relative"}>
                    {isMobile ? (
                        <MobileInput value={inputValue} className={"w-full"} />
                    ) : (
                        <Input value={inputValue} className={"w-full"} />
                    )}
                    {
                        selectedIndexConfig && selectedIndexConfig?.rate && parseFloat(selectedIndexConfig?.rate) > 0 &&
                        (
                            isMobile ? (
                                <MobileTag>
                                    <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(2).toString()}</span>
                                </MobileTag>
                            ) : (
                                <InputTag className={cx({
                                    // "background-[linear-gradient(90deg,#FFF600 0%,#4FFB0C 100%)]": isMobile,
                                })}
                                >
                                    <span className="pr-1">+ </span> <span>{(Number(inputValue) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1)).toFixed(2).toString()}</span>
                                </InputTag>
                            )
                        )
                    }
                </div>

                <div className={"flex flex-row flex-wrap w-full justify-center mb-20"}>
                    {recharge_options?.map((rechargeValue, index) => {
                        const config = getConfig(rechargeValue);
                        return (
                            <Item
                                key={index}
                                className={cx("flex flex-col w-1/3 md:w-1/4 h-[60px] px-1 md:px-4 mb-2 md:mb-4", {

                                })}
                                onClick={() => {
                                    setSelectedIndex(index);
                                    setInputValue(String(rechargeValue))
                                    setSelectedIndexConfig(config);
                                }}
                            >
                                <DepoisitButton
                                    bgActive={!isMobile && selectedIndex === index}
                                    className={cx("flex flex-col md:flex-row md:justify-center",
                                        "h-[60px] min-h-[60px] justify-center items-center",
                                        {
                                            "rounded-xl border-utils-gray": selectedIndex !== index,
                                            "border-[1px] rounded-xl border-[#4FFB0C] ": selectedIndex === index,
                                        })}
                                >
                                    <span className={cx("value text-base md:text-lg md:font-bold mr-2", {
                                        "text-[#ffa403]": isMobile && selectedIndex === index,
                                    })}>
                                      {rechargeValue}
                                    </span>
                                    {Number(rechargeValue) >= Number(config?.amount_min) && (
                                        <span className={"text-sm md:text-base text-[rgba(255,255,255,.6)] text-[#fbd81e] md:text-[rgba(255,255,255,.6)]"}>{config && config?.rate && parseFloat(config?.rate) !== 0 ? "+" + (Number(rechargeValue) * Number(config?.rate)).toFixed(2) : ""}</span>
                                    )}
                                    {}
                                </DepoisitButton>
                            </Item>
                        )
                    })}
                </div>

                {isMobile ? (
                    <section className={" fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(9,11,15,.8)] py-4"}>
                        <MobileDepositConfirmButton className={"px-6 py-2 rounded-xl w-[200px]"} onClick={() => {
                            navigate(PageOrModalPathEnum.WalletDepositNextPage, { state: { amount: Number(inputValue), configID: selectedIndexConfig ? selectedIndexConfig?.id : "" }});
                        }}>
                            <span className={"text-[#247855] font-bold text-lg"}>Depósito</span>
                        </MobileDepositConfirmButton>
                    </section>
                ) : (
                    <section className={"flex flex-col justify-center items-center w-full"}>
                        <DepositConfirmButton className={"px-6 py-4"} onClick={() => {
                            navigate(PageOrModalPathEnum.WalletDepositNextPage, { state: { amount: Number(inputValue), configID: selectedIndexConfig ? selectedIndexConfig?.id : "" }});
                        }}>
                            <span className={"text-white font-bold text-lg"}>Depósito</span>
                            <img className="w-[26px] h-[26px]" alt={"arrow"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA2CAMAAAC/bkrSAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAPhcPyvQHuX8wC/ruwc2zFNGUfXFUTUY7H6zobTwAAAB2SURBVEjH7dNLDoAgDEVRFQTFH/61+1+okTBSQ3yMjOkdNjmjtgnH/So1WNxo6i1uiFqBobKmCLXlp5KgSp1qDKbWKkYtUWp2Sqvr3GShJnpUBb2oUyjyCkdSoOi+4j0NNXqDHQUb1PjP9QZUzqBKi4TjuI91AAuTGKj61zQSAAAAAElFTkSuQmCC"} />
                        </DepositConfirmButton>
                    </section>
                )}


            </section>

        </SectionContainer>
    )
}
