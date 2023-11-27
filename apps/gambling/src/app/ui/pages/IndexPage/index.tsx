// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../hooks/useBreakpoint";
import {GameTypeSectionList} from "../../components-bs/GameTypeSection";
// @ts-ignore
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";
import {useSearchGames} from "../../hooks/useSearchGames";
import {AppLocalStorage} from "../../../persistant/localstorage";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {IndexPage as PIndexPage} from "./env/pernambucana/IndexPage";
import {IndexPage as WIndexPage} from "./env/wild/IndexPage";
import {IndexPage as CIndexPage} from "./env/coco/IndexPage";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {useScrollToCarousel} from "./useScrollToCarousel";


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

export const MobileGameNumber = 15;
export const DesktopGameNumber = 30;


export const IndexPage = () => {
  const favoriteLocal = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocal) || '{}')
  const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')
  const [totalFavoriteLocalState, setTotalFavoriteLocalState] = useState<TTotalFavoriteLocalState>({
    local: favoriteLocal,
    localArr: favoriteLocalArr
  })

  const { isMobile } = useBreakpoint();
  const { allGameList = [], typeGameList = [], label } = useSelector((state: any) => state.gameList);
  // const [activeTab, setActiveTab] = useState("Todos");
  // "Salão"
  const [activeTab, setActiveTab] = useState("Todos");
  const [expandedBrand, setExpandedBrand] = useState('');
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
      const typeGame = typeGameList.filter((item: any) => item.gameType === i.gameType)[0] || {}
      const expandCount = typeGame.data?.reduce((acc: number, current: any) => acc + current.games.length , 0)

      return (
        <GameTypeSectionList
          hotGames={true}
          isLatestItem={allGameList.length - 1 === index}
          key={index}
          gameTypeName={i.gameType}
          data={i.data.games}
          onClickExpand={() => setActiveTab(i.gameType)}
          totalFavoriteLocalState={totalFavoriteLocalState}
          setTotalFavoriteLocalState={setTotalFavoriteLocalState}
          expandCount={expandCount}
        />
      )
    })
  }
  const {showFixForIOSStickTab, scrollToCarousel} = useScrollToCarousel();

  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: string }[] }[] = []

    if(activeTab === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
      const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')

      list = [{ subGameType: 'Favoritos', games: favoriteLocalArr[userInfo.user_id]}]
    } else if (activeTab === 'Recente') {
      const recentGames = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.gameRecentLocal) || '[]')
      list = [{ subGameType: 'Recente', games: recentGames}]
    } else {
      const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === activeTab)[0]?.data
      list = expandedBrand !== '' ? data.filter((i: any) => i.subGameType === expandedBrand) : data;
    }

    return list?.map(({subGameType,games}: any, index: number) => {
      return (
        <GameTypeSectionList
          isLatestItem={list.length - 1 === index}
          key={index}
          gameTypeName={subGameType}
          data={games}
          onClickExpand={() => {
            setExpandedBrand(subGameType);
            scrollToCarousel();
          }}
          isViewAll={['Favoritos', 'Recente'].includes(subGameType)}
          expandedBrand={expandedBrand}
          setExpandedBrand={setExpandedBrand}
          totalFavoriteLocalState={totalFavoriteLocalState}
          setTotalFavoriteLocalState={setTotalFavoriteLocalState}
        />
      )
    })
  }

  const gameList = () => {
    if (searchInput !== '') {
      return searchResults.length > 0
        ? (
          <GameTypeSectionList
            isLatestItem={true}
            gameTypeName={'null'}
            data={searchResults}
            onClickExpand={() => {
              navigate(PageOrModalPathEnum.IndexSlotPage)
              window.scrollTo({ left: 0, behavior: "smooth"});
            }}
            totalFavoriteLocalState={totalFavoriteLocalState}
            setTotalFavoriteLocalState={setTotalFavoriteLocalState}
          />
        )
        : <></>
    } else {
      return (activeTab === "Todos" || activeTab === "Salão") ? renderAllGameList() : renderTypeGameList()
    }
  }

  useEffect(() => {
    gameList();
  }, [activeTab])



  return renderByPlatform({
    "wild777bet": (
      <WIndexPage
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        totalFavoriteLocalState={totalFavoriteLocalState}
        setTotalFavoriteLocalState={setTotalFavoriteLocalState}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
      />
    ),
    "coco777bet": (
      <CIndexPage
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        totalFavoriteLocalState={totalFavoriteLocalState}
        setTotalFavoriteLocalState={setTotalFavoriteLocalState}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
      />
    )
  }, (
    (
      <PIndexPage
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        totalFavoriteLocalState={totalFavoriteLocalState}
        setTotalFavoriteLocalState={setTotalFavoriteLocalState}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
      />
    )
  ))

}
