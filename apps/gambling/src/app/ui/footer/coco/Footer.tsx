import {environment} from "../../../../environments/environment";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import cx from "classnames";
import React, {useState} from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import {useNavigate} from "react-router";
import { useSelector } from "react-redux";
import {Logo} from "./Logo"

export type IFooter = {
  // showFooter?: boolean;
  showTabbar?: boolean;
  showMobileFooter?: boolean;
  showDesktopFooter?: boolean;
}

export const Footer = (props: IFooter) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();
  const { label } = useSelector((state: any) => state.gameList);

  const isShowMobileFooter = props.showMobileFooter === undefined ? true : props.showMobileFooter;
  const isShowDesktopFooter = props.showDesktopFooter === undefined ? true : props.showDesktopFooter;

  // NOTE: mobile footer expands
  const [footerExpands, setFooterExpands] = useState({
    gameTypes: false,
    helpers: false
  })
  // NOTE: mobile
  const [footerTextExpand, setFooterTextExpand] = useState(false)


  return (
    <div>
      {isMobile && isShowMobileFooter? (
        <div className={cx(
          'flex justify-center text-white p-4 pb-[80px]',
          "bg-[var(--unknown)]",
        )}>
          <div className={"flex flex-col px-4"}>

            <div className={"mb-2"}>
              <section className={"flex flex-col items-start"}>
                <button
                  className='h-[44px] text-white w-full flex flex-row justify-between'
                  onClick={() => {
                    setFooterExpands({
                      ...footerExpands,
                      gameTypes: !footerExpands.gameTypes
                    })
                 }}
                >
                  <span className={"text-[var(--white)"}>Jogo</span>
                  {!footerExpands.gameTypes ? <DownOutlined /> : <UpOutlined />}
                </button>

                {footerExpands.gameTypes === true && (
                  <div className={"pl-4 flex flex-col items-start"}>
                    {
                      ["Salão", ...label].map((gameName: string, index: number) => {
                        return (
                          <button key={index} className={"h-[44px]"} onClick={() => navigate(PageOrModalPathEnum.IndexPage)}>{gameName}</button>
                        )
                      })
                    }
                  </div>
                )}
              </section>

              <section className={"flex flex-col items-start"}>
                {/* 这里是你的内容 */}
                <button
                  className='relative h-[20px] w-full flex flex-row justify-between'
                  onClick={() => {
                    setFooterExpands({
                      ...footerExpands,
                      helpers: !footerExpands.helpers
                    })
                  }}
                >
                  <span className="relative z-10 text-[var(--white)]">Ajuda</span>

                  {!footerExpands.helpers ? <DownOutlined /> : <UpOutlined />}
                  <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ transform: 'translateY(50%)'}} />
                </button>

                {footerExpands.helpers === true && (
                  <div className={"pl-4 flex flex-col items-start ml-6 mt-2"}>
                    <div className={"h-[30px]"} onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</div>
                    <div className={"h-[30px]"} onClick={()=>navigate(PageOrModalPathEnum.TermsOfService)}>Termos de Servico</div>
                    <div className={"h-[30px]"} onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</div>
                  </div>
                )}

              </section>
            </div>

            <section className={"mt-2 text-[var(--text-tertiary)]"}>

              <div className={cx("", {

              })}>
                <span>&ensp;&ensp;{environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 </span>
                {!footerTextExpand ? " a..." : ""}
                {footerTextExpand && <span>anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.</span>}
              </div>

              {footerTextExpand && (
                <>
                  <div className={cx(" mt-4", {

                  })}>
                    &ensp;&ensp;Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                  </div>

                  <div className={cx(" mt-4", {

                  })}>
                    &ensp;&ensp;O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                  </div>

                  <div className={cx(" mt-4", {

                  })}>
                    &ensp;&ensp;Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                  </div>
                </>
              )}


              <div className='flex justify-center underline text-blue-500 mt-2 mt-46'>
                <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{footerTextExpand ? 'jogue fora': 'ver tudo'}</button>
              </div>

              <div className='mt-3 flex justify-center mb-4 flex-nowrap'>
                <img alt='footer1' className='w-[6%] h-[89%] flex-1' src={`assets/${environment.assetPrefix}/footer1.aa87e40b.png`}/>
                <img alt='footer1' className='w-[16%] h-[60%] flex-1 mt-1' src={`assets/${environment.assetPrefix}/footer2.43ad4696.png`} />
                <img alt='footer1' className='w-[16%] h-[72%] flex-1' src={`assets/${environment.assetPrefix}/footer3.e3ce7aaa.png`}  onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                <img alt='footer1' className='w-[16%] h-[60%] flex-1 mt-1' src={`assets/${environment.assetPrefix}/footer5.3cd11f0c.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                <img alt='footer1' className='w-[8%] h-[89%] flex-1' src={`assets/${environment.assetPrefix}/footer6.a8ba450a.png`}  onClick={()=>window.open('https://www.interac.ca/en/')}/>
                <img alt='footer1' className='w-[6%] h-[72%] flex-1 mt-0.5' src={`assets/${environment.assetPrefix}/footer4.e6cdeca2.png`}  onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
              </div>

              <div className='flex justify-center mb-4'>
                <img alt='footer1' className='h-[13px]' src={`assets/${environment.assetPrefix}/footer7.a1b2fb6d.png`}/>
              </div>

              <div className='mb-4 text-center'>@ 2023 {environment.platformName} All rights</div>



            </section>
          </div>
        </div>
      ): isShowDesktopFooter ? (
        <div className='bg-[var(--unknown)] text-white flex justify-center pt-20'>
          {/*h-[400px]*/}
          <div className={"flex gap-3 w-11/12 mt-3"}>

              <section className={"flex flex-col gap-3 w-1/12 items-start"}>
                <div className='text-[var(--white)'>Jogo</div>
                {
                  ["Salão", ...label].map((gameName: string, index: number) => {
                    return (
                      <button onClick={() => navigate(PageOrModalPathEnum.IndexPage)}>{gameName}</button>
                    )
                  })
                }
              </section>

              <section className={"flex flex-col gap-3 w-3/12 items-start"}>
                <div className='text-[var(--white)'>Ajuda</div>
                <button onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</button>
                <button onClick={()=>navigate(PageOrModalPathEnum.TermsOfService)}>Termos de Servico</button>
                <button onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</button>
              </section>

              <section className={"w-8/12 mt-3"}>
                <div className={"flex gap-3 items-center mb-2"}>
                  <Logo/>
                  <span className="text-lg">{environment.platformName}</span>
                </div>

                <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left", {
                  "max-h-24": !footerTextExpand
                })}>
                  &ensp;&ensp;{environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.
                  Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                  O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                  Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                </div>

                <div className='flex justify-center underline text-blue-500 mt-46'>
                  <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{footerTextExpand ? 'jogue fora': 'ver tudo'}</button>
                </div>

                <div className='mt-3 flex justify-center mb-4'>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer1.aa87e40b.png`}/>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer2.43ad4696.png`}/>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer3.e3ce7aaa.png`} onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer5.3cd11f0c.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer6.a8ba450a.png`} onClick={()=>window.open('https://www.interac.ca/en/')}/>
                  <img alt='footer1' className='h-10' src={`assets/${environment.assetPrefix}/footer4.e6cdeca2.png`} onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
                </div>

                <div className='flex justify-center mb-4'>
                  <img alt='footer1' className='h-5' src={`assets/${environment.assetPrefix}/footer7.a1b2fb6d.png`}/>
                </div>
                <div className='mb-4 text-center'>@ 2023 {environment.platformName} All rights</div>
              </section>
            </div>
          </div>
      ): null}
    </div>
  )
}
