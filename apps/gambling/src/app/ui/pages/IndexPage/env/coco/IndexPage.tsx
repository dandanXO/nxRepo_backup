import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../../../hooks/useBreakpoint";

import {Input} from "../../../../components/Inputs/Input";
import {useNavigate} from "react-router";

import {IndexTabs} from "../../IndexTabs";

import {AppCarousel} from "../../Carousel";

import {AppCarouselContent} from "../../Carousel/env/coco/AppCarouselContent";
import {AppCarouselContent2} from "../../Carousel/env/coco/AppCarouselContent2";
import {AppCarouselContent3} from "../../Carousel/env/coco/AppCarouselContent3";
import {AppCarouselContent4} from "../../Carousel/env/coco/AppCarouselContent4";
import {AppCarouselContent5} from "../../Carousel/env/coco/AppCarouselContent5";

import { DragScrollContainer } from "../../../../components/DragScrollContainer";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {CompanySloganLabel} from "./CompanySloganLabel";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {Container} from "../../../../components/container/Container";
import { useSelector } from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {ScrollTab} from "../../../../components/TabItem/ScrollTab";
import {AppCarouselContent7} from "../../Carousel/env/coco/AppCarouselContent7";
import {AppCarouselContent8} from "../../Carousel/env/coco/AppCarouselContent8";
import { GameSearchModal } from "../../../../layers/modals/GameSearchModal";
import {useScrollToCarousel} from "../../useScrollToCarousel";
import { GameItem } from "../../../../components-bs/GameTypeSection";
import { tcx } from "../../../../utils/tcx";
import { RecentGameItem } from "../../../../components-bs/RecentGameListItem";
import { GameListSection } from "../../../../layers/modals/GameSearchModal/components/GameListSection";
import { environment } from "../../../../../../environments/environment";


export type TTotalFavoriteLocalState = {
  local: { [key: number]: number [] },
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
  setActiveTab: (value: any) => void;
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
                                              setActiveTab,
                                              setViewType,
                                              setSearchInput,
                                              gameList,
  scrollToCarousel,
  showFixForIOSStickTab,
  userFavorite,
  onClickFavoriteGameItem,
  recentGameList
}:ICoco777betIndexPage) => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.app);
  const [isSearch, setIsSearch] = useState(false);

  const {onClickToSearch, onClickGameItem } = usePageNavigate();

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

  const recentGameListRender = (recentGameList: GameItem[]) => {
    if(recentGameList.length > 0) {
      return (
        <>
          {
            recentGameList.map((gameItem) => (
              <RecentGameItem
                key={gameItem.gameId}
                className='mr-4'
                gameId={Number(gameItem.gameId)}
                onClick={()=>onClickGameItem(gameItem)}
              />
            ))
          }
        </>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <>
      <div id="app-carousel" className={cx("w-full",
        // "max-h-[160px] md:h-[400px] bg-[red]",
        {
        // "w-[calc(100vw-265px)] ml-20": !isMobile,
        // "p-4": !isMobile,
      })}>
        {isSearch && <GameSearchModal userFavorite={userFavorite} onClickFavoriteGameItem={onClickFavoriteGameItem} onClose={()=>setIsSearch(false)}/>}
        {isMobile && <CompanySloganLabel/>}
        <AppCarousel setIsMoving={setIsMoving}>
          <AppCarouselContent isMoving={isMoving}/>
          <AppCarouselContent2 isMoving={isMoving}/>
          <AppCarouselContent3 isMoving={isMoving}/>
          <AppCarouselContent4 isMoving={isMoving}/>
          <AppCarouselContent5 isMoving={isMoving}/>
          {/*NOTE: 公司簡介目前沒有*/}
          {/*<AppCarouselContent6/>*/}
          {/*NOTE: 暫時備用*/}
          {/*<AppCarouselContent7/>*/}
          {/*NOTE: 暫時備用*/}
          {/*<AppCarouselContent8/>*/}
          {/*<CocoAppCarouselContent6/>*/}
        </AppCarousel>
      </div>

      {/*Tabs - mobile*/}
      {isMobile && (
        <div
        className={cx(
          "py-2 bg-[var(--primary-variant)] z-20 border border-solid border-[var(--white-20)]",
          {
            "fixed top-[52px] left-0 right-0": showFixForIOSStickTab && isMobile,
          },
        )}
      >
          <div className={""}>
            <div className={"whitespace-nowrap px-4  "}>
              <DragScrollContainer className="flex flex-row items-center">
                {/* <section className={"flex flex-row items-center bg-[#000C26] px-0.5 w"}> */}
                <IndexTabs
                  hideIcon={true}
                  activeTab={activeTab}
                  label={label}
                  setActiveTab={(tab: number) => {
                    setActiveTab(tab);
                    scrollToCarousel()
                  }}
                  setViewType={setViewType}
                />
                {/* </section> */}
              </DragScrollContainer>
            </div>
          </div>
        </div>
      )}

      {/*Tabs - desktop*/}
      {!isMobile && (
        <Container
          className={cx(
            "",
            DesktopXPadding,
          )}
        >
          <div className={"flex flex-row justify-center items-center"}>
            <div className="grow min-w-[100px] mr-2">
              <ScrollTab className="items-center">
                <IndexTabs activeTab={activeTab} label={label} setActiveTab={setActiveTab} setViewType={setViewType} />
              </ScrollTab>
            </div>

            <div className="shirnk-0 grow-0 basis-[200px] min-w-[200px]" onClick={()=>setIsSearch(true)}>
              {/*NOTICE: refactor me*/}
              <Input
                disable={true}
                pureContainer={true}
                className={cx(
                  "py-0.5 px-2.5 text-xs rounded",
                  "!border-[var(--stroke-textfields)] bg-[var(--background-textfields)]"
                )}
                inputClassName={"text-sm placeholder:text-[#007aff] placeholder:text-[rgba(255,255,255,0.3)]"}
                placeholder={"Pesquisar nome do jogo"}
                prefix={<SearchOutlined className={cx("text-xl mr-2", "text-[rgba(255,255,255,0.3)]")} />}
              />
            </div>

          </div>
        </Container>
      )}

      {/*SearchInput*/}
      {isMobile ? (
        <Container y={false} className="pt-2" onClick={()=>setIsSearch(true)}>
          {/*NOTICE: refactor me*/}
          <Input
            disable={true}
            pureContainer={true}
            className={cx(
              "py-0.5 px-2.5 text-xs rounded",
              "!border-[var(--stroke-textfields)] bg-[var(--background-textfields)]"
            )}
            inputClassName={"text-sm placeholder:text-[#007aff] placeholder:text-[rgba(255,255,255,0.3)]"}
            placeholder={"Por favor insira o nome do jogo"}
            prefix={<SearchOutlined className={cx("text-xl mr-2", "text-[rgba(255,255,255,0.3)]")} />}
          />
        </Container>
      ): null}

      {
        recentGameList.length > 0 && (
          <Container
            className={tcx('overflow-hidden', [DesktopXPadding, !isMobile])}
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
          </Container>
        )
      }

      <Container className={cx("pb-16", {
        [DesktopXPadding]: !isMobile,
      })}>
        {gameList()}
      </Container>
    </>
  )
}
