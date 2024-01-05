import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { DesktopGameItem } from "../../GameItem/GameItem";
import { MobileGameItem } from "../../GameItem/MobileGameItem";
import cx from "classnames";
import { MobileGameList } from "../../GameList/MobileGameList";
import { GameList } from "../../GameList/GameList";
import { GameTypeHeader } from "../../GameTypeHeader/GameTypeHeader";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { IGameTypeSection, IGameTypeSectionList } from "../..";
import { Button } from "../../../Buttons/env/riojungle/Button";
import { NoData } from "../../../Table/env/riojungle/NoData";
import { environment } from "../../../../../../environments/environment";
import { LoadMoreButton } from "../../../Buttons/LoadMoreButton";

const FavoriteNoData = () => {
  return (
    <div className='rounded-lg w-full bg-[var(--grayscale-20)] text-[var(--grayscale-70)] p-2 md:p-5 font-medium text-sm md:text-base lg:text-xl'>
      <div className='rounded-lg border border-dashed border-[var(--grayscale-70)] flex flex-col justify-center items-center p-3 md:p-4 lg:p-5'>
        <div className='flex flex-col items-center py-[68px] md:py-[94px] lg:py-[154px]'>
          <img className={'h-[64px] md:h-[104px] lg:h-[120px] mb-2'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
          <div>Nada aqui</div>
        </div>
        <div className='text-[var(--secondary-main)] text-center'>Clique no coração no canto superior direito do jogo para adicioná-lo à sua coleção!</div>
      </div>
    </div>
  )
}


export type GameItem = {
  name: string;
  imageURL?: string;
  gameId?: string;
  label?: string;
  type?: string;
}



export const GameTypeSection = (props: IGameTypeSectionList & IGameTypeSection) => {
  const { displayedItems, animating, listSize, loadMore } = props
  const { isMobile } = useBreakpoint();
  const { onClickGameItem } = usePageNavigate();

  const MainGameList = isMobile ? MobileGameList : GameList
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem

  return (
    <section className={cx({
      "flex flex-col mb-4": !props.isLatestItem,
    })}>
      {props.gameTypeName === 'null' ? <div></div> :
        <GameTypeHeader
          key={props.gameTypeName}
          // gameTypeName={props.gameTypeName}
          // count={props.expandCount || props.data?.length}
          onClick={props.onClickExpand}
          {...props}
          // expandedBrand={props.expandedBrand}
          // setExpandedBrand={props.setExpandedBrand}
          // isViewAll={props.isViewAll}
          titleClassName={' text-white text-base md:text-lg lg:text-2xl py-2'}
          buttonClassName={`bg-[var(--secondary-main)] items-center text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]  relative flex flex-row justify-center cursor-pointer  rounded-[100px]`}
          seeMoreText={
            <div className="flex items-center justify-center text-xs md:text-sm lg:text-base p-3 md:py-2.5 md:px-4">
              Ver tudos
              <img src={`assets/${environment.assetPrefix}/ArrowRight.png`} className="ml-1 w-[16px]" />
            </div>
          }
        />
      }
      {displayedItems?.length === 0
        ? (props.gameTypeName === 'Favoritos'? <FavoriteNoData />:<NoData />)
        : (<MainGameList
          className={cx("list", {
            'animate-[gameListShow_0.8s_ease]': animating && isMobile,
            "flex flex-row flex-wrap justify-start items-center": !isMobile
          })}
        >
          {displayedItems && displayedItems
            .map((item: any, index: number) => {
              return (
                <MainGameItem
                  key={index}
                  gameId={Number(item.gameId)}
                  name={item.name}
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
          <LoadMoreButton onClick={loadMore}/>
        </div>
      }
    </section>
  )
}
