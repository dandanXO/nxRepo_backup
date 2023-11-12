// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../hooks/useBreakpoint";
import {GameTypeSectionList} from "../../components/GameTypeSection";
// @ts-ignore
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useSelector} from "react-redux";
import {useSearchGames} from "../../hooks/useSearchGames";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {environment} from "../../../../environments/environment"
import {PernambucanaIndexPage} from "./env/PernambucanaIndexPage";
import {CocoIndexPage} from "./env/CocoIndexPage";

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

  if(environment.assetPrefix === "coco777bet") {
    return (
      <CocoIndexPage
        allGameList={allGameList}
        totalFavoriteLocalState={totalFavoriteLocalState}
        setTotalFavoriteLocalState={setTotalFavoriteLocalState}
        label={label}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setViewType={setViewType}
        setSearchInput={setSearchInput}
        gameList={gameList}
      />
    )
  }

  return (
    <PernambucanaIndexPage
      allGameList={allGameList}
      totalFavoriteLocalState={totalFavoriteLocalState}
      setTotalFavoriteLocalState={setTotalFavoriteLocalState}
      label={label}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      setViewType={setViewType}
      setSearchInput={setSearchInput}
      gameList={gameList}
    />
  )
}
