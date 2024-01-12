import { ChargeButton } from "../../../../components-bs/Buttons/env/u1/ChargeButton"
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint"
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate"

import { BenefitSection } from "../components/BenefitSection"
import { NoticeSection } from "../components/NoticeSection"
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { Banner } from "../../../../components/Banner";
import { environment } from "../../../../../../environments/environment";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";

export const InitialChargeContent = () => {
  const { isMobile } = useBreakpoint();
  const { onClickToIndex, onClickToWallet } = usePageNavigate();

  const recharge_first_cashback_rate = useSelector((rootState: RootState) => rootState.app.config.recharge_first_cashback_rate);

  const RechargeButton = () => {
    return (
      <section className={"flex justify-center items-center "}>
        <ChargeButton onClick={()=>onClickToWallet({'panelType':'deposit'})} className={"leading-none text-white text-xl md:text-lg mt-3 mb-4 md:my-8"}>Recarrague agora</ChargeButton>
      </section>
    )
  }

  return (
    <div className='px-4 md:px-10'>
      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full font-bold text-center"}>Primeira recarga</div>}
      />

      <Banner
        imgClassName={`rounded-lg mb-4 md:mb-8 mt-6 md:mt-0`}
        src={`assets/${environment.uVersion}/${environment.mvVersion}/banner_20.png`}
        bannerText={
          <div className={"absolute left-[5%] top-1/2 transform -translate-y-1/2"}>
            <div className={"text-white text-sm md:text-xl lg:text-4xl mb-2 md:mb-4 lg:mb-9"}>Primeiro depósito</div>
            <div className={"text-white text-xl md:text-3xl lg:text-8xl"}>+ bônus de {recharge_first_cashback_rate}</div>
          </div>
        }
      />

      <section className={""}>
        <div className=" md:px-8 text-white my-4 md:my-8">
          <div className="text-2xl font-bold mb-6 md:mb-4">Primeira recarga</div>
          <BenefitSection className="mb-3 md:mb-1 text-base md:text-2xl leading-6 md:leading-8" />
        </div>
        {isMobile && <RechargeButton />}
        <div className={`
         py-3 px-4 md:py-6 md:px-8
         text-sm md:text-xl
         rounded-lg flex flex-col text-left text-white bg-[var(--white-20)]`}
        >
          <NoticeSection titleClassName='mb-1 leading-5 md:leading-7' textClassName={'mb-2 md:mb-1 leading-5 md:leading-7'} />
          <div className={"text-[var(--text-popup)] text-left leading-5 md:leading-7 -mt-1 md:mt-0"}>
            Lembrete caloroso, certifique-se de que seu nome, número de telefone celular e número de conta CPF são únicos. Se o mesmo usuário registrar várias contas para receber bônus em dinheiro, consideraremos isso uma trapaça. Se isso acontecer, a conta relevante será permanentemente congelada. Nós não compensará as perdas causadas por trapaça!
          </div>
        </div>

        {!isMobile && <RechargeButton />}
      </section>
    </div>

  )
}
