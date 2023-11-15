import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../../hooks/useBreakpoint";
import {GameTypeSectionList} from "../../../components/GameTypeSection";
import {Input} from "../../../components/Inputs/Input";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {environment} from "../../../../../environments/environment"
import {IndexTabs} from "../IndexTabs";
import FakeBanner from "./FakeBanner.png";
import {AppCarousel} from "../AppCarousel";
import styled from "styled-components";
import {CocoAppCarouselContent} from "../AppCarousel/env/CocoAppCarouselContent";
import {CocoAppCarouselContent2} from "../AppCarousel/env/CocoAppCarouselContent2";
import {CocoAppCarouselContent3} from "../AppCarousel/env/CocoAppCarouselContent3";
import {CocoAppCarouselContent4} from "../AppCarousel/env/CocoAppCarouselContent4";
import {CocoAppCarouselContent5} from "../AppCarousel/env/CocoAppCarouselContent5";
import {CocoAppCarouselContent6} from "../AppCarousel/env/CocoAppCarouselContent6";
import { TabItem, Tabs } from "../../../components/TabItem/TabItem";
import { CocoTabItem } from "../../../components/TabItem/CocoTabItem";
import { DragScrollContainer } from "../../../components/DragScrollContainer";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {CompanySloganLabel} from "./CompanySloganLabel";
import { usePageNavigate } from "../../../hooks/usePageNavigate";
import {Container} from "../../../components/container/Container";

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

export const CocoIndexPage = ({
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
  const {onClickToSearch} = usePageNavigate();

  useEffect(() => {
    if (activeTab === "Todos") {
      setActiveTab("Salão")
    }
  }, [])

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
          <CocoAppCarouselContent/>
          <CocoAppCarouselContent2/>
          <CocoAppCarouselContent3/>
          <CocoAppCarouselContent4/>
          <CocoAppCarouselContent5/>
          {/*<CocoAppCarouselContent6/>*/}
        </AppCarousel>
      </div>

      <Container className="bg-[#020E29]">
        {/*Tabs*/}
        {isMobile ? (
          <div className={"mb-2 sticky top-[52.5px] left-0 right-0 z-20 border-b border-solid border-[#ffffff26] whitespace-nowrap"}>
            <DragScrollContainer>
              <section className={"flex flex-row items-center bg-[#000C26] px-0.5"}>
                <Tabs className={"game-type-tab-list"}>
                  <div>
                    {label !== undefined && ["Salão", ...label, 'Favoritos'].map((tab: string, index: number) => {
                      return (
                        <CocoTabItem
                          key={index}
                          name={tab}
                          active={activeTab === tab}
                          onClick={() => setActiveTab(tab)}
                          className={cx(`font-bold border-none border-0 rounded `, {
                            'bg-[#262fa8] text-white py-0.5': activeTab === tab,
                            'text-[#9ea3bb]': activeTab !== tab
                          })}
                        />
                      )
                    })}
                  </div>
                </Tabs>
              </section>
            </DragScrollContainer>
          </div>
          ): (
            <section
              style={{borderBottom: '1px solid rgb(44, 253, 153)'}}
              className="mb-4 flex flex-row items-center px-4 w-full"
            >
              <div className="mr-2 grow">
                <IndexTabs activeTab={activeTab} label={label} setActiveTab={setActiveTab} setViewType={setViewType}/>
              </div>

            </section>
        )}

        {isMobile ? (
          <div className="mb-4" onClick={onClickToSearch}>
            <Input className={"py-0.5 px-2.5 text-xs border-none bg-[#09213d] placeholder:text-[#007aff] rounded"}
                   inputClassName={"placeholder:text-[#007aff] text-sm placeholder:font-bold"}
                   placeholder={"Por favor insira o nome do jogo"}
                   suffix={<SearchOutlined className={"text-[#007aff] text-xl"} />}
            />
          </div>
        ): (
          <div className="shirnk-0 grow-0 basis-[150px]">
            <Input
              className="bg-[#069D5C] items-baseline"
              prefix={<img src={`assets/${environment.assetPrefix}/icon_24.png`} placeholder={"Pesquisar nome do jogo"} />}
              onChange={(event: any) => {
                setSearchInput(event.target.value)
              }}
            />
          </div>
        )}

        <div className="bg-[#000C26]">
          {gameList()}
        </div>

      </Container>

    </>
  )
}
