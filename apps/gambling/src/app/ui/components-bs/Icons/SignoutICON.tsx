import {environment} from "../../../../environments/environment";
import React from "react";
import cx from "classnames";

export const SignoutICON = () => {
  return (
    <button className={cx('p-2 hover:rounded-full hover:bg-[rgba(255,255,255,0.7)]')}>
      <img
        className={cx('h-[24px] w-[24px]')}
        src={`assets/${environment.uVersion}/ic_sign_out.png`}
      />
    </button>

  )
}
