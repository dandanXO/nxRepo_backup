import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";

import { Input } from "../../../../components-bs/Inputs/Input";
import { useNavigate } from "react-router";


import { AppCarousel } from "../../Carousel";


import { DragScrollContainer } from "../../../../components/DragScrollContainer";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { CompanySloganLabel } from "./CompanySloganLabel";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { PageContainer } from "../../../../components-bs/PageContainer";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { ScrollTab } from "../../../../components-bs/TabItem/ScrollTab";

import { GameSearchModal } from "../../../../modals/GameSearchModal";
import { gameSlice } from "../../../../../reduxStore/gameSlice";
import { GameItem } from "../../../../components-bs/GameTypeSection";
import { tcx } from "../../../../utils/tcx";
import { RecentGameItem } from "../../../../components-bs/RecentGameListItem";
import { GameListSection } from "../../../../modals/GameSearchModal/components/GameListSection";
import { environment } from "../../../../../../environments/environment";


import { AppCarouselContent } from "../../Carousel/env/riojungle/AppCarouselContent";
import { AppCarouselContent2 } from "../../Carousel/env/riojungle/AppCarouselContent2";
import { AppCarouselContent3 } from "../../Carousel/env/riojungle/AppCarouselContent3";
import { AppCarouselContent4 } from "../../Carousel/env/riojungle/AppCarouselContent4";
import { AppCarouselContent5 } from "../../Carousel/env/riojungle/AppCarouselContent5";
import { AppCarouselContent7 } from "../../Carousel/env/riojungle/AppCarouselContent7";
import { AppCarouselContent8 } from "../../Carousel/env/riojungle/AppCarouselContent8";
import { TabItem } from "../../../../components-bs/TabItem/env/riojungle/TabItem";


import todos from "./assets/index-tab-todos.png"
import slots from "./assets/index-tab-slots.png"
import vivo from "./assets/index-tab-vivo.png"
import viver from "./assets/index-tab-viver.png"
import favorite from "./assets/index-tab-favorite.png"
import fishing from "./assets/index-tab-fishing.png";
import recent from "./assets/index-tab-recent.png";
import { AppCarouselContent6 } from "../../Carousel/env/riojungle/AppCarouselContent6";
import {appSlice} from "../../../../../reduxStore/appSlice";

export type TTotalFavoriteLocalState = {
  local: { [key: number]: number[] },
  localArr: {
    [key: number]: {
      gameId: number,
      name: string,
      img: string,
      label: string,
      type: string
    }[]
  }
}

type ICoco777betIndexPage = {
  allGameList: any;
  label: any;
  activeTab: any;
  setViewType: (value: any) => void;
  setSearchInput: (value: any) => void;
  gameList: any;
  showFixForIOSStickTab: boolean;
  scrollToCarousel: () => void;
  userFavorite: number[]
  onClickFavoriteGameItem: (item: GameItem) => void
  recentGameList: GameItem[]
}

