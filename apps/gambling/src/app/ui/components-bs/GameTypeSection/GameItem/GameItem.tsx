import styled from "styled-components";
import cx from "classnames"
import {useState} from "react";
// import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {TailSpin} from 'react-loading-icons';
import {environment} from "../../../../../environments/environment";

import { renderByPlatform } from "../../../utils/renderByPlatform";
import { PlayButton as CPlayButton } from "../env/coco/PlayButton";
import { PlayButton as WPlayButton } from "../env/wild/PlayButton";
import { PlayButton as PPlayButton } from "../env/pernambucana/PlayButton";
import { PlayButton as RPlayButton } from "../env/riojungle/PlayButton";

import { FavoriteSection } from "../FavoriteSection";

export type IGameItem = {
  className?: string;
}
const StyledGameItem = styled.div.attrs<IGameItem>(props => ({
    // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  z-index: 1;
  cursor: pointer;
  border-radius: 10px;
  //padding: 4px;
`

export const Skeleton = styled.div`
  @keyframes waveAnimation {
    0% {
      background-position: -200px 0;
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      background-position: calc(200px + 100%) 0;
      opacity: 0.2;
    }
  }

  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 1),
    transparent
  );
  color: rgba(0, 0, 0, 0);
  overflow: hidden;
  background-size: 200% 100%;
  animation: waveAnimation 2s linear infinite;
  width: 100%;

`

const DesktopGameItemButton = renderByPlatform({
  "wild777bet": WPlayButton,
  "coco777bet": CPlayButton,
  "riojungle777bet": RPlayButton,
// }, PPlayButton)
}, CPlayButton)

// const FavoriteSection = styled.div`
//   //&:after {
//   //  content: "";
//     position: absolute;
//     z-index: 999;
//     top: -15px;
//     right: -37px;
//     width: 100px;
//     height: 40px;
//     background: #090B0F;
//     transform: rotate(45deg);
//     box-shadow: 0 0 15px inset rgba(255,250,5,.3);
//     background: rgba(9,11,15,.8);
//     border: 1px solid #FFFA05;
//   //}
// `
const FavoriteStarImg = styled.img`
  right: -45px;
  top: 15px;
  position: relative;
  transform: rotate(99deg);
`

export const DesktopGameItem = (props: IItem) => {
  const [hover, setHover] = useState(false);
  const [onLoad, setOnLoad] = useState(false);
  return (
    <StyledGameItem
      className={cx("game-item w-full h-full rounded flex flex-col items-center relative group shrink-0", props.className)}
      onClick={props.onClick}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}>

      <div
        className={cx("w-full h-full",
        )}
      >
        {!onLoad && (
          <Skeleton className={"rounded-xl flex justify-center items-center w-full h-[calc(100%-20px)] !min-h-[150px]"}>
            <TailSpin/>
          </Skeleton>
        )}
        <img alt={"name"}
             className={cx(
               // NOTE: 20px title height
               "w-full h-[calc(100%-20px)] !min-h-[150px]",
               "rounded-xl hover:blur-[2px] hover:brightness-50 object-cover group-hover:blur-[2px] group-hover:brightness-50", {
               "hidden": !onLoad,
               // "invisible": !onLoad,
               "basis-[calc(100%-1rem)]": onLoad,
             })}
             src={`${environment.s3URLImages}/${props.gameId}-small.png`}
             srcSet={`${environment.s3URLImages}/${props.gameId}-small.png 1x, ${environment.s3URLImages}/${props.gameId}-medium.png 2x, ${environment.s3URLImages}/${props.gameId}-large.png 3x`}
             onLoad={() => {
               setOnLoad(true);
             }}
        />
        <div className={cx("text-[#d7e8ff] block text-ellipsis truncate text-sm md:text-base sm:text-center w-full sm:text-center md:text-left basis-[20px] shrink-0",
        {
          'font-bold':hover
        })}>{props.name}</div>
      </div>

      <FavoriteSection
        onClickFavorite={(event: any) => {
          event.stopPropagation();
          props.onClickFavorite && props.onClickFavorite();
        }}
        favorite={props.favorite || false}
      />
      {hover && (
        <DesktopGameItemButton />
      )}
    </StyledGameItem>
  )
}
const StyledMobileGameItem = styled.div.attrs<IGameItem>(props => ({
  // className: cx("w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/5 xl:w-1/5", props.className)
  className: cx("", props.className)
}))`
  cursor: pointer;
  z-index: 1;
`

export type IItem ={
  gameId: number;
  imageURL: string;
  name: string;
  onClick?: () => void;
  onClickFavorite?: () => void;
  favorite?: boolean
  className?: string;
}
