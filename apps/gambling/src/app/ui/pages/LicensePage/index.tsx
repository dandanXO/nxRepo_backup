import { useNavigate } from "react-router";

import { AppLocalStorage } from "../../../persistant/localstorage";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { environment } from "../../../../environments/environment";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import useBreakpoint from "../../hooks/useBreakpoint";

// const GoToTelegram = styled.div`
//   cursor: pointer;
//   background: linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%); 
//   border-radius: 8px;
//   /* width: 300px; */
//   /* height: 60px; */
//   padding: 14px 96px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 32px auto 64px;
// `

// const ListItem = (props: { count: string; text: string; }) => {
//   return (
//     <li className="mb-4 sm:mb-3 space-x-2 flex">
//       <div className="text-[var(--primary-assistant)] text-xl">{props.count}</div>
//       <div className="">{props.text}</div>
//     </li>
//   )
// }

export const LicensePage = () => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();

  const userInfoString = AppLocalStorage.getItem(AppLocalStorageKey.userInfo);
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;


  const { onClickToIndex } = usePageNavigate();

  // const TelegramContentContainer = renderByPlatform({
  //   "wild777bet": VIPBorderStyleContainer,
  //   "coco777bet": FragmentContainer,
  // }, VIPBorderStyleContainer);

  // const isCoco777bet = environment.assetPrefix === 'coco777bet';

  const dispatch = useDispatch();

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   dispatch(appSlice.actions.setShowTelegramModal(true))
    // }, 5000);

    // return () => {
    //   clearTimeout(timer);
    // }
  }, []);

  return (

    <div className={"px-4 sm:px-10 w-full"}>

      <BackNavigation
        onClick={() => onClickToIndex()}
        title={isMobile && <div className={"w-full text-center font-bold"}>Canal De Telegram</div>}
      />
      <section>
      <div className="flex flex-col justify-center items-center">
        <div><img alt='logo' className='' src={`assets/license/logo.png`}/></div>
        <div className="text-[var(--white)] text-2xl">Licença De Curaçao</div>
        <div className="text-[var(--white-40)] text-xl">{environment.platformName} – Cassino Responsável</div>
      </div>
      <div className="text-[var(--white-40)]">
        A Licença de Jogos de Curaçao é uma das licenças de jogos eletrônicos mais populares do mundo. Os principais fornecedores de software são licenciados pelo Conselho de Controle de Jogos de Curaçao. Uma licença abrange todos os jogos, como cassinos online, caça-níqueis, apostas esportivas e jogos eletrônicos. Atletismo, loterias e jogos de habilidade e azar. Esta agência de licenciamento é apoiada pelo governo de Curaçao e foi criada para garantir que todas as operadoras cumpram a estrutura regulatória e o código de conduta. A seguir está a descrição da licença da plataforma ({environment.platformName}). Por favor, não roube e infratores será processado.
      </div>
      <div className="flex justify-center items-center mt-6 mb-6">
        <img alt='license' src={`assets/license/licenseWord.png`}/>
      </div>
      
      </section>
    </div>
  )
}
