import useBreakpoint from "../../../../hooks/useBreakpoint";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { Avatar } from "../../../../components/Avatar";

interface ISettingPageProps {
  nickname: string;
  phone: string;
}

export const SettingPage = ({
  nickname,
  phone
}: ISettingPageProps) => {

  const { isMobile } = useBreakpoint();

  return (
    <div className='flex justify-center'>
      <div className='w-full lg:w-[80%] px-4 sm:px-8 lg:px-0'>
        <BackNavigation />

        {/*頭像*/}
        <div className='w-full flex justify-center'>
          <div className='relative border border-white rounded-lg'>
            <Avatar className='rounded-lg w-20 h-20 lg:w-[120px] lg:h-[120px]' />
            <div className='text-center absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] text-white rounded-b-lg sm:py-[2px] lg:py-1 font-bold text-xs lg:text-sm'>
              Editar
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
