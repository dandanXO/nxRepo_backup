import { SearchOutlined } from "@ant-design/icons"
import { CloseICON } from "../../components/Icons/CloseICON"
import { Input, InputValue } from "../../components/Inputs/Input";
import cx from 'classnames';
import { SearchInput } from "../../components/Inputs/SearchInput";
import { useSearchGames } from "../../hooks/useSearchGames";
import { useEffect, useState } from "react";
import { GameListSection } from "./components/GameListSection";

import { MobileGameItem } from "../../components-bs/GameTypeSection/GameItem/MobileGameItem";
import { DesktopGameItem } from "../../components-bs/GameTypeSection/GameItem/GameItem";
import useBreakpoint from "../../hooks/useBreakpoint";
import { usePageNavigate } from "../../hooks/usePageNavigate";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";
import { useSelector } from "react-redux";
import { NoData } from "../../components/Icons/NoData";
import { environment } from "apps/gambling/src/environments/environment";
import { Icon } from "../../components/Icons";

interface IGameSearchModal {
  onClose: () => void
}
export const GameSearchModal = (props: IGameSearchModal) => {
  const [searchInput, setSearchInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });
  const { searchResults, handleSearchGames } = useSearchGames(searchInput.data);
  const { typeGameList = [] } = useSelector((state: any) => state.gameList);

  useEffect(() => {
    if (searchInput.data.length >= 3) {
      handleSearchGames(searchInput.data)
    }

  }, [searchInput.data]);

  const { isMobile } = useBreakpoint();
  const { onClickGameItem } = usePageNavigate();
  const { onClickFavoriteGameItem, userFavorite } = useClickFavoriteGameItem();
  const MainGameItem = isMobile ? MobileGameItem : DesktopGameItem;
  const gameList = (data: any) => {
    if (data?.length > 0) {
      return (
        <>
          {data && data.map((item: any, index: any) => {
            return (
              <MainGameItem
                key={index}
                gameId={Number(item.gameId)}
                name={item.name}
                imageURL={`https://resources.ttgroup.vip/icon/${item.gameId}-small.png`}
                onClick={() => { onClickGameItem(item) }}
                favorite={(userFavorite).includes(Number(item.gameId))}
                onClickFavorite={() => { onClickFavoriteGameItem(item) }}
              />
            )
          })}
        </>
      )
    } else {
      return <div className="flex flex-col flex-1 justify-center items-center py-3.5">
        <NoData />
        <div className="text-xs mt-3.5">Nenhum jogo encontrado</div>
      </div>
    }
  }


  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-[999] flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.65)]">
      <div className={cx("fixed  bg-gradient-to-b from-[var(--background-modal-from)] to-[var(--background-modal-to)] rounded-lg", {
        "w-[80%]": !isMobile,
        "w-[90%]": isMobile
      })}>

        <div className={"px-3 py-3.5 sm:p-6"}>
          <div className="flex justify-between items-center mb-2 sm:mb-3.5">
            <div className="text-base text-white">Procurar</div>
            <button onClick={props.onClose} className="-m-2"><CloseICON /></button>

          </div>
          <SearchInput placeholder={"Pesquisar nome do jogo"}
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
        {searchInput.data.length >= 3 && (<GameListSection className="text-white" icon={<SearchOutlined className={"text-white text-sm mr-2"} />} title={'Procurar Resultados'} children={gameList(searchResults)} />)}
        <GameListSection className="text-white" icon={<Icon className="w-[24px] h-[24px] mr-1" img={`assets/${environment.assetPrefix}/icon=recommend.png`} name={'recommend'} />} title={'Procurar Resultados'} children={gameList(typeGameList[0]?.data[0]?.games)} />
      </div>
    </div>
  )
}
