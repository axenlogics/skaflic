import { FETCH_WALLET, FILTER_WALLET } from './types';

export const fetchWallet = (wallets:any) => {
  return {
    type: FETCH_WALLET,
    payload: wallets,
  }
};

export const filterwallet = (value: any) => {
  return (dispatch: any) => {
    dispatch({
      type: FILTER_WALLET,
      payload: value,

    })
  }
};

