import { environment } from "../../../../environments/environment";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../hooks/usePageNavigate";

export const LicensePage = () => {


  const { onClickToIndex } = usePageNavigate();

  return (

    <div className={"px-4 sm:px-20 w-full"}>

      <BackNavigation
        onClick={() => onClickToIndex()}
      />
      <section>
      <div className="flex flex-col justify-center items-center">
        <div><img alt='logo' className='' src={`assets/license/logo.png`}/></div>
        <div className="text-[var(--white)] text-2xl mt-1 xl:mt-3 md:mt-2 ">Licença De Curaçao</div>
        <div className="text-[var(--white-40)] text-xl mt-1 xl:mt-4 md:mt-2 ">{environment.platformName} – Cassino Responsável</div>
      </div>
      <div className="bg-[#333333] rounded-[12px] mt-3 mb-1 xl:mt-5 xl:mb-20 md:mt-3 md:mb-5 p-5">
        <div className="text-[var(--white-40)]">
          A Licença de Jogos de Curaçao é uma das licenças de jogos eletrônicos mais populares do mundo. Os principais fornecedores de software são licenciados pelo Conselho de Controle de Jogos de Curaçao. Uma licença abrange todos os jogos, como cassinos online, caça-níqueis, apostas esportivas e jogos eletrônicos. Atletismo, loterias e jogos de habilidade e azar. Esta agência de licenciamento é apoiada pelo governo de Curaçao e foi criada para garantir que todas as operadoras cumpram a estrutura regulatória e o código de conduta. A seguir está a descrição da licença da plataforma ({environment.platformName}). Por favor, não roube e infratores será processado.
        </div>
        <div className="flex justify-center items-center mt-3 xl:mt-5 md:mt-4">
          <img alt='license' src={`assets/license/licenseWord.png`}/>
        </div>
      </div>
      
      </section>
    </div>
  )
}