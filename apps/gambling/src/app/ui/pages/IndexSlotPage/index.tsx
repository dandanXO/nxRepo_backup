import styled from "styled-components";
// NOTE; https://www.npmjs.com/package/react-multi-carousel
import useBreakpoint from "../../pageTemplate/hooks/useBreakpoint";
import {TabItem, Tabs} from "../../components-bs/TabItem/TabItem";
import {GameTypeSectionList} from "../../components-bs/GameTypeSection";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {ScrollTab} from "../../components-bs/TabItem/ScrollTab";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";


const StyledIndexPage = styled.div`
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    box-shadow: 0 0 3rem 0.5rem #090b0f inset;
  }
  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    opacity: .6;
    background: url("assets/page-bg-a5b0b48f.jpg") no-repeat center center/100% auto;
  }
`;


export const IndexSlotPage = () => {
  const { isMobile } = useBreakpoint();
  const [activeTab, setActiveTab] = useState("Salão");
  const { allGameList = [], typeGameList = [], label } = useSelector((state: any) => state.gameList);
  const { userFavorite, onClickFavoriteGameItem} = useClickFavoriteGameItem()

  const renderTypeGameList=()=>{
    let list: { subGameType: string, games: { gameId: string }[] }[] = []

    if(activeTab === 'Favoritos') {
      const userInfo = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.userInfo) || '{}')
      const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')

      list = [{ subGameType: 'Favoritos', games: favoriteLocalArr[userInfo.user_id]}]
    } else {
      list = typeGameList !== undefined && typeGameList.filter((i: any) => i.gameType === activeTab)[0]?.data
    }

    return list.map(({ subGameType, games }: any, index: number) => {
      return <GameTypeSectionList userFavorite={userFavorite} onClickFavoriteGameItem={onClickFavoriteGameItem} isLatestItem={list.length - 1 === index}  key={index} gameTypeName={subGameType} data={games} />
    })
  }

  const gameList = () => {
    return allGameList && activeTab === "Salão"
      ? allGameList !== undefined && allGameList.map((i: any, index:number) => {
        return <GameTypeSectionList userFavorite={userFavorite} onClickFavoriteGameItem={onClickFavoriteGameItem} isLatestItem={allGameList.length - 1 === index} key={index} gameTypeName={i.gameType} data={i.data.games} onClickExpand={() => setActiveTab(i.gameType)} />
      }) :
      renderTypeGameList()
  }

  const [initialPageX, setInitialPageX] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: any) => {
    setInitialPageX(e.pageX);
  };

  const handleMouseUp = (e: any) => {
    setInitialPageX(0);
  };

  const handleMouseMove = (e: any) => {
    if (initialPageX !== 0 && contentRef.current !== null) {
      const leftOrRight = initialPageX - e.pageX;
      contentRef.current.scrollLeft += leftOrRight;
      setInitialPageX(e.pageX);
    }
  };


  return (
    <>
      {isMobile ? (
        <div className={"px-4 sticky top-[52.5px] left-0 right-0 z-20"}>
        <div>
          <ScrollTab>
          <section className={"mb-4 flex flex-row items-center px-4 mt-3"}>
          <Tabs className={"game-type-tab-list"}>
            <TabItem key="Salão" name={"Salão"} active={activeTab === "Salão"} onClick={() => setActiveTab("Salão")} />
            <>
              {label!==undefined && [...label, 'Favoritos'].map((tab: string, index: number) => {
                return (
                  <TabItem
                    key={index}
                    name={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />)
              })}
            </>
          </Tabs>
          </section>
          </ScrollTab>
        </div>
        </div>

      ) : (
        <section className={"mb-4 flex flex-row items-center px-4"}>
          <Tabs className={"game-type-tab-list mr-4"}>
            <TabItem pureColor={true} key="Salão" name={"Salão"} active={activeTab === "Salão"} className={"w-[114px] text-xl"} onClick={() => setActiveTab("Salão")} />
            {label!==undefined && label?.map((tab: string, index: number) => {
              return (
                <TabItem
                  pureColor={true}
                  key={index}
                  name={tab}
                  active={activeTab === tab}
                  className={"w-[114px] text-xl"}
                  onClick={() => setActiveTab(tab)}
                />)
            })}
          </Tabs>
          {/* <Input prefix={<SearchOutlined className={"text-white text-lg"} placeholder={"Pesquisar nome do jogo"} />} /> */}
        </section>
      )}

      <div className={"p-4"}>
        {isMobile ? (
          gameList()
        ) : (
          <section className={"flex flex-col"}>
            {gameList()}
          </section>
        )}
      </div>
    </>
  )
}
