import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import {AppCarousel} from "../../Carousel";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { GameItem, GameTypeSectionList } from "../../../../components-bs/GameTypeSection";
import {Input} from "../../../../components-bs/Inputs/Input";
// @ts-ignore
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {environment} from "../../../../../../environments/environment"
import {PernambucanaAppCarouselContent} from "../../Carousel/env/pernambucana/PernambucanaAppCarouselContent";
import { useClickFavoriteGameItem } from "../../../../hooks/useClickFavoriteGameItem";
import { gameSlice, indexPagecurrentSelectLabel } from "../../../../../reduxStore/gameSlice";
import { TabItem } from "../../../../components-bs/TabItem/TabItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../reduxStore";
import { useEffect } from "react";
import { PageContainer } from "../../../../components-bs/PageContainer";


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

type IPernambucana777BetIndexPage = {
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
  userFavorite,
  onClickFavoriteGameItem
}:IPernambucana777BetIndexPage) => {
  const dispatch = useDispatch();
  const { isMobile } = useBreakpoint();
  const navigate = useNavigate();

  const { indexPagecurrentSelectLabel } = useSelector((state:RootState)=> state.gameList)

  useEffect(() => {
    // 初始化 使用 redux
    if (indexPagecurrentSelectLabel === "nothing_select") {
      dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel('Todos'))
    }
  }, [])

  return (
    <>
      <PageContainer >
        <PernambucanaAppCarouselContent/>
      </PageContainer>

      <PageContainer>
        {/*遊戲列表背景*/}
        {isMobile ? (
          allGameList !== undefined && allGameList.map((i: any, index: number) => {
            return <GameTypeSectionList userFavorite={userFavorite} onClickFavoriteGameItem={onClickFavoriteGameItem} isLatestItem={allGameList.length - 1 === index} key={index}  gameTypeName={i.gameType} data={i.data.games} onClickExpand={()=>navigate(PageOrModalPathEnum.IndexSlotPage)} />
          })
        ) : (
          <section className="flex flex-col bg-[rgba(1,62,66,0.6)] p-4 rounded-lg " style={{ border: '1px solid #2CFD99' }}>
            <section className="mb-4 flex flex-row items-center px-4 w-full" style={{borderBottom: '1px solid rgb(44, 253, 153)'}}>
              <div className="min-w-[100px] mr-2">
                {
                  ["Todos", ...label, 'Favoritos'].map((tab: indexPagecurrentSelectLabel, index) => {
                    return (
                      <TabItem
                        className="flex-1 text-xs md:text-sm lg:text-base px-5"
                        active={indexPagecurrentSelectLabel === tab}
                        onClick={() => {
                          dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel(tab));
                          setViewType('')
                        }}
                        name={tab}
                      />
                    )
                  })
                }
              </div>
              <div className="shirnk-0 basis-[450px]">
                <Input className="bg-[#069D5C] items-baseline flex-1" prefix={<img src={`assets/${environment.uVersion}/icon_24.png`} placeholder={"Pesquisar nome do jogo"} />}
                       onChange={(event: any) => {
                         setSearchInput(event.target.value)
                       }}
                />
              </div>
            </section>

            <section className={"flex flex-col"}>
              {gameList()}
            </section>

          </section>
        )}
      </PageContainer>
    </>
  )
}
