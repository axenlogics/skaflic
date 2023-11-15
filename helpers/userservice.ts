import { StorageClass } from './storage';
// import hmacSHA256 from 'crypto-js/hmac-sha256';
// import { Signature } from './app';
// import { dispatchLoginState } from '../redux/dispatch';
// import { isEmptyString, isNullOrUndefined, sleep, __ } from '../helpers/common';
// import * as LocalAuthentication from 'expo-local-authentication';
// import { Notification, NotificationPosition, NotificationType } from '../helpers/notification';
import { ApiCall } from './apicall';
import { ApiResponse, IApiResponse, ICurrency, IFill, ILocalData, ILocalDataSet, IPair, IUserOrder, LoginEmails, MainOrderTypeT, OrderSideT, OrderStatusT, IUser, UserInfoI, ICreateOrder } from './interfaces';
// import { User } from './user';
import { userOrderDate } from './common';
import { AppSettings } from '../config/config';
import { PairsManager } from '../models/market';
import { User } from '../models/user';



export class UserService {
    public initialized = false;
    private info!: UserInfoI;
    private userId = 5;
    private readonly key: string = 'userInfo';
    private storage = StorageClass.getInstance();
    private static instance: UserService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (UserService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (UserService.instance == null) {
            UserService.instance = new UserService();
        }
        return this.instance;
    }
    public async forgetPassword(modal: any) {
        const res = await ApiCall.getInstance().post('auth/reset-passwordd', modal, false);
        return res;
    }
    public async getDeviceInfo() {
        const res = await ApiCall.getInstance().getAuthData('accountsettings/account-info', {Email: 'babarzech@gmail.com'}, false);
        return res;
    }
    public async getIsLogin() {
        const res = await ApiCall.getInstance().getAuthData('account/islogin', {}, false);
        return res;
    }
    // /account/islogin
    public async removeDevice(modal: {Id: number}) {
        const res = await ApiCall.getInstance().postAuth('accountsettings/remove-device', modal, false);
        return res;
    }
    public async getFavPairs(){
        const res = await ApiCall.getInstance().getAuthData('accountsettings/get-favp', {}, false);
        return res;
    }
    public async changePassword(modal: any) {
        // {OldPassword, NewPassword, ConfirmPassword}
        const res = await ApiCall.getInstance().postAuth('account/change-password', modal, false);
        return res;
    }
    public async updateFavePair(modal: {Pair:number}) {
        // {OldPassword, NewPassword, ConfirmPassword}
        const res = await ApiCall.getInstance().postAuth('accountsettings/update-favp', modal, false);
        return res;
    }
    public async createAccount(modal: IUser) {
        const res = await ApiCall.getInstance().post('account/register', modal, true);
        return res;
    }

    // public async getAccountInfo() {
    //     const res = await ApiCall.getInstance().getAuthData('accountsettings/account-info/', {Email: 'babarzech@gmail.com'}, false);
    //     return res;
    // }
    // /accountsettings/get-account
    // /order/get-open-orders
    public async getAccountInfo() {
        const res = await ApiCall.getInstance().getAuthData('accountsettings/account-info', {}, false);
        return res;
    }
    // /order/create-order
  
    // accountsettings/account-info/
    public async logOut() {
        const res: any = await User.getInstance().logout();
        if (res) {
            return {
                Status: true,
            } as IApiResponse
        } else {
            // if (res) {
            return {
                Status: false,
            } as IApiResponse
            // }
        }
    } 
    // home/get-data?version=2
    public async loginNow(modal: IUser) {
      
    }
}
