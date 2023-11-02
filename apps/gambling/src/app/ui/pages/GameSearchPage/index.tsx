import {useEffect, useState} from "react";
import {Input as DesktopInput, InputValue} from "../../components/Input";
import {KeySvg} from "../../components/UserLoginStatusSection/KeySvg";
import {MobileInput} from "../../components/UserLoginStatusSection/forms/UserLoginForm/MobileInput";
import useBreakpoint from "../../hooks/useBreakpoint";
import { useSearchGames } from "../../hooks/useSearchGames";
import { GameTypeSectionList } from "../../components/GameTypeSection";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {TTotalFavoriteLocalState} from "../IndexPage";
// import {onValidatePasswordInput} from "../../components/UserLoginStatusSection/forms/UserLoginForm";

export const GameSearchPage = () => {
  const [searchInput, setSearchInput] = useState<InputValue<string>>({
    data: '',
    isValidation: true,
    errorMessage: '',
  });

  const favoriteLocal = JSON.parse(AppLocalStorage.getItem('favoriteLocal') || '{}')
  const favoriteLocalArr = JSON.parse(AppLocalStorage.getItem('favoriteLocalArr') || '{}')
  const [totalFavoriteLocalState, setTotalFavoriteLocalState] = useState<TTotalFavoriteLocalState>({
    local: favoriteLocal,
    localArr: favoriteLocalArr
  })

  const {isMobile} = useBreakpoint();
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
    <>
      <div className={"p-4 flex flex-col text-base font-medium"}>
        <Input
          prefix={<KeySvg fill={"#6c7083"} className={"mr-2"}/>}
          placeholder={"Por favor insira o nome do jogo"}
          value={searchInput.data}
          validation={searchInput.isValidation}
          errorMessage={searchInput.errorMessage}
          onChange={(event) => {
            setSearchInput({
              data: event.target.value,
              isValidation: true,
              errorMessage: "",
            });
          }}
        />

        <div className={"text-white text-center"}>Procurar Resultados</div>
        {gameList()}
      </div>
    </>
  )
}
