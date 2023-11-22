import {Input, InputValue} from "../../components/Inputs/Input";
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
import { DepositNoticeSection } from "./DepositNoticeSection";
import { DepositButton } from "./DepositButton";
import { DepositInput } from "./DepositInput";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {depositButtonProps as PDepositButtonProps} from "./env/pernambucana/depositButtonProps";
import {depositButtonProps as WDepositButtonProps} from "./env/wild/depositButtonProps";
import {depositButtonProps as CDepositButtonProps} from "./env/coco/depositButtonProps";


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
  const [inputValue, setInputValue] = useState<InputValue<string>>({
    data: "",
    isValidation: true,
    errorMessage: "",
  });

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

  // 根據預設值初始化
  useEffect(() => {
    // 設定有符合的充值按鈕
    const defaultIndex = recharge_options.indexOf(Number(recharge_options_default))
    setSelectedIndex(defaultIndex);

    // 設定預設輸數框
    setInputValue({
      isValidation: true,
      data: String(recharge_options_default),
      errorMessage: "",
    })

    const config = getConfig(recharge_options_default);
    setSelectedIndexConfig(config);
    // console.log(`rechargeValue:${recharge_options_default}`)
    // console.log("configs:", config);
  }, [props?.data, recharge_options_default, recharge_options])

  // NOTICE: 當輸入框有變動時
  useEffect(() => {
    // 設定有符合的充值按鈕
    const defaultIndex = recharge_options.indexOf(Number(inputValue.data))
    // 有匹配到符合的充值按鈕
    if(defaultIndex > -1) {
      setSelectedIndex(defaultIndex);
    } else {
      setSelectedIndex(-1)
    }
    // NOTICE: Fatal note - props?.data 在 getConfig 有用到
    const config = getConfig(Number(inputValue.data));
    setSelectedIndexConfig(config);
    // console.log(`[input] inputValue:${inputValue.data}`)
    // console.log("[input] configs:", config);
  }, [props?.data, recharge_options, inputValue.data])


  const depositButtonProps = (rechargeValue: number, rate: string) => renderByPlatform({
    "wild777bet": WDepositButtonProps({
      rechargeValue,
      isMobile,
      rate,
    }),
    "coco777bet": CDepositButtonProps({
      rechargeValue,
      isMobile,
      rate,
    }),
  }, PDepositButtonProps({
    rechargeValue,
    rate,
  }))

  const onClickToNextDepositPage = (event: any) => {
    if(!inputValue.isValidation) return;
    if (!clicked) {
      setClicked(true);
      navigate(PageOrModalPathEnum.WalletDepositNextPage, {
        state: {
          amount: Number(inputValue.data),
          configID: selectedIndexConfig ? selectedIndexConfig?.id : ""
        }
      });
    }
  }

  return (
    <SectionContainer id={"deposit-section"}>
      <DepositNoticeSection />
      <section className={"flex flex-col w-full"}>
        {recharge_options && recharge_options.length > 0 && (
          <DepositInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectedIndexConfig={selectedIndexConfig}
            minimunValue={recharge_options && recharge_options[0] || 0}
            maximunValue={props.data?.config && props.data?.config[props.data?.config.length - 1]  ? Number(props.data?.config && props.data?.config[props.data?.config.length - 1].amount_max) : 0}
          />
        )}
        <div className={tcx("flex flex-1 m-auto flex-row flex-wrap w-full justify-start items-stretch", [`mb-20 `, !isMobile])}>
          {recharge_options?.map((rechargeValue, index) => {
            const config = getConfig(rechargeValue);
            const isShowRate = Number(config?.rate) > 0 || (Number(rechargeValue) * Number(config?.rate)).toFixed(2) > config?.amount_min;
            const rate = config && config?.rate && parseFloat(config?.rate) !== 0 ? (Number(rechargeValue) * Number(config?.rate)).toFixed(2) : ""
            return (
              <DepositButton
                key={index}
                onClick={() => {
                  setSelectedIndex(index);
                  setInputValue({
                    data: String(rechargeValue),
                    isValidation: true,
                    errorMessage: "",
                  })
                  setSelectedIndexConfig(config);
                }}
                isActive={selectedIndex === index}
                isShowRate={isShowRate}
                {...depositButtonProps(rechargeValue, rate)}
              />
            )
          })}
          {
            // NOTE: 排版用，塞空的的區塊補齊空位
            Array.from({ length: (recharge_options?.length - 1) % 3 }, (_, index) => {
              return (
                <div
                  key={index}
                  className={cx('basis-[30%] flex-1 mx-1')}
                ></div>
              )
            })
          }
        </div>

        {isMobile ? (
          <section className={" fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(1,62,66,0.6)] py-4 z-10"}>
            <ButtonPro
              size="small"
              onClick={onClickToNextDepositPage}
            >
              DEPÓSITO
            </ButtonPro>
          </section>
        ) : (
          <section className={"flex flex-col justify-center items-center w-full"}>
            <ProButton
              className={"bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)] text-main-primary-varient font-bold text-2xl"}
              onClick={onClickToNextDepositPage}
            >
              Depósito
            </ProButton>
          </section>
        )}
      </section>
    </SectionContainer>
  )
}
