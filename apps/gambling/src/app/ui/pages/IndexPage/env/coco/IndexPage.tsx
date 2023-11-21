import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../../../hooks/useBreakpoint";
import {GameTypeSectionList} from "../../../../components-bs/GameTypeSection";
import {Input} from "../../../../components/Inputs/Input";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../environments/environment"
import {IndexTabs} from "../../IndexTabs";
import FakeBanner from "./FakeBanner.png";
import {AppCarousel} from "../../Carousel";
import styled from "styled-components";
import {AppCarouselContent} from "../../Carousel/env/coco/AppCarouselContent";
import {AppCarouselContent2} from "../../Carousel/env/coco/AppCarouselContent2";
import {AppCarouselContent3} from "../../Carousel/env/coco/AppCarouselContent3";
import {AppCarouselContent4} from "../../Carousel/env/coco/AppCarouselContent4";
import {AppCarouselContent5} from "../../Carousel/env/coco/AppCarouselContent5";
import {AppCarouselContent6} from "../../Carousel/env/coco/AppCarouselContent6";
import { TabItem, Tabs } from "../../../../components/TabItem/TabItem";
import { CocoTabItem } from "../../../../components/TabItem/CocoTabItem";
import { DragScrollContainer } from "../../../../components/DragScrollContainer";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {CompanySloganLabel} from "./CompanySloganLabel";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import {Container} from "../../../../components/container/Container";
import { useSelector } from "react-redux";
import {RootState} from "../../../../../reduxStore";
import {ScrollTab} from "../../../../components/TabItem/ScrollTab";
import {AppCarouselContent7} from "../../Carousel/env/coco/AppCarouselContent7";
import {AppCarouselContent8} from "../../Carousel/env/coco/AppCarouselContent8";


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
  totalFavoriteLocalState: any;
  setTotalFavoriteLocalState: (value: any) => void;
  label: any;
  activeTab: any;
  setActiveTab: (value: any) => void;
  setViewType: (value: any) => void;
  setSearchInput: (value: any) => void;
  gameList: any;
}

export const IndexPage = ({
                                              allGameList,
                                              totalFavoriteLocalState,
                                              setTotalFavoriteLocalState,
                                              label,
                                              activeTab,
                                              setActiveTab,
                                              setViewType,
                                              setSearchInput,
                                              gameList
}:ICoco777betIndexPage) => {
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: RootState) => state.app);

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

  return (
    <>
      <div className={cx("w-full bg-[#020E29]",
        // "max-h-[160px] md:h-[400px] bg-[red]",
        {
        // "w-[calc(100vw-265px)] ml-20": !isMobile,
        // "p-4": !isMobile,
      })}>
        {isMobile && <CompanySloganLabel/>}
        <AppCarousel>
          <AppCarouselContent/>
          <AppCarouselContent2/>
          <AppCarouselContent3/>
          <AppCarouselContent4/>
          <AppCarouselContent5/>
          <AppCarouselContent6/>
          <AppCarouselContent7/>
          <AppCarouselContent8/>
          {/*<CocoAppCarouselContent6/>*/}
        </AppCarousel>
      </div>

      <Container className="bg-[#020E29]">
        {/*Tabs*/}
        {isMobile ? (
          <>
            <div className="mb-4" onClick={handleToSearchPage}>
              <Input
                className={cx(
                "py-0.5 px-2.5 text-xs rounded",
                      "!border-[var(--stroke-textfields)] bg-[var(--background-textfields)]"
                )}
                inputClassName={"text-sm placeholder:text-[#007aff] placeholder:text-[rgba(255,255,255,0.3)]"}
                placeholder={"Por favor insira o nome do jogo"}
                prefix={<SearchOutlined className={cx("text-xl mr-2", "text-[rgba(255,255,255,0.3)]")} />}
              />
            </div>

            <div className={"mb-2 sticky top-[52.5px] left-0 right-0 z-20 whitespace-nowrap"}>
              <DragScrollContainer>
                <section className={"flex flex-row items-center bg-[#000C26] px-0.5"}>
                  <IndexTabs hideIcon={true} activeTab={activeTab} label={label} setActiveTab={setActiveTab} setViewType={setViewType}/>
                </section>
              </DragScrollContainer>
            </div>

          </>
          ): (
            <div className={"flex flex-row justify-center items-center"}>

              <section className="mb-4 flex flex-row items-center px-4 w-full">
                <div className="mr-2 grow">
                  <ScrollTab className="mx-4">
                    <IndexTabs activeTab={activeTab} label={label} setActiveTab={setActiveTab} setViewType={setViewType}/>
                  </ScrollTab>
                </div>
              </section>

              <div className="shirnk-0 grow-0 basis-[150px]">
                <Input
                  className="items-baseline"
                  prefix={<img src={`assets/${environment.assetPrefix}/icon_24.png`}/>}
                  placeholder={"Pesquisar nome do jogo"}
                  onChange={(event: any) => {
                    setSearchInput(event.target.value)
                  }}
                />
              </div>
            </div>
        )}

        <div className="bg-[#000C26]">
          {gameList()}
        </div>

      </Container>

    </>
  )
}
