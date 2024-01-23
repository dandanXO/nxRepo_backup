import { PageContainer } from "../../../../components-bs/PageContainer";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { twMerge } from "tailwind-merge";
import { environment } from "../../../../../../environments/environment";

export const LicensePage = () => {

  const { isDesktop } = useBreakpoint();

  const { onClickToIndex } = usePageNavigate();
  return (
    <PageContainer>
      <BackNavigation
        title={!isDesktop ? (<div className='absolute left-0 w-full text-center font-bold text-lg md:text-3xl'>Gaming Curaçao</div>): undefined}
        onClick={onClickToIndex}
      />

      <div className={twMerge('flex gap-12 justify-center items-center', !isDesktop && 'flex-col gap-2 md:gap-4')}>
        <img alt='logo' className='h-12 md:h-20' src={`assets/license/logo.png`}/>
        <div className='text-white font-bold flex-col flex items-center'>
          <div>Licença De Curaçao</div>
          <div>{environment.platformName} – Cassino Responsável</div>
        </div>
      </div>
    </PageContainer>
  )
}

