import { IVIPGradePageProps } from "../../../index";
import VIPStatue from '../images/vip_statue.png'
import { VerticalVIPButtonList } from "../components/VerticalVIPButtonList";
import { formatLocaleMoney } from "../../../../../utils/format";
import { ProgressBar } from "../../../../../components-bs/ProgressBar";
import { VIP0Text } from "../components/VIP0Text";
import { VIPInfoTab } from "../components/VIPInfoTab";
import { useRioVIPGradePage } from "../hooks/useRioVIPGradePage";
import { useScrollSelectFixCenter } from "../../../../../hooks/useScrollSelectFixCenter";
import { PageContainer } from "../../../../../components-bs/PageContainer";



export const TabletVIPGradePage = ({
  currentLevel,
  allLevelInfo,
  allSignInConfig,
  userVIPInfo,
  signInTotalDays
}: IVIPGradePageProps) => {
  const { selectedVIP, setSelectedVIP} = useRioVIPGradePage(currentLevel, userVIPInfo?.data.vip_score)
  const { scrollWrapperRef } = useScrollSelectFixCenter(selectedVIP, true);

  if(allLevelInfo.length === 0) return <div></div>

  return (
    <PageContainer>
      <img src={VIPStatue} alt="statue" className='mt-8' />

      {/*VIP 進度卡*/}
      <div className='w-full h-[240px] flex rounded-2xl bg-[var(--grayscale-20)] mt-5'>

        {/*VIP選單*/}
        <div className='w-[25%] py-5 border-r border-r-[var(--grayscale-40)] flex flex-col items-center'>
          <div
            className='h-[200px] w-[69%] overflow-y-scroll vip-tab-items flex flex-col gap-4 items-center relative'
            ref={scrollWrapperRef}
          >
            <VerticalVIPButtonList
              selectedVIP={selectedVIP}
              currentVIP={currentLevel}
              onSelect={(vip)=> setSelectedVIP(vip)}
            />
          </div>
        </div>

        {/*VIP 進度卡右側*/}
        <div className='w-[75%] py-11 pl-4 pr-5'>

          {/*VIP進度條*/}
          {
            selectedVIP !== 0 && (
              <div className='w-full h-full flex flex-col justify-center'>
                <div className='w-full flex justify-between text-sm font-medium text-[#808080]'>
                  <div>Valor total da recarga</div>
                  <div>
                    <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.vip_score || 0) / 100)}</span>
                    /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].rechargeAmountLimit / 100)}
                  </div>
                </div>
                <ProgressBar
                  className='h-11 py-[10px] px-5 mt-1 text-white text-base'
                  progress={
                    ((userVIPInfo?.data?.vip_score || 0) / 100) / (allLevelInfo[selectedVIP].rechargeAmountLimit / 100 || 1)
                  }
                />
                <div className='w-full flex justify-between text-sm font-medium text-[#808080] mt-5'>
                  <div>Número total de apostas</div>
                  <div>
                    <span className='text-white'>R$ {formatLocaleMoney((userVIPInfo?.data?.flow || 0) / 100)}</span>
                    /R$ {formatLocaleMoney(allLevelInfo[selectedVIP].flowLimit / 100)}
                  </div>
                </div>
                <ProgressBar
                  className='h-11 py-[10px] px-5 mt-1 text-white text-base'
                  progress={
                    ((userVIPInfo?.data?.flow || 0) / 100) / (allLevelInfo[selectedVIP].flowLimit / 100 || 1)
                  }
                />
              </div>
            )
          }

          {/*VIP 0提示文字*/}
          {
            selectedVIP === 0 && <VIP0Text className='text-base' />
          }

        </div>
      </div>

      {/*VIP INFO TAB*/}
      <VIPInfoTab className='mt-5' signInTotalDays={signInTotalDays} allLevelInfo={allLevelInfo} allSignInConfig={allSignInConfig} />
    </PageContainer>
  )
}
