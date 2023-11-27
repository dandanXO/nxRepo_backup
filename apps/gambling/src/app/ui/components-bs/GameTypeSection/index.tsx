import useBreakpoint from "../../hooks/useBreakpoint";
import {DesktopGameItem} from "./GameItem/GameItem";
import {MobileGameItem} from "./GameItem/MobileGameItem";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {DesktopGameNumber, MobileGameNumber, TTotalFavoriteLocalState} from "../../pages/IndexPage";
import cx from "classnames";
import {environment} from "../../../../environments/environment"
import {MobileGameList} from "./GameList/MobileGameList";
import {GameList} from "./GameList/GameList";
import {MobileGameTypeHeader} from "./GameTypeHeader/MobileGameTypeHeader";
import {GameTypeHeader} from "./GameTypeHeader/GameTypeHeader";
import {mobileGameTypeHeaderProps as PmobileGameTypeHeaderProps} from "./env/pernambucana/mobileGameTypeHeaderProps";
import {mobileGameTypeHeaderProps as WmobileGameTypeHeaderProps} from "./env/wild/mobileGameTypeHeaderProps";
import {mobileGameTypeHeaderProps as CmobileGameTypeHeaderProps} from "./env/coco/mobileGameTypeHeaderProps";
import {renderByPlatform} from "../../utils/renderByPlatform";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";

export type GameItem = {
  name: string;
  imageURL?: string;
  gameId?: string;
  label?:string;
  type?:string;
}
export type IGameTypeSectionList = {
  gameTypeName: string;
  data?: GameItem[]
  onClickExpand?: () => void;
  expandedBrand?: string;
  isViewAll?: boolean;
  totalFavoriteLocalState: TTotalFavoriteLocalState
  setTotalFavoriteLocalState: Dispatch<SetStateAction<TTotalFavoriteLocalState>>;
  setExpandedBrand?:Dispatch<SetStateAction<string>>;
  isLatestItem: boolean;
  hotGames?: boolean;
}

export const GameTypeSectionList = (props: IGameTypeSectionList) => {
  const { isMobile } = useBreakpoint();
  const haveHotgames = typeof props.hotGames !== "undefined" ? props.hotGames : false;
  const maximunGameItemCount = isMobile ? MobileGameNumber : DesktopGameNumber;

  const { onClickGameItem } = usePageNavigate();
  const { onClickFavoriteGameItem, userFavorite } = useClickFavoriteGameItem();

  const MainGameList = isMobile ? MobileGameList : GameList
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem

  const initialListSize = (haveHotgames || props.isViewAll) ? props?.data?.length : isMobile ? MobileGameNumber : DesktopGameNumber;

  const [listSize, setListSize] = useState(initialListSize || 0);
  const displayedItems = props?.data && props?.data.slice(0, listSize);

  // console.log("props.gameTypeName", props.gameTypeName);
  // NOTE: reset by changing game brand
  useEffect(() => {
    if(haveHotgames || props.isViewAll) {
      setListSize(props && props?.data && props?.data?.length || 0);
    } else {
      setListSize(isMobile ? MobileGameNumber : DesktopGameNumber);
    }
  }, [props.gameTypeName])

  const loadMore = () => {
    if(haveHotgames) {
      setListSize(props && props?.data && props?.data?.length || 0);
    } else {
      const number = isMobile ? MobileGameNumber : DesktopGameNumber;
      setListSize(listSize + number); // 每次點擊按鈕增加10筆
    }
  }


  const [animating, setAnimating] = useState(true)
  useEffect(() => {
    setAnimating(true)
  }, [props.gameTypeName,props.expandedBrand])

  useEffect(() => {
    if (animating) {
      setTimeout(() => {
        setAnimating(false)
      }, 800)
    }
  }, [animating])

  const mobileGameTypeHeaderProps = renderByPlatform({
    "coco777bet": CmobileGameTypeHeaderProps,
    "wild777bet": WmobileGameTypeHeaderProps,
  }, PmobileGameTypeHeaderProps)

  console.log("props.expandedBrand", props.expandedBrand);

  return (
    <section className={cx({
      "flex flex-col mb-4": !props.isLatestItem,
    })}>

      {props.gameTypeName ==='null' ? <div></div> : isMobile ? (
        <MobileGameTypeHeader key={props.gameTypeName} gameTypeName={props.gameTypeName} onClick={props.onClickExpand} expandedBrand={props.expandedBrand} setExpandedBrand={props.setExpandedBrand} isViewAll={props.isViewAll} {...mobileGameTypeHeaderProps}/>
      ): (
        <GameTypeHeader key={props.gameTypeName} gameTypeName={props.gameTypeName} count={props.data?.length} onClick={props.onClickExpand} expandedBrand={props.expandedBrand} setExpandedBrand={props.setExpandedBrand} isViewAll={props.isViewAll}/>
      )}

      <MainGameList
        className={cx("list", {
          'animate-[gameListShow_0.8s_ease]':animating && isMobile,
          "flex flex-row flex-wrap justify-start items-center": !isMobile
        })}
      >
        {displayedItems && displayedItems
          .map((item, index) => {
            return (
              <MainGameItem
                key={index}
                gameId={Number(item.gameId)}
                name={item.name}
                // imageURL={`${environment.s3URLImages}/${item.gameId}.jpg`}
                imageURL={`https://resources.ttgroup.vip/icon/${item.gameId}-small.png`}
                onClick={() => onClickGameItem(item)}
                favorite={(userFavorite).includes(Number(item.gameId))}
                onClickFavorite={() => onClickFavoriteGameItem(item)}
              />
            )
        })}
      </MainGameList>

      {(props.data && listSize < props.data?.length) && props.expandedBrand &&
        <div className="flex-1 mt-10 justify-center flex">
          <button
            onClick={loadMore}
            className="text-[var(--primary-assistant)] bg-gradient-to-b from-[var(--btn-gradient1-from)] to-[var(--btn-gradient1-to)] py-1.5 px-6 rounded-2xl font-bold"
          >
            Ver mais
          </button>
        </div>
      }
    </section>
  )
}
