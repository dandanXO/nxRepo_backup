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
  hotBrandGameList: GameListType[];
  typeGameList: GameType[];
  label: string[];
  typeGameCount: { [key: string]: number }
  indexPagecurrentSelectLabel: string
}

const initGameList: InitialState = {
  allGameList: [],
  hotBrandGameList: [],
  typeGameList: [],
  label: [],
  typeGameCount: {},
  indexPagecurrentSelectLabel: 'Todos'
}

// NOTICE: refactor me
const windowSize = {
  width: window.innerWidth,
};
let isMobile = false;
if (0 < windowSize.width && windowSize.width < 640) {
  isMobile = true
}
const MaxHotGameBrandGameCount = isMobile ? 9 : 18;
const OtherMaxHotGameBrandGameCount = isMobile ? 3 : 6;

export const gameSlice = createSlice({
  name: 'gameList',
  initialState:initGameList,
  reducers: {
    setIndexPagecurrentSelectLabel: (state: InitialState, action: PayloadAction<InitialState['indexPagecurrentSelectLabel']>) => {
      state.indexPagecurrentSelectLabel = action.payload;
    },
    setLabel: (state: InitialState, action: PayloadAction<InitialState['label']>) => {
      state.label = action.payload;
    },
    setGameList: (state: InitialState, action: PayloadAction<GetGameListResponseData>) => {
      const gameData = action.payload;

      let hotGameBrandIndex = 0
      const hotBrandGameList = gameData && gameData?.label?.reduce((acc: any , currentType:string) => {

        const subGamesList = gameData.type ? gameData.type[currentType]?.reduce((acc: any, currentSubType: string) => {
          // console.log("gameData[currentType][currentSubType]", gameData[currentType][currentSubType]);
          let currentBrandGames: any[] = gameData[currentType] ? gameData[currentType][currentSubType] || [] : [];
          currentBrandGames = currentBrandGames.slice(0, hotGameBrandIndex === 0 ? MaxHotGameBrandGameCount : OtherMaxHotGameBrandGameCount)
          // return [...acc, ...gameData[currentType][currentSubType]]
          hotGameBrandIndex = hotGameBrandIndex + 1;
          return [...acc, ...currentBrandGames]
        }, []) : []

        hotGameBrandIndex = 0;

        return [...acc, {
          gameType: currentType,
          data: {
            subGameType: currentType,
            games: subGamesList
          }
        }]
      }, [])

      const allGameList = gameData && gameData?.label?.reduce((acc: any , currentType:string) => {
        const subGamesList = gameData ? gameData.type[currentType]?.reduce((acc: any, currentSubType: string) => {
          return [...acc, ...gameData[currentType][currentSubType]]
        }, []) : []

        return [...acc, {
          gameType: currentType,
          data: {
            subGameType: currentType,
            games: subGamesList
          }
        }]
      }, [])

      // console.log("allGame", allGame);

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
      state.allGameList = allGameList;
      state.hotBrandGameList = hotBrandGameList;
      state.typeGameList = typeGameList;
      // console.log('allGameList',allGameList)

      const allGameListCount = allGameList.reduce((acc: any, item: any) => {
        return acc + (item.data?.games.length || 0);
      }, 0);

      const typeGameCount = allGameList !== undefined && allGameList?.reduce((acc: any, item: any) => {
        const gameType = item?.gameType;
        console.log('gameType', gameType)
        if (gameType) {
          return { ...acc, ...{ [item?.gameType]: item.data.games.length } }
        }
      }, { Todos: allGameListCount });
      state.typeGameCount = typeGameCount
      // console.log(typeGameCount);
      // console.log('gameTypeCount',allGameListCount)
    },
  },
});
