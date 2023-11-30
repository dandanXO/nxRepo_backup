import React, { useState } from "react";
import { environment } from "../../../../environments/environment";
import { tcx } from "../../utils/tcx";
import useBreakpoint from "../../hooks/useBreakpoint";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { PlayButton as PPPlayButton } from "../GameTypeSection/env/pernambucana/PlayButton";
import { PlayButton as WPlayButton } from "../GameTypeSection/env/wild/PlayButton";
import { PlayButton as CPlayButton } from "../GameTypeSection/env/coco/PlayButton";
import { Skeleton } from "../GameTypeSection/Skeleton";
import { TailSpin } from "react-loading-icons";

const DesktopGameItemButton = renderByPlatform(
  {
    "wild777bet": WPlayButton,
    "coco777bet": CPlayButton,
  }, PPPlayButton)

interface IRecentGameItemProps {
  gameId: number;
  onClick: () => void;
  className?: string;
}

export const RecentGameItem = ({
  gameId,
  onClick,
  className
 }: IRecentGameItemProps) => {
  const [hover, setHover] = useState(false);
  const [onLoad, setOnLoad] = useState(false);

  const { isMobile } = useBreakpoint()

  return (
    <div
      onClick={onClick}
      className={tcx('relative group flex-shrink-0 cursor-pointer w-[108px] h-[108px]',['w-[60px] h-[60px]', isMobile], className)}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {
        !onLoad && (
          <Skeleton className={"rounded-xl flex justify-center items-center w-full h-full"}>
            <TailSpin />
          </Skeleton>
        )
      }
      <img
        className={
          tcx(
            'rounded-md hover:blur-[2px] hover:brightness-50 group-hover:blur-[2px] group-hover:brightness-50',
            ["hidden", !onLoad],
            ["basis-[calc(100%-1rem)]", onLoad],
          )
      }
        alt={`game${gameId}`}
        src={`${environment.s3URLImages}/${gameId}-small.png`}
        onLoad={() => {
          setOnLoad(true);
        }}
      />
      {hover && (
        <DesktopGameItemButton />
      )}
    </div>
  )
}
