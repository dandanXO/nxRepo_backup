import { environment } from "../../../../../../environments/environment";
import React, { useState } from "react";
import { tcx } from "../../../../utils/tcx";


interface ISelectAvatarModalProps {
  close : () => void
  selectedAvatar: number
  onConfirm: (value: number) => void
}

export const SelectAvatarModal = ({
  close,
  selectedAvatar,
  onConfirm
}: ISelectAvatarModalProps) => {
  const [selected, setSelected] = useState(selectedAvatar)


  return (
    <div className='fixed left-0 top-0 right-0 bottom-0 z-[1002] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]'>
      <div className='relative px-4 sm:px-6 pb-4 sm:pb-8 pt-[56px] sm:pt-[60px] bg-[var(--grayscale-20)] rounded-2xl w-[78%] sm:w-[320px] lg:w-[428px] h-fit'>
        <img
          alt='close'
          className='cursor-pointer w-12 h-12 absolute right-2 top-2' src={`assets/${environment.uVersion}/XCircle.png`}
          onClick={close}
        />

        <div className='w-full text-center text-white font-medium text-sm sm:text-base lg:text-xl'>Alterar apelido favrito</div>

        <div className='mt-5 sm:mt-9 lg:mt-10 grid grid-cols-4 gap-3 sm:gap-4 lg:gap-5'>
          {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((item) => (
              <div key={item} className='relative' onClick={()=>setSelected(item)}>
                <img
                  className='w-full rounded-lg bg-transparent'
                  alt={`avatar${item}`} src={`assets/${environment.uVersion}/avatar_${item}.png`}
                />
                {selected === item &&
                  <div className='absolute top-0 left-0 h-full w-full rounded-lg border-4 border-[#19b28a] z-10 shadow-[0_0_20px_rgba(25,178,138,0.9)]' />
                }
              </div>
            ))
          }
        </div>

        <div className='w-full text-white flex justify-between gap-3 sm:gap-4 mt-5 sm:mt-9 lg:mt-10 text-sm lg:text-lg'>
          <button
            className='rounded-full w-full py-[10px] lg:py-[6px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#999999]'
            onClick={close}
          >
            Cancelar
          </button>
          <button
            className='rounded-full w-full py-[10px] lg:py-[6px] shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--secondary-main)]'
            onClick={()=>{
              close();
              onConfirm(selected);
            }}
          >
            Confirme
          </button>
        </div>

      </div>
    </div>
  )
}
