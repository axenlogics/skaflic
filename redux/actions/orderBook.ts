import { ORDERBOOK_TYPE } from './types';

export const setOrderBook = (value: number) => {

    return (dispatch: any) => {
        dispatch({
            type: ORDERBOOK_TYPE,
            payload: value
        })
    }
};

