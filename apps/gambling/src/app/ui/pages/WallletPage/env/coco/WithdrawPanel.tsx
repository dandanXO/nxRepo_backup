
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { notification } from 'antd';

import useBreakpoint from "../../../../hooks/useBreakpoint";
import { SectionContainer } from "../../../../components/container/SectionContainer";
import { Input, InputValue } from "../../../../components/Inputs/Input";
import { Button, ButtonPro } from "../../../../components/Buttons/Button";
import { useGetWithdrawLimitMutation, useWithdrawMutation } from "../../../../../external";
import { environment } from "../../../../../../environments/environment";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useAutoUpdateBalance } from "../../../../hooks/useAutoUpdateBalance";

import { RootState } from "../../../../../reduxStore";
import cx from 'classnames';
import { MobileInput } from "../../../../components/Inputs/MobileInput";
import { WithdrawNoticeSection } from './WithdrawNoticeSection';


type IWithdrawPanel = {
  onClickToWithdrawRecord: () => void;
}

export const WithdrawPanel = (props: IWithdrawPanel) => {
  const { isMobile } = useBreakpoint();
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)

  const MainInput = isMobile ? MobileInput : Input;
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



  const tipoPixOptions = [
    { value: 'CPF', label: 'CPF' },
    { value: 'E-mail', label: 'E-mail' },
    { value: 'Telefone(+55)', label: 'Telefone(+55)' },
    { value: 'CNPJ', label: 'CNPJ' },
  ]

  const [selectOption, setSelectOption] = useState(tipoPixOptions[0]);
  const [triggerGetWithdrawLimit, currentWithdrawLimitData] = useGetWithdrawLimitMutation()
  // console.log("currentWithdrawLimitData", currentWithdrawLimitData);
  useEffect(() => {
    triggerGetWithdrawLimit({
      token: AppLocalStorage.getItem("token") || "",
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
    const isError = isOutOfRange || isValueError;
    // 錯誤訊息 (超過可提取): 可提取金額為0.00 - > O valor que pode ser sacado é 0.00
    // 錯誤訊息 (欄位空白): Valor da retirada (50 - 100)
    const errorMessage =
      isOutOfRange ? `O valor que pode ser sacado é ${Number(withdrawLimitMin).toFixed(2)} - ${Number(withdrawLimitMax).toFixed(2)}` :
        isValueError ? `Valor da retirada (${Number(withdrawLimitMin).toFixed(2)} - ${Number(withdrawLimitMax).toFixed(2)})` : ''

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
    const isError = isNaN(Number(value)) || value === "" || (value.length !== 11 && value.length !== 14);
    setCPFInput({
      data: value,
      isValidation: !isError,
      errorMessage: !isError ? "" : "Insira seu CPF/CNPJ no formato correto",
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
        errorMessage: !isError ? "" : value === "" ? "Por favor insira seu e-mail" : "Informe o CPF no formato correto",
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
      token: AppLocalStorage.getItem("token") || "",
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
      api.error(({
        message: JSON.stringify(error)
      }))
    })
  }




  const onClickToVIP = () => {
    window.open(PageOrModalPathEnum.VIPGradePage);
  }
  return (
    <div>

      <SectionContainer id={"withdraw-section"}>
        <div className="text-base md:text-2xl">
          <MainInput
            inputClassName={"leading-none"}
            themeStyle={"simple"}
            className="w-full rounded-lg"
            placeholder={`Retirada mínima R$${withdrawLimitMin}`}

            value={amountInput.data}
            validation={amountInput.isValidation}
            errorMessage={amountInput.errorMessage}
            onChange={(event: any) => {
              const isError = validateAmount(event.target.value);
            }} />

          <div className={"text-white text-xs md:text-xl text-left leading-none mt-3 md:mt-6"}>
            Atualmente <button className={"text-[#ffdd14]"} onClick={onClickToVIP}>VIP{vip_level}</button>, o valor mínimo de saque diário é de
            <span className={"text-[#ffdd14]"}>R${withdrawLimitMin}</span> e o valor máximo de saque é de
            <span className={"text-[#ffdd14]"}>R${withdrawLimitMax}</span>.
          </div>

          <div className={cx(`text-white leading-none  rounded-xl
            p-3.5 md:py-6 md:px-4  
            my-4 md:my-6
            text-xs md:text-xl
            text-center md:text-left
            leading-4 md:leading-7
            bg-gradient-to-b from-[var(--background-alert-text-from)] to-[var(--background-alert-text-to)]
          `)}>
            Por favor, preencha o número do CPF corretamente.Se a informação estiver incorreta, o saque falhará.Certifique - se de verificar as informações com atenção. Uma conta só pode ser vinculada a um número de CPF/CNPJ para saque, uma vez vinculada não pode ser alterada.
          </div>

          <section className={"text-left"}>
            <section className={""}>
              <label className={"text-white font-bold block mb-2 "}>Nome do usuário</label>

              <MainInput
                inputClassName={"text-main-primary-main leading-none"}
                themeStyle={"simple"}
                className="w-full rounded-lg"
                placeholder={"Insira o nome do titular do cartão"}
                value={nameInput.data}
                validation={nameInput.isValidation}
                errorMessage={nameInput.errorMessage}
                onChange={(event: any) => {
                  const isError = validateName(event.target.value);

                }}
              />
            </section>

            <section className={""}>
              <label className={"text-white font-bold block mb-2 "}>Código CPF/CNPJ</label>
              <MainInput
                themeStyle={"simple"}
                className="w-full rounded-lg"
                inputClassName={"text-main-primary-main leading-none "}
                placeholder={"Insira o seu código CPF"}
                value={CPFInput.data}
                validation={CPFInput.isValidation}
                errorMessage={CPFInput.errorMessage}
                onChange={(event: any) => {
                  const isError = validateCPForCNPJ(event.target.value);
                }}
              />
            </section>

            <section className={"mb-2"}>
              <label className={"text-white font-bold block mb-2 "}>Tipo Pix</label>
              <Select
                menuPlacement={'top'}
                className="rounded-lg "
                isSearchable={false}
                styles={{
                  control: (baseStyle, states) => {
                    return {
                      ...baseStyle,
                      background: 'var(--primary-variant)',
                      borderColor: 'var(--stroke-textfields)',
                      color: 'white',
                      padding: '6px',
                      borderRadius: '8px',
                      outline: 'none',
                      boxShadow: "none",
                      backgroundClip: isMobile ? 'padding-box,border-box' : '',
                      backgroundOrigin: isMobile ? 'padding-box,border-box' : '',
                      '&:hover': {
                        // borderColor: 'none',
                      },
                      '&:focus': {
                        ...baseStyle,
                        borderColor: 'var(--stroke-textfields)',
                        border: 'solid 1px'
                      }
                    };
                  },
                  valueContainer: (style: any, state: any) => ({
                    ...style,
                    color: 'white',
                  }),
                  //@ts-ignore
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: 'none',
                  }),
                  //@ts-ignore
                  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                    return {
                      ...styles,
                      borderColor: 'var(--input-border)',
                      background: isFocused ? 'linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%)'  : 'var(--primary-variant)',
                      color: 'var(--input-text-color)',
                      marginTop: '-5px',
                      marginBottom: '-5px',
                      // ':active': {
                      //   ...styles[':active'],
                      //   backgroundColor: isSelected ? 'var(--primary-variant)' : 'var(--primary-variant)',
                      //   borderColor: 'var(--input-border)',
                      // },
                    };
                  },
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: 'var(--stroke-textfields)',
                  })
                }}
                value={selectOption}
                onChange={(item: any) => {
                  setSelectOption(item)
                }}
                options={tipoPixOptions}
              />
            </section>

            <section className={""}>
              <label className={"text-white font-bold block mb-2 "}>{selectOption.label}</label>
              <MainInput
                className="w-full rounded-lg"
                inputClassName={"leading-none"}
                themeStyle={"simple"}
                placeholder={selectOption.label}
                value={selectInput.data}
                validation={selectInput.isValidation}
                errorMessage={selectInput.errorMessage}
                prefix={selectOption.label === 'Telefone(+55)' ? <div className="mr-2">+55</div> : ''}
                onChange={(event: any) => {
                  validateSelectInput(event.target.value)
                }}
              />
            </section>
          </section>
        </div>
      </SectionContainer>
      {!isMobile && <section className={"md:display flex flex-col justify-center items-center my-6"}>
        <ButtonPro className="w-1/2 whitespace-nowrap" onClick={onClickToWithdraw}>Retirar</ButtonPro>
      </section>}

      <WithdrawNoticeSection
        onClickToVIP={onClickToVIP}
        vip_level={vip_level}
        withdrawLimitMin={withdrawLimitMin}
        withdrawLimitMax={withdrawLimitMax}
      />


      {isMobile && (
        <section className={"fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(1,62,66,0.6)] py-4 z-10"}>
          <ButtonPro
            size={"small"}
            onClick={onClickToWithdraw}
          >
            RETIRAR
          </ButtonPro>
        </section>
      )}

      {/*NOTICE: z-index*/}
      {contextHolder}
    </div>
  )
}
