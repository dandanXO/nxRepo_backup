import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { DesktopGameItem } from "../../GameItem/GameItem";
import { MobileGameItem } from "../../GameItem/MobileGameItem";
import cx from "classnames";
import { MobileGameList } from "../../GameList/MobileGameList";
import { GameList } from "../../GameList/GameList";
import { GameTypeHeader } from "../../GameTypeHeader/GameTypeHeader";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { IGameTypeSection, IGameTypeSectionList } from "../..";
import { mobileGameTypeHeaderProps } from "./mobileGameTypeHeaderProps";
import { MobileGameTypeHeader } from "./MobileGameTypeHeader";

export type GameItem = {
  name: string;
  imageURL?: string;
  gameId?: string;
  label?: string;
  type?: string;
}


export const GameTypeSection = (props: IGameTypeSectionList & IGameTypeSection) => {
  const { displayedItems, animating, listSize, loadMore, data } = props
  const { isMobile } = useBreakpoint();
  const { onClickGameItem } = usePageNavigate();

  const MainGameList = isMobile ? MobileGameList : GameList
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem

  return (
    <section className={cx({
      "flex flex-col mb-4": !props.isLatestItem,
    })}>

      {props.gameTypeName === 'null' ? <div></div> : isMobile ? (
        <MobileGameTypeHeader key={props.gameTypeName} gameTypeName={props.gameTypeName} onClick={props.onClickExpand} expandedBrand={props.expandedBrand} setExpandedBrand={props.setExpandedBrand} isViewAll={props.isViewAll} {...mobileGameTypeHeaderProps} />
      ) : (
        <GameTypeHeader key={props.gameTypeName} label={data && data[0]  ? data[0].label: props.gameTypeName} gameTypeName={props.gameTypeName} count={props.expandCount || props.data?.length} onClick={props.onClickExpand} expandedBrand={props.expandedBrand} setExpandedBrand={props.setExpandedBrand} isViewAll={props.isViewAll} />
      )}
      {props.gameTypeName === 'Favoritos' && displayedItems?.length === 0 ? (
        <div className="my-8 py-6 text-center text-xl text-[var(--primary-assistant)]">
          Clique no coração no canto superior direito do jogo para adicioná-lo à sua coleção!
        </div>
      ) : (
        <MainGameList
          className={cx("list", {
            'animate-[gameListShow_0.8s_ease]': animating && isMobile,
            "flex flex-row flex-wrap justify-start items-center": !isMobile
          })}
        >
          {displayedItems && displayedItems
            .map((item:any, index:number) => {
              return (
                <MainGameItem
                  key={index}
                  gameId={Number(item.gameId)}
                  name={item.name}
                  // imageURL={`${environment.s3URLImages}/${item.gameId}.jpg`}
                  imageURL={`https://resources.ttgroup.vip/icon/${item.gameId}-small.png`}
                  onClick={() => onClickGameItem(item)}
                  favorite={(props.userFavorite).includes(Number(item.gameId))}
                  onClickFavorite={() => props.onClickFavoriteGameItem(item)}
                />
              )
            })}
        </MainGameList>
      )
      }
      {(props.data && listSize < props.data?.length) && props.expandedBrand &&
        <div className="flex-1 mt-20 justify-center flex">
          <button
            onClick={loadMore}
            className="text-white bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)] py-2 px-4 rounded-[32px] font-medium"
          >
            Ver Mais
          </button>
        </div>
      }
    </section>
  )
}
