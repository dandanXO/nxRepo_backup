import { environment } from "apps/gambling/src/environments/environment";
import { ListItem } from "./ListItem";

interface ITelegrmaNotice {
  className?: string;
}

export const TelegrmaNotice = (props: ITelegrmaNotice) => {
  return (
    <>
      <div className={"text-left w-full leading-5 lg:leading-7 text-sm lg:text-lg"}>Anunciaremos as seguintes atividades ou informações relacionadas no canal de telegrama:</div>
      <ol className={"text-left max-w-full  text-sm lg:text-lg "}>
        <ListItem count={'1.'} text={'Quando a plataforma lançar novas atividades, iremos anunciá-las no canal do telegram o mais rápido possível.'} />
        <ListItem count={'2.'} text={'Atualizaremos várias recompensas na plataforma de tempos em tempos no canal do telegrama.'} />
        <ListItem count={'3.'} text={`Compartilhe regularmente recompensas de envelope vermelho de troca oficial do ${environment.platformGroup} (${environment.platformName}) todos os dias.`} />
        <ListItem count={'4.'} text={'A lista de ganhadores da plataforma será divulgada no canal do telegram o mais breve possível.'} />
        <ListItem count={'5.'} text={'Anúncios e manutenções relacionados à plataforma serão divulgados no canal do Telegram assim que possível.'} />
        <ListItem count={'6.'} text={'A atualização do mecanismo de recompensa por convite da plataforma será anunciada na plataforma do Telegram o mais rápido possível.'} />
        <ListItem count={'7.'} text={'Questões como recarga e retirada serão anunciadas na plataforma do telegram assim que possível.'} />
        <ListItem count={'8.'} text={'A manutenção do jogo relacionada à plataforma será anunciada na plataforma do telegram o mais rápido possível'} />
      </ol>
    </>
  )
}