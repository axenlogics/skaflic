import { ORDERBOOK_TYPE } from "../actions/types";
// import PairsData from '../../assets/pairs-main.json'

const initialState = {
  // data: PairsData,
  error: null,
  orderBookType: 0
}

const orderBookReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case ORDERBOOK_TYPE:
    return {
        ...state,
        orderBookType: payload,
    };
    default:
      return state;
  }
  
};

export default orderBookReducer;
