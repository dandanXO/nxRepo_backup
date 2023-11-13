import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import cx from "classnames";

import useBreakpoint from "../../../hooks/useBreakpoint";
import {RootState} from "../../../../reduxStore";
import {environment} from "../../../../../environments/environment";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {RegisterButton} from "../../../components/RegisterButton";

export type IHeaderMobile = {
  clickToOpenMenuDrawer: () => void;
  clickToOpenUserLoginStatusModal: () => void;
  className?: string;
}

export const HeaderMobile = (props: IHeaderMobile) => {
  const {isMobile} = useBreakpoint();
  const navigate = useNavigate();

  const login = useSelector((state: RootState) => state.app.isLogin);

  return (
    <header
      className={cx(
        "w-full h-[52.5px] px-4 z-10",
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
      <div className={"flex flex-row items-center"}>
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

        {/*<button className={"w-[40px]"}>*/}
        {/*  <a>*/}
        {/*    <img*/}
        {/*      alt={"logo"}*/}
        {/*      className={""}*/}
        {/*      src={`assets/${environment.assetPrefix}/logo_h5.png`}*/}
        {/*      onClick={() => {*/}
        {/*        navigate(PageOrModalPathEnum.IndexPage)*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </a>*/}
        {/*</button>*/}

      </div>

      {!login ? (
        <section>
          <RegisterButton className={"text-[#ffffff] font-bold"} onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>
        </section>
      ): (
        <>
          <UserMoneyStatusSection className={"rounded-[5px] !bg-[#1A3084] shadow-[0_1px_#1f6dc8]"}/>
        </>
      )}

    </header>
  )
}
