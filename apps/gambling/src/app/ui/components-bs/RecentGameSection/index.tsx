import React from "react";
import useBreakpoint from "../../hooks/useBreakpoint";
import { MobileRecentGameHeader } from "./RecentGameHeader/MobileRecentGameHeader";
import { RecentGameHeader } from "./RecentGameHeader/RecentGameHeader";
import { RecentGameItem } from "./RecentGameItem";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { GameItem } from "../GameTypeSection";

interface IRecentGameSectionProps {
  recentGameList: GameItem[]
}

export const RecentGameSection = ({
  recentGameList
}: IRecentGameSectionProps) => {
  const { onClickGameItem } = usePageNavigate();
  const { isMobile } = useBreakpoint();

  return (
    <div className='w-full'>
      {
        isMobile ? (
          <MobileRecentGameHeader count={recentGameList.length} />
        ):(
          <RecentGameHeader onClickLeft={()=>null} onClickRight={()=>null} count={recentGameList.length} />
        )
      }
      <div className='flex gap-4 w-full overflow-x-auto animate-[recentGameListShow_0.8s_ease] py-[14px]'>
        {
          recentGameList.map((gameItem) => (
            <RecentGameItem gameId={Number(gameItem.gameId)} onClick={()=> onClickGameItem(gameItem)} />
          ))
        }
      </div>
    </div>
  )
}
