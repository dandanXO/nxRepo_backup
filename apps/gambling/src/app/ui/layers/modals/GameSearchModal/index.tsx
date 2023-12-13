import { SearchOutlined } from "@ant-design/icons"
import { CloseICON } from "../../../components/Icons/CloseICON"
import { Input, InputValue } from "../../../components/Inputs/Input";
import cx from 'classnames';
import { SearchInput } from "../../../components/Inputs/SearchInput";
import { useSearchGames } from "../../../hooks/useSearchGames";
import { useEffect, useState } from "react";
import { GameListSection } from "./components/GameListSection";

import { MobileGameItem } from "../../../components-bs/GameTypeSection/GameItem/MobileGameItem";
import { DesktopGameItem } from "../../../components-bs/GameTypeSection/GameItem/GameItem";
import useBreakpoint from "../../../hooks/useBreakpoint";
import { usePageNavigate } from "../../../hooks/usePageNavigate";
import { useClickFavoriteGameItem } from "../../../hooks/useClickFavoriteGameItem";
import { useSelector } from "react-redux";
import { NoData } from "../../../components/Icons/NoData";
import { environment } from "../../../../../environments/environment";
import { Icon } from "../../../components/Icons";
import { GameItem } from "../../../components-bs/GameTypeSection";

interface IGameSearchModal {
  onClose: () => void
  userFavorite: number[]
  onClickFavoriteGameItem: (item: GameItem) => void
}
export const GameSearchModal = (props: IGameSearchModal) => {
  const [searchInput, setSearchInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const { searchResults, handleSearchGames } = useSearchGames(searchInput.data);
  const { typeGameList = [] } = useSelector((state: any) => state.gameList);
  const [listSize, setListSize] = useState(9);
  const recommendItems = typeGameList && typeGameList[0]?.data[0]?.games.slice(0, listSize);


  useEffect(() => {
    if (searchInput.data.length >= 3) {
      handleSearchGames(searchInput.data)
    }

  }, [searchInput.data]);


  const loadMore = () => {
    setListSize(listSize + 9);
  }

  const { isMobile } = useBreakpoint();
  const { onClickGameItem } = usePageNavigate();
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem;

  const gameList = (data: any) => {
    if (data?.length > 0) {
      return (
        <div className={cx("flex", {
          "flex-wrap w-full": isMobile
        })}>
          {data && data.map((item: any, index: any) => {
            return (
              <MainGameItem
                className={cx(" grow-0 shrink-0 ", {
                  "w-[33vw] h-[33vw]": isMobile,
                  "mr-[16px] !basis-[150px] !h-[170px]": !isMobile
                })}
                key={index}
                gameId={Number(item.gameId)}
                name={item.name}
                imageURL={`https://resources.ttgroup.vip/icon/${item.gameId}-small.png`}
                onClick={() => { onClickGameItem(item) }}
                favorite={(props.userFavorite).includes(Number(item.gameId))}
                onClickFavorite={() => { props.onClickFavoriteGameItem(item) }}
              />
            )
          })}
        </div>
      )
    } else {
      return <div className="flex flex-col flex-1 justify-center items-center py-3.5">
        <NoData />
        <div className="text-xs mt-3.5">Nenhum jogo encontrado</div>
      </div>
    }
  }


  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-[1002] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]">
      <div className={cx("fixed  bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] rounded-lg", {
        "w-[80%]": !isMobile,
        "w-[90%] h-[90%]": isMobile
      })}>

        <div className="h-full flex flex-col">


          <div className={"flex-none px-3 py-3.5 sm:p-6"}>
            <div className="flex justify-between items-center mb-2 sm:mb-3.5">
              <div className="text-base text-white">Procurar</div>
              <button onClick={props.onClose} className="-m-2"><CloseICON /></button>

            </div>
            <SearchInput
              placeholder={"Pesquisar nome do jogo"}
              value={searchInput.data}
              onChange={(event: any) => {
                setSearchInput({
                  data: event.target.value,
                  isValidation: true,
                  errorMessage: "",
                });

              }}
            />
            <div className="text-white text-xs text-center">Insira pelo menos 3 símbolos para iniciar a pesquisa</div>
          </div>
          <div className="flex-1 overflow-auto game-list ">
            {searchInput.data.length >= 3 && (
              <GameListSection
                className="text-white "
                icon={<SearchOutlined className={"text-white text-sm mr-2 flex justify-center items-center"} />}
                title={'Procurar Resultados'}
                children={gameList(searchResults)}
                expandedBrand={false}
              />)
            }
            <GameListSection
              className="text-white"
              icon={<Icon className="w-[24px] h-[24px] mr-1" img={`assets/${environment.assetPrefix}/icon=recommend.png`} name={'recommend'} />}
              title={'Jogos que você deveria experimentar'}
              children={gameList(recommendItems)}
              expandedBrand={isMobile}
              loadMore={loadMore}
            />
            </div>
        </div>
      </div>
    </div>
  )
}
