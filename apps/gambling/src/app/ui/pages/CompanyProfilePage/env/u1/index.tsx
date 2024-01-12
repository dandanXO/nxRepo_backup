import {environment} from "../../../../../../environments/environment";
import badgeImage from "./icon=badge.png"
import licenseImage from "./bg_license.svg";
import {PageContainer} from "../../../../components-bs/PageContainer";
import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import React from "react";
import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import styled from "styled-components";

type IItem = {
  title: string;
  description: string;
  className?: string;
}
const Item = (props: IItem) => {
  return (
    <div className={props.className}>
      <div>
        <div className="text-base md:text-2xl lg:text-2xl leading-6 md:leading-8 lg:leading-8 font-bold  text-white flex row mb-3">
          <img alt="badge" className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] mr-2" src={badgeImage} />
          {props.title}
        </div>
        <div className="text-xs md:text-base lg:text-base leading-4 md:leading-6 lg:leading-6 font-medium text-white">
          {props.description}
        </div>
      </div>
    </div>
  )
}

const License = styled.div`
  background-image: url(${licenseImage});
  background-size: cover;
`

export const CompanyProfilePage = () => {
  const {onClickToIndex} = usePageNavigate();

  return (
    <PageContainer className={"pb-4"} y={false} >
      <div className="text-white text-left">
        <BackNavigation
          onClick={() => onClickToIndex()}
          title={
            <div className="text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-9 font-bold text-white m-auto lg:ml-2">
              Sobre Nós
            </div>
          }
        />

        <div className="pt-4 text-base md:text-3xl lg:text-3xl font-bold leading-4 md:leading-6 lg:leading-6 mb-4 md:mb-5 lg:mb-5 text-white">
          Turismo e Jogos para uma Nova Geração
        </div>

        <div className={"mb-8"}>
          <Item
            className={"mb-5"}
            title={"2023 Novo Território no Brasil"}
            description={`Investimos 2 bilhões de dólares no Brasil, adquirindo bancos digitais
              relacionados à rede, obtendo licenças para cassinos online. Em apenas seis
              meses, nos tornamos uma das três principais empresas no setor de transações de
              jogos.`}
          />
          <Item
            className={"mb-5"}
            title={"2021 Nova Direção no Brasil"}
            description={`Investimos em setores relacionados à internet no Brasil para fortalecer ainda mais as raízes de nossos empreendimentos e buscar novos desenvolvimentos em mercados emergentes e regiões geográficas.`}
          />

          <Item
            className={"mb-5"}
            title={"2015 Destino em Singapura"}
            description={`Com a abertura do resort, nosso investimento representou a maior despesa para um resort desse tipo. A icônica estrutura tornou-se uma das principais atrações arquitetônicas de Singapura, influenciando significativamente a imagem da cidade como um principal destino global para conferências e férias.`}
          />

          <Item
            className={"mb-5"}
            title={"2012 Expansão em Macau"}
            description={`Após anos de crescimento em Macau, inauguramos nosso resort integrado avançado em 2012. Atualmente, operamos cinco resorts principais em Macau, alguns dos quais incluem várias marcas de hotéis.`}
          />

          <Item
            className={"mb-5"}
            title={"2001 Fundação da Empresa"}
            description={`Fundamos nossa empresa em 2001, com um histórico sólido de impacto positivo nas regiões em que operamos. Nos destacamos por inovação no desenvolvimento e promoção de produtos que impulsionam as indústrias de turismo e jogos offline.`}
          />

        </div>

        <License className={"flex flex-col rounded-xl bg-[rgba(11,25,72,1) bg-[var(--background-footer)] p-5 relative"}>
          {/*<img className="absolute" src={licenseImage}/>*/}
          <div className="text-center font-bold text-base md:text-2xl lg:text-2xl leading-6 md:leading-8 lg:leading-8 text-white mb-4">
            Licenciamento Legal da Empresa
          </div>

          <div className="text-center text-xs md:text-base lg:text-base font-medium leading-4 md:leading-6 lg:leading-6 text-white">
            {environment.platformName}, a nova versão foi lançada em agosto, e no primeiro
            dia de operação, o volume de transações de recarga ultrapassou 5 milhões de
            reais.
            <br />
            {environment.platformName} é operado pela Block balancing A.C. (Registro
            Comercial de Curaçao nº 158191, Emancipatie Boulevard Dominico F. "Don"
            Martina 52, Curaçao), de acordo com a licença principal de jogos #5517/JAZ.
            Conforme declaração de política da empresa, {environment.platformName} opera sob
            a sublicença CIL. Sob a sublicença CIL, {environment.platformName} é operado em
            conformidade com as leis de Curaçao. A Block balancing A.C. está sujeita a
            obrigações de combate à lavagem de dinheiro, conforme estabelecido pela
            legislação de Curaçao.
          </div>
        </License>


      </div>
    </PageContainer>
  )
}
