import {useNavigate} from "react-router";
import {VIPBorderStyleContainer} from "../VIPGradePage";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import styled from "styled-components";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {environment} from "../../../../environments/environment";
import { ChargeButton } from "../../components/Buttons/ChargeButton";
import useBreakpoint from "../../hooks/useBreakpoint";
import {usePageNavigate} from "../../hooks/usePageNavigate";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";

const Bonus = styled.div`
  text-shadow: 0px 4px 0px #D60404;
`

const RechargeButton = styled.div`
  cursor: pointer;
  background: url("assets/${environment.assetPrefix}/btn_green.png") center center no-repeat;
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
  const {isMobile} = useBreakpoint();
  const {onClickToIndex} = usePageNavigate();

  return (
      <>
        <BackNavigation
          onClick={() => onClickToIndex()}
          title={<div className={"w-full text-center"}>Recarga benefícios</div>}
        />
        <div className={"px-0 sm:px-10 w-full"}>
          <section className={"sm:rounded-3xl text-white font-bold overflow-hidden relative mb-8 mt-4"}>
            {isMobile ? (
                <>
                  <img className="w-full" src={`assets/${environment.assetPrefix}/h5_banner_2.png`}/>
                  <div className={"mt-5 xl:mt-20 absolute left-[22px] top-[6px] text-white"}>
                      <div className={"text-2xl text-[#ffffff]"}>
                          Benefícios-ofertasde deposito
                      </div>
                      <div className={"text-5xl mt-2 text-[rgba(255,239,1)]"}>
                          Ate 10% bônus
                      </div>

                  </div>
                </>
            ) : (
                <>
                  <img className="w-full" src={`assets/${environment.assetPrefix}/banner3.png`}/>
                  <div className={"mt-5 xl:mt-20 absolute left-[28%] top-[20%] transform translate(-50%, -50%) text-white text-center"}>
                    <div className={"text-5xl text-[rgba(255,239,1)]"}>Benefícios-ofertasde deposito</div>
                    <div className={"text-5xl text-[rgba(255,239,1)]"}>Ate 10% bônus</div>
                  </div>
                </>
            )}
          </section>


        <section className={"text-white text-lg text-left ml-3"}>
          A partir de agora, a recarga pode obter recompensas extras em dinheiro. Quanto mais você recarregar, maior será a taxa de recompensa, até 10%.Após a recarga, o dinheiro extra também será transferido diretamente para a sua conta.
        </section>


        <section className={"flex justify-center items-center"}>
          <ChargeButton onClick={() => {
            navigate(PageOrModalPathEnum.WalletPage);
          }} className={"text-white text-lg"}>Recarrague agora</ChargeButton>
        </section>


        <div className={"p-4 rounded-lg flex flex-col text-left text-white items-start text-lg border border-solid border-green-500 mb-8 mr-4 ml-4"} style={{ backgroundColor: 'var(--game-block)', opacity:0.6 }}>
          <div className={"text-left w-full"}>Nota especial:
          </div>

          <div className={"text-left w-full"}>Certifique-se de que o seu número de conta, número de telemóvel e CPF são únicos. Se o mesmo usuário registrar várias contas para obter bônus, consideraremos isso trapaceando e as contas relevantes serão congeladas permanentemente.Não faremos qualquer compensação pelas perdas causadas por trapaça.</div>

        </div>


      </div>


    </>
  )
}
