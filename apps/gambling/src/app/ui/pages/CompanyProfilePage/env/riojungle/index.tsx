import {environment} from "../../../../../../environments/environment";
import badgeImage from "./icon=badge.png"
import {PageContainer} from "../../../../components-bs/PageContainer";
import React from "react";
import {twMerge} from "tailwind-merge";
import {BackNavigation} from "../../../../components-bs/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../../../hooks/usePageNavigate";

type IItem = {
  title: string;
  description: string;
  className?: string;
}
const Item = (props: IItem) => {
  return (
    <div className={props.className}>
      <div>
        <div className={twMerge(
          "text-sm leading-5 font-normal",
          "md:text-sm md:leading-5 md:font-normal",
          "lg:text-lg lg:leading-7 lg:font-normal",
          "text-white",
          "flex row",
        )}>
          <img alt="badge" className="w-[28px] h-[28px] mr-2" src={badgeImage} />
          {props.title}
        </div>
        <div className={twMerge(
          "text-xs leading-5 font-normal",
          "md:text-sm leading-5 font-normal",
          "lg:text-base lg:leading-6 font-medium",
          "text-[#B3B3B3]",
          "lg:ml-[36px]"
        )}>
          {props.description}
        </div>
      </div>
    </div>
  )
}

export const CompanyProfilePage = () => {
  return (
    <PageContainer className={"pb-4"}>
      <div className="text-white text-left">
        <div className={twMerge(
          "text-base leading-6font-medium",
          "md:text-lg md:leading-7 md:font-medium",
          "lg:text-2xl lg:leading-8 lg:font-medium",
          "text-lg text-white m-auto"
        )}>
          Sobre Nós
        </div>

        <div className={twMerge(
          "text-sm leading-5 font-medium mb-1 ",
          "md:text-base md:leading-6 md:font-medium md:mb-3",
          "lg:text-xl lg:leading-7 lg:font-medium lg:mb-5",
          "pt-4",
          "text-white",
        )}>
          Turismo e Jogos para uma Nova Geração
        </div>

        <div className={"mb-8"}>
          <Item
            className={"mb-5"}
            title={"2023 Novo Território no Brasil"}
            description={`Investimos 2 bilhões de dólares no Brasil, adquirindo bancos digitais relacionados à rede, obtendo licenças para cassinos online. Em apenas seis meses, nos tornamos uma das três principais empresas no setor de transações de jogos.`}
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

        <div className={twMerge("flex flex-col rounded-xl relative",
          )}>
          {/*<img className="absolute" src={licenseImage}/>*/}
          <div className={twMerge(
            "text-sm leading-5 font-medium",
            "md:text-base md:leading-6 md:font-medium",
            "lg:text-xl lg:leading-7 lg:font-medium",
            "text-white",
            "mb-4",
          )}>
            Licenciamento Legal da Empresa
          </div>

          <div className={twMerge(
            "text-sm leading-5 font-normal",
            "md:text-sm md:leading-5 md:font-normal",
            "lg:text-base lg:leading-6 lg:font-medium",
            "text-[#B3B3B3]",
          )}>
            {environment.platformName}, a nova versão foi lançada em agosto, e no primeiro dia de operação, o volume de transações de recarga ultrapassou 5 milhões de reais.
            <br/>/
            {environment.platformName} é operado pela Block balancing A.C. (Registro Comercial de Curaçao nº 158191, Emancipatie Boulevard Dominico F. "Don" Martina 52, Curaçao), de acordo com a licença principal de jogos #5517/JAZ. Conforme declaração de política da empresa,
            {environment.platformName} opera sob a sublicença CIL. Sob a sublicença CIL,
            {environment.platformName} é operado em conformidade com as leis de Curaçao. A Block balancing A.C. está sujeita a obrigações de combate à lavagem de dinheiro, conforme estabelecido pela legislação de Curaçao.
          </div>
        </div>


      </div>
    </PageContainer>
  )
}