export const IndexPage = ({
  allGameList,
  label,
  activeTab,
  setViewType,
  setSearchInput,
  gameList,
  scrollToCarousel,
  showFixForIOSStickTab,
  userFavorite,
  onClickFavoriteGameItem,
  recentGameList
}: ICoco777betIndexPage) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.app);

  const { onClickToSearch, onClickGameItem } = usePageNavigate();

  // useEffect(() => {
  //   if (activeTab === "Todos") {
  //     setActiveTab("Salão")
  //   }
  // }, [])

  const handleToSearchPage = () => {
    if (isLogin) {
      onClickToSearch();
    }
  }

  const [isMoving, setIsMoving] = useState(false);
  const DesktopXPadding = "!pl-12 !pr-[90px]";
  const iconsMap: { [key: string]: string } = {
    "Todos": todos,
    "Viver": viver,
    "Vivo": vivo,
    "Slots": slots,
    "Fishing": fishing,
    "Favoritos": favorite,
    "Recente": recent
  }
  const recentGameListRender = (recentGameList: GameItem[]) => {
    if (recentGameList.length > 0) {
      return (
        <>
          {
            recentGameList.map((gameItem) => (
              <RecentGameItem
                key={gameItem.gameId}
                className='mr-4'
                gameId={Number(gameItem.gameId)}
                onClick={() => onClickGameItem(gameItem)}
              />
            ))
          }
        </>
      )
    } else {
      return <div></div>
    }
  }


  const { typeGameCount } = useSelector((state: any) => state.gameList);


  const IndexTabs = () => {
    return (
      <DragScrollContainer className="flex flex-row items-center rounded-[100px]">
        <div className="bg-[#333333] flex flex-row rounded-[100px]">
          {
            ["Todos", ...label, 'Favoritos'].map((tab: string, index: number) => {
              const gameCount = tab !== 'Favoritos' ? typeGameCount[tab] : userFavorite.length;
              return (
                <TabItem
                  active={activeTab === tab}
                  onClick={() => {
                    dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel(tab));
                    setViewType('')
                  }}
                  icon={iconsMap[tab]}
                  name={activeTab === tab ? `${tab} ( ${gameCount} )` : tab}
                />
              )
            })
          }
        </div>
      </DragScrollContainer>
    )
  }

  const isFixedGameTypeTabs = showFixForIOSStickTab && !isDesktop;


  return (
    <>
      <PageContainer id={"app-carousel"}>
        {/*{isMobile && <CompanySloganLabel />}*/}
        <div>
          <AppCarousel setIsMoving={setIsMoving}>
            <AppCarouselContent isMoving={isMoving} />
            <AppCarouselContent2 isMoving={isMoving} />
            <AppCarouselContent3 isMoving={isMoving} />
            <AppCarouselContent4 isMoving={isMoving} />
            <AppCarouselContent5 isMoving={isMoving} />
            <AppCarouselContent6 isMoving={isMoving} />
            {/*NOTE: 公司簡介目前沒有*/}
            {/*<AppCarouselContent6/>*/}
            {/*NOTE: 暫時備用*/}
            {/*<AppCarouselContent7/>*/}
            {/*NOTE: 暫時備用*/}
            {/*<AppCarouselContent8/>*/}
            {/*<CocoAppCarouselContent6/>*/}
          </AppCarousel>
        </div>

      </PageContainer>

      <PageContainer
        className={cx(
          "z-[2]",
          "py-2 bg-[#1A1A1A]",
          {
            "fixed top-[52px] left-0 right-0 ": isFixedGameTypeTabs,
          },
        )}
      >
        <div className={"flex flex-row justify-between items-center w-full"}>
          <IndexTabs />
          {!isMobile && (
            <div className="ml-4 shirnk-0 grow-0 basis-[200px] min-w-[200px]"
                 onClick={() => dispatch(appSlice.actions.setShowGameSearchModal(true))}
            >
              <Input
                disable={true}
                pureContainer={true}
                className={cx(
                  "p-2.5 text-sm rounded-lg h-[40px] flex items-center",
                  "!border-[#4D4D4D] bg-[#1A1A1A]"
                )}
                inputClassName={"text-sm placeholder:text-[#B3B3B3] placeholder:text-sm placeholder:items-center"}
                placeholder={"Procurar"}
                prefix={<SearchOutlined className={cx("text-lg mr-1", "text-[#B3B3B3]")} />}
              />
            </div>)}
        </div>
      </PageContainer>

      {
        recentGameList.length > 0 && (
          <PageContainer
            className={cx(
              'overflow-hidden'
            )}
          >
            <GameListSection
              className='mb-0 pl-0 px-0'
              title={(
                <div className='flex items-center gap-2 font-bold'>
                  {
                    !isMobile && (
                      <img className='w-6 h-6' src={`assets/${environment.assetPrefix}/icon_recent.png`} alt="recentIcon" />
                    )
                  }
                  <div className='text-xl text-white'>Recente</div>
                  <div className='text-sm text-[var(--secondary-assistant)]'>+{recentGameList.length}</div>
                </div>
              )}
              isShowHeader
              headerClassName={tcx('mb-0 sm:mb-0 pl-0 py-[14px]', ['py-0', isMobile])}
              children={recentGameListRender(recentGameList)}
              gameListClassName={tcx('py-[14px] animate-[recentGameListShow_0.8s_ease]', ['py-0 pt-2', isMobile])}
            />
          </PageContainer>
        )
      }

      <PageContainer
        className={cx("pb-16", {
        "pt-[58px]": isFixedGameTypeTabs,
        })}
      >
        {gameList()}
      </PageContainer>
    </>
  )
}
