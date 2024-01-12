import {Dispatch, SetStateAction} from "react";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import cx from "classnames";
import todos from "../../../Icons/tabs/env/u1/index-tab-todos.png"
import {LeftOutlined} from "@ant-design/icons"

export const GameTypeHeader = (props: {
  gameTypeName: string;
  count?: number;
  onClick?: () => void;
  expandedBrand?: string;
  setExpandedBrand?: Dispatch<SetStateAction<string>>;
  isViewAll?: boolean;
}) => {
  const {isMobile} = useBreakpoint();
  return (
    <header className={"flex flex-row justify-between relative py-3.5"}>

      <span className={"flex flex-row items-center"}>
        {props.expandedBrand && (
          <button
            onClick={() => {
              props?.setExpandedBrand && props?.setExpandedBrand('')
            }}
          >
            {/*<img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"*/}
            {/*     src={`assets/${environment.assetPrefix}/ic_gameHeader_back.png`}*/}
            {/*     alt=""></img>*/}
            <LeftOutlined className={"text-white text-xl mr-2"}/>
          </button>
        )}
        <img className="w-[24px] h-[24px] mr-2" alt={"map"} src={todos}/>
        <span className={"text-xl font-bold text-white"}>{props.gameTypeName}</span>
      </span>

      {!props.expandedBrand && !props.isViewAll && (
        <div>
          <button
            onClick={props.onClick}
            className={
              cx("rounded-lg border-[1px] px-4 py-1 text-sm md:text-lg !font-bold",
                "text-[var(--primary-assistant)] border-[var(--primary-assistant)] hover:opacity-70")
            }
          >{isMobile ? "Tudo" : `Ver todos ${props?.count}`}</button>
        </div>
      )}
    </header>
  )
}
