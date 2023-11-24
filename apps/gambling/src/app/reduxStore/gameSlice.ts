import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GetGameListResponseData } from '../external/GetGameListEndpoint';

type GameType = {
  [key: string]: {
    gameId: number;
    name: string;
    level: string;
    label: string;
    type: string;
    order: number;
  }[];
}
interface SubGameType {
  subGameType: string;
  games: GameType[];
}

interface GameListType {
  gameType: string;
  data: SubGameType[];
}


export type InitialState = {
  allGameList: GameListType[];
  typeGameList: GameType[];
  label: string[];

}

const initGameList: InitialState = {
  allGameList: [],
  typeGameList:[],
  label: [],
}

export const gameSlice = createSlice({
  name: 'gameList',
  initialState:initGameList,
  reducers: {
    setLabel: (state: InitialState, action: PayloadAction<InitialState['label']>) => {
      state.label = action.payload;
    },
    setGameList: (state: InitialState, action: PayloadAction<GetGameListResponseData>) => {
      const gameData = action.payload;

      const allGame = gameData && gameData?.label.reduce((acc: any , currentType:string) => {
        const subGamesList = gameData.type[currentType].reduce((acc: any, currentSubType: string) => {
          return [...acc, ...gameData[currentType][currentSubType]]
        }, [])
        return [...acc, {
          gameType: currentType,
          data: {
            subGameType: currentType,
            games: subGamesList
          }
        }]
      }, [])

     const typeGameList = gameData && Object.entries(gameData?.type).reduce((result: any, [key, value]) => {
       const subGames = value.map(i => {
         return {
           subGameType: i === 'null' ? key : i,
           games: i === 'null' ? gameData[key][i] : [].concat(gameData[key][i])
         }
       })
       const game = {
         gameType: key,
         data: subGames
       }
       result.push(game);
       return result
     }, [])

      state.allGameList = allGame;
      state.typeGameList = typeGameList;
      // console.log('allGame',typeGameList)
    },
  },
});
