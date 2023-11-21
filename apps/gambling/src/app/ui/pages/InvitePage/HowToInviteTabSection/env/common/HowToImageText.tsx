import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';

export const HowToImageText = () => {
  return (
    <>
      <div className={cx('hidden text-left text-lg text-white md:block',)}>
        Enquanto os usuários gostam de jogar e ganhar prêmios na plataforma
        SKY Group ({environment.platformName}), eles também podem lançar um
        programa especial de recompensa por convite através do{' '}
        {environment.platformName} para ganhar comissões generosas! Que mais
        clientes de jogos da plataforma {environment.platformName} participem!
        Promova um usuário de recarga válida, o bônus é de até 20 reais.
        Depois de se tornar um agente ao mesmo tempo, você também pode obter
        uma generosa comissão de retorno do volume de negócios do jogo! O que
        você está esperando, copie rapidamente o link do convite abaixo, envie
        para seus melhores amigos e participem juntos.
      </div>

      <div className={'block text-left text-sm text-white md:hidden'}>
        Convide usuários válidos para recarga, o bônus pode chegar a até R$20!
        O que você está esperando, convide seus amigos para participar!
      </div>
    </>
  )
}