import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import { DesktopGameItem } from "./GameItem/GameItem";
import { MobileGameItem } from "./GameItem/MobileGameItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reduxStore";
import { appSlice } from "../../../reduxStore/appSlice";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { DesktopGameNumber, MobileGameNumber } from "../../pages/IndexPage";
import cx from "classnames";
import { environment } from "../../../../environments/environment"
import { MobileGameList } from "./GameList/MobileGameList";
import { GameList } from "./GameList/GameList";
import { MobileGameTypeHeader } from "./GameTypeHeader/MobileGameTypeHeader";
import { GameTypeHeader } from "./GameTypeHeader/GameTypeHeader";
import { mobileGameTypeHeaderProps as PmobileGameTypeHeaderProps } from "./env/pernambucana/mobileGameTypeHeaderProps";
import { mobileGameTypeHeaderProps as WmobileGameTypeHeaderProps } from "./env/wild/mobileGameTypeHeaderProps";
import { mobileGameTypeHeaderProps as CmobileGameTypeHeaderProps } from "./env/coco/mobileGameTypeHeaderProps";
import { renderByPlatform } from "../../utils/renderByPlatform";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { usePageNavigate } from "../../router/hooks/usePageNavigate";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";
import { useScrollToPartPageTemplate } from "../../pageTemplate/hooks/useScrollToPartPageTemplate";
import { GameTypeSection as RGameTypeSectionList } from "./env/riojungle/GameTypeSection";
import { GameTypeSection as WGameTypeSectionList } from "./env/wild/GameTypeSection";
import { GameTypeSection as CGameTypeSectionList } from "./env/coco/GameTypeSection";
import { GameTypeSection as PGameTypeSectionList } from "./env/pernambucana/GameTypeSection";

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


  return renderByPlatform({
    "wild777bet": <WGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
    "coco777bet": <CGameTypeSectionList
      {...props}
      displayedItems={displayedItems}
      animating={animating}
      listSize={listSize}
      loadMore={loadMore}
    />,
    "riojungle777bet": <RGameTypeSectionList
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
