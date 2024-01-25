import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DesktopGameNumber, MobileGameNumber } from "../../pages/IndexPage";
import { renderByUVersion } from "../../utils/renderByUVersion";
import { GameTypeSection as RGameTypeSectionList } from "./env/u2/GameTypeSection";
import { GameTypeSection as WGameTypeSectionList } from "./env/wild/GameTypeSection";
import { GameTypeSection as CGameTypeSectionList } from "./env/u1/GameTypeSection";
import { GameTypeSection as PGameTypeSectionList } from "./env/p1/GameTypeSection";

export type GameItem = {
  name: string;
  imageURL?: string;
  gameId?: string;
  label?: string;
  type?: string;
}
export type IGameTypeSectionList = {
  gameTypeName: string;
  data?: GameItem[]
  onClickExpand?: () => void;
  expandedBrand?: string;
  isViewAll?: boolean;
  setExpandedBrand?: Dispatch<SetStateAction<string>>;
  isLatestItem: boolean;
  hotGames?: boolean;
  expandCount?: number;
  userFavorite: number[]
  labelImgUrl?: string;
  onClickFavoriteGameItem: (item: GameItem) => void;
}

export interface IGameTypeSection {
  displayedItems: any;
  animating: boolean;
  listSize: number;
  loadMore: () => void;
}

export const GameTypeSectionList = (props: IGameTypeSectionList) => {
  const { isMobile } = useBreakpoint();
  const haveHotgames = typeof props.hotGames !== "undefined" ? props.hotGames : false;

  const initialListSize = (haveHotgames || props.isViewAll) ? props?.data?.length : isMobile ? MobileGameNumber : DesktopGameNumber;

  const [listSize, setListSize] = useState(initialListSize || 0);
  const displayedItems = props?.data && props?.data.slice(0, listSize);

  useEffect(() => {
    if (haveHotgames || props.isViewAll) {
      setListSize(props && props?.data && props?.data?.length || 0);
    } else {
      setListSize(isMobile ? MobileGameNumber : DesktopGameNumber);
    }
  }, [props.gameTypeName, props.data?.length])

  const loadMore = () => {
    if (haveHotgames) {
      setListSize(props && props?.data && props?.data?.length || 0);
    } else {
      const number = isMobile ? MobileGameNumber : DesktopGameNumber;
      setListSize(listSize + number); // 每次點擊按鈕增加10筆
    }
  }


  const [animating, setAnimating] = useState(true)
  useEffect(() => {
    setAnimating(true)
  }, [props.gameTypeName, props.expandedBrand])

  useEffect(() => {
    if (animating) {
      setTimeout(() => {
        setAnimating(false)
      }, 800)
    }
  }, [animating])


  return renderByUVersion({
    "wild777bet": <WGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
    "p1":<PGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
    "u1": <CGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
    "u2": <RGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
  }, <PGameTypeSectionList {...props}
    displayedItems={displayedItems}
    animating={animating}
    listSize={listSize}
    loadMore={loadMore}
  />)
}
