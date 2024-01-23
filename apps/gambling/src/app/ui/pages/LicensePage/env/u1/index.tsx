import { PageContainer } from "../../../../components-bs/PageContainer";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { twMerge } from "tailwind-merge";
import { environment } from "../../../../../../environments/environment";
import { WatermarkPhoto } from "../../../../components/WatermarkPhoto";

export const LicensePage = () => {

  const { isDesktop } = useBreakpoint();

  const { onClickToIndex } = usePageNavigate();
  return (
    <PageContainer>
      <BackNavigation
        title={!isDesktop ? (<div className='absolute left-0 w-full text-center font-bold text-lg md:text-3xl'>Gaming Curaçao</div>): undefined}
        onClick={onClickToIndex}
      />

      <div className={twMerge('flex gap-12 justify-center items-center mt-4 md:mt-6 lg:mt-8', !isDesktop && 'flex-col gap-2 md:gap-4')}>
        <img alt='logo' className='w-[200px]' src={`assets/license/logo.png`}/>
        <div className='text-white font-bold flex-col flex items-center gap-2 md:gap-4'>
          <div className='text-2xl md:text-[48px]'>Licença De Curaçao</div>
          <div className='text-base md:text-3xl'>{environment.platformName} – Cassino Responsável</div>
        </div>
      </div>
      <div className='bg-[var(--primary-assistant-20)] w-full rounded-2xl mt-4 md:mt-6 lg:mt-8 py-4 px-2 md:py-6 md:px-4 lg:p-8'>
        <div className='text-[var(--white)] font-medium text-sm md:text-lg'> A Licença de Jogos de Curaçao é uma das licenças de jogos eletrônicos mais populares do mundo. Os principais fornecedores de software são licenciados pelo Conselho de Controle de Jogos de Curaçao. Uma licença abrange todos os jogos, como cassinos online, caça-níqueis, apostas esportivas e jogos eletrônicos. Atletismo, loterias e jogos de habilidade e azar. Esta agência de licenciamento é apoiada pelo governo de Curaçao e foi criada para garantir que todas as operadoras cumpram a estrutura regulatória e o código de conduta. A seguir está a descrição da licença da plataforma ({environment.platformName}). Por favor, não roube e infratores será processado.</div>

        <div className='flex justify-center mt-6 md:mt-8 lg:mt-10'>
          <WatermarkPhoto className='w-full md:w-[346px]' src='assets/license/license.jpeg' content={`${environment.platformGroup} (CC)`} row={20} />
        </div>
      </div>
    </PageContainer>
  )
}

