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
import {AppCarouselContent} from "../../Carousel/env/wild/AppCarouselContent";
import {AppCarouselContent2} from "../../Carousel/env/wild/AppCarouselContent2";
import {AppCarouselContent3} from "../../Carousel/env/wild/AppCarouselContent3";
import {AppCarouselContent4} from "../../Carousel/env/wild/AppCarouselContent4";
import {AppCarouselContent5} from "../../Carousel/env/wild/AppCarouselContent5";
import {AppCarouselContent6} from "../../Carousel/env/wild/AppCarouselContent6";
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
          {/*<CocoAppCarouselContent6/>*/}
        </AppCarousel>
      </div>

      <Container className="bg-[#020E29]">
        {/*Tabs*/}
        {isMobile ? (
          <>
            <div className="mb-4" onClick={handleToSearchPage}>
              <Input className={"py-0.5 px-2.5 text-xs border-none bg-[#09213d] placeholder:text-[#007aff] rounded"}
                     inputClassName={"placeholder:text-[#007aff] text-sm placeholder:font-bold"}
                     placeholder={"Por favor insira o nome do jogo"}
                     suffix={<SearchOutlined className={"text-[#007aff] text-xl"} />}
              />
            </div>

            <div className={"mb-2 sticky top-[52.5px] left-0 right-0 z-20 border-b border-solid border-[#ffffff26] whitespace-nowrap"}>
              <DragScrollContainer>
                <section className={"flex flex-row items-center bg-[#000C26] px-0.5"}>
                  <Tabs className={"game-type-tab-list"}>
                    <div>
                      {label !== undefined && ["Salão", ...label, 'Favoritos'].map((tab: string, index: number) => {
                        return (
                          <CocoTabItem
                            key={index}
                            className={cx(`font-bold border-none border-0 rounded `, {
                              'bg-[#262fa8] text-white py-0.5': activeTab === tab,
                              'text-[#9ea3bb]': activeTab !== tab
                            })}
                            name={tab}
                            active={activeTab === tab}
                            onClick={() => {
                              setActiveTab(tab);
                              setViewType('');
                            }}
                          />
                        )
                      })}
                    </div>
                  </Tabs>
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
                  prefix={<img src={`assets/${environment.assetPrefix}/icon_24.png`} placeholder={"Pesquisar nome do jogo"} />}
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