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
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";

export const MobileGameNumber = 15;
export const DesktopGameNumber = 30;


export const IndexPage = () => {
  const { isMobile } = useBreakpoint();
  const { hotBrandGameList = [], allGameList = [], typeGameList = [], label } = useSelector((state: any) => state.gameList);
  // const [activeTab, setActiveTab] = useState("Todos");
  // "Salão"
  const [activeTab, setActiveTab] = useState("Todos");
  const [expandedBrand, setExpandedBrand] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { searchResults, handleSearchGames } = useSearchGames(searchInput);
  const { userFavorite, onClickFavoriteGameItem, totalFavoriteLocalState } = useClickFavoriteGameItem()
  const recentGameList = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.gameRecentLocal) || '[]')

  const navigate = useNavigate();

  const handleViewAll = () => {
    //
  }

  useEffect(() => {
    handleSearchGames(searchInput)
  }, [searchInput])

  const renderHotBrandGameList = () => {
    return hotBrandGameList !== undefined && hotBrandGameList.map((i: any, index: number) => {
      const typeGame = typeGameList.filter((item: any) => item.gameType === i.gameType)[0] || {}
      const expandCount = typeGame.data?.reduce((acc: number, current: any) => acc + current.games.length , 0)

      return (
        <GameTypeSectionList
          key={index}
          userFavorite={userFavorite}
          onClickFavoriteGameItem={onClickFavoriteGameItem}
          hotGames={true}
          isLatestItem={hotBrandGameList.length - 1 === index}
          gameTypeName={i.gameType}
          data={i.data.games}
          onClickExpand={() => setActiveTab(i.gameType)}
          expandCount={expandCount}
        />
      )
    })
  }
  const {showFixForIOSStickTab, scrollToCarousel} = useScrollToCarousel();

  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: number }[] }[] = []

    if(activeTab === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
      list = [{ subGameType: 'Favoritos', games: totalFavoriteLocalState.localArr[userInfo.user_id] || [] }]
    } else {
      const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === activeTab)[0]?.data
      list = expandedBrand !== '' ? data.filter((i: any) => i.subGameType === expandedBrand) : data;
    }

    return list?.map(({subGameType,games}: any, index: number) => {
      return (
        <GameTypeSectionList
          key={index}
          userFavorite={userFavorite}
          onClickFavoriteGameItem={onClickFavoriteGameItem}
          isLatestItem={list.length - 1 === index}
          gameTypeName={subGameType}
          data={games}
          onClickExpand={() => {
            setExpandedBrand(subGameType);
            scrollToCarousel();
          }}
          isViewAll={['Favoritos'].includes(subGameType)}
          expandedBrand={expandedBrand}
          setExpandedBrand={setExpandedBrand}
        />
      )
    })
  }

  const {scrollToWindowTop} = useScrollToCarousel();
  const gameList = () => {
    if (searchInput !== '') {
      return searchResults.length > 0
        ? (
          <GameTypeSectionList
            userFavorite={userFavorite}
            onClickFavoriteGameItem={onClickFavoriteGameItem}
            isLatestItem={true}
            gameTypeName={'null'}
            data={searchResults}
            onClickExpand={() => {
              navigate(PageOrModalPathEnum.IndexSlotPage)
              scrollToWindowTop();
            }}
          />
        )
        : <></>
    } else {
      return (activeTab === "Todos" || activeTab === "Salão") ? renderHotBrandGameList() : renderTypeGameList()
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
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
        recentGameList={recentGameList}
      />
    ),
    "coco777bet": (
      <CIndexPage
        userFavorite={userFavorite}
        onClickFavoriteGameItem={onClickFavoriteGameItem}
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
        recentGameList={recentGameList}
      />
    )
  }, (
    (
      <PIndexPage
        userFavorite={userFavorite}
        onClickFavoriteGameItem={onClickFavoriteGameItem}
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
        recentGameList={recentGameList}
      />
    )
  ))

}
