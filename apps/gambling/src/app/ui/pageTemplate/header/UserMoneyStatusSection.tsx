import React from "react";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {UserMoneyStatusSection as CUserMoneyStatusSection} from "./env/coco/UserMoneyStatusSection";
import {UserMoneyStatusSection as RUserMoneyStatusSection} from "./env/riojungle/UserMoneyStatusSection";

type IProps = {
  className?: string;
}
export const UserMoneyStatusSection = (props: IProps) => {
  return renderByPlatform({
    "coco777bet": (
      <CUserMoneyStatusSection/>
    ),
    "riojungle777bet": (
      <RUserMoneyStatusSection/>
    )
  }, <UserMoneyStatusSection/>)
}
