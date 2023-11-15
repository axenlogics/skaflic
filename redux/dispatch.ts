import { CHANGE_PAIR, FAV_PAIRS, ISLOGGED_IN, ORDER_SIDE, PAIRS, TRADE_HISTORY, USER_DATA } from "./actions/types";
import { store } from "./Store";

export function dispatchPairChange(value: any) {//{ [id: number]: Pair }
    return store.dispatch({ type: PAIRS.SET_ALL, payload: value });
}

export function dispatchLoginState(isLoggedIn: boolean) {
    return store.dispatch({
        type: ISLOGGED_IN,
        payload: isLoggedIn
    });
}

export function dispatchUserWalletsUpdate(value: any) { // IWalletInfo
    return store.dispatch({
        type: USER_DATA.SET_WALLETS,
        payload: value
    });
}
export function dispatchUserOrdersUpdate(value: any) { // IOrder[]
    return store.dispatch({
        type: USER_DATA.SET_ORDERS,
        payload: value ?? []
    });
}
export function disptachFavPairUpdate(value: any) { // number[]
    return store.dispatch({
        type: FAV_PAIRS.SET,
        payload: value ?? []
    });
}

export function disptachChangePair(value: any) { // number[]
    return store.dispatch({
        type: CHANGE_PAIR,
        payload: value
    });
}

export function disptachBuySellOrderSide(value: any) { // number[]
    return store.dispatch({
        type: ORDER_SIDE,
        payload: value
    });
}

export function disptachMarketHistory(value: any) { // IMarketHistory[]
    return store.dispatch({
        type: TRADE_HISTORY,
        payload: value
    });
}