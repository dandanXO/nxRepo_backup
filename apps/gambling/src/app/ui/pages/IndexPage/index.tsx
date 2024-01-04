// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {GameTypeSectionList} from "../../components-bs/GameTypeSection";
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import { gameSlice } from "../../../reduxStore/gameSlice";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";
import {useSearchGames} from "../../hooks/useSearchGames";
import {AppLocalStorage} from "../../../persistant/localstorage";

import {renderByPlatform} from "../../utils/renderByPlatform";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import {useScrollToPartPageTemplate} from "../../pageTemplate/hooks/useScrollToPartPageTemplate";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";

import {IndexPage as WIndexPage} from "./env/wild/IndexPage";
import {IndexPage as CIndexPage} from "./env/coco/IndexPage";
import {IndexPage as RIndexPage} from "./env/riojungle/IndexPage";

export const MobileGameNumber = 15;
export const DesktopGameNumber = 30;


export const IndexPage = () => {
  const dispatch = useDispatch();
  const { isMobile } = useBreakpoint();
  const { hotBrandGameList = [], allGameList = [], typeGameList = [], label } = useSelector((state: any) => state.gameList);
  // console.log('hotBrandGameList----',hotBrandGameList)
  // const [activeTab, setActiveTab] = useState("Todos");
  // "Salão"
  const [activeTab, setActiveTab] = useState("Todos");
  const { indexPagecurrentSelectLabel } = useSelector((state: any) => state.gameList);
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
          onClickExpand={() => {
            // 兼容兩者
            setActiveTab(i.gameType)
            return dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel(i.gameType))
          }}
          expandCount={expandCount}
        />
      )
    })
  }
  const {showFixForIOSStickTab, scrollToCarousel, scrollToWindowTop} = useScrollToPartPageTemplate();
  const renderTypeGameListOld=()=>{
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

  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: number }[] }[] = []

    if(indexPagecurrentSelectLabel === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
      list = [{ subGameType: 'Favoritos', games: totalFavoriteLocalState.localArr[userInfo.user_id] || [] }]
    } else {
      const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === indexPagecurrentSelectLabel)[0]?.data
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
      return (indexPagecurrentSelectLabel === "Todos" || indexPagecurrentSelectLabel === "Salão") ? renderHotBrandGameList() : renderTypeGameList()
    }
  }
  const gameListOld = () => {
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
            }}
          />
        )
        : <></>
    } else {
      return (activeTab === "Todos" || activeTab === "Salão") ? renderHotBrandGameList() : renderTypeGameListOld()
    }
  }

  useEffect(() => {
    gameList();
  }, [indexPagecurrentSelectLabel])

  useEffect(() => {
    gameListOld();
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
    ),
    "riojungle777bet": (
      <RIndexPage
        userFavorite={userFavorite}
        onClickFavoriteGameItem={onClickFavoriteGameItem}
        showFixForIOSStickTab={showFixForIOSStickTab}
        scrollToCarousel={scrollToCarousel}
        allGameList={allGameList}
        label={label}
        activeTab={indexPagecurrentSelectLabel}
        setViewType={setExpandedBrand}
        setSearchInput={setSearchInput}
        gameList={gameList}
        recentGameList={recentGameList}
      />
    )
  }, (
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
  ))

}
