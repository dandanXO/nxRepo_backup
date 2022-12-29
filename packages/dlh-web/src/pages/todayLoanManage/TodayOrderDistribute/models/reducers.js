import {
  TOOD_SET_PERSON_DATA,
  TOOD_CHANGE_MODAL_VISIBLE,
  TOOD_CHANGE_TABLE_LOADING,
  TOOD_SET_TABLE_DATA,
  TOOD_CHANGE_SELECT_KEY,
  TOOD_CHANGE_PERSON_TYPE, TOOD_SET_TODAY_COLLECTOR
} from './actions';


const initState = {
    loading: false,
    data: {
        data:[],
        pagination: {},
    },
    visible: false,
    personData: [],
    selectKeys: [],
    personType: '',
    todayCollector: [],
}

const TodayderDistribute = (state = initState, action) => {
    switch (action.type) {
        case TOOD_SET_TABLE_DATA:
            return { ...state, data: action.data };
        case TOOD_CHANGE_TABLE_LOADING:
            return { ...state, loading: action.option };
        case TOOD_CHANGE_MODAL_VISIBLE:
            return { ...state, visible: action.option };
        case TOOD_SET_PERSON_DATA:
            return { ...state, personData: action.data };
        case TOOD_CHANGE_SELECT_KEY:
            return { ...state, selectKeys: action.data };
        case TOOD_CHANGE_PERSON_TYPE:
            return { ...state, personType: action.option };
        case TOOD_SET_TODAY_COLLECTOR:
        {
          // console.log("action.data", action.data);
          const newData = action.data.map((stage, stageIndex) => {
            const newMerchants = stage.merchants.map((merchant, merchantIndex) => {
              const newTeams = merchant.teams.map((team, teamIndex) => {
                const newCollectors = team.collectors.map((collector) => {
                  return {
                    key: collector.collectorId,
                    title: collector.collectorName,
                    collectorId: collector.collectorId,
                  }
                })
                return {
                  key: `${stageIndex}:${merchantIndex}::${teamIndex}:${team.team}`,
                  title: team.team === null ? "催收團隊-未分類" : "催收團隊-" + team.team,
                  level: "team",
                  checkboxData: newCollectors,
                }
              })
              return {
                key: `${stageIndex}:${merchantIndex}:${merchant.merchantId}`,
                title: "商戶-" + merchant.merchant,
                level: "merchant",
                children: newTeams,
              }
            })
            return {
              key: `${stageIndex}:${stage.stage}`,
              title: "催收階段 " + stage.stage,
              level: "stage",
              children: newMerchants
            }
          })
          return {
            ...state,
            todayCollector: newData
          };
        }
        default:
            return state;
    }
}
export default TodayderDistribute;
