import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import cx from "classnames";
import { useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { RechargeResponseConfig, GetRechargeResponseOption } from "../../../../../external/RechargeInfoGetEndpoint";
import { environment } from "../../../../../../environments/environment";
import { IDepositInput } from "./DepositInput";

import { renderByUVersion } from "../../../../utils/renderByUVersion";

import { formatLocaleMoney } from "../../../../utils/format";
import { useRechargeMutation } from "../../../../../external";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";

import { DepositPanel as RDepositPanel } from '../../env/u2/tabsContent/deposit/DepositPanel';
import { DepositPanel as CDepositPanel } from '../../env/u1/tabsContent/deposit/DepositPanel';
import { DepositPanel as WDepositPanel } from '../../env/wild/tabsContent/deposit/DepositPanel';
import { DepositPanel as PDepositPanel } from '../../env/pernambucana/tabsContent/deposit/DepositPanel';

import { useDepositInput } from "../../hooks/useDepositInput";
import { useGetConfig } from "../../hooks/useGetConfig";
import { useDepositMoneyButton } from "../../hooks/useDepositMoneyButton";




export interface IDepositPanel {
  data?: {
    config: RechargeResponseConfig[],
    options: GetRechargeResponseOption;
  }
}

export type IDepositPanelProps = IDepositPanel & {
  isLoaded: boolean;
  selectedIndex: number;
  depositInputProps: IDepositInput;
  handleClickDepositMoneyButton: (rechargeValue: number, index: number, config: RechargeResponseConfig) => void;
  depositButtonsOptions: {
    rechargeValue: number;
    config: RechargeResponseConfig
    isShowRate: boolean;
    rate: string
  }[];
  onClickToNextDepositPage: (event: any) => void;
}

export const DepositPanel = (props: IDepositPanel) => {

  const { isMobile } = useBreakpoint();
  const depositInputProps = useDepositInput(props);
  const { depositButtonsOptions = [] } = useDepositMoneyButton(props)
  const { getConfig } = useGetConfig(props);

  const navigate = useNavigate();
  const [triggerRecharge, { data, isLoading, isSuccess, isError }] = useRechargeMutation();

  const [clicked, setClicked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexConfig, setSelectedIndexConfig] = useState<RechargeResponseConfig>();
  const { inputValue, setInputValue } = depositInputProps;

  // NOTE: bd
  const { recharge_options_default = 0, recharge_options = [] } = props?.data?.options || {};

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
    if (defaultIndex > -1) {
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



  const isLoaded = recharge_options && recharge_options.length > 0;
  const onClickToNextDepositPage = (event: any) => {
    if (!isLoaded) return;;

    if (!inputValue.isValidation) return;
    if (!clicked) {
      setClicked(true);
      triggerRecharge({
        amount: Number(inputValue.data),
        appPackageName: environment.appPackageName,
        appVersion: environment.appVersion,
        configId: Number(selectedIndexConfig?.id),
        phone: AppLocalStorage.getItem(AppLocalStorageKey.kPhone) || '',
        qr: 1,
        token: AppLocalStorage.getItem(AppLocalStorageKey.token) || ''
      }).then(({ data }: any) => {
        navigate(PageOrModalPathEnum.WalletDepositNextPage, {
          state: {
            amount: Number(inputValue.data),
            data,
          }
        });
      })

    }
  }

  const handleClickDepositMoneyButton = (rechargeValue: number, index: number, config: RechargeResponseConfig) => {
    setSelectedIndex(index);
    setInputValue({
      data: String(rechargeValue),
      isValidation: true,
      errorMessage: "",
    })
    setSelectedIndexConfig(config);
  }
  const isShowInputTag = selectedIndexConfig && Number(selectedIndexConfig?.rate) > 0
  const extraDepositBonus = formatLocaleMoney(Number(inputValue.data) * Number(selectedIndexConfig && selectedIndexConfig?.rate || 1));




  return renderByUVersion({
    "wild777bet": (
      <WDepositPanel
        {...props}
        isLoaded={isLoaded}
        selectedIndex={selectedIndex}
        depositInputProps={{ ...depositInputProps, isShowInputTag, extraDepositBonus }}
        handleClickDepositMoneyButton={handleClickDepositMoneyButton}
        depositButtonsOptions={depositButtonsOptions}
        onClickToNextDepositPage={onClickToNextDepositPage}
      />
    ),
    "u1": (
      <CDepositPanel
        {...props}
        isLoaded={isLoaded}
        selectedIndex={selectedIndex}
        depositInputProps={{ ...depositInputProps, isShowInputTag, extraDepositBonus }}
        handleClickDepositMoneyButton={handleClickDepositMoneyButton}
        depositButtonsOptions={depositButtonsOptions}
        onClickToNextDepositPage={onClickToNextDepositPage}
      />
    ),
    "u2": (
      <RDepositPanel
        {...props}
        isLoaded={isLoaded}
        selectedIndex={selectedIndex}
        depositInputProps={{ ...depositInputProps, isShowInputTag, extraDepositBonus }}
        handleClickDepositMoneyButton={handleClickDepositMoneyButton}
        depositButtonsOptions={depositButtonsOptions}
        onClickToNextDepositPage={onClickToNextDepositPage}
      />
    )
  }, (
    <PDepositPanel
      {...props}
      isLoaded={isLoaded}
      selectedIndex={selectedIndex}
      depositInputProps={{ ...depositInputProps, isShowInputTag, extraDepositBonus }}
      handleClickDepositMoneyButton={handleClickDepositMoneyButton}
      depositButtonsOptions={depositButtonsOptions}
      onClickToNextDepositPage={onClickToNextDepositPage}
    />
  ))

}
