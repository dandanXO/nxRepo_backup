import {environment} from "../../../../environments/environment";

export const CompanyProfilePage = () => {
  return (
    <>
      <div className="companyInfo text-white text-left px-8">
        <div className="title">
          <span className={"text-4xl"}>TT Group</span>
          <span className={"text-4xl"}>—Fundada em Cingapura em 1993</span>
        </div>

        <div className="info text-base">Configurar centros de operação do grupo em 7 países sucessivamente</div>

        <div className="countryItem">
          <div  className="v-responsive v-img v-img--booting" style={{width: "580px"}}>
            <div className="v-responsive__sizer" style={{"paddingBottom": "14.1884%"}}></div>
            <img className="v-img__img v-img__img--contain" src={`assets/${environment.assetPrefix}/img1.be3894ae.png`}/>
          </div>
        </div>

        <div className="info text-base" style={{"marginTop": "30px"}}>Atualmente, envolve cinco grandes indústrias
          e continua a se desenvolver
        </div>

        <div className="industryItem mb-4">
          <div  className="v-responsive v-img v-img--booting" style={{width: "580px"}}>
            <div className="v-responsive__sizer" style={{"paddingBottom": "15.8983%"}}></div>
            <img className="v-img__img v-img__img--contain" src={`assets/${environment.assetPrefix}/img2.6ebaa7a5.png`}/>
          </div>
        </div>

        <div className="distanceItem mb-4">

          <div className="distanceTitle text-3xl border-l-[4px] border-l-green-500 border-l-[linear-gradient(180deg,#00B125 0%,#00FE5A 99%)] pl-2 mb-2">
            <div className="line" ></div>
            2023
          </div>

          <div className="distanceInfo mb-2" >Em janeiro, ele gastou uma quantia enorme de dinheiro para
            adquirir bancos digitais relacionados à Internet no Brasil. Ficou em primeiro lugar na categoria de
            transações de jogos em apenas 4 meses, e o volume diário de transações ultrapassou 200 milhões de reais
          </div>

          <div className="distanceInfo mb-2" >Em abril, preparou-se para investir 1 bilhão de dólares
            americanos para entrar oficialmente na operação da indústria de jogos digitais a dinheiro real online no
            Brasil
          </div>

          <div className="distanceInfo mb-2" >A versão 1.0 do {environment.platformName} foi lançada no dia 14 de maio,
            e no primeiro dia de operação de teste recarregou mais de um milhão de reais. Obrigado aos usuários
            respeitados no Brasil pela confiança
          </div>
          <div className="distanceInfo" >{environment.platformName} lançará oficialmente a versão 2.0 em 23º de
            setembro de 2023
          </div>
        </div>


        <div className="distanceItem mb-4">
          <div className="distanceTitle text-3xl border-l-[4px] border-l-green-500 border-l-[linear-gradient(180deg,#00B125 0%,#00FE5A 99%)] pl-2 mb-2">
            <div className="line" ></div>
            2022
          </div>
          <div className="distanceInfo mb-2" >Formalmente envolvido nos campos relevantes da Internet no
            Brasil e lançado com sucesso software de transação blockchain relacionado, com um total de mais de 10
            milhões de usuários instalados, e o volume diário de transações está no nível mais alto do mesmo setor.<br
              /> A receita excede 21,36 bilhões de dólares americanos e ganhou muitos certificados
              honorários nacionais em indústrias relacionadas.</div>
        </div>


        <div className="distanceItem mb-4">
          <div className="distanceTitle text-3xl border-l-[4px] border-l-green-500 border-l-[linear-gradient(180deg,#00B125 0%,#00FE5A 99%)] pl-2 mb-2">
            <div className="line" ></div>
            2021
          </div>
          <div className="distanceInfo mb-2" >Adquiriu a Behemoth Software Technology, uma empresa
            unicórnio chinesa de jogos casuais.
          </div>
        </div>

        <div className="distanceItem mb-4">
          <div className="distanceTitle text-3xl border-l-[4px] border-l-green-500 border-l-[linear-gradient(180deg,#00B125 0%,#00FE5A 99%)] pl-2 mb-2">
            <div className="line" ></div>
            2017
          </div>
          <div className="distanceInfo mb-2" > Em junho, a aquisição da Kolts, a maior empresa de software
            de desenvolvimento de jogos online de dinheiro real em Israel, estabeleceu uma base sólida para o grupo
            entrar em jogos online de dinheiro real.
          </div>
          <div className="distanceInfo mb-2" > O grupo possuiu sucessivamente qualificações operacionais de
            cassino off-line nas Filipinas, Nigéria e Macau, China. Ele possuiu integralmente o Four Seasons Sunshine
            Casino nas Filipinas, o Four Seasons Spring Casino na Nigéria e o Four Seasons Good Luck Casino em Macau ,
            China.
          </div>
        </div>

        <div className="distanceItem">
          <div className="distanceTitle text-3xl border-l-[4px] border-l-green-500 border-l-[linear-gradient(180deg,#00B125 0%,#00FE5A 99%)] pl-2 mb-2">
            <div className="line" ></div>
            2016
          </div>
          <div className="distanceInfo mb-2" >Em julho, o grupo entrou formalmente na indústria de jogos
            por meio de uma importante decisão
          </div>
        </div>

      </div>
    </>
  )
}
