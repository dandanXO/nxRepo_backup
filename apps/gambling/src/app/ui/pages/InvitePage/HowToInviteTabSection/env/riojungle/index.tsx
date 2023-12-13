import InviteBanner from './inviteBanner.png';
import Level from './level.png';
import Gift from './gift.png';
import GameChips from './gameChips.png';
import useBreakpoint from 'apps/gambling/src/app/ui/hooks/useBreakpoint';
export const HowToInviteTabSection = () => {
  const {
    isMobile,
    isTablet,
    isDesktop,
  } = useBreakpoint();

  const productName = ''

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

          <div className="mb-10 w-full text-center text-white text-sm md:text-base lg:text-xl font-bold font-['Inter'] leading-5 md:leading-6 lg:leading-7">{`Programa de recomendação exclusivo da plataforma {Group name}-${productName}, recomende aos amigos e ganhe comissões sem limite máximo! Esperamos sinceramente que mais jogadores se juntem a nós!`}</div>

          {!isMobile && <div className="pr-3 lg:pr-8 relative w-full bg-[linear-gradient(145deg,_#8547eb_-7%,#10b98f_109%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-row gap-16 items-start rounded-lg flex-wrap">
            <div className='flex-1 flex flex-row flex-nowrap  justify-between'>
              <div className="flex flex-col mb-5 items-start flex-1 ">
                <div className="break-all pl-[117px] pr-9 lg:pl-[196px] text-sm md:text-base lg:text-lg font-['Inter'] font-bold leading-[32px] text-[#4b80bd] bg-white flex flex-row whitespace-nowrap items-start py-2.5 rounded-tl-lg rounded-br-[100px] ">
                  Copie o link para seus amigos!
                </div>
                <div className="pl-[117px] lg:pl-[196px] text-base md:text-xl lg:text-3xl font-['Inter'] font-bold leading-[36px] text-white break-all">
                  https://ds.imperador777bet.com/invite
                </div>
              </div>
              <div className='self-center justify-start ml-1'>
                <button
                  id="Btn1"
                  className="p-2 lg:py-3 lg:px-10 text-left text-base md:text-lg lg:text-2xl font-['Inter'] font-medium text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb]  rounded-[100px]"
                >
                  Convide Amigos
                </button>
              </div>
            </div>


            <div className='absolute left-[-5%] bottom-0 w-[130px] lg:w-[224px] '>
              <img
                src={Gift}
                alt="Image2"
                id="Image2"
                className="relative mt-12"
              />
            </div>
          </div>
          }
          {
            isMobile && (
              <div className="bg-gradient-to-br from-[#8547eb]  to-[#10b98f] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col gap-2 w-full items-start rounded-lg">

                <div className="text-sm font-['Inter'] font-bold leading-[20px] text-[#4b80bd] bg-white flex flex-row justify-center pt-1 w-full items-start rounded-tl-lg rounded-tr-lg">
                  Copie o link para seus amigos!
                </div>
                <div className='p-2 w-full'>

                  <div className="font-['Inter'] font-bold leading-[24px] text-white  text-center w-full mb-2">
                    https://ds.imperador777bet.com/invite
                  </div>
                  <button className="font-['Inter'] font-medium leading-[24px] text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] flex flex-row justify-center py-2 w-full cursor-pointer rounded-[100px]"
                  >
                    Convide Amigos
                  </button>
                </div>
              </div>
            )
          }

        </div>

        <div className=" flex flex-row w-full border rounded-lg border-solid border-[#333333] bg-[#1a1a1a]">
          <div className="p-2 md:px-5 lg:py-3 text-sm lg:text-base text-center font-['Inter'] leading-[24px] text-[#f59e0b] mb-3">
            {`Regras de liquidação da plataforma ${productName}:A comissão devolvida pelo ${productName} é atualizada a cada 10 a 30
              minutos, e a comissão devolvida será liberada toda segunda-feira, horário do Brasil. Clique em &quot;Dados diários&quot; para ver os
              detalhes da comissão.`}
          </div>
        </div>
        <div className="text-sm lg:text-base overflow-hidden bg-[#333333] flex flex-col justify-between gap-5 w-full items-start rounded-lg">
          <div className="bg-gradient-to-l from-[#ffffff00] to-[#ffffff1a] text-zinc-400 flex w-full p-2 md:p-5 lg:p-8 justify-center items-center gap-10">
            Nota: Para garantir a justiça, os usuários trapaceiros serão banidos
            permanentemente, os fundos obtidos ilegalmente serão congelados e as
            responsabilidades legais relevantes serão assumidas.
          </div>

          <div className="w-full p-2 md:p-5 lg:px-8 bg-[#333]">
            <div className="flex flex-col lg:flex-row ">
              <div className="flex flex-col items-center w-full  lg:w-[63%] max-md:ml-0">
                <div className="items-stretch flex grow flex-col max-md:max-w-full ">
                  <div className="text-white text-3xl font-bold leading-9 max-md:max-w-full">
                    Programa de referência
                  </div>
                  <div className="text-zinc-400 text-base font-medium leading-6 mt-5 max-md:max-w-full">{`
                Fornecer à ${productName} um convite efetivo ao
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
                {`Tom se cadastrou como usuário válido de ${productName} em 10
          de abril de 2023. Enquanto ganhava o grande prêmio na plataforma,
          ele também recomendou um colega da empresa. O colega concluiu o
          cadastro e recarregou 50 reais, e tom ganhou a recompensa de
          R${15} reais , Este colega é profundamente apaixonado por
          jogos de ${productName}. O valor total das apostas por 3
          dias consecutivos é de 534.034 reais. De acordo com a política de
          descontos do ${productName}, tom recebe novamente 2.670,17
          reais de comissão. Ao mesmo tempo, este colega recomenda
          ${productName} para seus amigos , de acordo com a política
          de descontos de ${productName}, tom também desfruta das
          políticas relevantes de seus colegas e amigos de descontos de
          apostas. Em todo o mês de abril, Tom ganhou um total de 51.089 reais
          em comissões.`}
              </div>
            </div>
            <div className="origin-top-left bottom-0 h-full self-end">
              <img className="hidden md:flex md:w-[200px] lg:w-[300px]" src={GameChips} />
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


}