
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { notification } from 'antd';

import useBreakpoint from "../../../../hooks/useBreakpoint";
import { SectionContainer } from "../../../../components/container/SectionContainer";
import { Input, InputValue } from "../../../../components/Inputs/Input";
import { Button } from "../../../../components/Buttons/Button";
import { useGetWithdrawLimitMutation, useWithdrawMutation } from "../../../../../external";
import { environment } from "../../../../../../environments/environment";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useAutoUpdateBalance } from "../../../../hooks/useAutoUpdateBalance";

import { RootState } from "../../../../../reduxStore";
import { tcx } from "../../../../utils/tcx";
import { MobileInput } from "../../../../components/Inputs/MobileInput";
import { renderByPlatform } from "../../../../utils/renderByPlatform";
import { WithdrawPanel as CWithdrawPanel } from '../../env/coco/WithdrawPanel';
import { WithdrawPanel as PWithdrawPanel } from '../../env/pernambucana/WithdrawPanel'
import { WithdrawPanel as WWithdrawPanel } from '../../env/wild/WithdrawPanel'
import {AppLocalStorageKey} from "../../../../../persistant/AppLocalStorageKey";
import {ButtonPro} from "../../../../components/Buttons/ButtonPro";
import moment from "moment";
import { totalReasableSelector } from "../../../../../reduxStore/appSlice";
import { formatLocaleMoney } from "../../../../utils/format";



type IWithdrawPanel = {
  onClickToWithdrawRecord: () => void;
}

type ISelectOption = {
  value: string;
  label: string;
};

