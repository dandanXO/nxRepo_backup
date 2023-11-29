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
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {CompanySloganLabel} from "./CompanySloganLabel";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {Container} from "../../../../components/container/Container";
import { useSelector } from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {ScrollTab} from "../../../../components/TabItem/ScrollTab";
import {AppCarouselContent7} from "../../Carousel/env/coco/AppCarouselContent7";
import {AppCarouselContent8} from "../../Carousel/env/coco/AppCarouselContent8";
import { GameSearchModal } from "../../../../modals/GameSearchModal";
import {useScrollToCarousel} from "../../useScrollToCarousel";
import { GameItem } from "../../../../components-bs/GameTypeSection";


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
  onClickFavoriteGameItem
}:ICoco777betIndexPage) => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.app);
  const [isSearch, setIsSearch] = useState(false);

  const {onClickToSearch} = usePageNavigate();

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
  return (
    <>
      <div id="app-carousel" className={cx("w-full bg-[#020E29]",
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
            "py-2",
            {
              "bg-[var(--primary-variant)] z-20": isMobile,
              // "sticky top-[52.5px] left-0 right-0": isMobile,
              "fixed top-[52.5px] left-0 right-0": showFixForIOSStickTab && isMobile,
            },
            {
              "bg-[var(--background-primary)]" : !isMobile
            }
          )}
        >
          <div className={""}>
            <div className={"whitespace-nowrap"}>
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
            {
              "bg-[var(--primary-variant)] z-20": isMobile,
              // "sticky top-[52.5px] left-0 right-0": isMobile,
              "fixed top-[52.5px] left-0 right-0": showFixForIOSStickTab && isMobile,
            },
            {
              "bg-[var(--background-primary)]" : !isMobile
            },
            // "md:pr-[86px]",
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
        <Container y={false} className="bg-[var(--background-primary)] pt-2" onClick={()=>setIsSearch(true)}>
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

      <Container className={cx("pb-16 bg-[var(--background-primary)]", {
        [DesktopXPadding]: !isMobile,
      })}>
        {gameList()}
      </Container>
    </>
  )
}
