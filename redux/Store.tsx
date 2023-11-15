import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './reducers/auth';
import pairReducer from './reducers/pair';
import orderBookReducer from './reducers/orderBook';
import walletReducer from './reducers/wallet';

export interface IReducers {
  pairReducer: any,
  authReducer: any,
  orderBookReducer: any,
  walletReducer: any,
  traderReducer: any,
  userDataReducer: any,
  buySellReducer: any,
  favPairReducer: any
}

const rootReducer = combineReducers({
  pairReducer: pairReducer,
  authReducer: authReducer,
  orderBookReducer: orderBookReducer,
  walletReducer:walletReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk));

