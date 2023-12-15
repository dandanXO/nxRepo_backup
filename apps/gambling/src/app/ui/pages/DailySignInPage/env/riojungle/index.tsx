import { environment } from "../../../../../../environments/environment";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { tcx } from "../../../../utils/tcx";

import ArrowRight from './images/ArrowRight.png';


const DailySignInPage = () => {

  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className={tcx('px-4 sm:px-8', ['px-0 flex justify-center', isDesktop])}>
      <div className={tcx('w-full', ['w-[72%]', isDesktop])}>

        {/*Banner*/}
        <div className='relative text-white font-bold'>
          <img alt='banner' src={`assets/${environment.assetPrefix}/${environment.assetVersionPrefix}/daily_sign_in_banner.png`}/>
          <div className={tcx('absolute left-[5%] top-1/2 transform -translate-y-1/2 text-[3vw] leading-[3vw]', ['text-xl leading-none', isMobile])}>
            {
              isDesktop && (
                <>
                  <div>Colete recompensas todos</div>
                  <div>os dias</div>
                </>
              )
            }
            {
              isTablet && (
                <>
                  <div>Colete</div>
                  <div>recompensas</div>
                  <div>todos os dias</div>
                </>
              )
            }
            {
              isMobile && (
                <>
                  <div>Colete</div>
                  <div>recompensas todos</div>
                  <div>os dias</div>
                </>
              )
            }
          </div>
        </div>

        {/*簽到紀錄按鈕*/}
        <div className='flex justify-end mt-3 sm:mt-5 text-sm lg:text-lg text-white'>
          <button className='flex gap-2 items-center justify-center py-[10px] px-5 rounded-full shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f]'>
            <div>Registros</div>
            <img alt='Registros' className='w-5 h-5 lg:w-6 lg:h-6' src={ArrowRight}/>
          </button>
        </div>

      </div>
    </div>
  )
}

export default DailySignInPage
