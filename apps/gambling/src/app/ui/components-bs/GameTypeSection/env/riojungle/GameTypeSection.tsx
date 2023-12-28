import useBreakpoint from "../../../../hooks/useBreakpoint";
import { DesktopGameItem } from "../../GameItem/GameItem";
import { MobileGameItem } from "../../GameItem/MobileGameItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DesktopGameNumber, MobileGameNumber } from "../../../../pages/IndexPage";
import cx from "classnames";
import { MobileGameList } from "../../GameList/MobileGameList";
import { GameList } from "../../GameList/GameList";
import { GameTypeHeader } from "../../GameTypeHeader/GameTypeHeader";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { IGameTypeSection, IGameTypeSectionList } from "../..";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "../../../theme/Buttons/env/riojungle/Button";
import { NoData } from "../../../../components/Table/env/riojungle/NoData";
import { environment } from "apps/gambling/src/environments/environment";

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
          buttonClassName={`bg-[#10B98F] items-center text-white shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)]  relative flex flex-row justify-center cursor-pointer  rounded-[100px]`}
          seeMoreText={
            <div className="flex items-center justify-center text-xs md:text-sm lg:text-base p-3 md:py-2.5 md:px-4">
              Ver tudo
              <img src={`assets/${environment.assetPrefix}/ArrowRight.png`} className="ml-1 w-[16px]" />
            </div>
          }
        />
      }
      {displayedItems?.length === 0
        ? (<NoData />)
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
          <Button
            onClick={loadMore}
            className="bg-[#8547EB] items-center py-3 px-4 rounded"
            text={'Ver Mais'}
          />
        </div>
      }
    </section>
  )
}
