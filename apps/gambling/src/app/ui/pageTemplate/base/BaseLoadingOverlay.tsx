import {LoadingLogo} from "../../components-bs/theme/Logos/LoadingLogo";
import {LoadingBar} from "../../components/LoadingBar";
import React from "react";

export const BaseLoadingOverlay = () => {
  return (
    <div className={"z-[9999] fixed top-0 left-0 right-0 bottom-0 bg-[var(--unknown)] flex flex-col justify-center items-center"}>
      <div className={"mb-4"}>
        <LoadingLogo/>
      </div>
      {/*<ThreeDots height={25} className={'inline-block'} />*/}
      <LoadingBar/>
    </div>
  )
}
