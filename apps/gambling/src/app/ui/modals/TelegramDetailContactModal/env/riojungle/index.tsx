import { BaseModal } from "../../../BaseModal";
import { ITelegramDetailContactModalProps } from "../../index";
import { environment } from "../../../../../../environments/environment";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";


export const TelegramDetailContactModal = ({
  onClickToOpenTelegramService,
  onClickToOpenTelegramManager,
  onClose
}: ITelegramDetailContactModalProps) => {
  const telegramService = AppLocalStorage.getItem(AppLocalStorageKey?.telegramService);
  const telegramManager = AppLocalStorage.getItem(AppLocalStorageKey?.telegramManager);

  return (
    <BaseModal onClose={onClose} >
      <div
        className='flex flex-col items-center relative text-sm md:text-base lg:text-xl bg-[var(--grayscale-20)] text-[var(--grayscale-100)] rounded-2xl px-4 pb-4 md:px-6 md:pb-8 w-[296px] md:w-[378px]'
        onClick={(event)=> event.stopPropagation()}
      >
        <img alt='close' className='absolute top-2 right-2 cursor-pointer w-12 ' src={`assets/${environment.uVersion}/WXCircle.png`} onClick={onClose}/>
        <img alt="icon" className="w-[56px] md:w-[72px] lg:w-[96px] mt-[56px] md:mt-[60px]" src={`assets/${environment.uVersion}/ic_telegram.png`} />
        <div className='mt-2 text-[var(--grayscale-70)] text-sm lg:text-lg'>Clique no botão para pular</div>

        <div className='mt-3 md:mt-4 font-bold'>Se precisar de ajuda, entre em contato com o <span className='text-[#33ABE0]'>atendimento ao cliente</span></div>

        <button
          className='mt-1 md:mt-2 w-full py-[10px] md:py-3 font-medium bg-[#33ABE0] rounded-lg flex justify-center items-center gap-[10px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={onClickToOpenTelegramService}
        >
          <img alt='telegram' className='w-5 md:w-6 lg:w-8' src={`assets/${environment.uVersion}/icon-telegram-mobile.png`}/>
          <div>{telegramService}</div>
        </button>

        <div className='mt-3 md:mt-4 font-bold'><span className='text-[#33ABE0]'>Para cooperação comercial</span>, entre em contato com o gerente</div>

        <button
          className='mt-1 md:mt-2 w-full py-[10px] md:py-3 font-medium bg-[#33ABE0] rounded-lg flex justify-center items-center gap-[10px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={onClickToOpenTelegramManager}
        >
          <img alt='telegram' className='w-5 md:w-6 lg:w-8' src={`assets/${environment.uVersion}/icon-telegram-mobile.png`}/>
          <div>{telegramManager}</div>
        </button>
      </div>
    </BaseModal>
  )
}
