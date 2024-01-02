import { IUserLogoutSectionProps } from "../../index";
import { environment } from "../../../../../../environments/environment";


export const UserLogoutSection = ({
  onHandleLogout,
  onHandleCancel
}: IUserLogoutSectionProps) => (
  <div className='flex flex-col gap-8 text-white'>
    <img
      alt='close'
      className='cursor-pointer absolute top-2 right-2 sm:right-6 sm:top-5 w-12 sm:w-10' src={`assets/${environment.assetPrefix}/WXCircle.png`}
      onClick={onHandleCancel}
    />
    <div className='mt-[56px] sm:mt-[60px] text-sm sm:text-xl'>Tem certeza que deseja sair?</div>

    <div className='flex justify-between gap-3 sm:gap-4 text-sm sm:text-lg'>
        <button
          className='w-full py-[10px] sm:py-[6px] bg-[#999999] rounded-full shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={onHandleCancel}
        >
          Cancelar
        </button>
        <button
          className='w-full py-[10px] sm:py-[6px] bg-[#10B98F] rounded-full shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]'
          onClick={onHandleLogout}
        >
          Confieme
        </button>
    </div>
  </div>
)
