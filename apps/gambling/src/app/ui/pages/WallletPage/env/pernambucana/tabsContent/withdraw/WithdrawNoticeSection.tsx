import cx from 'classnames';
import useBreakpoint from '../../../../../../pageTemplate/hooks/useBreakpoint';
export const WithdrawNoticeSection = (props: any) => {
  const { onClickToVIP, vip_level, withdrawLimitMin, withdrawLimitMax } = props;
  const isMobile = useBreakpoint();

  return (
    <div className={"mb-20 border-[var(--main-primary-main)] border-[1px] p-4 bg-game-block"}>
      <div className={"text-left px-2"}>
        <div className={cx("text-white text-left font-bold text-base mb-2", { 'text-2xl': !isMobile })}>Quantidade retirada</div>
        <ul className={"text-white "}>
          <li className={"mb-2"}>1. O valor e a frequência do saque diário estão diretamente relacionados ao seu nível VIP.  Nível atual <button className={"text-[#ffdd0a] underline"} onClick={onClickToVIP}>VIP${vip_level}</button>, O valor que você pode retirar diariamente é de <span className={"text-[#ffdd0a] "}>R${withdrawLimitMin} - R${withdrawLimitMax}</span></li>
          <li className={"mb-2"}>2. O valor da retirada deve ser em múltiplos de 10. Por exemplo: 10, 20, 80, 120, 990, 19820…</li>
          <li className={"mb-2"}>3. As recompensas da promoção podem ser retiradas diretamente.</li>
          <li className={"mb-2"}>4. O saldo não retirável na conta de recarga (Atividade) (incluindo, entre outros, o valor da recarga, recompensas por participar de atividades e valor de ganhos e perdas do jogo, etc.).  pode ser retirado aumentando o valor da transação do jogo e obtendo um valor de lucro maior.</li>
          <li className={"mb-2"}>5. Por favor, preencha o número do CPF corretamente. Se a informação estiver incorreta, o saque falhará. Certifique-se de verificar as informações com atenção.</li>
          <li className={"mb-2"}>6. Das 22 h à 1 h no Brasil, o sistema está em processo de liquidação. A fim de manter a liquidação estável, nenhum negócio de retirada e liquidação de dinheiro será realizado durante este período. Pedimos desculpas pelo inconveniente causado a você! </li>
        </ul>
      </div>
    </div>
  )
}
