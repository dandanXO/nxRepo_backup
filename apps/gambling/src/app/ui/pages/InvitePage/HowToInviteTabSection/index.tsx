import {QuestionContainer} from "../index";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import {notification} from 'antd';
import {environment} from "../../../../../environments/environment";

const HowToImageContainer = styled.div`
  position: relative;
  background-image: url("assets/001/banner_01.png");
  background-size: 1524px 423px;
  //background-size: cover;
  overflow: hidden;
  border-radius: 8px;

  //width: 1524px;
  //height: 423px;
  //padding: 20px

  display: flex;
  flex-direction: column;

  //background-image: url({{ section.settings.bgimg | image_url }});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  //height: 350px;
  min-height: 380px;

  align-items: center;
  justify-content: center;
  color: #fff;

  padding: 20px;
`

const BorderLinkButtonContainer = styled.div`
  position: relative;
  width: 95%; /* 如果要指定寬度，取消註釋此行 */
  height: 60px;
  margin: 1vw auto 2vw;
  background-color: #fff; /* 將 background-image 改為 background-color */
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.5);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;



const GreenContainer = styled.div`
  padding: 20px;
  //box-shadow: inset 0 0 36px 5px #163610;
  border-radius: 20px;
  margin: 20px 0;
  border: 1px solid transparent;
  //background-image: linear-gradient(180deg,#090B0F,#090B0F),linear-gradient(90deg,#1DA668,rgba(25,177,106,.2),#1DA668,rgba(25,177,106,.2),#1DA668);
  background: rgba(255,255,255,.1);

`

const YellowContainer = styled.div`
  color: #ffd61c;
`
const RedContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background: rgba(254, 94, 69, .6);
  border-radius: 10px;
  color: #fff;

`

const CopyButton = styled.button`
  width: 152px;
  height: 60px;
  background: linear-gradient(90deg, #FFD700, #4FFB0C);
  color: #fff;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 10px;
`
const Avenir = styled.div`
  font-size: 18px;
  color: #fff;
  font-family: Avenir;
`

interface IHowToInviteTabSection {
    inviteUrl: string;
}

export const HowToInviteTabSection = (props:IHowToInviteTabSection) => {
  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = () => {
    copy(props.inviteUrl);
    api.success({
      message: "Copiado!"
    })
  }

  return (
    <div className={"mb-[80px]"}>
      <HowToImageContainer className={"px-10"}>
        {contextHolder}
        <img className="hidden sm:block w-max-[100%] h-auto" src={"assets/001/topTitle1.ed9276b2.png"}/>
        <img className={"display sm:hidden"} src={"assets/001/team_title-7d5515fe.png"}/>

        <Avenir className={"hidden sm:block text-white text-lg text-left mb-2"}>
          Enquanto os usuários gostam de jogar e ganhar prêmios na plataforma SKY Group ({environment.platformName}), eles também podem lançar um programa especial de recompensa por convite através do {environment.platformName} para ganhar comissões generosas! Que mais clientes de jogos da plataforma {environment.platformName} participem! Promova um usuário de recarga válida, o bônus é de até 20 reais. Depois de se tornar um agente ao mesmo tempo, você também pode obter uma generosa comissão de retorno do volume de negócios do jogo! O que você está esperando, copie rapidamente o link do convite abaixo, envie para seus melhores amigos e participem juntos.
        </Avenir>

        <Avenir className={"block sm:hidden text-white text-lg text-left mb-2"}>
          Convide usuários válidos para recarga, o bônus pode chegar a até R$20! O que você está esperando, convide seus amigos para participar!
        </Avenir>

        <img className={"mb-2 hidden sm:block w-max-[100%] h-auto"} src={"assets/001/topTitle2.396e135e.png"}/>
        <img className={"mb-2 display sm:hidden"} src={"assets/001/invite-code-title-c456ebc9.png"}/>


        <BorderLinkButtonContainer className={"p-2 sm:p-6 mb-4 rounded-2xl"}>
          <div className={"text-gray-700 text-lg font-bold"}>{props.inviteUrl}</div>
          <CopyButton className={"hidden sm:block w-[221px] h-[60px] relative left-[24px]"} onClick={onClickToCopy} >COPIA DE</CopyButton>
        </BorderLinkButtonContainer>

        <CopyButton className={"block sm:hidden w-[221px] h-[60px]"} onClick={onClickToCopy} >COPIA DE</CopyButton>

      </HowToImageContainer>

      <QuestionContainer>

        <img className={"mb-2"} src={"assets/001/acting.png"}/>

        <section className={"text-left text-white text-lg"}>
          <Avenir>Fornecer à {environment.platformName} um convite efetivo ao cliente (o cliente deve preencher o registro do número do celular e concluir uma recarga).</Avenir>
          <Avenir>Convide 1 - 10 pessoas, recompense R$10</Avenir>
          <Avenir>Convide 11 - 24 pessoas, recompense R$15</Avenir>
          <Avenir>Mais de 25 pessoas, recompensa R$20As recompensas serão distribuídas às 11 horas do dia seguinte. Ao mesmo tempo, realizamos anticomissões de acordo com o valor da aposta do jogo do usuário do jogo na plataforma do jogo (a comissão é considerável). A taxa de comissão varia de jogo para jogo.</Avenir>
        </section>

        <GreenContainer className={"text-left text-white text-lg"}>
          <Avenir>Por exemplo:</Avenir>
          <Avenir>
            Tom se cadastrou como usuário válido de {environment.platformName} em 10 de abril de 2023. Enquanto ganhava o grande prêmio na plataforma, ele também recomendou um colega da empresa. O colega concluiu o cadastro e recarregou 50 reais, e tom ganhou a recompensa de R$15 reais , Este colega é profundamente apaixonado por jogos de {environment.platformName}. O valor total das apostas por 3 dias consecutivos é de 534.034 reais. De acordo com a política de descontos do {environment.platformName}, tom recebe novamente 2.670,17 reais de comissão. Ao mesmo tempo, este colega recomenda {environment.platformName} para seus amigos , de acordo com a política de descontos de {environment.platformName}, tom também desfruta das políticas relevantes de seus colegas e amigos de descontos de apostas. Em todo o mês de abril, Tom ganhou um total de 51.089 reais em comissões.
          </Avenir>
        </GreenContainer>

        <YellowContainer className={"text-left text-white text-lg"}>
          <Avenir>Regras de liquidação da plataforma {environment.platformName}:</Avenir>
          <Avenir>A comissão devolvida pelo {environment.platformName} é atualizada a cada 10 a 30 minutos, e a comissão devolvida será liberada toda segunda-feira, horário do Brasil. Clique em "Dados diários" para ver os detalhes da comissão.</Avenir>
        </YellowContainer>

        <RedContainer className={"text-left text-white text-lg font-medium"}>
         <Avenir>Declaração especial: Para garantir a justiça da plataforma, a plataforma adota uma estratégia antitrapaça, e os usuários trapaceiros serão banidos permanentemente, os fundos obtidos ilegalmente serão congelados e as responsabilidades legais relevantes serão investigadas.</Avenir>
        </RedContainer>

      </QuestionContainer>
    </div>
  )
}
