import {useNavigate} from "react-router";
import {VIPBorderStyleContainer} from "../VIPGradePage";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import styled from "styled-components";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";

const Bonus = styled.div`
  text-shadow: 0px 4px 0px #D60404;
`

const RechargeButton = styled.div`
  cursor: pointer;
  background: url("assets/001/btn_green.png") center center no-repeat;
  background-size: cover; /* 背景圖片尺寸適應容器 */
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 300px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px auto 40px;
  color: #247855;
`
export const RechargeActivityPage = () => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();

  return (
    <>

      <div className={"px-0 sm:px-10 px-10 w-full"}>

        {/*<section className={"rounded-3xl text-white font-bold overflow-hidden relative mb-8"}>*/}
        {/*  <img className="w-full" src={"assets/001/banner_10.png"}/>*/}
        {/*  /!*<div className={"mt-20 absolute left-[40px] top-0 text-white"}>*!/*/}
        {/*  /!*  <div className={"text-4xl mb-4"}>Benefícios-ofertasde deposito</div>*!/*/}
        {/*  /!*  <Bonus className={"text-6xl"}>Ate 10% bônus</Bonus>*!/*/}
        {/*  /!*</div>*!/*/}
        {/*  <div className={"mt-5 md:mt-20 absolute left-[40px] top-0 text-white"}>*/}
        {/*    <div className={"md:text-4xl mb-4 text-xl"}>Benefícios-ofertasde deposito</div>*/}
        {/*    <Bonus className={"md:text-6xl ext-2xl"}>Ate 10% bônus</Bonus>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8 mt-4"}>
          <img className="w-full" src={"assets/001/banner.png"}/>
          <div className={"mt-5 xl:mt-20 absolute left-[40px] top-0 text-white"}>
            <div className={"md:text-4xl mb-4 text-xl"}>Benefícios-ofertasde deposito</div>
            <Bonus className={"md:text-4xl"}>Ate 10% bônus</Bonus>
          </div>
        </section>



        <section className={"text-white text-lg text-left mb-8 ml-3"}>
          A partir de agora, a recarga pode obter recompensas extras em dinheiro. Quanto mais você recarregar, maior será a taxa de recompensa, até 10%.Após a recarga, o dinheiro extra também será transferido diretamente para a sua conta.
        </section>

        <VIPBorderStyleContainer className={"flex flex-col text-left text-white items-start text-lg"}>
          <div className={"text-left w-full"}>Nota especial:
          </div>

          <div className={"text-left w-full"}>Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos. Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente.Não faremos qualquer compensação pelas perdas causadas por trapaça.</div>

        </VIPBorderStyleContainer>

        <section className={"flex justify-center items-center"}>
          <RechargeButton onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage);
          }} className={"text-white text-lg"}>Recarrague agora</RechargeButton>
        </section>


      </div>


    </>
  )
}
