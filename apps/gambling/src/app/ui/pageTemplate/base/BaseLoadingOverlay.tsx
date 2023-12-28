import {LoadingLogo} from "../../components-bs/theme/Logos/LoadingLogo";
import {LoadingBar} from "../../components/LoadingBar";
import React from "react";
import {twMerge} from "tailwind-merge";

type IBaseLoadingOverlay = {
  className?: string;
}

export const BaseLoadingOverlay = (props: IBaseLoadingOverlay) => {
  return (
    <div className={twMerge("bg-[var(--unknown)] flex flex-col justify-center items-center", props.className)}>
      <div className={"mb-4"}>
        <LoadingLogo/>
      </div>
      {/*<ThreeDots height={25} className={'inline-block'} />*/}
      <LoadingBar/>
    </div>
  )
}
