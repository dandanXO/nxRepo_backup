import Select from 'react-select';

import useBreakpoint from "../../../../../../hooks/useBreakpoint";
import {SectionContainer} from "../../../../../../components/container/SectionContainer";
import {Input} from "../../../../../../components-bs/Inputs/Input";
import {tcx} from "../../../../../../utils/tcx";
import {MobileInput} from "../../../../../../components-bs/Inputs/MobileInput";
import {WithdrawNoticeSection} from './WithdrawNoticeSection';
import {IWithdrawPanelCommon} from "../../../../components/withdraw/WithdrawPanel";
import {ButtonPro} from "../../../../../../components-bs/Buttons/ButtonPro";
import { WithdrawForm } from '../../../../components/withdraw/WithdrawForm';


export const WithdrawPanel = (props: IWithdrawPanelCommon) => {
  const { isMobile } = useBreakpoint();
  const MainInput = isMobile ? MobileInput : Input;

  return (
    <div>

      <SectionContainer id={"withdraw-section"}>

        {/*{isMobile && (*/}
        {/*  <BlueBoard/>*/}
        {/*)}*/}
        {/* {isMobile && (
          <TotalSectionContainer/>
        )} */}

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

          <WithdrawForm {...props} />

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
        <section className={"fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full bg-[rgba(0,0,0,.5)] py-4 z-10"}>
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
