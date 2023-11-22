import { useEffect, useState } from "react";
import { Input as DesktopInput, InputValue } from "../../components/Inputs/Input";
import { Search } from "../../components-bs/UserLoginStatusSection/Search";
import { MobileInput } from "../../components/Inputs/MobileInput";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useSearchGames } from "../../hooks/useSearchGames";
import { GameTypeSectionList } from "../../components-bs/GameTypeSection";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { TTotalFavoriteLocalState } from "../IndexPage";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { SearchInput } from "../../components/Inputs/SearchInput";
import { SearchPageContainer } from "./SearchPageContainer";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
// import {onValidatePasswordInput} from "../../components/UserLoginStatusSection/forms/UserLoginForm";

export const GameSearchPage = () => {
  const [searchInput, setSearchInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const favoriteLocal = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocal) || '{}')
  const navigate = useNavigate();
  const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem(AppLocalStorageKey.favoriteLocalArr) || '{}')
  const [totalFavoriteLocalState, setTotalFavoriteLocalState] = useState<TTotalFavoriteLocalState>({
    local: favoriteLocal,
    localArr: favoriteLocalArr
  })

  const { isMobile } = useBreakpoint();
  const Input = isMobile ? MobileInput : DesktopInput;
  const { searchResults, handleSearchGames } = useSearchGames(searchInput.data)
  useEffect(() => {
    handleSearchGames(searchInput.data)
  }, [searchInput.data])

  const gameList = () => {
    if (searchInput.data !== '') {
      if (searchResults.length > 0) {
        return <GameTypeSectionList totalFavoriteLocalState={totalFavoriteLocalState} setTotalFavoriteLocalState={setTotalFavoriteLocalState} gameTypeName={'null'} data={searchResults} />
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
