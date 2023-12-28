import cx from 'classnames';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { RootState } from '../../../../../../../reduxStore';
import { ButtonPro } from '../../../../../../components-bs/Buttons/ButtonPro';
import { ArrowRight } from '../../../../../../components-bs/Icons/ArrowRight';
import { Input } from '../../../../../../components-bs/Inputs/Input';
import { MobileInput } from '../../../../../../components-bs/Inputs/MobileInput';
import { SectionContainer } from '../../../../../../components/container/SectionContainer';
import useBreakpoint from '../../../../../../hooks/useBreakpoint';
import { formatLocaleMoney } from '../../../../../../utils/format';
import { tcx } from '../../../../../../utils/tcx';
import { IWithdrawPanelCommon } from '../../../../components/withdraw/WithdrawPanel';
import { WithdrawNoticeSection } from './WithdrawNoticeSection';
import { WithdrawForm } from '../../../../components/withdraw/WithdrawForm';

export const WithdrawPanel = (props: IWithdrawPanelCommon) => {
  const { isMobile } = useBreakpoint();
  const MainInput = isMobile ? MobileInput : Input;
  const { isDuringRestrictTime } = props;

  const { withdrawEnd, withdrawBegin } = useSelector(
    (state: RootState) => state.app
  );

  const inputClassName = 'text-white leading-none text-sm md:text-xl'
  if (!isDuringRestrictTime) {
    return (
      <div>
        <SectionContainer id={'withdraw-section'}>
          <div className="text-base md:text-2xl">
            <MainInput
              type="text"
              inputmode="numeric"
              inputClassName={inputClassName}
              themeStyle={'normal'}
              className="w-full"
              placeholder={`Retirada mínima R$${props.withdrawLimitMin}`}
              value={props.amountInput.data}
              validation={props.amountInput.isValidation}
              errorMessage={props.amountInput.errorMessage}
              onChange={(event: any) => {
                const inputValue = event.target.value;
                const numericValue = inputValue.replace(/[^0-9]/g, '');
                const isError = props.validateAmount(numericValue);
              }}
            />

            <div className={'text-[#B3B3B3] text-xs lg:text-base text-center md:text-left mt-3 md:mt-4 lg:mt-5 leading-5 lg:leading-6'}>
              Atualmente{' '}
              <button onClick={props.onClickToVIP}>
                VIP{props.vip_level}
              </button>
              , o valor mínimo de saque diário é de R${formatLocaleMoney(props.withdrawLimitMin)}  e o valor máximo de saque é de  R${formatLocaleMoney(props.withdrawLimitMax)}.
            </div>

            <div
              className={cx(`
              my-3 md:my-4 lg:my-5
              p-2 md:p-2.5 lg:py-3 lg:px-5
              text-sm lg:text-base
              leading-5 md:leading-6 lg:leading-7
              border-solid border-[#333333] bg-[#1a1a1a] flex flex-row w-full border rounded-lg
              text-[#808080] text-center
          `)}
            >
              Por favor, preencha o número do CPF corretamente. Se a informação estiver incorreta, o saque falhará. Certifique - se de verificar as informações com atenção.
            </div>

            <WithdrawForm {...props}
              titleClassName='text-white text-sm md:text-base lg:text-lg mb-1'
              inputClassName={inputClassName}
            />
          </div>
        </SectionContainer>

        <button onClick={props.onClickToWithdraw} className="my-5 md:mt-6 md:mb-3 lg:my-10 py-3 lg:py-3.5 text-sm md:text-base lg:text-lg text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center w-full cursor-pointer  rounded-lg leading-5 md:leading-6 lg:leading-7">
          RETIRAR
        </button>

        <WithdrawNoticeSection
          onClickToVIP={props.onClickToVIP}
          vip_level={props.vip_level}
          withdrawLimitMin={props.withdrawLimitMin}
          withdrawLimitMax={props.withdrawLimitMax}
        />
        {/*NOTICE: z-index*/}
        {props.contextHolder}
      </div>
    );
  } else {
    return (
      <div className={`leading-5 md:leading-6 lg:leading-7 p-2 md:p-2.5 lg:p-5 bg-[#333333] flex flex-col font-normal text-left lg:text-center justify-center w-full items-start rounded-lg text-white  text-sm md:text-base lg:text-xl`}>
        <div>
          Prezado cliente: Olá! Em resposta às exigências do Banco Central do
          Brasil e do recém-criado comitê de agências reguladoras relevantes no
          Brasil, a plataforma precisa concluir a troca de dados entre o Banco
          Central e as agências reguladoras relevantes das{' '}
          <span className="text-[#f59e0b]">{withdrawBegin}</span>h às{' '}
          <span className="text-[#f59e0b]">{withdrawEnd}</span>h, horário
          brasileiro!
        </div>
        <br />
        <div>
          Todos os nossos esforços são para garantir que a operação da
          plataforma esteja mais em conformidade com as leis e regulamentos
          brasileiros relevantes! Proteger a privacidade dos utilizadores e os
          direitos e interesses conexos. Obrigado pela sua compreensão.
        </div>
        <br />
        <div className='text-left lg:text-center w-full'>
          As retiradas serão normais durante outros períodos de tempo na plataforma.
        </div>
      </div>
    );
  }
};
