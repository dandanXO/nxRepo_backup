import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';

export const QuestionSection2 = () => {
  return (
   
      <div>
        Tom se cadastrou como usuário válido de {environment.platformName}{' '}
        em 10 de abril de 2023. Enquanto ganhava o grande prêmio na
        plataforma, ele também recomendou um colega da empresa. O colega
        concluiu o cadastro e recarregou 50 reais, e tom ganhou a recompensa
        de R$15 reais , Este colega é profundamente apaixonado por jogos de{' '}
        {environment.platformName}. O valor total das apostas por 3 dias
        consecutivos é de 534.034 reais. De acordo com a política de
        descontos do {environment.platformName}, tom recebe novamente
        2.670,17 reais de comissão. Ao mesmo tempo, este colega recomenda{' '}
        {environment.platformName} para seus amigos , de acordo com a
        política de descontos de {environment.platformName}, tom também
        desfruta das políticas relevantes de seus colegas e amigos de
        descontos de apostas. Em todo o mês de abril, Tom ganhou um total de
        51.089 reais em comissões.
      </div>

  )
}