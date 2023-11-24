import {useState} from "react";
import cx from "classnames";
import {TailSpin} from "react-loading-icons";
import {IGameItem, IItem} from "./GameItem";
import styled from "styled-components";
import {environment} from "../../../../../environments/environment";
import {GameImg} from "../GameImg";
import {FavoriteSection} from "../FavoriteSection";
import {Skeleton} from "../Skeleton";

const StyledMobileGameItem = styled.div.attrs<IGameItem>(props => ({
  // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  cursor: pointer;
  z-index: 1;
`

export const MobileGameItem = (props: IItem) => {
  const [onLoad, setOnLoad] = useState(false);

  return (
    <StyledMobileGameItem
      className={cx("p-1 shrink-0 grow-0 basis-[33%] overflow-hidden w-[33vw] h-[33vw] rounded-2xl flex flex-col items-center relative", {

      })}
    >
      <div
        onClick={props.onClick}
        className={cx("relative overflow-hidden w-full h-full rounded-xl ", {

        })}
      >
        {!onLoad && (
          <Skeleton className={"rounded-xl w-full h-full flex justify-center items-center"}>
            <TailSpin/>
          </Skeleton>
        )}

        <GameImg
          alt={props.name}
          // className={cx("border-[#FFFA05] border-[1px] border-solid",
          // 解決金邊缺角
          className={cx({
            // "van-image": isMobile,
            "invisible": !onLoad,
          })}
          // src={props.imageURL}
          src={`${environment.s3URLImages}/${props.gameId}-small.png`}
          srcSet={`${environment.s3URLImages}/${props.gameId}-small.png 1x, ${environment.s3URLImages}/${props.gameId}-medium.png 2x, ${environment.s3URLImages}/${props.gameId}-large.png 3x`}
          onLoad={() => {
            setOnLoad(true);
          }}
        />

        <FavoriteSection
          onClickFavorite={(event: any) => {
            event.stopPropagation();
            props.onClickFavorite && props.onClickFavorite();
          }}
          favorite={props.favorite || false}
        />

      </div>
      <div className={"basis-[20px] text-[#d7e8ff] block text-ellipsis truncate text-sm md:text-base sm:text-center w-full sm:text-center md:text-left"}>{props.name}</div>
    </StyledMobileGameItem>

  )
}
