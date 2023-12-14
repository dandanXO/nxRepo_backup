import Select from 'react-select';

import useBreakpoint from "../../../../hooks/useBreakpoint";
import {SectionContainer} from "../../../../components/container/SectionContainer";
import {Input} from "../../../../components/Inputs/Input";
import {tcx} from "../../../../utils/tcx";
import {MobileInput} from "../../../../components/Inputs/MobileInput";
import {WithdrawNoticeSection} from './WithdrawNoticeSection';
import {IWithdrawPanelCommon} from "../../components/withdraw/WithdrawPanel";
import {ButtonPro} from "../../../../components/Buttons/ButtonPro";

export const WithdrawPanel = (props: IWithdrawPanelCommon) => {
  const { isMobile } = useBreakpoint();
  const MainInput = isMobile ? MobileInput : Input;

  return (
    <div>

      <SectionContainer id={"withdraw-section"}>

        <div className="text-base md:text-2xl">


          <div className={"text-white text-left font-bold mb-2 italic"}>Quantidade retirada</div>

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

          {/* <section className={"mb-4 text-white flex flex-row text-2xl"}>
         <div className={"text-left w-full"}>
           Atualmente <button className={"text-[#ffdd14]"} onClick={onClickToVIP}>VIP{vip_level}</button>, o valor mínimo de saque diário é de
           <span className={"text-[#ffdd14]"}>R${withdrawLimitMin}</span> e o valor máximo de saque é de
           <span className={"text-[#ffdd14]"}>R${withdrawLimitMax}</span>.
         </div>
         <ViewButton className={"!hidden md:!display"}>Cheque</ViewButton>
        </section> */}

          <div className={"text-main-primary-main md:hidden text-left leading-none my-5"}>
            Uma conta só pode ser vinculada a um número de CPF para saque, uma vez vinculada não pode ser alterada.
          </div>

          <div className={tcx("text-main-primary-main hidden md:block text-left leading-none my-5", ['my-10', !isMobile])}>
            Por favor, preencha o número do CPF corretamente.Se a
            informação estiver incorreta, o saque falhará.Certifique - se de verificar as informações com atenção.
          </div>

          <section className={"text-left"}>
            <section className={""}>
              <label className={"text-white font-bold block mb-2 italic"}>Nome do usuário</label>

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
              <label className={"text-white font-bold block mb-2 italic"}>Código CPF/CNPJ</label>
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
              <label className={"text-white font-bold block mb-2 italic"}>Tipo Pix</label>
              <Select
                menuPlacement={'top'}
                className="rounded-lg "
                isSearchable={false}
                styles={{
                  control: (baseStyle, states) => {
                    return {
                      ...baseStyle,
                      background: 'var(--input-background)',
                      // borderColor: (states.menuIsOpen || states.isFocused) ? 'var(--varient)' : 'var(--main-primary-main)',
                      borderColor: 'var(--input-border)',
                      color: 'var(--input-text-color)',
                      padding: '6px',
                      borderRadius: '8px',
                      outline: 'none',
                      boxShadow: "none",
                      backgroundClip: isMobile ? 'padding-box,border-box' : '',
                      backgroundOrigin: isMobile ? 'padding-box,border-box' : '',
                      // backgroundImage: isMobile ?'linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C)':'',
                      '&:hover': {
                        // borderColor: 'none',
                      },
                      '&:focus': {
                        ...baseStyle,
                        borderColor: 'var(--input-focus-border)',
                        border: 'solid 1px'
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
                      borderColor: 'var(--input-border)',
                      background: isFocused ? 'var(--input-focus-background)' : 'var(--input-background)',
                      color: 'var(--input-text-color)',
                      marginTop: '-5px',
                      marginBottom: '-5px',
                      ':active': {
                        ...styles[':active'],
                        backgroundColor: isSelected ? 'var(--input-focus-background)' : 'var(--input-background)',
                        borderColor: 'var(--input-border)',
                      },
                    };
                  },
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: 'var(--main-primary-main)',
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
              <label className={"text-white font-bold block mb-2 italic"}>{props.selectOption.label}</label>
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

      <WithdrawNoticeSection
        onClickToVIP={props.onClickToVIP}
        vip_level={props.vip_level}
        withdrawLimitMin={props.withdrawLimitMin}
        withdrawLimitMax={props.withdrawLimitMax}
      />
      {!isMobile && <section className={"md:display flex flex-col justify-center items-center mb-4"}>
        <ButtonPro className="w-1/2 whitespace-nowrap" onClick={props.onClickToWithdraw}>Retirar</ButtonPro>
      </section>}


      {isMobile && (
        <section className={"bg-[rgba(0,0,0,.5)] fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full py-4 z-10"}>
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
