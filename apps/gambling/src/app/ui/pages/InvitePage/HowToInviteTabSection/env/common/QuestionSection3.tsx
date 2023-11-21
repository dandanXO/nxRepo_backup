import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';

export const QuestionSection3 = () => {
  return (
    <div>
      Regras de liquidação da plataforma {environment.platformName}: A
      comissão devolvida pelo {environment.platformName} é atualizada a
      cada 10 a 30 minutos, e a comissão devolvida será liberada toda
      segunda-feira, horário do Brasil. Clique em "Dados diários" para ver
      os detalhes da comissão.
    </div>
  )
}