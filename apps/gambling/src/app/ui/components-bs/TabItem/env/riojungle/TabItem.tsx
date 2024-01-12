import cx from 'classnames';
import {twMerge} from "tailwind-merge";
import { useState } from 'react'

type ITabItem = {
  imgUrl?: string
  active: boolean;
  icon?: string;
  name: string;
  onClick: () => void;
  className?: string;
}
export const TabItem = (props: ITabItem) => {
  return (
    <div
      onClick={props.onClick}
      className={cx(`rounded-[100px]`,
        "flex flex-row justify-center items-center",
        "text-xs lg:text-sm",
        "font-normal",
        "whitespace-nowrap",
        "flex-1",
        "cursor-pointer",
        {
          'py-2.5 px-4': props?.icon !== undefined,
          'py-3 px-4 md:px-8 lg:py-2.5 lg:px-9': props?.icon === undefined,
          'text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--primary-main)]': props.active,
          'bg-[#333] text-[rgba(255,255,255,1)]': !props.active
        },
        props.className
      )}
    >
      {props?.icon && <img className="w-[16px] lg:w-[20px] mr-2" src={props?.icon} alt="tab-icon" />}
      <div>{props.name}</div>
    </div>
  )
}

export const SubTabItem = (props: ITabItem) => {
  const [imgError, setImgError] = useState(false);

  const handleImageOnError = () => {
    setImgError(true);
  };
  return (
    <div
      onClick={props.onClick}
      className={cx(`rounded-[8px] text-base w-[72px] h-[40px] lg:w-[88px] `,
        "flex flex-row justify-center items-center",
        "text-xs lg:text-sm",
        "font-normal",
        "whitespace-nowrap",
        "flex-1",
        {
          'text-white border-[var(--primary-main)] border-solid border-2' : props.active,
          'bg-[#333] text-[rgba(255,255,255,1)] border-2 border-[#333]': !props.active
        },
        props.className
      )}
    > 
    {
    props.name === "All" ? props.name :
      props.imgUrl && (!imgError)?
        <img className='w-[64px] h-[32px] ' src={props.imgUrl} alt='img' onError={handleImageOnError}  />
        :
        props.name
      }
      
    </div>
  )
}
