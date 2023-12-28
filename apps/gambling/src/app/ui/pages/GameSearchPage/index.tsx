import { useEffect, useState } from "react";
import { Input as DesktopInput, InputValue } from "../../components-bs/Inputs/Input";
import { SearchICON } from "../../components-bs/Icons/SearchICON";
import { MobileInput } from "../../components-bs/Inputs/MobileInput";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useSearchGames } from "../../hooks/useSearchGames";
import { GameTypeSectionList } from "../../components-bs/GameTypeSection";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { SearchInput } from "../../components-bs/Inputs/SearchInput";
import { SearchPageContainer } from "./SearchPageContainer";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import { useClickFavoriteGameItem } from "../../hooks/useClickFavoriteGameItem";

export const GameSearchPage = () => {
  const [searchInput, setSearchInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const { userFavorite, onClickFavoriteGameItem } = useClickFavoriteGameItem()

  const navigate = useNavigate();

  const { isMobile } = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;
  const { searchResults, handleSearchGames } = useSearchGames(searchInput.data)
  useEffect(() => {
    handleSearchGames(searchInput.data)
  }, [searchInput.data])

  const gameList = () => {
    if (searchInput.data !== '') {
      if (searchResults.length > 0) {
        return <GameTypeSectionList userFavorite={userFavorite} onClickFavoriteGameItem={onClickFavoriteGameItem} isLatestItem={true} gameTypeName={'null'} data={searchResults} />
      } else {
        return <></>
      }
    }
  }
  return (
    <SearchPageContainer>
      <SearchInput
        placeholder={"Por favor insira o nome do jogo"}
        value={searchInput.data}
        validation={searchInput.isValidation}
        errorMessage={searchInput.errorMessage}
        onChange={(event: any) => {
          setSearchInput({
            data: event.target.value,
            isValidation: true,
            errorMessage: "",
          });
        }}
      />
      <div className={"text-[#ffffff] text-center"}>Procurar Resultados</div>
      {gameList()}
    </SearchPageContainer>
  )
}
