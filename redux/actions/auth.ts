// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  ISLOGGED_IN
} from './types';
// import { MARKET, LOGIN } from '../../navigation/routeNames';
import { ApiCall } from '../../helpers/apicall';
import { StorageClass } from '../../helpers/storage';
// import { Storage } from '../../helpers/storage';


export const isLoggedIn = (val:any) => (dispatch:any) => {
  // 
  dispatch({
    type: ISLOGGED_IN,
    payload: val
  });
}

export const loginSuccess = () => (dispatch:any) => {
  dispatch({
    type: LOGIN_SUCCESS
  });
}

export const loginUser = ({email, password, recaptchaResponse, isGoogleAcessable, navigation}: any) => {
  const apiCaller = ApiCall.getInstance();
  const storage = StorageClass.getInstance();

  return (dispatch:any) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    apiCaller.post('account/login', { Email: email, RecaptchaResponse: recaptchaResponse, Password: password, 'x-ra': isGoogleAcessable }, true).then(resp => {
      if(resp.Status){
        if(!resp.Result.DA){
          alert('We have sent you device verification email to verify your device. Please confirm your device and then login again');
          return;
        }

        storage.set('userInfo', JSON.stringify(resp.Result))
        
        dispatch({
          type: LOGIN_SUCCESS
        })

        // navigation.navigate(MARKET)
      } else {
        alert('Email or Password is Wrong');
      }
    });
  }
}

export const logoutUser =  () => {
    return (dispatch:any) => {
      dispatch({
        type: LOGOUT_USER,
      })
  }
  };

