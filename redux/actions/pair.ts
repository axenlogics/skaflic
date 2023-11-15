import { FETCH_PAIRS, FILTER_PAIRS, CHANGE_PAIR, SET_PAIRMENU_MODAL, PAIRS, PICK_RATE } from './types';
// import PairsData from '../../assets/pairs-main.json'
import { PairsManager } from '../../models/market';
import { IPair} from '../../helpers/interfaces';
// import { startUp } from '../../startup';
// import { startUp } from '../../startup';

const pairCls = PairsManager.getInstance();

export const fetchPairs = () => {
 return (dispatch: any) => {
        dispatch({
          type: FETCH_PAIRS,
          payload: PairsManager.getInstance().getPairs()
        })
    }
};

export const filterPairs = (value:any) => {
  return (dispatch: any) => {
    dispatch({
      type: FILTER_PAIRS,
      payload: value
    })
  }
};

export const changePair = (value:any) => {
  return (dispatch: any) => {

    dispatch({
      type: CHANGE_PAIR,
      payload: value
    })
  }
};

export const pickRate = (value:any) => {
  return (dispatch: any) => {

    dispatch({
      type: PICK_RATE,
      payload: value
    })
  }
};


export const setPairMenuModal = (value:boolean) => {
  return (dispatch: any) => {
    dispatch({
      type: SET_PAIRMENU_MODAL,
      payload: value
    })
  }
};

export const setPair = (value: IPair) => {
  return (dispatch: any) => {
    dispatch({
      type: PAIRS.SET,
      payload: value
    })
  }
}
// export const setAllPairs = (value: { [id: number]: Pair }) => {
//   return (dispatch: any) => {
//     dispatch({
//       type: PAIRS.SET_ALL,
//       payload: value
//     })
//   }
// }
