import { FILTER_WALLET, FETCH_WALLET} from "../actions/types";
// import walletData from '../../assets/wallet-main.json'


const initialState = {
  data: [],
  inputSearch: ''
}

const walletReducer = (state = initialState, {type, payload}:any) => {
  switch (type) {
    case FILTER_WALLET:
    return {
        ...state,
        inputSearch: payload,
    };
    case FETCH_WALLET:
    return {
        ...state,
        data: payload
    }
    default:
      return state;
  }
  
};

export default walletReducer;
