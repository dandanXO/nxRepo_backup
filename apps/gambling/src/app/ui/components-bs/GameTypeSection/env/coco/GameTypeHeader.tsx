import {Dispatch, SetStateAction} from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {environment} from "../../../../../../environments/environment";
import cx from "classnames";
import todos from "../../../../env/coco/index-tab-todos.png"
import {LeftOutlined} from "@ant-design/icons"

export const GameTypeHeader = (props: {
  gameTypeName: string;
  count?: number;
  onClick?: () => void;
  isViewAll?: boolean;
  setViewType?: Dispatch<SetStateAction<string>>;
}) => {
  const {isMobile} = useBreakpoint();
  return (
    <header className={"flex flex-row justify-between mb-3 relative"}>
      <span className={"flex flex-row items-center"}>
        {props.isViewAll && <div onClick={() => {
          props?.setViewType && props?.setViewType('')
        }}>
          {/*<img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"*/}
          {/*     src={`assets/${environment.assetPrefix}/ic_gameHeader_back.png`}*/}
          {/*     alt=""></img>*/}
          <LeftOutlined />
        </div>}
        {/*<img className="w-[36px] h-[30px] mr-4" alt={"map"} src={`assets/${environment.assetPrefix}/ic_game.png`}/>*/}
        <img className="w-[36px] h-[30px] mr-4" alt={"map"} src={todos}/>

        <span className={"text-xl font-bold text-white"}>{props.gameTypeName}</span>
      </span>

      {!props.isViewAll && <div>
        {isMobile ? (
          <button onClick={props.onClick} className={"text-xl text-transparent"}>Tudo</button>
        ) : (
          <button
            onClick={props.onClick}
            className={
              cx("rounded-2xl border-[1px] px-4 pt-[5px] pb-[2px] text-sm !font-bold",
              "text-[var(--primary-assistant)] border-[var(--primary-assistant)]")
            }
          >Ver todos {props?.count}</button>
        )}
      </div>}

    </header>
  )
}
