import Select from 'react-select';

import useBreakpoint from "../../../../hooks/useBreakpoint";
import {SectionContainer} from "../../../../components/container/SectionContainer";
import {Input} from "../../../../components/Inputs/Input";
import {ButtonPro} from "../../../../components/Buttons/Button";
import cx from 'classnames';
import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {WithdrawNoticeSection} from './WithdrawNoticeSection';
import {IWithdrawPanelCommon} from "../../WithdrawPanel";


export const WithdrawPanel = (props: IWithdrawPanelCommon) => {
  const { isMobile } = useBreakpoint();
  const MainInput = isMobile ? MobileInput : Input;

  return (
    <div>

      <SectionContainer id={"withdraw-section"}>
        <div className="text-base md:text-2xl">
          <MainInput
            inputClassName={"leading-none"}
            themeStyle={"simple"}
            className="w-full rounded-lg"
            placeholder={`Retirada mínima R$${props.withdrawLimitMin}`}

            value={props.amountInput.data}
            validation={props.amountInput.isValidation}
            errorMessage={props.amountInput.errorMessage}
            onChange={(event: any) => {
              const isError = props.validateAmount(event.target.value);
            }} />

          <div className={"text-white text-xs md:text-xl text-left leading-none mt-3 md:mt-6"}>
            Atualmente <button className={"text-[#ffdd14]"} onClick={props.onClickToVIP}>VIP{props.vip_level}</button>, o valor mínimo de saque diário é de
            <span className={"text-[#ffdd14]"}>R${props.withdrawLimitMin}</span> e o valor máximo de saque é de
            <span className={"text-[#ffdd14]"}>R${props.withdrawLimitMax}</span>.
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
                value={props.nameInput.data}
                validation={props.nameInput.isValidation}
                errorMessage={props.nameInput.errorMessage}
                onChange={(event: any) => {
                  const isError = props.validateName(event.target.value);

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
                value={props.CPFInput.data}
                validation={props.CPFInput.isValidation}
                errorMessage={props.CPFInput.errorMessage}
                onChange={(event: any) => {
                  const isError = props.validateCPForCNPJ(event.target.value);
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
                value={props.selectOption}
                onChange={(item: any) => {
                  props.setSelectOption(item)
                }}
                options={props.tipoPixOptions}
              />
            </section>

            <section className={""}>
              <label className={"text-white font-bold block mb-2 "}>{props.selectOption.label}</label>
              <MainInput
                className="w-full rounded-lg"
                inputClassName={"leading-none"}
                themeStyle={"simple"}
                placeholder={props.selectOption.label}
                value={props.selectInput.data}
                validation={props.selectInput.isValidation}
                errorMessage={props.selectInput.errorMessage}
                prefix={props.selectOption.label === 'Telefone(+55)' ? <div className="mr-2">+55</div> : ''}
                onChange={(event: any) => {
                  props.validateSelectInput(event.target.value)
                }}
              />
            </section>
          </section>
        </div>
      </SectionContainer>
      {!isMobile && <section className={"md:display flex flex-col justify-center items-center my-6"}>
        <ButtonPro className="w-1/2 whitespace-nowrap" onClick={props.onClickToWithdraw}>Retirar</ButtonPro>
      </section>}

      <WithdrawNoticeSection
        onClickToVIP={props.onClickToVIP}
        vip_level={props.vip_level}
        withdrawLimitMin={props.withdrawLimitMin}
        withdrawLimitMax={props.withdrawLimitMax}
      />


      {isMobile && (
        <section className={"fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(1,62,66,0.6)] py-4 z-10"}>
          <ButtonPro
            size={"small"}
            onClick={props.onClickToWithdraw}
          >
            RETIRAR
          </ButtonPro>
        </section>
      )}

      {/*NOTICE: z-index*/}
      {props.contextHolder}
    </div>
  )
}