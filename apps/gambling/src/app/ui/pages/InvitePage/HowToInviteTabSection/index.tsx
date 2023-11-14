import {QuestionContainer} from "../index";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import {notification} from 'antd';
import {environment} from "../../../../../environments/environment";
import {HowToImageContainer as PernambucanaHowToImageContainer} from "./env/pernambucana/HowToImageContainer";
import {HowToImageContainer as CocoHowToImageContainer} from "./env/coco/HowToImageContainer";
import {InviteCopySection as PernambucanaInviteCopySection} from "./env/pernambucana/InviteCopySection";
import {InviteCopySection as CocoInviteCopySection} from "./env/coco/InviteCopySection";
import shareListImg from "../HowToInviteTabSection/env/coco/share-list.png";

const InviteCopySection = environment.assetPrefix === "coco777bet" ? CocoInviteCopySection : PernambucanaInviteCopySection;
const HowToImageContainer = environment.assetPrefix === "coco777bet" ? CocoHowToImageContainer : PernambucanaHowToImageContainer;


const GreenContainer = styled.div`
  padding: 40px;
  border-radius: 20px;
  margin: 40px 0;
  border: 1px solid var(--main-primary-main);
  background: var(--assistant);
  color:var(--white);
`;

const YellowContainer = styled.div`
  margin: 40px 0;
  padding: 20px;
  color: var(--main-state-warning);
`;
const RedContainer = styled.div`
  margin: 40px 0 0;
  padding: 40px;
  text-align: left;
  background: var(--main-state-error);
  border-radius: 10px;
  color: var(--white);
`;

const MyriadPro = styled.div`
  font-size: 44px;
  font-weight: bold;
  background: var(--main-primary-main);
  -webkit-background-clip: text;
  color: transparent;
`;

const Roboto = styled.div`
  font-size: 18px;
`;

interface IHowToInviteTabSection {
  inviteUrl: string;
}

export const HowToInviteTabSection = (props: IHowToInviteTabSection) => {
  const [api, contextHolder] = notification.useNotification();

  const onClickToCopy = () => {
    copy(props.inviteUrl);
    api.success({
      message: 'Copiado!',
    });
  };

  return (
    <div className={'mb-[80px]'}>

      <HowToImageContainer className={'p-4'}>
        {contextHolder}
        <img className="hidden sm:block w-max-[100%] h-auto" src={`assets/${environment.assetPrefix}/topTitle1.ed9276b2.png`}/>
        <img className={"display sm:hidden"} src={`assets/${environment.assetPrefix}/team_title-7d5515fe.png`}/>

        <Roboto
          className={'mx-16 my-5 hidden text-left text-lg text-white sm:block'}
        >
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
        </Roboto>

        <Roboto className={'mb-2 block text-left text-lg text-white sm:hidden'}>
          Convide usuários válidos para recarga, o bônus pode chegar a até R$20!
          O que você está esperando, convide seus amigos para participar!
        </Roboto>

        <img className={"mb-2 hidden sm:block w-max-[100%] h-auto"} src={`assets/${environment.assetPrefix}/topTitle2.396e135e.png`}/>
        <img className={"mb-2 display sm:hidden"} src={`assets/${environment.assetPrefix}/invite-code-title-c456ebc9.png`}/>

        <InviteCopySection inviteUrl={props.inviteUrl} onClickToCopy={onClickToCopy}/>

        {environment.assetPrefix === "coco777bet" ? (
          <div className={"text-center"}>
            <div className={"text-[#ffd624] mb-2"}>Partilhar ligações através de software social</div>
            <img className={"mb-2"} src={shareListImg}/>
          </div>
        ): null}

      </HowToImageContainer>

      <QuestionContainer>
        <img className={'my-8 mx-auto'} src={`assets/${environment.assetPrefix}/acting.png`} />

        <section className={'text-left text-lg text-white mx-10'}>
          <Roboto>
            Fornecer à {environment.platformName} um convite efetivo ao cliente
            (o cliente deve preencher o registro do número do celular e concluir
            uma recarga).
          </Roboto>
          <Roboto>Convide 1 - 10 pessoas, recompense R$10</Roboto>
          <Roboto>Convide 11 - 24 pessoas, recompense R$15</Roboto>
          <Roboto>
            Mais de 25 pessoas, recompensa R$20As recompensas serão distribuídas
            às 11 horas do dia seguinte. Ao mesmo tempo, realizamos
            anticomissões de acordo com o valor da aposta do jogo do usuário do
            jogo na plataforma do jogo (a comissão é considerável). A taxa de
            comissão varia de jogo para jogo.
          </Roboto>
        </section>

        <GreenContainer className={'text-left text-lg text-white'}>
          <Roboto>Por exemplo:</Roboto>
          <Roboto>
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
          </Roboto>
        </GreenContainer>

        <YellowContainer className={'text-left text-lg'}>
          <Roboto>
            Regras de liquidação da plataforma {environment.platformName}: A
            comissão devolvida pelo {environment.platformName} é atualizada a
            cada 10 a 30 minutos, e a comissão devolvida será liberada toda
            segunda-feira, horário do Brasil. Clique em "Dados diários" para ver
            os detalhes da comissão.
          </Roboto>
        </YellowContainer>

        <RedContainer className={'text-left text-lg font-medium text-white'}>
          <Roboto>
            Declaração especial: Para garantir a justiça da plataforma, a
            plataforma adota uma estratégia antitrapaça, e os usuários
            trapaceiros serão banidos permanentemente, os fundos obtidos
            ilegalmente serão congelados e as responsabilidades legais
            relevantes serão investigadas.
          </Roboto>
        </RedContainer>
      </QuestionContainer>
    </div>
  );
};
