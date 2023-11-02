import {SectionContainer} from "../../components/SectionContainer";
import {Input, InputValue} from "../../components/Input";
import {Button} from "../../components/Button";
import {DepositConfirmButton, DepositSectionNotice, ViewButton} from "./index";
import {BlueBoard} from "./BlueBoard";
import useBreakpoint from "../../hooks/useBreakpoint";
import {MobileInput} from "./MobileInput";
import {MobileDepositConfirmButton} from "./DepositPanel";
import {useEffect, useMemo, useState} from "react";
import Select from 'react-select';
import {useGetWithdrawLimitMutation, useWithdrawMutation} from "../../../external";
import {environment} from "../../../../environments/environment";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {notification} from 'antd';
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useAutoUpdateBalance} from "../../hooks/useAutoUpdateBalance";
import {useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";

type IWithdrawPanel = {
  onClickToWithdrawRecord: () => void;
}

export const WithdrawPanel = (props: IWithdrawPanel) => {
  const {isMobile} = useBreakpoint();
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
  console.log("currentWithdrawLimitData", currentWithdrawLimitData);
  useEffect(() => {
    triggerGetWithdrawLimit({
      token: AppLocalStorage.getItem("token") || "",
    })
  }, [])


  const withdrawLimitMin = useMemo(() => {
    if(!currentWithdrawLimitData || !currentWithdrawLimitData?.data || !currentWithdrawLimitData?.data?.data  || !currentWithdrawLimitData?.data?.data?.withdrawMin) return 0;
    return parseFloat((currentWithdrawLimitData?.data?.data?.withdrawMin/100).toFixed(2)) || 0;
  }, [currentWithdrawLimitData])

  const withdrawLimitMax = useMemo(() => {
    if(!currentWithdrawLimitData || !currentWithdrawLimitData?.data || !currentWithdrawLimitData?.data?.data  || !currentWithdrawLimitData?.data?.data?.withdrawMax) return 0;
    return parseFloat((currentWithdrawLimitData?.data?.data?.withdrawMax/100).toFixed(2)) || 0;
  }, [currentWithdrawLimitData])



  const validateAmount = (value: string) => {
    const isOutOfRange= Number(value) > Number(withdrawLimitMax) || Number(value) < Number(withdrawLimitMin);
    const isValueError =  value === "" || isNaN(Number(value))
    const isError = isOutOfRange || isValueError ;
    // 錯誤訊息 (超過可提取): 可提取金額為0.00 - > O valor que pode ser sacado é 0.00
    // 錯誤訊息 (欄位空白): Valor da retirada (50 - 100)
    const errorMessage =
      isOutOfRange ? `O valor que pode ser sacado é ${Number(withdrawLimitMin).toFixed(2)} - ${Number(withdrawLimitMax).toFixed(2)}` :
      isValueError ? `Valor da retirada (${Number(withdrawLimitMin).toFixed(2)} - ${Number(withdrawLimitMax).toFixed(2)})` : ''

      setAmountInput({
        data: value,
        isValidation: !isError ,
        errorMessage,
      });

    return isError
  }
  const validateName = (value: string) => {
    const isError = value === "" ;
    setNameInput({
      data: value,
      isValidation: !isError,
      errorMessage: !isError ? "" : "Insira o nome do titular do cartão",
    });
    return isError
  }

  const validateCPForCNPJ = (value: string) => {
    const isError =isNaN(Number(value)) || value === "" || (value.length !== 11 && value.length !== 14);
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
    if (selectOption.label === 'CPF' || selectOption.label === 'CNPJ') {
      isError = isNaN(Number(value)) || value === "" || value.length !== 11
      const errorMessage = selectOption.label === 'CPF' ? "Informe o CPF no formato correto" : "Insira seu CNPJ no formato correto"
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
      isError = isNaN(Number(value)) || value === "" || value.length !== 11
      setSelectInput({
        data: value,
        isValidation: !isError,
        errorMessage: !isError ? "" : "Por favor, insira o número de telefone",
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

  const [triggerWithdraw, {data, isLoading, isSuccess, isError}] = useWithdrawMutation();

  const [api, contextHolder] = notification.useNotification();

  const {updateBalance} = useAutoUpdateBalance();


  const onClickToWithdraw = () => {
    const isError1 = validateAmount(amountInput.data)
    const isError2 = validateName(nameInput.data)
    const isError3 = validateCPForCNPJ(CPFInput.data)
    const isError4 = validateSelectInput(selectInput.data)
    if(isError1 || isError2 || isError3 || isError4)
    {
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
      if(data?.code === 200) {
        updateBalance();
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
      else if(data?.code === 103016) {
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

        {isMobile && (
          <BlueBoard/>
        )}

        <div className={"text-white text-left font-bold text-lg mb-2"}>Quantidade retirada</div>

        <MainInput themeStyle={"simple"} className="w-full rounded" placeholder={`Retirada mínima R$${withdrawLimitMin}`}

          value={amountInput.data}
          validation={amountInput.isValidation}
          errorMessage={amountInput.errorMessage}
          onChange={(event) => {
            const isError = validateAmount(event.target.value);


          }}/>

        <section className={"mb-4 text-white flex flex-row"}>
          <div className={"text-left w-full"}>
            Atualmente <button className={"text-[#ffdd14]"} onClick={onClickToVIP}>VIP{vip_level}</button>, o valor mínimo de saque diário é de
            <span className={"text-[#ffdd14]"}>R${withdrawLimitMin}</span> e o valor máximo de saque é de
            <span className={"text-[#ffdd14]"}>R${withdrawLimitMax}</span>.
          </div>
          <ViewButton className={"!hidden md:!display"}>Cheque</ViewButton>
        </section>

        <div className={"text-[#61d4a4] md:!hidden"}>
          Uma conta só pode ser vinculada a um número de CPF para saque, uma vez vinculada não pode ser alterada.
        </div>

        <DepositSectionNotice className={"hidden md:display"}>
          Por favor, preencha o número do CPF corretamente.Se a
          informação estiver incorreta, o saque falhará.Certifique - se de verificar as informações com atenção.
        </DepositSectionNotice>

        <section className={"text-left"}>
          <section className={""}>
            <label className={"text-white font-lg block mb-2"}>Nome do usuário</label>

            <MainInput
              themeStyle={"simple"}
              className="w-full rounded"
              placeholder={"Insira o nome do titular do cartão"}
              value={nameInput.data}
              validation={nameInput.isValidation}
              errorMessage={nameInput.errorMessage}
              onChange={(event) => {
                const isError = validateName(event.target.value);

              }}
            />
          </section>

          <section className={""}>
            <label className={"text-white font-lg block mb-2"}>Código CPF/CNPJ</label>
            <MainInput themeStyle={"simple"} className="w-full rounded"
              placeholder={"Insira o seu código CPF"}
              value={CPFInput.data}
              validation={CPFInput.isValidation}
              errorMessage={CPFInput.errorMessage}
              onChange={(event) => {
                const isError = validateCPForCNPJ(event.target.value);
              }}
            />
          </section>

          <section className={"mb-2"}>
            <label className={"text-white font-lg block mb-2"}>Tipo Pix</label>
            <Select
              menuPlacement={'top'}
              className="rounded-lg "
              styles={{
                control: (baseStyle, states) => {
                  return {
                    ...baseStyle,
                    // background: '#0f1114',
                    background: isMobile ? '#1b5c40' : '#101e12',
                    borderColor: (states.menuIsOpen || states.isFocused) ? '#4FFB0C' : isMobile ? '#3CC78C' : '#0f1114',
                    color: 'white',
                    padding: '6px',
                    borderRadius: '8px',
                    outline: 'none',
                    boxShadow: "none",
                    backgroundClip: isMobile ? 'padding-box,border-box':'',
                    backgroundOrigin: isMobile ? 'padding-box,border-box':'',
                    // backgroundImage: isMobile ?'linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C)':'',
                    '&:hover': {
                      borderColor: 'none',
                    },
                    '&:focus': {
                      borderColor: '#4FFB0C',
                      // backgroundImage: isMobile ?'linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C':'',
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
                    borderColor: isSelected ? '#4FFB0C' : '#0f1114',
                    background: isFocused ?'#0f1114':'#101e12',
                    color: 'gray',
                    marginTop: '-5px',
                    marginBottom: '-5px',
                    ':active': {
                      ...styles[':active'],
                      backgroundColor: isSelected? '#0f1114':'#101e12',

                    },
                  };
                },
                singleValue: (provided, state) => ({
                  ...provided,
                  color: '#9ca3af',
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
            <label className={"text-white font-lg block mb-2"}>{selectOption.label}</label>
            <MainInput
              themeStyle={"simple"}
              className="w-full rounded"
              placeholder={selectOption.label}
              value={selectInput.data}
              validation={selectInput.isValidation}
              errorMessage={selectInput.errorMessage}
              prefix={selectOption.label==='Telefone(+55)'? <div className="mr-2">+55</div> :''}
              onChange={(event) => {
                validateSelectInput(event.target.value)
              }}
            />
          </section>
        </section>

        {!isMobile && <section className={"md:display flex flex-col justify-center item-center mb-4"}>
          <DepositConfirmButton className={"px-6 py-4"} onClick={onClickToWithdraw}>
            <span className={"text-white font-bold text-lg"}>Retirar</span>
            <img className="w-[26px] h-[26px]" alt={"arrow"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA2CAMAAAC/bkrSAAAAUVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////8IN+deAAAAGnRSTlMAPhcPyvQHuX8wC/ruwc2zFNGUfXFUTUY7H6zobTwAAAB2SURBVEjH7dNLDoAgDEVRFQTFH/61+1+okTBSQ3yMjOkdNjmjtgnH/So1WNxo6i1uiFqBobKmCLXlp5KgSp1qDKbWKkYtUWp2Sqvr3GShJnpUBb2oUyjyCkdSoOi+4j0NNXqDHQUb1PjP9QZUzqBKi4TjuI91AAuTGKj61zQSAAAAAElFTkSuQmCC"}/>
          </DepositConfirmButton>
        </section>}

      </SectionContainer>

      {!isMobile && (
        <SectionContainer className={"mb-2"}>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg flex flex-row"}>
            <div>
              O valor e a frequência do saque diário estão diretamente relacionados ao seu nível VIP.
              Nível atual
              <button className={"text-[#ffdd14]"} onClick={onClickToVIP}>VIP{vip_level}</button>, o valor mínimo de saque diário é de
              <span className={"text-[#ffdd14]"}>R${withdrawLimitMin}</span> e o valor máximo de saque é de
              <span className={"text-[#ffdd14]"}>R${withdrawLimitMax}</span>.
            </div>
            <div>
              <Button/>
            </div>
          </section>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg"}>
            O valor da retirada deve ser em múltiplos de 10.
            Por exemplo: 10, 20, 80, 120, 990, 19820…
          </section>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg"}>
            As recompensas da promoção podem ser retiradas diretamente.
          </section>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg"}>
            O saldo não retirável na conta de recarga (Atividade) (incluindo, entre outros, o valor da recarga, recompensas por participar de atividades e valor de ganhos e perdas do jogo, etc.), pode ser retirado aumentando o valor da transação do jogo e obtendo um valor de lucro maior.
          </section>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg"}>
            Por favor, preencha o número do CPF corretamente. Se a informação estiver incorreta, o saque falhará. Certifique-se de verificar as informações com atenção.
          </section>

          <section className={"border-utils-gray mb-4 px-8 py-6 text-left text-lg"}>
            Das  <span className={"text-[#ffdd14]"}>22h</span> à  <span className={"text-[#ffdd14]"}>1h</span> no Brasil, o sistema está em processo de liquidação. A fim de manter a liquidação estável, nenhum negócio de retirada e liquidação de dinheiro será realizado durante este período. Pedimos desculpas pelo inconveniente causado a você!
          </section>
        </SectionContainer>
      )}

      {isMobile && (
        <SectionContainer className={"mb-20 "}>
          <div className={"text-left px-2"}>
            <div className={"text-white text-left font-bold text-lg mb-2"}>Regras de retirada</div>
            <ul className={"text-white "}>
              <li className={"mb-2"}>1. O valor e a frequência do saque diário estão diretamente relacionados ao seu nível VIP.  Nível atual <button className={"text-[#ffdd0a] underline"} onClick={onClickToVIP}>VIP${vip_level}</button>, O valor que você pode retirar diariamente é de <span className={"text-[#ffdd0a] "}>R${withdrawLimitMin} - R${withdrawLimitMax}</span></li>
              <li className={"mb-2"}>2. O valor da retirada deve ser em múltiplos de 10. Por exemplo: 10, 20, 80, 120, 990, 19820…</li>
              <li className={"mb-2"}>3. As recompensas da promoção podem ser retiradas diretamente.</li>
              <li className={"mb-2"}>4. O saldo não retirável na conta de recarga (Atividade) (incluindo, entre outros, o valor da recarga, recompensas por participar de atividades e valor de ganhos e perdas do jogo, etc.).  pode ser retirado aumentando o valor da transação do jogo e obtendo um valor de lucro maior.</li>
              <li className={"mb-2"}>5. Por favor, preencha o número do CPF corretamente. Se a informação estiver incorreta, o saque falhará. Certifique-se de verificar as informações com atenção.</li>
              <li className={"mb-2"}>6. Das 22 h à 1 h no Brasil, o sistema está em processo de liquidação. A fim de manter a liquidação estável, nenhum negócio de retirada e liquidação de dinheiro será realizado durante este período. Pedimos desculpas pelo inconveniente causado a você! </li>
            </ul>
          </div>
        </SectionContainer>
      )}

      {isMobile && (
        <section className={"fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(9,11,15,.8)] py-4"}>
          <MobileDepositConfirmButton className={"px-6 py-2 rounded-xl w-[200px]"} onClick={onClickToWithdraw}>
            <span className={"text-white font-bold text-lg"}>Retirar</span>
          </MobileDepositConfirmButton>
        </section>
      )}

      {/*NOTICE: z-index*/}
      {contextHolder}
    </div>
  )
}
