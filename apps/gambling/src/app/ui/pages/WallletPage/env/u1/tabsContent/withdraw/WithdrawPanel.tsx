import cx from 'classnames';
import { useSelector } from 'react-redux';
import Select from 'react-select';

import { RootState } from '../../../../../../../reduxStore';
import { ButtonPro } from '../../../../../../components-bs/Buttons/ButtonPro';
import { ArrowRight } from '../../../../../../components-bs/Icons/ArrowRight';
import { Input } from '../../../../../../components-bs/Inputs/Input';
import { MobileInput } from '../../../../../../components-bs/Inputs/MobileInput';
import useBreakpoint from '../../../../../../pageTemplate/hooks/useBreakpoint';
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

  if (!isDuringRestrictTime) {
    return (
      <div>
        <div id={'text-white withdraw-section'}>
          <div className="text-base md:text-2xl">
            <MainInput
              type="text"
              inputmode="numeric"
              inputClassName={
                'text-main-primary-main leading-none text-sm md:text-xl'
              }
              themeStyle={'simple'}
              className="w-full rounded-lg"
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

            <div
              className={
                'text-white text-xs md:text-xl text-left leading-none mt-3 md:mt-6'
              }
            >
              Atualmente{' '}
              <button className={'text-[#ffdd14]'} onClick={props.onClickToVIP}>
                VIP{props.vip_level}
              </button>
              , o valor mínimo de saque diário é de
              <span className={'text-[#ffdd14]'}>
                {' '}
                R${formatLocaleMoney(props.withdrawLimitMin)}
              </span>{' '}
              e o valor máximo de saque é de
              <span className={'text-[#ffdd14]'}>
                {' '}
                R${formatLocaleMoney(props.withdrawLimitMax)}
              </span>
              .
            </div>

            <div
              className={cx(`text-white leading-none rounded-lg
            p-3.5 md:py-6 md:px-4
            my-4 md:my-6
            text-xs md:text-xl
            text-left
            leading-4 md:leading-7
            bg-gradient-to-b from-[var(--background-alert-text-from)] to-[var(--background-alert-text-to)]
          `)}
            >
              {/*NOTICE: CPF/CNPJ*/}
              {/*Por favor, preencha o número do CPF corretamente.Se a informação*/}
              {/*estiver incorreta, o saque falhará.Certifique - se de verificar as*/}
              {/*informações com atenção. Uma conta só pode ser vinculada a um*/}
              {/*número de CPF/CNPJ para saque, uma vez vinculada não pode ser*/}
              {/*alterada.*/}

              {/*NOTICE: CPF*/}
              Por favor, preencha o número do CPF corretamente.Se a informação
              estiver incorreta, o saque falhará.Certifique - se de verificar as
              informações com atenção. Uma conta só pode ser vinculada a um
              número de CPF para saque, uma vez vinculada não pode ser
              alterada.
            </div>

            <WithdrawForm {...props} />

          </div>
        </div>
        {!isMobile && (
          <section
            className={cx(
              'md:display flex flex-col justify-center items-center my-6'
            )}
          >
            {/*<ButtonPro className="w-1/2 whitespace-nowrap" onClick={props.onClickToWithdraw}>Retirar</ButtonPro>*/}
            <button
              className={
                'flex justify-between items-center px-3.5 py-4 text-xl w-[264px] h-[45px] rounded-md bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-[var(--white)] font-medium'
              }
              onClick={props.onClickToWithdraw}
            >
              RETIRAR
              <ArrowRight className="w-[24px] h-[24px]" />
            </button>
          </section>
        )}

        <WithdrawNoticeSection
          onClickToVIP={props.onClickToVIP}
          vip_level={props.vip_level}
          withdrawLimitMin={props.withdrawLimitMin}
          withdrawLimitMax={props.withdrawLimitMax}
        />

        {isMobile && (
          <section
            className={
              'bg-[rgba(0,0,0,.5)] fixed bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full py-4 z-10'
            }
          >
            {/*<ButtonPro*/}
            {/*  size={"small"}*/}
            {/*  onClick={props.onClickToWithdraw}*/}
            {/*>*/}
            {/*  RETIRAR*/}
            {/*</ButtonPro>*/}
            <button
              className={
                'flex justify-between items-center px-3.5 py-2 text-xl  w-[264px] h-[45px] rounded-md bg-gradient-to-b from-[var(--secondary-main-from)] to-[var(--secondary-main-to)] text-[var(--white)] font-medium'
              }
              onClick={props.onClickToWithdraw}
            >
              RETIRAR
              <ArrowRight className="w-[24px] h-[24px]" />
            </button>
          </section>
        )}

        {/*NOTICE: z-index*/}
        {props.contextHolder}
      </div>
    );
  } else {
    return (
      <div
        className={tcx(
          'grow h-full w-full flex flex-col justify-center items-center text-center text-lg font-medium text-[var(--secondary-assistant)] py-[64px] px-[240px]',
          ['text-sm px-3 py-8', isMobile]
        )}
      >
        <div>
          Prezado cliente: Olá! Em resposta às exigências do Banco Central do
          Brasil e do recém-criado comitê de agências reguladoras relevantes no
          Brasil, a plataforma precisa concluir a troca de dados entre o Banco
          Central e as agências reguladoras relevantes das{' '}
          <span className="text-[var(--white)]">{withdrawBegin}</span>h às{' '}
          <span className="text-[var(--white)]">{withdrawEnd}</span>h, horário
          brasileiro!
        </div>
        <br />
        <br />
        <div>
          Todos os nossos esforços são para garantir que a operação da
          plataforma esteja mais em conformidade com as leis e regulamentos
          brasileiros relevantes! Proteger a privacidade dos utilizadores e os
          direitos e interesses conexos. Obrigado pela sua compreensão.
        </div>
        <br />
        <br />
        <div>
          As retiradas serão normais durante outros períodos de tempo na
          plataforma.
        </div>
      </div>
    );
  }
};
