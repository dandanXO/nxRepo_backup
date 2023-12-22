import useBreakpoint from "../../../../hooks/useBreakpoint";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { IUserInfo } from "../../../../../persistant/IUserInfo";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { useState } from "react";
import { environment } from "../../../../../../environments/environment";
import { tcx } from "../../../../utils/tcx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { SelectAvatarModal } from "./SelectAvatarModal";


const Title = ({ title, className }:{ title: string, className?: string}) => (
  <div className={tcx('text-white text-sm sm:text-base lg:text-xl', className)}>{title}</div>
)

const Content = ({ content }: { content: string | number }) => (
  <div className='mt-1 text-sm sm:text-base lg:text-xl text-[#808080] bg-[#4D4D4D] rounded-lg p-[10px]'>{content}</div>
)

interface ISettingPageProps {
  nickname: string;
  phone: string;
}

export const SettingPage = ({
  nickname,
  phone
}: ISettingPageProps) => {
  const userInfo: IUserInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
  const [selectedAvatar, setSelectedAvatar] = useState(Number(userInfo.avatar) || 1)
  const [nicknameInput, setNicknameInput ] = useState(nickname)
  const [errorMessage, setErrorMessage] = useState('')
  const [openSelectAvatarModal, setOpenSelectAvatarModal] = useState(false);

  const vip_level = useSelector((state: RootState) => state.app?.vip_level)

  const nickNameValidator = (nickname: string) => {
    if(nickname === '') {
      setErrorMessage('Insira um apelido');
      return;
    }
    if (/[^0-9a-zA-Z]/.test(nickname)) {
      setErrorMessage('Apenas inglês ou números são suportados');
      return;
    }
    if (nickname.length < 4 || nickname.length > 16) {
      setErrorMessage('nome de usuário (6-16 letras e números)')
      return;
    }

    setErrorMessage('')
  }

  return (
    <div className='flex justify-center'>
      { openSelectAvatarModal && <SelectAvatarModal close={()=>setOpenSelectAvatarModal(false)} selectedAvatar={selectedAvatar} />}
      <div className='w-full lg:w-[80%] px-4 sm:px-8 lg:px-0'>
        <BackNavigation />

        {/*頭像*/}
        <div
          className='w-full flex justify-center cursor-pointer'
          onClick={()=>setOpenSelectAvatarModal(true)}
        >
          <div className='relative border border-white rounded-lg'>
            <img className='rounded-lg w-20 h-20 lg:w-[120px] lg:h-[120px]' alt='avatar' src={`assets/${environment.assetPrefix}/avatar_${selectedAvatar}.png`} />
            <div className='text-center absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.8)] text-white rounded-b-lg sm:py-[2px] lg:py-1 font-bold text-xs lg:text-sm'>
              Editar
            </div>
          </div>
        </div>

        <Title className='mt-10' title='Apelido' />
        <input
          className={tcx('w-full mt-1 text-sm sm:text-base lg:text-xl text-[#808080] p-[10px] rounded-lg bg-[#333333] border border-[#808080] focus:border-white focus:outline-none', ['text-red-500 border-red-500 focus:border-red-500', errorMessage])}
          value={nicknameInput}
          onChange={(e)=>{
            nickNameValidator(e.target.value);
            setNicknameInput(e.target.value);
          }}
        />
        <div className='text-red-500 h-3 lg:h-5 text-xs'>{errorMessage}</div>

        <Title title='Número de telefone' />
        <Content content={phone} />

        <Title className='lg:mt-5 mt-3' title='ID' />
        <Content content={userInfo.user_id} />

        <Title className='lg:mt-5 mt-3' title='Nível' />
        <Content content={`VIP${vip_level}`} />

        <Title className='lg:mt-5 mt-3' title='Verifique actualizações' />
        <Content content='1.0.1' />

        <button
          className='w-full rounded-lg text-sm sm:text-base lg:text-xl lg:mt-10 mt-5 sm:mt-8 text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#8547eb] py-[10px] sm:py-3 lg:py-[14px]'
        >
          Salvar
        </button>

      </div>
    </div>
  )
}
