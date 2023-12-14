import {environment} from "../../../../../../environments/environment";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import cx from "classnames";
import React, {useState} from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {useNavigate} from "react-router";
import { useSelector } from "react-redux";
import {LoadingLogo} from "../../../../components/Logos/LoadingLogo"
import {FooterLogo} from "../../../../components/Logos/FooterLogo";

import {IFooter} from "../../types/IFooter";


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
          'flex justify-center text-white p-8 pb-[80px] text-xs',
          "bg-[var(--background-footer)]",
        )}>
          <div className={"flex flex-col"}>

            <div className={"mb-2"}>
              <section className={"flex flex-col items-start"}>
                <button
                  className='mb-2 text-white w-full flex flex-row justify-between'
                  onClick={() => {
                    setFooterExpands({
                      ...footerExpands,
                      gameTypes: !footerExpands.gameTypes
                    })
                 }}
                >
                  <span className={"text-[var(--white)"}>Jogo</span>
                  {!footerExpands.gameTypes ? <DownOutlined className="w-[14px] h-[14px]"/> : <UpOutlined className="w-[14px] h-[14px]"/>}
                </button>

                {footerExpands.gameTypes === true && (
                  <div className={"pl-4 flex flex-col items-start"}>
                    {
                      ["Salão", ...label].map((gameName: string, index: number) => {
                        return (
                          <button key={index} className={"mb-2"} onClick={() => navigate(PageOrModalPathEnum.IndexPage)}>{gameName}</button>
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
                  <div className={"pl-4 flex flex-col items-start  mt-2"}>
                    <button className={"mb-2"} onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</button>
                    <button className={"mb-2"} onClick={()=>navigate(PageOrModalPathEnum.TermsOfService)}>Termos de Servico</button>
                    <button className={"mb-2"} onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</button>
                  </div>
                )}

              </section>
            </div>

            <section className={"mt-2 text-center text-[var(--text-tertiary)] leading-4"}>

              <div className={cx("", {

              })}>
                <span>{environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 </span>
                {!footerTextExpand ? " a..." : ""}
                {footerTextExpand && <span>anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.</span>}
              </div>

              {footerTextExpand && (
                <>
                  <div className={cx("", {

                  })}>
                    Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                  </div>

                  <div className={cx("", {

                  })}>
                    O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                  </div>

                  <div className={cx("", {

                  })}>
                    Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                  </div>
                </>
              )}


              <div className='flex justify-center text-[var(--state-info-main)] mt-1'>
                <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{!footerTextExpand ? 'Mostrar' : 'Colocar fora'}</button>
              </div>

              <div className='mt-4 mb-2 flex justify-center flex-nowrap relative left-[-6px] h-[20px]'>
                <img alt='footer1' className='flex-1' src={`assets/shared/footer1.png`}/>
                <img alt='footer2' className='flex-1' src={`assets/shared/footer2.png`} />
                <img alt='footer3' className='flex-1' src={`assets/shared/footer3.png`}  onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                <img alt='footer5' className='flex-1' src={`assets/shared/footer5.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                <img alt='footer6' className='flex-1' src={`assets/shared/footer6.png`}  onClick={()=>window.open('https://www.interac.ca/en/')}/>
                <img alt='footer4' className='flex-1' src={`assets/shared/footer4.png`}  onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
              </div>

              <div className='flex justify-center mb-2 '>
                <img alt='footer7' className='h-[12px] px-1.5' src={`assets/shared/footer7.png`}/>
              </div>

              <div className='mb-4 text-center text-xs'>@ 2023 {environment.platformName} All rights</div>
            </section>
          </div>
        </div>
      ): (!isMobile && isShowDesktopFooter) ? (
        <div className='bg-[var(--background-footer)] text-white flex justify-center pt-8'>
          {/*h-[400px]*/}
          <div className={"flex gap-3 w-11/12 mt-3"}>

              <section className={"flex flex-col gap-3 w-1/12 items-start"}>
                <div className='text-[var(--white) text-base'>Jogo</div>
                {
                  ["Salão", ...label].map((gameName: string, index: number) => {
                    return (
                      <button key={index} onClick={() => navigate(PageOrModalPathEnum.IndexPage)}>{gameName}</button>
                    )
                  })
                }
              </section>

              <section className={"flex flex-col gap-3 w-3/12 items-start"}>
                <div className='text-[var(--white) text-base'>Ajuda</div>
                <button onClick={()=>navigate(PageOrModalPathEnum.PrivacyAgreementPage)}>Politica de Privacidade</button>
                <button onClick={()=>navigate(PageOrModalPathEnum.TermsOfService)}>Termos de Servico</button>
                <button onClick={()=>navigate(PageOrModalPathEnum.VIPGradePage)}>Descrico do nivel VIP</button>
              </section>

              <section className={"w-8/12 mt-3"}>
                <div className={"flex gap-3 items-center mb-2"}>
                  <FooterLogo/>
                  <span className="text-lg">{environment.platformName}</span>
                </div>

                <div className={cx("flex-auto flex-nowrap leading-6 text-ellipsis overflow-hidden text-left", {
                  "max-h-24": !footerTextExpand
                })}>
                  {environment.platformName} é um excelente jogo de caça-níqueis online especialmente desenvolvido para os amantes de cassinos. Rege-se pelos princípios da concorrência leal e do controle legal local. Oferece aos jogadores com mais de 18 anos uma variedade de métodos de apostas diferentes e jogabilidade especial. Os jogadores só precisam escolher seu tipo de jogo de caça-níqueis preferido e, em seguida, fazer sua aposta, girar a máquina caça-níqueis para ter chances iguais de ganhar.
                  Entendemos as preferências dos jogadores brasileiros, o que é uma das razões do nosso sucesso no mercado brasileiro. Forneça os tipos de jogos de caça-níqueis mais populares e métodos de jogo característicos, cada tipo de jogo tem seus recursos e métodos de jogo exclusivos para atender às necessidades de diferentes jogadores. Portanto, também fornecemos métodos de pagamento convenientes e excelente suporte ao cliente e atualizamos regularmente o conteúdo do jogo para garantir que os jogadores desfrutem da melhor experiência de jogo nos {environment.platformName}.
                  O {environment.platformName} oferece aos jogadores a experiência de usuário da mais alta qualidade. O design da interface do jogo é meticuloso, permitindo que os jogadores sintam a alta qualidade e sofisticação do jogo. Com belos efeitos sonoros, ele pode não apenas aumentar a tensão e a emoção do jogo, mas também proporcionar aos jogadores uma experiência audiovisual chocante. O jogo roda sem problemas, sem gaguejar ou travar. Também fornecemos uma interface de usuário amigável e operações fáceis de entender, tornando mais fácil para os jogadores começarem.
                  Resumindo, você vem ao cassino do jogo {environment.platformName} para girar.
                </div>

                <div className='flex justify-center underline text-blue-500 mt-46'>
                  <button onClick={()=>setFooterTextExpand(!footerTextExpand)}>{!footerTextExpand ? 'Mostrar' : 'Colocar fora'}</button>
                </div>

                <div className='mt-3 flex justify-center mb-4'>
                  <img alt='footer1' className='h-10' src={`assets/shared/footer1.png`}/>
                  <img alt='footer2' className='h-10' src={`assets/shared/footer2.png`}/>
                  <img alt='footer3' className='h-10' src={`assets/shared/footer3.png`} onClick={()=>window.open('https://www.skrill.com/pt/')}/>
                  <img alt='footer5' className='h-10' src={`assets/shared/footer5.png`} onClick={()=>window.open('https://www.begambleaware.org/')}/>
                  <img alt='footer6' className='h-10' src={`assets/shared/footer6.png`} onClick={()=>window.open('https://www.interac.ca/en/')}/>
                  <img alt='footer4' className='h-10' src={`assets/shared/footer4.png`} onClick={()=>window.open('https://www.gamcare.org.uk/')}/>
                </div>

                <div className='flex justify-center mb-4'>
                  <img alt='footer7' className='h-5' src={`assets/shared/footer7.png`}/>
                </div>
                <div className='mb-4 text-center'>@ 2023 {environment.platformName} All rights</div>
              </section>
            </div>
          </div>
      ): null}
    </div>
  )
}
