import { IPair } from "../../helpers/interfaces";
import { FILTER_PAIRS, FETCH_PAIRS, CHANGE_PAIR, SET_PAIRMENU_MODAL, PAIRS, TRADE_HISTORY, PICK_RATE, PAIRS_SET, PAIRS_SET_ALL, PAIRS_SET_REFRESH } from "../actions/types";
// import PairsData from '../../assets/pairs-main.json'
// import { IPair} from '../../models/market';
export interface _initialState {
  data: [],
  inputSearch: '',
  loading: true,
  modalVisible: false,
  selectedPair: number,
  tradeHistory: [],
  error: null,
  pairs: { [id: number]: IPair },
  pickRate: string
}
const initialState: _initialState = {
  data: [],
  inputSearch: '',
  loading: true,
  modalVisible: false,
  selectedPair: 0,
  error: null,
  pairs: {},
  tradeHistory: [],
  pickRate: ''
}

const pairReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case PAIRS_SET:
      const _pair: IPair = payload as IPair;
      state.pairs[_pair.id ?? 1] = _pair;
      return {
        ...state,
        pairs: state.pairs
      };
    case PAIRS_SET_REFRESH:
      // 
      return {
        ...state,
        pairs: { ...state.pairs }
      };
    case PAIRS_SET_ALL:
        return {
          ...state,
          pairs: { ...payload }
        };
  

    case FILTER_PAIRS:
    return {
        ...state,
        inputSearch: payload,
    };
    case CHANGE_PAIR:
    return {
        ...state,
        selectedPair: payload,
        modalVisible: false,
        inputSearch: ''
    };
    case PICK_RATE:
      return {
          ...state,
          pickRate: payload
      };
    case TRADE_HISTORY:
      return {
          ...state,
          tradeHistory: payload,
      };
    case SET_PAIRMENU_MODAL:
    return {
        ...state,
        modalVisible: payload,
        inputSearch: ''
    };
    case FETCH_PAIRS:
    return {
        ...state,
        data: payload,
        loading: true
    }
    default:
      return state;
  }
  
};

export default pairReducer;
