import React from "react";
import {renderByUVersion} from "../../utils/renderByUVersion";
import {UserMoneyStatusSection as CUserMoneyStatusSection} from "./env/u1/UserMoneyStatusSection";
import {UserMoneyStatusSection as RUserMoneyStatusSection} from "./env/u2/UserMoneyStatusSection";

type IProps = {
  className?: string;
}
export const UserMoneyStatusSection = (props: IProps) => {
  return renderByUVersion({
    "u1": (
      <CUserMoneyStatusSection/>
    ),
    "u2": (
      <RUserMoneyStatusSection/>
    )
  }, <UserMoneyStatusSection/>)
}
