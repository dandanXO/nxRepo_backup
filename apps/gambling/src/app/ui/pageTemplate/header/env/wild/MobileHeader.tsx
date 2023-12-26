import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import cx from "classnames";

import useBreakpoint from "../../../../hooks/useBreakpoint";
import {RootState} from "../../../../../reduxStore";
import {environment} from "../../../../../../environments/environment";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {RegisterButton} from "../../../../components-bs/theme/Buttons/RegisterButton";
import { MessageCountBadge } from "../../../../components/MessageCountBadge";

export type IHeaderMobile = {
  clickToOpenMenuDrawer: () => void;
  clickToOpenUserLoginStatusModal: () => void;
  className?: string;
}

export const MobileHeader = (props: IHeaderMobile) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();

  const { isLogin, messageCount } = useSelector((state: RootState) => state.app);

  return (
    <header
      className={cx(
        "w-full h-[52.5px] px-4 z-20",
        "flex flex-row items-center justify-between",
        // "bg-varient",
        "bg-[#020E29]",
        // border-bottom: 1px solid rgba(11,28,64,.77);
        {
          "fixed top-0": isMobile
        },
        // "border-b-[1px] border-[var(--varient)]",
        "border-b-[1px] border-[#0b1c40c4]",
        props.className,
      )}
    >
      <div className={"flex flex-row justify-between items-center w-full"}>
        <button className={"mr-4"}>
          <img
            alt={"menu"}
            // className={"w-[22.5px] h-[22.5px]"}
            className={"w-[23px] h-[18px]"}
            src={`assets/${environment.assetPrefix}/ic_menu.png`}
            onClick={() => {
              props.clickToOpenMenuDrawer();
            }}
          />
        </button>

        {!isLogin && (
          <section>
            <RegisterButton onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>
          </section>
        )}

        <div className='flex gap-4'>
          {isLogin && (
            <UserMoneyStatusSection className={"rounded-[5px] !bg-[#1A3084] shadow-[0_1px_#1f6dc8]"}/>
          )}

          {isLogin && (
            <div
              onClick={()=>navigate(PageOrModalPathEnum.NotificationPage)}
              className={"relative h-8 rounded-[5px] !bg-[#1A3084] py-[5px] px-2 text-white text-bold shadow-[0_1px_#1f6dc8]"}
            >
              <img
                className='w-4 h-5 mx-auto my-auto'
                alt='notification'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAApCAYAAABUdSs8AAAAAXNSR0IArs4c6QAAA+FJREFUWEftmGvIn3MYxz+XszkOyVlOK5O8ISTl+AZJObRQyqnZSonaHN86NkopxQvUvNOQkUPSGtqoRcvIG0NIZuYwjF36/PvdT/f+7nt+dz3/Z2/86u55/ne/+7q+1/kQDDiZGcAJwNXAhcBsIIHfgFeB54DPI8J3VUeC1SczZXgJcD1wGjCrfPwnsAp4ClgWEZtqiVYDyMydgbOARcA5wJ5A870SbwbeBB4EVkfElhoQQwDsD9wILAYO7CH+BfAE8GxEfDstAIrddwdOBm4FrgD26CH+M/AK8CiwJiI0zXbPdjWQmbsBxwKnAucW1R8NaI6u8xfwJfBGMccHwPqI+LsPRS+AzNynML4MOA84pki+U8v2XXRlpj+sK5FhdHwUEb92Xe4EkJmqWIlvLlLvC8h4yBHI98AK4ElgZUT8Pk7gXwAyc1fgTGA+cBGw3xCuHXc3AssLiHcjQjNNnS4AxwG3A1cBB/yHumuwGaIbgGeKc37dTlTbAMjMvYFLgfuAOdPAvAG4FdAhHwJea/vDFIASbjK9BbgGOKhGvAF3vgOWqoWIMFJGpw3A0Dq7SK8P9MX6AJ7bXDUzvmMii4gPuwDsUtRvKtUPqrNkJSJ9YS1whzmiyQ1tDej9Op4ADq8kOvTaZ8BdwMtNlmwDMOvNAx4ADh1KufK+AO4FXmpywo4AcE8B8Me4EzYauB84rFKiodfUwN3FBP8D2KEa0AlHvcJ4GNpsmC6PGGrcyvuflI5qeVOUugA8PME8IIA77Zq6AFh2byheahWcxLEGKODSiPhhygSl4zX/3wZcDNgDTuL8Ulq1R4D3ImLryASZqfQLgQUlB0x3HWiEsR5YFdXC0xHxU5QyfEqpgkpvQprkMfxeBJaM5ofMtMe/rrRgx0+gCo4LoxbWA487SQnAHsBhw853unuAPk2aA+wTHxOA1emmEvuTsn2XFpyiXhDA28DpZdabpO3HadsdrxWAHatz30xJ3waySQDG5l4zKXqL12YBvA8YhjPlgA1/w3GdAEw+lwMnlaGzb7vhqGVn2ztoFso2tz59M6TvpbFm1Jhkpv3fiYA5wIHUIaILhO+d7Xz8v+tI3MWFqbxrltTPfDS73dGnTSp2JrAr9sNx5v6WmIPKXOBIQPW1B03puK7x7zfAx4DFxm/Hndvffr/F1rza8zPzKOBa4ErAEc7FlJqQhgIouXl+GfB8RHxV49hDABgpbsZcULkrcmSXsVIKxHB2R+QQ6ijeuQ8YB1UNoFTNg4EzygQliEMKc/dBjl1K74Lqxxrpp/qB2sulctqynw9cALiu0aNNq68Db7mUGLIn/Afe/kUEPONOrAAAAABJRU5ErkJggg=='
              />
              {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
            </div>
          )}
        </div>
      </div>

    </header>
  )
}
