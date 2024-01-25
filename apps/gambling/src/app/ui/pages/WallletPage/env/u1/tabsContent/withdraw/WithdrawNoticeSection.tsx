import { RootState } from "apps/gambling/src/app/reduxStore";
import { useSelector } from "react-redux";


export const WithdrawNoticeSection = (props: any) => {
  const { onClickToVIP, vip_level, withdrawLimitMin, withdrawLimitMax } = props;
  const { withdrawBegin, withdrawEnd } = useSelector((state: RootState) => state.app)

  const sectionStyle = `
  p-2.5 md:p-6
  mb-2 md:mb-4
  text-xs md:text-xl
  bg-[var(--primary-variant)] text-white rounded-lg  `
  return (
    <div className={"p-2.5 md:py-8 md:px-6 rounded bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}>
      <div className="text-white font-bold text-base md:text-4xl mb-2 md:mb-6">Regras de Retirada</div>
      <section className={`${sectionStyle} md:flex`}>
        <div>
          O valor e a frequência do saque diário estão diretamente relacionados ao seu nível VIP.
          Nível atual
          <button className={"text-[var(--secondary-assistant)]"} onClick={onClickToVIP}>VIP{vip_level}</button>, o valor mínimo de saque diário é de
          <span className={"text-[var(--secondary-assistant)]"}> R${withdrawLimitMin}</span> e o valor máximo de saque é de
          <span className={"text-[var(--secondary-assistant)]"}> R${withdrawLimitMax}</span>.
        </div>
        <div className="text-center m-2 mb-0">
          <button className="py-2 px-8 md:px-14 rounded-md bg-gradient-to-b from-[var(--button-check-from)] to-[var(--button-check-to)] text-xs md:text-base" onClick={onClickToVIP}>Cheque</button>
        </div>

      </section>

      <section className={sectionStyle}>
        O valor da retirada deve ser em múltiplos de 10.
        Por exemplo:  10, 20, 110, 920, 28620…
      </section>

      <section className={sectionStyle}>
        As recompensas da promoção podem ser retiradas diretamente.
      </section>

      <section className={sectionStyle}>
        O saldo não retirável na conta de recarga (Atividade) (incluindo, entre outros, o valor da recarga, recompensas por participar de atividades e valor de ganhos e perdas do jogo, etc.), pode ser retirado aumentando o valor da transação do jogo e obtendo um valor de lucro maior.
      </section>

      <section className={sectionStyle}>
        Por favor, preencha o número do CPF corretamente. Se a informação estiver incorreta, o saque falhará. Certifique-se de verificar as informações com atenção.
      </section>

      {/* <section className={sectionStyle}>
        Prezado cliente: Olá! Em resposta às exigências do Banco Central do Brasil e do recém-criado comitê de agências reguladoras relevantes no Brasil, a plataforma precisa concluir a troca de dados entre o Banco Central e as agências reguladoras relevantes das
        <span className={"text-[var(--secondary-assistant)]"}> {withdrawBegin}h </span> às
        <span className={"text-[var(--secondary-assistant)]"}> {withdrawEnd}h </span>, horário brasileiro!Todos os nossos esforços são para garantir que a operação da plataforma esteja mais em conformidade com as leis e regulamentos brasileiros relevantes! Proteger a privacidade dos utilizadores e os direitos e interesses conexos. Obrigado pela sua compreensão. As retiradas serão normais durante outros períodos de tempo na plataforma.
      </section> */}
    </div>
  )
}
