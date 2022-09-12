import { TRS_CHANGE_TABLE_LOADING, TRS_SET_TABLE_DATA } from './actions';



const initState = {
    tableData: [],
    loading: false
};

const tdRefuseStatisticsState = (state = initState, action) => {
   switch (action.type) {
       case TRS_SET_TABLE_DATA:
           return { ...state, tableData: action.data };
       case TRS_CHANGE_TABLE_LOADING:
           return { ...state, loading: action.option };
       default:
           return state;
   }
}
export default tdRefuseStatisticsState;