export type IWithdrawPanelCommon = {
  vip_level: RootState["app"]["vip_level"];

  withdrawLimitMin: number;
  withdrawLimitMax: number;

  amountInput: InputValue<string>;
  setAmountInput: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateAmount: (value: string) => void;

  nameInput: InputValue<string>;
  setNameInput: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateName: (value: string) => void;

  CPFInput: InputValue<string>;
  setCPFInput: React.Dispatch<React.SetStateAction<InputValue<string>>>;
  validateCPForCNPJ: (value: string) => void;

  selectInput: InputValue<string>;
  setSelectInput: React.Dispatch<React.SetStateAction<InputValue<string>>>;

  tipoPixOptions: ISelectOption[];
  selectOption: ISelectOption;
  setSelectOption: (value: ISelectOption) => void;
  validateSelectInput: (value: string) => void;

  onClickToWithdraw: () => void;
  onClickToVIP: () => void;
  onClickToWithdrawRecord: () => void;

  contextHolder: any;
  isDuringRestrictTime: boolean
}
export const WithdrawPanel = (props: IWithdrawPanel) => {

  const vip_level = useSelector((state: RootState) => state.app?.vip_level)

  const [amountInput, setAmountInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const [nameInput, setNameInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const [CPFInput, setCPFInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const [selectInput, setSelectInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });


  const { withdrawBegin, withdrawEnd } = useSelector((state: RootState) => state.app);
  const totalReasableValue = useSelector(totalReasableSelector);

  const duringRestrictWithdrawTime = (begin: string, end: string) => {
    const beginNumber = Number(begin.replace(':', ''))
    const endNumber = Number(end.replace(':', ''))
    const nowGmtMinus3String = moment().utcOffset(-3).format('HH:mm')
    const nowGmtMinus3Number = Number(nowGmtMinus3String.replace(':', ''))

    if (endNumber < beginNumber) {
      // 表示區間有跨日
      return nowGmtMinus3Number >= beginNumber || nowGmtMinus3Number <= endNumber
    } else {
      return nowGmtMinus3Number >= beginNumber && nowGmtMinus3Number <= endNumber
    }
  }

  const isDuringRestrictTime = duringRestrictWithdrawTime(withdrawBegin, withdrawEnd)

  const tipoPixOptions = [
    { value: 'CPF', label: 'CPF' },
    { value: 'E-mail', label: 'E-mail' },
    { value: 'Telefone(+55)', label: 'Telefone(+55)' },
    // { value: 'CNPJ', label: 'CNPJ' },
  ]

  const [selectOption, setSelectOption] = useState(tipoPixOptions[0]);
  const [triggerGetWithdrawLimit, currentWithdrawLimitData] = useGetWithdrawLimitMutation()
  // console.log("currentWithdrawLimitData", currentWithdrawLimitData);
  useEffect(() => {
    triggerGetWithdrawLimit({
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || "",
    })
  }, [])


  const withdrawLimitMin = useMemo(() => {
    if (!currentWithdrawLimitData || !currentWithdrawLimitData?.data || !currentWithdrawLimitData?.data?.data || !currentWithdrawLimitData?.data?.data?.withdrawMin) return 0;
    return parseFloat((currentWithdrawLimitData?.data?.data?.withdrawMin / 100).toFixed(2)) || 0;
  }, [currentWithdrawLimitData])

  const withdrawLimitMax = useMemo(() => {
    if (!currentWithdrawLimitData || !currentWithdrawLimitData?.data || !currentWithdrawLimitData?.data?.data || !currentWithdrawLimitData?.data?.data?.withdrawMax) return 0;
    return parseFloat((currentWithdrawLimitData?.data?.data?.withdrawMax / 100).toFixed(2)) || 0;
  }, [currentWithdrawLimitData])



  const validateAmount = (value: string) => {
    const isOutOfRange = Number(value) > Number(withdrawLimitMax) || Number(value) < Number(withdrawLimitMin);
    const isValueError = value === "" || isNaN(Number(value))
    const isNotBaseOn10 = Number(value) % 10
    const isOverTotalReasableValue = Number(value) > totalReasableValue ;
    const isError = isOutOfRange || isValueError || isNotBaseOn10 || isOverTotalReasableValue;
    // 錯誤訊息 (超過可提取): 可提取金額為0.00 - > O valor que pode ser sacado é 0.00
    // 錯誤訊息 (欄位空白): Valor da retirada (50 - 100)
    const errorMessage =
      isOutOfRange ? `O valor que pode ser sacado é ${formatLocaleMoney(withdrawLimitMin)} - ${formatLocaleMoney(withdrawLimitMax)}` :
        isValueError ? `Valor da retirada (${formatLocaleMoney(withdrawLimitMin)} - ${formatLocaleMoney(withdrawLimitMax)})` :
          isNotBaseOn10? 'O valor da retirada deve ser em múltiplos de 50. Por exemplo:  50, 100, 1100, 1650, 28650…':
            isOverTotalReasableValue ? `O valor que pode ser sacado é ${Number((totalReasableValue / 10).toFixed(0)) * 10}` : ''

    setAmountInput({
      data: value,
      isValidation: !isError,
      errorMessage,
    });

    return isError
  }
  const validateName = (value: string) => {
    const isError = value === "";
    setNameInput({
      data: value,
      isValidation: !isError,
      errorMessage: !isError ? "" : "Insira o nome do titular do cartão",
    });
    return isError
  }

  const validateCPForCNPJ = (value: string) => {
    // NOTE: CPF, CNPJ
    // const isError = isNaN(Number(value)) || value === "" || (value.length !== 11 && value.length !== 14);
    // NOTE: CPF
    const isError = isNaN(Number(value)) || value === "" || (value.length !== 11);
    setCPFInput({
      data: value,
      isValidation: !isError,
      errorMessage: !isError ? "" : "Insira seu CPF no formato correto",
    });

    // CPF 11, CNPJ 14
    return isError
  }
  const validateSelectInput = (value: string) => {
    let isError = false;
    if (selectOption.label === 'CPF') {
      isError = isNaN(Number(value)) || value === "" || value.length !== 11
      const errorMessage = "Informe o CPF no formato correto";
      setSelectInput({
        data: value,
        isValidation: !isError,
        errorMessage: !isError ? "" : errorMessage,
      })

      // NOTE: 後端暫時不支援此方法
    } else if (selectOption.label === 'CNPJ') {
      isError = isNaN(Number(value)) || value === "" || value.length !== 14
      const errorMessage = "Insira seu CNPJ no formato correto"
      setSelectInput({
        data: value,
        isValidation: !isError,
        errorMessage: !isError ? "" : errorMessage,
      })

    } else if (selectOption.label === 'E-mail') {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      isError = !emailPattern.test(value) || value === '';
      setSelectInput({
        data: value,
        isValidation: !isError,
        errorMessage: !isError ? "" : value === "" ? "Por favor insira seu e-mail" : "Insira o formato correto",
      })
    } else if (selectOption.label === 'Telefone(+55)') {
      isError = isNaN(Number(value)) || value === "" || (value.length !== 10 && value.length !== 11)
      setSelectInput({
        data: value,
        isValidation: !isError,
        errorMessage: !isError ? "" : "Número de celular de 10 ou 11 dígitos",
      })
    }
    return isError;
  }

  useEffect(() => {
    setSelectInput({
      data: '',
      isValidation: true,
      errorMessage: '',
    })
  }, [selectOption])

  const [triggerWithdraw, { data, isLoading, isSuccess, isError }] = useWithdrawMutation();

  const [api, contextHolder] = notification.useNotification();

  const { update } = useAutoUpdateBalance({
    autoWindowFocusRefresh: false,
  });


  const onClickToWithdraw = () => {
    const isError1 = validateAmount(amountInput.data)
    const isError2 = validateName(nameInput.data)
    const isError3 = validateCPForCNPJ(CPFInput.data)
    const isError4 = validateSelectInput(selectInput.data)
    if (isError1 || isError2 || isError3 || isError4) {
      api.error({
        message: "Form is invalid"
      })
      return;
    }
    let type = 1;
    if (selectOption.label === 'CPF' || selectOption.label === 'CNPJ') {
      type = 1;
    } else if (selectOption.label === 'E-mail') {
      type = 2;
    } else if (selectOption.label === 'Telefone(+55)') {
      type = 3
    }

    triggerWithdraw({
      token: AppLocalStorage.getItem(AppLocalStorageKey.token) || "",
      app_package_name: environment.appPackageName,
      app_version: environment.appVersion,
      amount: Number(amountInput.data),
      pix: JSON.stringify({
        customerName: nameInput.data,
        // CPF|CNPJ
        customerCert: CPFInput.data,
        accountType: type,
        accountNum: selectInput.data,
      })
    }).unwrap().then(data => {
      if (data?.code === 200) {
        update();
        api.info({
          message: data?.msg,
          onClick: () => {
            props.onClickToWithdrawRecord();
          },
          onClose: () => {
            props.onClickToWithdrawRecord();
          }
        })
      }
      // 112014 銀行關閉，提現時間範圍
      else if (data?.code === 103016) {
        // NOTE: cannot withdraw
        api.info({
          message: data?.msg,
        })
      } else {
        api.info({
          message: data?.msg,
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }


  const onClickToVIP = () => {
    window.open(PageOrModalPathEnum.VIPGradePage);
  }


  return (
    renderByPlatform({
      "coco777bet": (
        <CWithdrawPanel
          vip_level={vip_level}
          withdrawLimitMin={withdrawLimitMin}
          withdrawLimitMax={withdrawLimitMax}
          amountInput={amountInput}
          setAmountInput={setAmountInput}
          validateAmount={validateAmount}
          nameInput={nameInput}
          setNameInput={setNameInput}
          validateName={validateName}
          CPFInput={CPFInput}
          setCPFInput={setCPFInput}
          validateCPForCNPJ={validateCPForCNPJ}
          selectInput={selectInput}
          setSelectInput={setSelectInput}
          selectOption={selectOption}
          setSelectOption={setSelectOption}
          validateSelectInput={validateSelectInput}
          tipoPixOptions={tipoPixOptions}
          onClickToWithdraw={onClickToWithdraw}
          onClickToVIP={onClickToVIP}
          onClickToWithdrawRecord={props.onClickToWithdrawRecord}
          contextHolder={contextHolder}
          isDuringRestrictTime={isDuringRestrictTime}
        />
      ),
      "wild777bet": (
        <WWithdrawPanel
          vip_level={vip_level}
          withdrawLimitMin={withdrawLimitMin}
          withdrawLimitMax={withdrawLimitMax}
          amountInput={amountInput}
          setAmountInput={setAmountInput}
          validateAmount={validateAmount}
          nameInput={nameInput}
          setNameInput={setNameInput}
          validateName={validateName}
          CPFInput={CPFInput}
          setCPFInput={setCPFInput}
          validateCPForCNPJ={validateCPForCNPJ}
          selectInput={selectInput}
          setSelectInput={setSelectInput}
          selectOption={selectOption}
          setSelectOption={setSelectOption}
          validateSelectInput={validateSelectInput}
          tipoPixOptions={tipoPixOptions}
          onClickToWithdraw={onClickToWithdraw}
          onClickToVIP={onClickToVIP}
          onClickToWithdrawRecord={props.onClickToWithdrawRecord}
          contextHolder={contextHolder}
          isDuringRestrictTime={isDuringRestrictTime}
        />
      )
    }, (
      <PWithdrawPanel
        vip_level={vip_level}
        withdrawLimitMin={withdrawLimitMin}
        withdrawLimitMax={withdrawLimitMax}
        amountInput={amountInput}
        setAmountInput={setAmountInput}
        validateAmount={validateAmount}
        nameInput={nameInput}
        setNameInput={setNameInput}
        validateName={validateName}
        CPFInput={CPFInput}
        setCPFInput={setCPFInput}
        validateCPForCNPJ={validateCPForCNPJ}
        selectInput={selectInput}
        setSelectInput={setSelectInput}
        selectOption={selectOption}
        setSelectOption={setSelectOption}
        validateSelectInput={validateSelectInput}
        tipoPixOptions={tipoPixOptions}
        onClickToWithdraw={onClickToWithdraw}
        onClickToVIP={onClickToVIP}
        onClickToWithdrawRecord={props.onClickToWithdrawRecord}
        contextHolder={contextHolder}
        isDuringRestrictTime={isDuringRestrictTime}
      />
    ))
  )
}
