// NOTE; https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css';
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {GameTypeSectionList} from "../../components-bs/GameTypeSection";
// import { default as data } from "../../components/GameTypeSection/mock/gameList.json";
import React, {useEffect, useState} from "react";
import {environment} from "../../../../environments/environment";
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
import { DragScrollContainer } from "../../components/DragScrollContainer";
import { SubTabItem } from "../../components-bs/TabItem/env/riojungle/TabItem";

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
  const [subGameactiveTab, setSubGameActiveTab] = useState("All");
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
          isViewAll={indexPagecurrentSelectLabel === "Todos"}
          labelImgUrl={`assets/${environment.uVersion}/shared/${subGameactiveTab.split('-')[0]}-logo.png`}
          key={index}
          userFavorite={userFavorite}
          onClickFavoriteGameItem={onClickFavoriteGameItem}
          hotGames={true}
          isLatestItem={hotBrandGameList.length - 1 === index}
          gameTypeName={i.gameType}
          data={i.data.games}
          onClickExpand={() => {
            setActiveTab(i.gameType)
            return dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel(i.gameType))
          }}
          expandCount={expandCount}
        />
      )
    })
  }
  const {showFixForIOSStickTab, scrollToCarousel, scrollToWindowTop} = useScrollToPartPageTemplate();
  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: number }[] }[] = []
    if(indexPagecurrentSelectLabel === 'Favoritos' || activeTab === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
      list = [{ subGameType: 'Favoritos', games: totalFavoriteLocalState.localArr[userInfo.user_id] || [] }]
    } else {
      // 未使用 redux 因此去 componet status去找
      if(indexPagecurrentSelectLabel === "nothing_select"){
        const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === activeTab)[0]?.data
        list = expandedBrand !== '' ? data.filter((i: any) => i.subGameType === expandedBrand) : data;
      }else{
        const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === indexPagecurrentSelectLabel)[0]?.data
        list = expandedBrand !== '' ? data.filter((i: any) => i.subGameType === expandedBrand) : data;
      }
    }
    // 大部分版本 因為沒有二級選項可以用  subGameactiveTab 永遠都會是 All
    // 因此這部分不會一直被執行 filter
    if(subGameactiveTab !== 'All'){
      // eslint-disable-next-line array-callback-return
      const findedList = list.filter(item => {
        if(item.subGameType === subGameactiveTab){
          return item
        }
      })
      list = findedList
    }
    return (
      <div>
        {
          list?.map(({subGameType,games}: any, index: number) => {
            return (
              <GameTypeSectionList
                labelImgUrl={`assets/${environment.uVersion}/shared/${subGameactiveTab.split('-')[0]}-logo.png`}
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
      </div>
    )
  }
  const gameList = () => {
    if (searchInput !== '') {
      return searchResults.length > 0
        ? (
          <GameTypeSectionList
            labelImgUrl={`assets/${environment.uVersion}/shared/${subGameactiveTab.split('-')[0]}-logo.png`}
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
      // 未使用 redux 因此去 componet status去找
      if(indexPagecurrentSelectLabel === 'nothing_select'){
        return (activeTab === "Todos" || activeTab === "Salão") ? renderHotBrandGameList() : renderTypeGameList()
      } else {
        return (indexPagecurrentSelectLabel === "Todos" || indexPagecurrentSelectLabel === "Salão"  ) ? renderHotBrandGameList() : renderTypeGameList()
      }
      
    }
  }
  const subGameMenu = ()=>{
    let subGameMenuList:string[] = []
    const data = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === indexPagecurrentSelectLabel)[0]?.data
      if(!data){
        // 遊戲之外的東西不會有二級選項
        return null
      }
      subGameMenuList = data.reduce((acc:string[], current:{[key: string]: string;})=> {
        acc.push(current.subGameType)
        return acc
      } , [] as string[])
    return (
      <DragScrollContainer className="flex flex-row items-center rounded-[8px] mt-3 md:mt-4 lg:mt-5">
      <div className="bg-[#333333] flex flex-row rounded-[8px] p-2">
        {
          ["All", ...subGameMenuList].map((tab: string, index: number) => {
            return (
              <SubTabItem
                active={subGameactiveTab === tab}
                onClick={() => {
                  setSubGameActiveTab(tab)
                }}
                name={tab}
                imgUrl={`assets/${environment.uVersion}/shared/${tab.split('-')[0]}-logo.png`}
              />
            )
          })
        }
      </div>
    </DragScrollContainer>
    )
  }
  useEffect(() => {
    // 第二層子遊戲選單 切換遊戲大類 必須重置回ＡＬＬ
    setSubGameActiveTab('All')
    gameList();
  }, [indexPagecurrentSelectLabel])

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
        subGameMenu={subGameMenu}
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
