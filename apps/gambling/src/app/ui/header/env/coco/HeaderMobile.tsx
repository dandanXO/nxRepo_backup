import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import cx from "classnames";

import useBreakpoint from "../../../hooks/useBreakpoint";
import {RootState} from "../../../../reduxStore";
import {environment} from "../../../../../environments/environment";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {RegisterButton, RegisterButton2} from "../../../components/Buttons/RegisterButton";
import {MessageOutlined} from "@ant-design/icons";
import { MessageCountBadge } from "../../../components/MessageCountBadge";

export type IHeaderMobile = {
  clickToOpenMenuDrawer: () => void;
  clickToOpenUserLoginStatusModal: () => void;
  className?: string;
}

export const HeaderMobile = (props: IHeaderMobile) => {
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
            {/*<RegisterButton className={"text-[#ffffff] font-bold"} onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>*/}
            <RegisterButton2 onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton2>
          </section>
        )}

        <div className='flex gap-4'>
          {isLogin && (
            <UserMoneyStatusSection />
          )}

          {isLogin && (
            <div
              className='flex items-center'
              onClick={()=>navigate(PageOrModalPathEnum.NotificationPage)}
            >
              <img
                className='w-6 h-7'
                alt='notification'
                src={`assets/${environment.assetPrefix}/ic_notification.png`}
              />
              {messageCount !== 0 && <MessageCountBadge>{messageCount}</MessageCountBadge>}
            </div>
          )}
        </div>
      </div>

    </header>
  )
}
