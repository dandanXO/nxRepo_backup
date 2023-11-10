import cx from "classnames";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import { AppCarousel } from "./AppCarousel";
import useBreakpoint from "../../hooks/useBreakpoint";
import { TabItem, Tabs } from "../../components/TabItem";
import { GameTypeSectionList } from "../../components/GameTypeSection";
import { MockSlot2 } from "../../components/GameTypeSection/mock/MockSlot2";
import { MockSlot } from "../../components/GameTypeSection/mock/MockSlot";
import { LeftSquareOutlined, RightSquareOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "../../components/Input";
// @ts-ignore
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import { useEffect, useRef, useState } from "react";
import { useLazyGetGameListQuery } from "../../../external";
import { GetGameListResponseData } from "../../../external/GetGameListEndpoint";
import { useNavigate } from "react-router";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useSelector } from "react-redux";
import { useSearchGames } from "../../hooks/useSearchGames";
import {AppLocalStorage} from "../../../persistant/localstorage";
import { ScrollTab } from "../../components/ScrollTab";
import { environment } from "../../../../environments/environment"


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


export const IndexPage = () => {
  const favoriteLocal = JSON.parse(AppLocalStorage.getItem('favoriteLocal') || '{}')
  const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem('favoriteLocalArr') || '{}')
  const [totalFavoriteLocalState, setTotalFavoriteLocalState] = useState<TTotalFavoriteLocalState>({
    local: favoriteLocal,
    localArr: favoriteLocalArr
  })

  const { isMobile } = useBreakpoint();
  const { allGameList = [], typeGameList = [], label } = useSelector((state: any) => state.gameList);
  const [activeTab, setActiveTab] = useState("Todos");
  const [viewType, setViewType] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { searchResults, handleSearchGames } = useSearchGames(searchInput);

  const navigate = useNavigate();

  const handleViewAll = () => {
    //
  }

  useEffect(() => {
    handleSearchGames(searchInput)
  }, [searchInput])

  const renderAllGameList = () => {
    return allGameList !== undefined && allGameList.map((i: any, index: number) => {
      return <GameTypeSectionList  key={index} gameTypeName={i.gameType} data={i.data.games} onClick={() => setActiveTab(i.gameType)} totalFavoriteLocalState={totalFavoriteLocalState} setTotalFavoriteLocalState={setTotalFavoriteLocalState}/>
    })
  }

  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: string }[] }[] = []

    if(activeTab === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem('userInfo') || '{}')
      const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem('favoriteLocalArr') || '{}')

      list = [{ subGameType: 'Favoritos', games: favoriteLocalArr[userInfo.user_id]}]
    } else {
      const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === activeTab)[0]?.data
      list = viewType !== '' ? data.filter((i: any) => i.subGameType === viewType) : data;
    }

    return list.map(({subGameType,games}: any, index: number) => {
      return <GameTypeSectionList key={index} gameTypeName={subGameType} data={games} onClick={() => setViewType(subGameType)} isViewAll={viewType!==''} totalFavoriteLocalState={totalFavoriteLocalState} setTotalFavoriteLocalState={setTotalFavoriteLocalState} setViewType={setViewType}/>
    })
  }

  const gameList = () => {

    if (searchInput !== '') {
      return searchResults.length > 0
        ? <GameTypeSectionList gameTypeName={'null'} data={searchResults} onClick={() => navigate(PageOrModalPathEnum.IndexSlotPage)} totalFavoriteLocalState={totalFavoriteLocalState} setTotalFavoriteLocalState={setTotalFavoriteLocalState}/>
        : <></>
    } else {
      return activeTab === "Todos" ? renderAllGameList() : renderTypeGameList()
    }
  }

  return (
    <>
      <div className={cx("w-full", {
        "w-[calc(100vw-265px)] ml-20": !isMobile,
        "p-4": !isMobile,
      })}>

      <AppCarousel />
      </div>

      <div className={"p-4"}>
        {/*遊戲列表背景*/}
        {isMobile ? (
          allGameList !== undefined && allGameList.map((i: any, index: number) => {
            return <GameTypeSectionList key={index} totalFavoriteLocalState={totalFavoriteLocalState} setTotalFavoriteLocalState={setTotalFavoriteLocalState} gameTypeName={i.gameType} data={i.data.games} onClick={()=>navigate(PageOrModalPathEnum.IndexSlotPage)} />
          })
        ) : (
            <section className="flex flex-col bg-assistant ml-20 p-4 rounded-lg w-[calc(88.6vw-265px)] border border-solid border-main-primary-main">
            <section className="mb-4 flex flex-row items-center px-4 w-full border-b border-solid border-main-primary-main">
                <div className="min-w-[100px] mr-2">
                  <ScrollTab className="mx-4">
                    <Tabs className={"game-type-tab-list  "}>
                      {
                        ["Todos", ...label, 'Favoritos'].map((tab: string, index: number) => {
                          return (
                            <TabItem
                              key={index}
                              name={tab}
                              active={activeTab === tab}
                              size="big"
                              onClick={() => {
                                setActiveTab(tab)
                                setViewType('')
                              }}
                            />)
                        })
                      }
                    </Tabs>
                  </ScrollTab>
                </div>
                <div className="shirnk-0 basis-[450px]">
                  <Input className="bg-medium items-baseline flex-1" prefix={<img src={`assets/${environment.assetPrefix}/icon_24.png`} placeholder={"Pesquisar nome do jogo"} />}
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
      </div>
    </>
  )
}
