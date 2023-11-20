import {Dispatch, SetStateAction} from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import {environment} from "../../../../environments/environment";

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
          <img data-v-ddc8133e="" className="backSlots w-[24px] h-[24px] mr-4"
               src={`assets/${environment.assetPrefix}/ic_gameHeader_back.png`}
               alt=""></img>
        </div>}
        <img className="w-[36px] h-[30px] mr-4" alt={"map"} src={`assets/${environment.assetPrefix}/ic_game.png`}/>
        <span className={"text-xl font-bold text-white"}>{props.gameTypeName}</span>
      </span>

      {!props.isViewAll && <div>
        {isMobile ? (
          <button onClick={props.onClick} className={"text-xl text-transparent"}>Tudo</button>
        ) : (
          <button onClick={props.onClick}
                  className={"rounded-2xl border-[1px] border-[#2CFD99] px-4 pt-[5px] pb-[2px] text-[#2CFD99] text-sm !font-bold"}>Ver
            todos {props?.count}</button>
        )}
      </div>}

    </header>
  )
}
