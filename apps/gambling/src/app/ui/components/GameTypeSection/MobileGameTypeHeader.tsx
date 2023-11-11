import {environment} from "../../../../environments/environment";

export const MobileGameTypeHeader = (props: {
  gameTypeName: string;
  onClick?: () => void;
}) => {
  return (
    <header className={"flex flex-row mb-3 relative tab-item-title-box"}>
      <img src={`assets/${environment.assetPrefix}/ic_game.png`}/>
      <span className={"text-3xl text-semibold text-[#ffffff]"}>{props.gameTypeName}</span>
      <div className={"flex-grow"}></div>
      {props?.onClick && (
        <span className={"text-xl text-[#16FF8F] mt-2"} onClick={props?.onClick}>
      {'Tudo'}
    </span>
      )}
    </header>

  )
}
