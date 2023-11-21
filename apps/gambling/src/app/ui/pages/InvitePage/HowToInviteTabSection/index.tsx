import { QuestionContainer } from "../index";
import styled from "styled-components";
import copy from "copy-to-clipboard";
import { notification } from 'antd';
import { environment } from "../../../../../environments/environment";

import { HowToImageContainer as PHowToImageContainer } from "./env/pernambucana/HowToImageContainer";
import { HowToImageContainer as WHowToImageContainer } from "./env/wild/HowToImageContainer";
import { HowToImageContainer as CHowToImageContainer } from "./env/coco/HowToImageContainer";

import { InviteCopySection as PInviteCopySection } from "./env/pernambucana/InviteCopySection";
import { InviteCopySection as WInviteCopySection } from "./env/wild/InviteCopySection";
import { InviteCopySection as CInviteCopySection } from "./env/coco/InviteCopySection";

import shareListImg from "../HowToInviteTabSection/env/coco/share-list.png";
import { renderByPlatform } from "../../../utils/renderByPlatform";
import { HowToImageText } from "./env/common/HowToImageText";
import { HowToImage as CHowToImage } from "./env/coco/HowToImageContainer";
import { HowToImage as WHowToImage } from "./env/wild/HowToImageContainer";
import { HowToImage as PHowToImage } from "./env/pernambucana/HowToImageContainer";


const HowToImageContainer = renderByPlatform({
  "wild777bet": WHowToImageContainer,
  "coco777bet": CHowToImageContainer,
}, PHowToImageContainer)


const InviteCopySection = renderByPlatform({
  "wild777bet": WInviteCopySection,
  "coco777bet": CInviteCopySection,
}, PInviteCopySection)



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
      {renderByPlatform({
        "wild777bet": <WHowToImage className="p-4 rounded-2xl"  />,
        "coco777bet": <CHowToImage className="p-4 rounded-2xl" />,
      }, <PHowToImage className="p-4 rounded-2xl" />)}


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
