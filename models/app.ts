import { AppSettings } from "../config/config";
import { Info } from "../helpers/info";
// import { Storage } from "../helpers/storage";
import sha256 from 'crypto-js/sha256';
// import * as sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
import * as Base64 from 'crypto-js/enc-base64';
import { isEmptyString, isNullOrUndefined, sleep } from '../helpers/common';
// import { TranslationInit } from "../helpers/languageservice";
import { IEncrypt, IKeyPair } from "../helpers/iencrypt";
import { StorageClass } from "../helpers/storage";
import { Encrypt } from "../helpers/encrypt";
// import { Platform } from "react-native";
// import { BackgroundRunner } from "../services/backgroundtasks";

export interface Signature {
  key: string;
  nonce: number;
}

export enum AppState {
  NotInitialized, InitializedByEmpty, Initialized
}

export class App {
  private info: any = {};
  private storage = StorageClass.getInstance();
  private infoInstance = Info.getInstance();
  private old: boolean = false;
  private encrypt: any;
  private state: AppState = AppState.NotInitialized;
  private static instance: App;

  private constructor() {
    // window['myapp'] = this;
    if (App.instance) {
      throw new Error("Error: Instantiation failed: Use App.getInstance() instead of new.");
    }
  }
  public setEncryptInstance(_encrypt: IEncrypt) {
    this.encrypt = _encrypt;
  }

  public static getInstance() {
    if (App.instance == null) {
      App.instance = new App();
    }
    return this.instance;
  }
  // public getEncryptionInstance(){
  //   if(this.)
  // }
  public async initialize() {

    // this.getTranslation('en', false);
    await this.init();
    if (!await this.storage.exists('appRun') || !this.isInited()) {
      this.state = AppState.InitializedByEmpty;
    } else {
      await this.init();
      this.state = AppState.Initialized;
    }
  }
  public async appInit() {
    await this.reset();
    await this.AppfirstInit();
    await this.saveEnviroment();
  }
  public async onKeyGenerated(resp: any) {
    if (resp.status) {
      await this.firstTimeInit(resp.result as IKeyPair);
    } else {
      let sign = await this.encrypt.generateNewKey()
      await this.firstTimeInit(sign);
    }
  }
  public async AppfirstInit() {
    if (this.appInited()) {
      return;
    }
    if (this.encrypt === undefined) {
      this.encrypt = new Encrypt()
    }

    let sign = await this.encrypt.generateNewKey();
    
    await this.firstTimeInit(sign);
  }
  public getState(): AppState {
    return this.state;
  }
  public async firstTimeInit(key: IKeyPair) {
    if (!key) {
      return;
    }
    try {
      const body1: any = {
        'PublicKey': key.public,
        'Platform': 0,
      }
      const params1 = Object.keys(body1).map((key: any) => encodeURIComponent(key) + '=' + encodeURIComponent(body1[key])).join('&');
      const response = await (await fetch(AppSettings.apiEndpoint + (!this.old ? 'home/get-client/' : 'home/get-client/'), {
        method: 'POST',
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: params1,
      })).json();
      response.PrivateKey = key.private;
      this.save(JSON.stringify(response));
      this.storage.set('appRun', "1");
    } catch (err) {
      
      await sleep(2000);
      await this.firstTimeInit(key);
    }
  }
  public async appInitialized() {
    return await this.storage.exists('appCreds');
  }
  public async init() {
    
    const appCreds = await this.storage.tryGet('appCreds');

    // if(appCreds.hasValue){
    // await this.storage.set('appCreds', appCreds.value);
    // await this.storage.remove('appCreds');
    // } 
    let info = appCreds.value;
    this.info = info ? JSON.parse(info) : {};
    if ((!this.old && isNullOrUndefined(this.info.PrivateKey) && (!isNullOrUndefined(this.info.Id) || this.info?.PrivateKey?.length > 74))) {
      // this.reset();
    }
  }
  private isInited(): boolean {
    return !isEmptyString(this.info.PrivateKey);
  }
  public async reset() {
    await this.storage.remove('appCreds');
    await this.storage.remove('appRun');
    this.info = {};
    this.reInit();
  }
  public async reInit() {
    this.reset();
    this.initialize();
  }

  public async save(creds: string) {
    await this.storage.set('appCreds', creds);

    this.init();
  }
  public getPrivateKey() {
    return this.info['PrivateKey'];
  }
  public isPrivateKeyValid() {
    return (this.info['PrivateKey'] ?? '').length <= 74;
  }
  public getPublicKey() {
    return this.info['PublicKey'];
  }
  public getSecret() {
    return this.info['Secret'];
  }
  public appInited(): boolean {
    return this.info != null && this.info['PublicKey'] != null;
  }
  // public async generateSignature(requestUrl: string, requestType: string, requestBody: object): Signature {
  //   // return this.generateSignatureold(requestUrl,requestType,requestBody);
  //   const body1: any = {};
  //   for (const key in requestBody) {
  //     if (!(new RegExp('picture|file|_|recaptcharesponse')).test(key.toLocaleLowerCase()) && requestBody[key] !== undefined) {
  //       body1[key] = requestBody[key] !== null ? requestBody[key].toString() : requestBody[key];
  //     }
  //   }
  //   const body = JSON.stringify(body1);
  //   const nonce: number = Date.now() + 0; // + Math.random();
  //   let signature = Base64.stringify(sha256(this.getSecret() + requestUrl + requestType + body));
  //   
  //   
  //   signature = hmacSHA512(signature + nonce, this.getSecret());
  //   const sig: Signature = {};
  //   
  //   if (!this.ed25519.privateKeyInited())
  //     this.ed25519.init(this.getPrivateKey());
  //     sig.key = this.ed25519.signUArray(hexToUArray(signature.toString()));// enc.sign(signature, sha256, "sha256").toString();
  //   sig.nonce = nonce;
  //   return sig;
  // }
  public async generateSignature(requestUrl: string, requestType: string, requestBody: any, isQueryParam = false): Promise<Signature> {
    if (this.info === null) {
      throw new Error("Info not initialized");
      // return null;
    }
    const body1: any = {};

    for (const key in requestBody) {
      if (!(new RegExp('picture|file|_|recaptcharesponse')).test(key.toLocaleLowerCase())) {
        body1[key] = requestBody[key] !== null ? requestBody[key].toString() : requestBody[key];
      }
    }

    if (isNullOrUndefined(this.getSecret()) || !this.isPrivateKeyValid()) {
      await this.init();
    }
    // const body = JSON.stringify(body1);
    const body = isQueryParam ? '' : JSON.stringify(body1);

    const nonce: number = Date.now() + 0;
    let signature: any = Base64.stringify(sha256(this.getSecret() + requestUrl + requestType + body));
   // let signature: any = Base64.stringify(sha256(this.getSecret() + requestUrl + requestType + body));
    // const sig = await BackgroundRunner.getInstance().generateSignatureFromHmac(this.getPrivateKey(), this.getSecret(), signature, nonce);
    // if(sig.status) {
    //   return sig.result;
    // }
    // 
    signature = (hmacSHA512(signature + nonce, this.getSecret()));
    const keyValue = await this.encrypt.sign(signature);
    return {
      key: keyValue,
      nonce: nonce
    };
  }
  public getId() {
    return this.info['Id'];
  }

  public async checkEnviroment() {
    return (await this.storage.get('enviroment') == AppSettings.apiEndpoint)
  }

  public async saveEnviroment() {
    await this.storage.set('enviroment', AppSettings.apiEndpoint);
  }

}
