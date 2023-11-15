import { AppSettings } from "../config/config";
import { App, Signature } from "../models/app";
import { User } from "../models/user";
import { isNullOrUndefined, sleep } from "./common";
import { Encrypt } from "./encrypt";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { ApiResponse } from "./interfaces";
import { CNotificationType, CustomNotification } from "./notification";
// import Constants from 'expo-constants';
// import { Platform } from "react-native";


export class ApiCall {
    private static instance: ApiCall;
    private app = App.getInstance();
    private user = User.getInstance();
    public encrypt: Encrypt | undefined;
    private userAgent?: string;
    constructor() {
        if (ApiCall.instance) {
            throw new Error("Error: Instantiation failed: Use ApiCall.getInstance() instead of new.");
        } else {
            // App.getInstance().init();
            // this.user.init();
        }
    }
    public static getInstance() {
        if (ApiCall.instance == null) {
            ApiCall.instance = new ApiCall();
        }
        return this.instance;
    }
    public async post(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, shoudlEncrypt, false);
    }
    public async postAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, shoudlEncrypt, true);
    }
    public async getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._getAuthData(endpoint, body, shoudlEncrypt, true);
    }
    public async halfAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        // const isHalfLogin = Object.keys(this.user.getInfo()).length !== 0 && !this.user.isLoggedIn();
        return await this._post(endpoint, body, shoudlEncrypt, true, true, true);
    }
    private async _post(endpoint: string, body: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        let body1: any
        if (shoudlEncrypt) {
            body1 = await this.encrypt.encryptObject(body)
        } else {
            body1 = Object.assign({}, body)
        }
        const url = AppSettings.apiEndpoint + endpoint;
        const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

        if (isNullOrUndefined(this.userAgent)) {
            // try {
            //     this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // } catch(e) {
            //     this.userAgent = (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // }
        }


        var headers: any = {
            'x-ref': this.app.getId(),
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            // 'CTime': 'now time' + Date.now() + 'offset ' + 0,
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        if (isAuthenticated || isHalfLogin) {
            if (!this.user.initialized) {
                await this.user.init();
            }
            if (!this.user.isLoggedIn() && !isHalfLogin) {
                return false;
            }
            this.user.updateSessionTime();
            headers['user-auth-token'] = this.user.getTokenSignature(signature);
            headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
        }
        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
        try {
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body: params,
                method: 'POST',
                headers: headers
            })
            const response = await (httpResp).json();
            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    this.user.logout();
                    window.location.reload();
                    return;
                } else if (!response.Status) {
                    CustomNotification.show(response.Error, CNotificationType.Error);
                    return false;
                }
                // if (httpResp.status == 401) {
                //     this.user.logout();
                // }
                return false;
                // throw new Error("Bad response from server", response.Error);
            }
            if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            } else {
                return response;
            }
        } catch (err) {
            // {"Status":false,"Error":"Email  is missing"}

            // alert(err.Error)

        }
    }
    private async _getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        let body1: any
        if (shoudlEncrypt) {
            body1 = await this.encrypt.encryptObject(body)
        } else {
            body1 = Object.assign({}, body)
        }
        const url = AppSettings.apiEndpoint + endpoint + this.ObjectToQueryParam(body);
        const signature: Signature = await this.app.generateSignature(url, 'GET', body, true);

        if (isNullOrUndefined(this.userAgent)) {
            // try {
            //     this.userAgent = (await Constants.getWebViewUserAgentAsync()) ?? (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // } catch(e) {
            //     this.userAgent = (Platform.OS == 'android' ? 
            //     'ua Dalvik/2.1.0 (Linux; U; Android ' + Constants.systemVersion + ')' :
            //     'ua Dalvik/2.1.0 (iPhone; CPU iPhone OS ' + Constants.systemVersion + ' like Mac OS X)');
            // }
        }


        var headers: any = {
            'x-ref': this.app.getId(),
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            // 'CTime': 'now time' + Date.now() + 'offset ' + 0,
            // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        };
        if (isAuthenticated || isHalfLogin) {
            if (!this.user.initialized) {
                await this.user.init();
            }
            if (!this.user.isLoggedIn() && !isHalfLogin) {
                return false;
            }
            this.user.updateSessionTime();
            headers['user-auth-token'] = this.user.getTokenSignature(signature);
            headers['x-ti'] = this.user.getTokenId() !== undefined ? this.user.getTokenId().toString() : '0';
        }
        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
        try {
            const httpResp = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            const response = await (httpResp).json();
            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    this.user.logout();
                    window.location.reload();
                    return;
                } else if (!response.Status) {
                    // alert(response.Error);
                    CustomNotification.show(response.Error, CNotificationType.Error);
                    return false;
                }
                // if (httpResp.status == 401) {
                //     this.user.logout();
                // }
                return false;
                // throw new Error("Bad response from server", response.Error);
            }
            if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            } else {
                return response;
            }
        } catch (err) {
            // {"Status":false,"Error":"Email  is missing"}

            // alert(err.Error)

        }
    }
    public async get(endPoint: string, body: any) {
        let queryParam = this.ObjectToQueryParam(body)
        return await (await fetch(AppSettings.apiEndpoint + endPoint + queryParam)).json();
    }
    public async getText(endPoint: string, body: any) {
        let queryParam = this.ObjectToQueryParam(body)
        return await (await fetch(AppSettings.apiEndpoint + endPoint + queryParam)).text();
    }
    private ObjectToQueryParam(obj: any) {
        if (obj === undefined) {
            return;
        }
        try {
            let str = '?' + Object.keys(obj).reduce(function (a: any, k) {
                a.push(k + '=' + encodeURIComponent(obj[k]));
                return a;
            }, []).join('&');
            return str;
        } catch (error) {

        }

    }
    // const creds: IData = app.getApp();
    // // console.log(GetSocketAuth.getAuth(creds, url));
    // await connection.invoke('UserAuth', GetSocketAuth.getAuth(creds, url))
    // public async getAuthT(data: any, endPoint: string) {
    //     // let sig = await this.app.generateSignature(endPoint, 'SOCKET', {}, false)
    //     // const sig = new SignatureCreator(data);
    //     const body = {};
    //     const url = endPoint;//'';//this.endpoint + 'accountsettings/account-info/' + ObjectToQueryParam(body);
    //     const signature = this.app.generateSignature(url, 'SOCKET', body, false);
    //     const usersvc = new UserService();
    //     return {
    //         XSig: signature.key,
    //         XNonce: signature.nonce.toString(),
    //         XRef: data.data.Id.toString(),
    //         UserAuthToken: usersvc.getTokenSignature(signature),
    //         XTi: usersvc.getTokenId() !== undefined ? usersvc.getTokenId().toString() : '0'
    //     };
    // }
    // public getAuth(data: IData, endPoint: string) {
    //     // const sig = new SignatureCreator(data);
    //     this.app.appInit()
    //     const body = {};
    //     const url = endPoint;//'';//this.endpoint + 'accountsettings/account-info/' + ObjectToQueryParam(body);
    //     const signature = sig.generateSignature(url, 'SOCKET', body, false);
    //     // const usersvc = new UserService();
    //     return {
    //         XSig: signature.key,
    //         XNonce: signature.nonce.toString(),
    //         XRef: data.data.Id.toString(),
    //         UserAuthToken: usersvc.getTokenSignature(signature),
    //         XTi: usersvc.getTokenId() !== undefined ? usersvc.getTokenId().toString() : '0'
    //     };
    // }
    public async getSocketAuth(url: string): Promise<object> {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        let body = {};

        const signature: Signature = await this.app.generateSignature(url, 'SOCKET', body, false);
        return {
            'XSig': signature.key,
            'XNonce': signature.nonce.toString(),
            'XRef': this.app.getId().toString(),
            'UserAuthToken': this.user.getTokenSignature(signature),
            'XTi': this.user.getTokenId()
        };
    }

    public async postAuthTemporary(endpoint: string, body: object, token: any, shoudlEncrypt: boolean = false) {
        return await this.posttemporary(endpoint, body, shoudlEncrypt, token);
    }
    private async posttemporary(endpoint: string, body: object, shoudlEncrypt: boolean, token: any) {
        if (this.encrypt === undefined) {
            this.encrypt = new Encrypt()
        }
        const body1: any = shoudlEncrypt ? await this.encrypt.encryptObject(body) : Object.assign({}, body);
        const url = AppSettings.apiEndpoint + endpoint;
        const signature: Signature = await this.app.generateSignature(url, 'POST', body1);

        var headers: any = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'x-sig': signature.key,
            'x-nonce': signature.nonce.toString(),
            'x-ref': this.app.getId().toString()
        };
        headers['user-auth-token'] = hmacSHA256(token.Token, signature.key).toString();
        headers['x-ti'] = token.TI

        const params = Object.keys(body1).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
        try {
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body: params,
                method: 'POST',
                headers: headers
            });
            const response = await (httpResp).json()
            if (httpResp.status == 401) {
                this.user.logout();
            }
            if (response.Status === false && response.Message === "IR") {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, false);
            } else {
                return response;
            }
        } catch (err) {
            // 
        }
    }
}
