import useBreakpoint from "../../../../hooks/useBreakpoint";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";

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
      </div>
    </div>
  )
}
