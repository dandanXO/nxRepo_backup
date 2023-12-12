import InviteBanner from './inviteBanner.png';
import Level from './level.png';
import Gift from './gift.png';
import GameChips from './gameChips.png';
export const HowToInviteTabSection = () => {
  return (
    <div className="w-full flex flex-col justify-between gap-10 w-full items-center">
      <button
        id="Btn"
        className="shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] relative flex flex-row justify-center py-1.5 px-5 gap-2 cursor-pointer self-end rounded-[100px]"
      >
        <div
          id="Button1"
          className="text-lg font-['Inter'] leading-[28px] text-white mb-1"
        >
          Convidar conta
        </div>
        <img
          src="https://file.rendit.io/n/0spjSovL9AiUbj6b8ZeC.svg"
          alt="ArrowRight"
          id="ArrowRight"
          className="mt-px w-6"
        />
      </button>
      <div className="relative flex flex-col justify-between gap-5 w-full">
        <div className="flex flex-col gap-1 w-full items-center">
          <img
            src="https://file.rendit.io/n/hfrpfk4EkOV4d3C1WWWL.png"
            alt="Image1"
            id="Image1"
            className=""
          />

          <div className="mb-10 w-full text-center text-white text-xl font-bold font-['Inter'] leading-7">{`Programa de recomendação exclusivo da plataforma {Group name}-{Product name}, recomende aos amigos e ganhe comissões sem limite máximo! Esperamos sinceramente que mais jogadores se juntem a nós!`}</div>

          <div className="relative w-full h-32 bg-[linear-gradient(145deg,_#8547eb_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row gap-16 items-start rounded-lg">
            <div className="flex flex-col mb-5 gap-5 w-2/3 items-start">
              <div className="text-2xl font-['Inter'] font-bold leading-[32px] text-[#4b80bd] bg-white flex flex-row justify-end w-4/5 h-12 items-start pt-2 px-12 rounded-tl-lg rounded-br-[100px] pl-[100px]">
                Copie o link para seus amigos!
              </div>
              <div className="text-3xl font-['Inter'] font-bold leading-[36px] text-white ml-48">
                https://ds.imperador777bet.com/invite
              </div>
            </div>
            <button
              id="Btn1"
              className="text-left text-3xl font-['Inter'] font-medium leading-[36px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center mt-8 pt-3 w-1/4 h-16 cursor-pointer items-start rounded-[100px]"
            >
              Convide Amigos
            </button>
            <div className='absolute left-[-5%] bottom-0'>
              <img
                src="https://file.rendit.io/n/yX7dGnkCnOVxzFooa0st.png"
                alt="Image2"
                id="Image2"
                className="relative mt-12"
              />
            </div>
          </div>


        </div>

        <div className=" flex flex-row  pt-3 w-full border rounded-lg border-solid border-[#333333] bg-[#1a1a1a]">
          <div className="text-center font-['Inter'] leading-[24px] text-[#f59e0b] mb-3">
            {`Regras de liquidação da plataforma {Product name}:A comissão
      devolvida pelo {Product name} é atualizada a cada 10 a 30
      minutos, e a comissão devolvida será liberada toda segunda-feira,
      horário do Brasil. Clique em &quot;Dados diários&quot; para ver os
      detalhes da comissão.`}
          </div>
        </div>
        <div className="overflow-hidden bg-[#333333] flex flex-col justify-between gap-5 w-full items-start rounded-lg">
          <div className="bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] text-zinc-400 text-base font-medium leading-6 justify-center items-stretch w-full px-8 py-9 max-md:max-w-full max-md:px-5">
            Nota: Para garantir a justiça, os usuários trapaceiros serão banidos
            permanentemente, os fundos obtidos ilegalmente serão congelados e as
            responsabilidades legais relevantes serão assumidas.
          </div>

          <div className="w-full py-5 px-8  max-md:max-w-full max-md:pr-5 bg-[#333]">
            <div className="gap-5 flex flex-col lg:flex-row max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-center w-full  lg:w-[63%] max-md:ml-0">
                <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-5">
                  <div className="text-white text-3xl font-bold leading-9 max-md:max-w-full">
                    Programa de referência
                  </div>
                  <div className="text-zinc-400 text-base font-medium leading-6 mt-5 max-md:max-w-full">{`
                Fornecer à {Product name} um convite efetivo ao
                cliente (o cliente deve preencher o registro do número do
                celular e concluir uma recarga).
                <br />
                Convide {1 - 10} pessoas, recompense R${15}
                <br />
                Convide {11 - 20} pessoas, recompense R${20}
                <br />
                Mais de {21} pessoas, recompensa R${25}
                <br />
                As recompensas serão distribuídas às 11 horas do dia seguinte.
                Ao mesmo tempo, realizamos anticomissões de acordo com o valor
                da aposta do jogo do usuário do jogo na plataforma do jogo (a
                comissão é considerável). A taxa de comissão varia de jogo
                para jogo.`}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[37%] self-end">
              <img className="w-full" src={Level} />
            </div>
              {/* <div className="flex flex-col items-stretch w-[37%] ml-5 max-md:w-full max-md:ml-0">
                <div className="items-center flex flex-col max-md:mt-5">
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-violet-600 self-center px-7 py-3.5 rounded-[100px] max-md:px-5">
                    Você
                  </div>
                  <div className="items-stretch self-center flex w-[84px] max-w-full flex-col mt-2 pl-5 pr-2.5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                  <div className="items-stretch self-center flex w-[186px] max-w-full gap-5 mt-2">
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-emerald-500 grow pl-6 pr-8 py-3.5 rounded-[100px] max-md:px-5">
                      Nível 1
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-emerald-500 z-[1] grow pl-6 pr-8 py-3.5 rounded-[100px] max-md:px-5">
                      Nível 1
                    </div>
                  </div>
                  <div className="items-stretch self-center flex w-[186px] max-w-full gap-5 mt-2">
                    <div className="items-stretch flex grow basis-[0%] flex-col pl-4 pr-7 max-md:pr-5">
                      <div className="text-white text-xs leading-4 whitespace-nowrap">
                        Convidar
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5241d2afe905c28e5f7c2210fb28b2d977194f73fb5db8dd7215016e5d48a58a?"
                        className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                      />
                    </div>
                    <div className="items-stretch z-[1] flex grow basis-[0%] flex-col pl-5 pr-7 max-md:pr-5">
                      <div className="text-white text-xs leading-4 whitespace-nowrap">
                        Convidar
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5241d2afe905c28e5f7c2210fb28b2d977194f73fb5db8dd7215016e5d48a58a?"
                        className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                      />
                    </div>
                  </div>
                  <div className="items-stretch self-center flex w-[290px] max-w-full gap-5 mt-2 max-md:justify-center">
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                      Nível 2
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                      Nível 2
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 z-[1] grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                      Nível 2
                    </div>
                  </div>
                  <div className="items-stretch self-center flex w-[290px] max-w-full gap-5 mt-2 max-md:justify-center">
                    <div className="items-stretch flex grow basis-[0%] flex-col px-5">
                      <div className="text-white text-xs leading-4 whitespace-nowrap">
                        Convidar
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                        className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                      />
                    </div>
                    <div className="items-stretch flex grow basis-[0%] flex-col px-5">
                      <div className="text-white text-xs leading-4 whitespace-nowrap">
                        Convidar
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                        className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                      />
                    </div>
                    <div className="items-stretch z-[1] flex grow basis-[0%] flex-col px-5">
                      <div className="text-white text-xs leading-4 whitespace-nowrap">
                        Convidar
                      </div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                        className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                      />
                    </div>
                  </div>
                  <div className="items-stretch flex gap-5 mt-2 pr-12 self-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                      Nível 3
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                      Nível 3
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                      Nível 3
                    </div>
                    <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                      Nível 3
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="flex flex-row bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] w-full pl-8 items-center max-md:max-w-full max-md:px-5">
            <div className='flex-1'>
              <div className="pt-5 pb-6 text-white text-3xl font-bold leading-9 max-w-[848px] ">
                Estudos de caso
              </div>
              <div className="text-zinc-400 text-base font-medium leading-6 pb-8">
                {`Tom se cadastrou como usuário válido de {Product name} em 10
          de abril de 2023. Enquanto ganhava o grande prêmio na plataforma,
          ele também recomendou um colega da empresa. O colega concluiu o
          cadastro e recarregou 50 reais, e tom ganhou a recompensa de
          R${15} reais , Este colega é profundamente apaixonado por
          jogos de {Product name}. O valor total das apostas por 3
          dias consecutivos é de 534.034 reais. De acordo com a política de
          descontos do {Product name}, tom recebe novamente 2.670,17
          reais de comissão. Ao mesmo tempo, este colega recomenda
          {Product name} para seus amigos , de acordo com a política
          de descontos de {Product name}, tom também desfruta das
          políticas relevantes de seus colegas e amigos de descontos de
          apostas. Em todo o mês de abril, Tom ganhou um total de 51.089 reais
          em comissões.`}
              </div>
            </div>
            <div className="origin-top-left bottom-0 h-full self-end">
              <img className="w-[300px]" src={GameChips} />
            </div>
          </div>
        </div>
      </div>
      <button
        id="Btn2"
        className="text-xl font-['Inter'] font-medium leading-[28px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] relative flex flex-row justify-center pt-3 w-full h-12 cursor-pointer items-start rounded-lg"
      >
        Convidar conta
      </button>
    </div>
  )

  return (
    <div className="items-start flex flex-col">
      <div className="justify-center items-stretch shadow bg-emerald-500 flex gap-2 px-5 py-1.5 rounded-[100px] self-end">
        <div className="text-white text-lg leading-7 grow whitespace-nowrap">
          Convidar conta
        </div>
      </div>
      <img
        loading="lazy"
        srcSet={InviteBanner}
        className="aspect-[1.73] object-contain object-center w-[772px] overflow-hidden self-center max-w-full mt-10"
      />
      <div className="text-white text-center text-xl font-bold leading-7 self-stretch w-full mt-1 max-md:max-w-full">
        {` Programa de recomendação exclusivo da plataforma {Group
      name}-{Product name}, recomende aos amigos e ganhe comissões
      sem limite máximo! Esperamos sinceramente que mais jogadores se juntem a
      nós!`}
      </div>
      <div className="bg-[linear-gradient(145deg,_#8547eb_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row gap-16 w-full items-start rounded-lg">
        <div className="relative flex flex-row w-2/3 items-start mt-[-41px] ml-[-28px]">
          <div className="text-2xl font-['Inter'] font-bold leading-[32px] text-[#4b80bd] w-3/4 h-12 bg-white/80 absolute top-10 left-6 flex flex-row justify-end items-start pt-2 px-12 rounded-tl-lg rounded-br-[100px]">
            Copie o link para seus amigos!
          </div>
          <img
            src="https://file.rendit.io/n/yX7dGnkCnOVxzFooa0st.png"
            alt="Image1"
            id="Image1"
            className="relative"
          />
          <div className="text-3xl font-['Inter'] font-bold leading-[36px] text-white relative mt-[113px]">
            https://ds.imperador777bet.com/invite
          </div>
        </div>
        <button
          id="Btn"
          className="text-3xl font-['Inter'] font-medium leading-[36px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center mt-8 pt-3 w-1/4 h-16 cursor-pointer items-start rounded-[100px]"
        >
          Convide Amigos
        </button>
      </div>
      <div className="text-amber-500 text-center text-base leading-6 justify-center items-stretch border border-[color:var(--grayscale-20,#333)] bg-zinc-900 self-stretch w-full mt-5 px-5 py-3 rounded-lg border-solid max-md:max-w-full">
        {`Regras de liquidação da plataforma {Product name}:A comissão
      devolvida pelo {Product name} é atualizada a cada 10 a 30
      minutos, e a comissão devolvida será liberada toda segunda-feira,
      horário do Brasil. Clique em &quot;Dados diários&quot; para ver os
      detalhes da comissão.`}
      </div>
      <div className="justify-center items-stretch bg-zinc-800 self-stretch flex w-full flex-col mt-5 rounded-2xl max-md:max-w-full">
        <div className="bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] text-zinc-400 text-base font-medium leading-6 justify-center items-stretch w-full px-8 py-9 max-md:max-w-full max-md:px-5">
          Nota: Para garantir a justiça, os usuários trapaceiros serão banidos
          permanentemente, os fundos obtidos ilegalmente serão congelados e as
          responsabilidades legais relevantes serão assumidas.
        </div>
        <div className="w-full py-5 px-8  max-md:max-w-full max-md:pr-5 bg-[#333]">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[63%] max-md:w-full max-md:ml-0">
              <div className="items-stretch flex grow flex-col max-md:max-w-full max-md:mt-5">
                <div className="text-white text-3xl font-bold leading-9 max-md:max-w-full">
                  Programa de referência
                </div>
                <div className="text-zinc-400 text-base font-medium leading-6 mt-5 max-md:max-w-full">{`
                Fornecer à {Product name} um convite efetivo ao
                cliente (o cliente deve preencher o registro do número do
                celular e concluir uma recarga).
                <br />
                Convide {1 - 10} pessoas, recompense R${15}
                <br />
                Convide {11 - 20} pessoas, recompense R${20}
                <br />
                Mais de {21} pessoas, recompensa R${25}
                <br />
                As recompensas serão distribuídas às 11 horas do dia seguinte.
                Ao mesmo tempo, realizamos anticomissões de acordo com o valor
                da aposta do jogo do usuário do jogo na plataforma do jogo (a
                comissão é considerável). A taxa de comissão varia de jogo
                para jogo.`}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[37%] ml-5 max-md:w-full max-md:ml-0">
              <div className="items-center flex flex-col max-md:mt-5">
                <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-violet-600 self-center px-7 py-3.5 rounded-[100px] max-md:px-5">
                  Você
                </div>
                <div className="items-stretch self-center flex w-[84px] max-w-full flex-col mt-2 pl-5 pr-2.5">
                  <div className="text-white text-xs leading-4 whitespace-nowrap">
                    Convidar
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                    className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                  />
                </div>
                <div className="items-stretch self-center flex w-[186px] max-w-full gap-5 mt-2">
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-emerald-500 grow pl-6 pr-8 py-3.5 rounded-[100px] max-md:px-5">
                    Nível 1
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-emerald-500 z-[1] grow pl-6 pr-8 py-3.5 rounded-[100px] max-md:px-5">
                    Nível 1
                  </div>
                </div>
                <div className="items-stretch self-center flex w-[186px] max-w-full gap-5 mt-2">
                  <div className="items-stretch flex grow basis-[0%] flex-col pl-4 pr-7 max-md:pr-5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5241d2afe905c28e5f7c2210fb28b2d977194f73fb5db8dd7215016e5d48a58a?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                  <div className="items-stretch z-[1] flex grow basis-[0%] flex-col pl-5 pr-7 max-md:pr-5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5241d2afe905c28e5f7c2210fb28b2d977194f73fb5db8dd7215016e5d48a58a?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                </div>
                <div className="items-stretch self-center flex w-[290px] max-w-full gap-5 mt-2 max-md:justify-center">
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                    Nível 2
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                    Nível 2
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-amber-500 z-[1] grow px-6 py-3.5 rounded-[100px] max-md:px-5">
                    Nível 2
                  </div>
                </div>
                <div className="items-stretch self-center flex w-[290px] max-w-full gap-5 mt-2 max-md:justify-center">
                  <div className="items-stretch flex grow basis-[0%] flex-col px-5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                  <div className="items-stretch flex grow basis-[0%] flex-col px-5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                  <div className="items-stretch z-[1] flex grow basis-[0%] flex-col px-5">
                    <div className="text-white text-xs leading-4 whitespace-nowrap">
                      Convidar
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3df4648537716a71394693cb4f35b44529f91155f0f797b8a33eaad2f328dc2c?"
                      className="aspect-[1.5] object-contain object-center w-[9px] fill-white overflow-hidden self-center max-w-full"
                    />
                  </div>
                </div>
                <div className="items-stretch flex gap-5 mt-2 pr-12 self-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                    Nível 3
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                    Nível 3
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                    Nível 3
                  </div>
                  <div className="text-white text-sm font-medium leading-5 whitespace-nowrap justify-center items-stretch shadow bg-blue-500 grow pl-6 pr-4 py-3.5 rounded-[100px] max-md:pl-5">
                    Nível 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] w-full pl-8 items-center max-md:max-w-full max-md:px-5">
          <div className='flex-1'>
            <div className="pt-5 pb-6 text-white text-3xl font-bold leading-9 max-w-[848px] ">
              Estudos de caso
            </div>
            <div className="text-zinc-400 text-base font-medium leading-6 pb-8">
              {`Tom se cadastrou como usuário válido de {Product name} em 10
          de abril de 2023. Enquanto ganhava o grande prêmio na plataforma,
          ele também recomendou um colega da empresa. O colega concluiu o
          cadastro e recarregou 50 reais, e tom ganhou a recompensa de
          R${15} reais , Este colega é profundamente apaixonado por
          jogos de {Product name}. O valor total das apostas por 3
          dias consecutivos é de 534.034 reais. De acordo com a política de
          descontos do {Product name}, tom recebe novamente 2.670,17
          reais de comissão. Ao mesmo tempo, este colega recomenda
          {Product name} para seus amigos , de acordo com a política
          de descontos de {Product name}, tom também desfruta das
          políticas relevantes de seus colegas e amigos de descontos de
          apostas. Em todo o mês de abril, Tom ganhou um total de 51.089 reais
          em comissões.`}
            </div>
          </div>
          <div className="origin-top-left bottom-0 h-full self-end">
            <img className="w-[300px]" src={GameChips} />
          </div>
        </div>
      </div>
      <div className="text-white text-xl font-medium leading-7 whitespace-nowrap justify-center items-center self-stretch shadow bg-violet-600 w-full mt-10 px-16 py-3.5 rounded-lg max-md:max-w-full max-md:px-5">
        Convidar conta
      </div>
    </div>
  )
  return (
    <div className="w-full h-full flex-col justify-start items-start gap-10 inline-flex">
      <div className="self-stretch h-10 flex-col justify-center items-end gap-2.5 flex">
        <div className="h-10 px-5 py-3 bg-emerald-500 rounded-full shadow-inner justify-center items-center gap-2 inline-flex">
          <div className="text-white text-lg font-normal font-['Inter'] leading-7">Convidar conta</div>
          <div className="w-6 h-6 justify-center items-center flex">
            <div className="w-6 h-6 relative flex-col justify-start items-start flex" />
          </div>
        </div>
      </div>
      <div className="flex-col justify-start items-center gap-1 flex">
        <img className="w-full " src={InviteBanner} />
        <div className="w-full text-center text-white text-xl font-bold font-['Inter'] leading-7">{`Programa de recomendação exclusivo da plataforma {Group name}-{Product name}, recomende aos amigos e ganhe comissões sem limite máximo! Esperamos sinceramente que mais jogadores se juntem a nós!`}</div>
      </div>
      <div className="w-full flex-col justify-start items-start gap-5 flex">
        <div className="flex-col justify-start items-start gap-5 flex">
          <div className="w-full h-32 relative bg-gradient-to-br from-violet-600 to-emerald-500 rounded-2xl">
            <div className="pl-48 pr-12 py-2 left-0 top-0 absolute bg-white bg-opacity-80 rounded-tl-2xl rounded-br-full justify-end items-center inline-flex">
              <div className="text-violet-600 text-2xl font-bold font-['Inter'] leading-loose">Copie o link para seus amigos!</div>
            </div>
            <img className="w-56 h-44 left-[-28px] top-[-41px] absolute" src="https://via.placeholder.com/224x169" />
            <div className="left-[196px] top-[72px] absolute text-white text-3xl font-bold font-['Inter'] leading-9">https://ds.imperador777bet.com/invite</div>
            <div className="px-10 py-3 right-[10px] top-[10px] absolute bg-violet-600 rounded-full shadow-inner justify-center items-center gap-2.5 inline-flex">
              <div className="text-white text-3xl font-medium font-['Inter'] leading-9 whitespace-nowrap">Convide Amigos</div>
            </div>
          </div>
          <div className="px-5 py-3 bg-zinc-900 rounded-lg border border-zinc-800 justify-center items-center gap-2.5 inline-flex">
            <div className="w-full text-center text-amber-500 text-base font-normal font-['Inter'] leading-normal">{`Regras de liquidação da plataforma {Product name}:A comissão devolvida pelo {Product name} é atualizada a cada 10 a 30 minutos, e a comissão devolvida será liberada toda segunda-feira, horário do Brasil. Clique em "Dados diários" para ver os detalhes da comissão.`}</div>
          </div>
          <div className=" bg-zinc-800 rounded-2xl flex-col justify-center items-center gap-5 flex">
            <div className="self-stretch  p-8 bg-gradient-to-l from-white to-white justify-center items-center inline-flex">
              <div className="grow shrink basis-0 text-zinc-400 text-base font-medium font-['Inter'] leading-normal">Nota: Para garantir a justiça, os usuários trapaceiros serão banidos permanentemente, os fundos obtidos ilegalmente serão congelados e as responsabilidades legais relevantes serão assumidas.</div>
            </div>
            <div className="flex flex-1">
              <div className="grow flex-1 flex-col justify-start items-start gap-5 inline-flex">
                <div className="self-stretch text-white text-3xl font-bold font-['Inter'] leading-9">Programa de referência</div>
                <div className="self-stretch text-zinc-400 text-base font-medium font-['Inter'] leading-normal">
                  <div> {`Fornecer à {Product name} um convite efetivo ao cliente (o cliente deve preencher o`}</div>
                  <div>{`registro do número do celular e concluir uma recarga).`}</div>
                  <div>{`Convide {1 - 10} pessoas, recompense R${15}`}</div>
                  <div>{`Convide {11 - 20} pessoas, recompense R${20}`}</div>
                  <div>{`Mais de {21} pessoas, recompensa R${25}`}</div>
                  <div>{`As recompensas serão distribuídas às 11 horas do dia seguinte. Ao mesmo tempo,`}</div>
                  <div>{`realizamos anticomissões de acordo com o valor da aposta do jogo do usuário do jogo na`}</div>
                  <div>{`plataforma do jogo (a comissão é considerável). A taxa de comissão varia de jogo para jogo.`}</div>
                </div>

              </div>
              <div className="w-full h-72 relative bg-gradient-to-l from-white to-white flex-col justify-start items-start flex">
                <div className="w-full h-96 relative">
                  <div className="origin-top-left rotate-[-12.47deg] w-28 h-40 left-[151px] top-[22.98px] absolute">
                    <img className="w-28 h-28 left-[12.77px] top-[57.75px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/106x106" />
                    <img className="w-28 h-28 left-0 top-[-0px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/106x106" />
                  </div>
                  <div className="origin-top-left rotate-[-12.47deg] w-32 h-48 left-[216.87px] top-[30.26px] absolute">
                    <img className="w-32 h-32 left-[15.05px] top-[68.05px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/125x125" />
                    <img className="w-32 h-32 left-0 top-[-0px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/125x125" />
                  </div>
                  <div className="origin-top-left rotate-[-12.47deg] w-32 h-48 left-[259px] top-[98.08px] absolute">
                    <img className="w-32 h-32 left-[15.05px] top-[68.05px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/125x125" />
                    <img className="w-32 h-32 left-0 top-[-0px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/125x125" />
                  </div>
                  <div className="origin-top-left rotate-[-12.47deg] w-48 h-72 left-0 top-[67.81px] absolute">
                    <img className="w-48 h-48 left-[22.67px] top-[102.54px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/189x189" />
                    <img className="w-48 h-48 left-0 top-[-0px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/189x189" />
                  </div>
                  <div className="origin-top-left rotate-[-12.47deg] w-60 h-96 left-[81px] top-[94.39px] absolute">
                    <img className="w-60 h-60 left-[27.99px] top-[126.61px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/233x233" />
                    <img className="w-60 h-60 left-0 top-[-0px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/233x233" />
                  </div>
                </div>
                <div className="w-full text-white text-3xl font-bold font-['Inter'] leading-9">Estudos de caso</div>
                <div className="w-full text-zinc-400 text-base font-medium font-['Inter'] leading-normal">{`Tom se cadastrou como usuário válido de {Product name} em 10 de abril de 2023. Enquanto ganhava o grande prêmio na plataforma, ele também recomendou um colega da empresa. O colega concluiu o cadastro e recarregou 50 reais, e tom ganhou a recompensa de R${15} reais , Este colega é profundamente apaixonado por jogos de {Product name}. O valor total das apostas por 3 dias consecutivos é de 534.034 reais. De acordo com a política de descontos do {Product name}, tom recebe novamente 2.670,17 reais de comissão. Ao mesmo tempo, este colega recomenda {Product name} para seus amigos , de acordo com a política de descontos de {Product name}, tom também desfruta das políticas relevantes de seus colegas e amigos de descontos de apostas. Em todo o mês de abril, Tom ganhou um total de 51.089 reais em comissões.`}</div>
                <div className="origin-top-left rotate-[-12.47deg] w-36 h-56 relative">
                  <img className="w-36 h-36 left-[17.27px] top-[78.11px] absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/144x144" />
                  <img className="w-36 h-36 left-0 top-0 absolute origin-top-left rotate-[-12.47deg]" src="https://via.placeholder.com/144x144" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-14 px-10 py-3 bg-violet-600 rounded-lg shadow-inner justify-center items-center gap-2.5 inline-flex">
          <div className="text-white text-xl font-medium font-['Inter'] leading-7">Convidar conta</div>
        </div>
      </div>
    </div>

  )
}