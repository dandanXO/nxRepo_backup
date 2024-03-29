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
import { gameSlice, indexPagecurrentSelectLabel } from "../../../../../reduxStore/gameSlice";
import { GameItem } from "../../../../components-bs/GameTypeSection";
import { tcx } from "../../../../utils/tcx";
import { RecentGameItem } from "../../../../components-bs/RecentGameListItem";
import { GameListSection } from "../../../../modals/GameSearchModal/components/GameListSection";
import { environment } from "../../../../../../environments/environment";


import { AppCarouselContent } from "../../Carousel/env/u2/AppCarouselContent";
import { AppCarouselContent2 } from "../../Carousel/env/u2/AppCarouselContent2";
import { AppCarouselContent3 } from "../../Carousel/env/u2/AppCarouselContent3";
import { AppCarouselContent4 } from "../../Carousel/env/u2/AppCarouselContent4";
import { AppCarouselContent5 } from "../../Carousel/env/u2/AppCarouselContent5";
import { AppCarouselContent7 } from "../../Carousel/env/u2/AppCarouselContent7";
import { AppCarouselContent8 } from "../../Carousel/env/u2/AppCarouselContent8";
import { TabItem } from "../../../../components-bs/TabItem/env/u2/TabItem";


import todos from "../../../../../../assets/u2/shared/index-tab-todos.png"
import slots from "../../../../../../assets/u2/shared/index-tab-slots.png"
import vivo from "../../../../../../assets/u2/shared/index-tab-vivo.png"
import viver from "../../../../../../assets/u2/shared/index-tab-viver.png"
import favorite from "../../../../../../assets/u2/shared/index-tab-favorite.png"
import fishing from "../../../../../../assets/u2/shared/index-tab-fishing.png";
import recent from "../../../../../../assets/u2/shared/index-tab-recent.png";
import { AppCarouselContent6 } from "../../Carousel/env/u2/AppCarouselContent6";
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
  subGameMenu: any;
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
  subGameMenu,
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

  useEffect(() => {
    // 初始化 使用 redux
    if (indexPagecurrentSelectLabel === "nothing_select") {
      dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel('Todos'))
    }
  })

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


  const { typeGameCount, indexPagecurrentSelectLabel } = useSelector((state: any) => state.gameList);


  const IndexTabs = () => {
    return (
      <DragScrollContainer className={cx("flex flex-row items-center rounded-[100px] ", { 'flex-1': !isDesktop })}>
        <div className="bg-[var(--grayscale-20)] flex flex-row rounded-[100px] flex-1">
          {
            ["Todos", ...label, 'Favoritos'].map((tab: indexPagecurrentSelectLabel, index: number) => {
              const gameCount = tab !== 'Favoritos' ? typeGameCount[tab] : userFavorite.length;
              return (
                <TabItem
                  className="flex-1 text-xs md:text-sm lg:text-base px-5"
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
      <PageContainer id={"app-carousel"} className='pb-0'>
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
          "py-3 md:py-8 lg:py-5",
          {
            "fixed top-[52px] left-0 right-0 ": isFixedGameTypeTabs,
          },
        )}
      >
        <div className={"flex flex-row justify-between items-center w-full"}>
          <IndexTabs />
          {isDesktop && (
            <div className="ml-4 shirnk-0 grow-0 basis-[200px] min-w-[200px]"
                 onClick={() => dispatch(appSlice.actions.setShowGameSearchModal(true))}
            >
              <Input
                disable={true}
                pureContainer={true}
                className={cx(
                  "p-2.5 text-sm rounded-lg h-[40px] flex items-center",
                  "!border-[var(--grayscale-30)] bg-[var(--grayscale-10)]"
                )}
                inputClassName={"text-sm placeholder:text-[var(--grayscale-70)] placeholder:text-sm placeholder:items-center"}
                placeholder={"Procurar"}
                prefix={<SearchOutlined className={cx("text-lg mr-1", "text-[var(--grayscale-70]")} />}
              />
            </div>)}
        </div>
        {/* 二級選項 */}
        {subGameMenu()}
      </PageContainer>
      {
        recentGameList.length > 0 && (
          <PageContainer
            className={cx(
              'overflow-hidden py-0'
            )}
          >
            <GameListSection
              className='mb-0 md:mb-0 lg:mb-0 pl-0 px-0'
              title={(
                <div className='flex items-center gap-2 font-bold'>
                  {
                    (
                      <img className='w-6 h-6' src={`assets/${environment.uVersion}/${environment.mVersion}/icon_recent.png`} alt="recentIcon" />
                    )
                  }
                  <div className='text-xl text-white'>Recente</div>
                  <div className='text-sm text-[var(--secondary-assistant)]'>+{recentGameList.length}</div>
                </div>
              )}
              isShowHeader
              headerClassName={tcx('mb-0 sm:mb-0 pl-0 py-0', ['py-0', isMobile])}
              children={recentGameListRender(recentGameList)}
              gameListClassName={tcx('py-[20px] animate-[recentGameListShow_0.8s_ease]', ['py-0 pt-2', isMobile])}
            />
          </PageContainer>
        )
      }

      <PageContainer
        className={cx("pb-16 pt-0")}
      >
         {/* 每個選項的渲染 */}
        {gameList()}
      </PageContainer>
    </>
  )
}
