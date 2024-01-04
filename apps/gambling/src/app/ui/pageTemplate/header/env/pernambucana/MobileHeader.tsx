import React from "react";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import cx from "classnames";

import useBreakpoint from "../../../hooks/useBreakpoint";
import {RootState} from "../../../../../reduxStore";
import {environment} from "../../../../../../environments/environment";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {UserMoneyStatusSection} from "../../UserMoneyStatusSection";
import {SearchButton} from "./components/SearchButton";
import {RegisterButton} from "../../../../components-bs/Buttons/env/pernambucana/RegisterButton";
import {MenuIcon} from "../../../../components-bs/Icons/MenuIcon";
import {IMobileHeader} from "../../types/IMobileHeader";


export const MobileHeader = (props: IMobileHeader) => {
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
        <div className={"mr-4"} onClick={() => {
          props.clickToOpenMenuDrawer();
        }}>
          <MenuIcon/>
        </div>

        <div className={"w-[40px]"} onClick={() => {
          navigate(PageOrModalPathEnum.IndexPage)
        }}>
          <a>
            <img
              alt={"logo"}
              className={""}
              src={`assets/${environment.assetPrefix}/logo_h5.png`}

            />
          </a>
        </div>
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
