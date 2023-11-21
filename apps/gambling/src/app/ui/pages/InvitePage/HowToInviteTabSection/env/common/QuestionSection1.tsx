import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';

export const QuestionSection1 = () => {
  return (
    <>
      <div>
        Fornecer à {environment.platformName} um convite efetivo ao cliente
        (o cliente deve preencher o registro do número do celular e concluir
        uma recarga).
      </div>
      <div>Convide 1 - 10 pessoas, recompense R$10</div>
      <div>Convide 11 - 24 pessoas, recompense R$15</div>
      <div>
        Mais de 25 pessoas, recompensa R$20As recompensas serão distribuídas
        às 11 horas do dia seguinte. Ao mesmo tempo, realizamos
        anticomissões de acordo com o valor da aposta do jogo do usuário do
        jogo na plataforma do jogo (a comissão é considerável). A taxa de
        comissão varia de jogo para jogo.
      </div>
    </>
  )
}