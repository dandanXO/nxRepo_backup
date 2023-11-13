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
import {SearchButton} from "./SearchButton";


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
        "bg-[var(--varient)]",
        {
          "fixed top-0": isMobile
        },
        props.className,
      )}
    >
      <div className={"flex flex-row items-center"}>
        <button className={"mr-4"}>
          <img
            alt={"menu"}
            className={"w-[22.5px] h-[22.5px]"}
            src={`assets/${environment.assetPrefix}/ic_menu.png`}
            onClick={() => {
              props.clickToOpenMenuDrawer();
            }}
          />
        </button>

        <button className={"w-[40px]"}>
          <a>
            <img
              alt={"logo"}
              className={""}
              src={`assets/${environment.assetPrefix}/logo_h5.png`}
              onClick={() => {
                navigate(PageOrModalPathEnum.IndexPage)
              }}
            />
          </a>
        </button>
      </div>

      {!login ? (
        <section>
          <RegisterButton className={"text-[#ffffff] font-bold"} onClick={() => props.clickToOpenUserLoginStatusModal()}>Registar Conta</RegisterButton>
        </section>
      ): (
        <>
          <UserMoneyStatusSection className={"rounded-[25px]"}/>
          <SearchButton/>
        </>
      )}

    </header>
  )
}
