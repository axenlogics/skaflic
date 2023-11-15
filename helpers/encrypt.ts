// import { App, Signature } from '../models/app';
import { User } from '../models/user';
// import * as JSEncrypt from 'jsencrypt';
import { IEncrypt, IKeyPair } from './iencrypt';
import * as tweetnacl from 'tweetnacl';
import { base64ToUArray, hexToUArray, isNullOrUndefined, strToUArray, UArrayToBase64 } from './common';
import { App } from '../models/app';
// @ts-ignore
// import * as JSEncrypt from 'jsencrypt-node';

// import { App, Signature } from './app';
// import { getRandomBytes } from 'expo-random';
// let JSEncrypt: any;

export class ED25519 {
    private static instance: ED25519;
    private privateKey?: Uint8Array;
    public static getInstance(): ED25519 {
        if (ED25519.instance == null) {
            ED25519.instance = new ED25519();
        }
        return ED25519.instance;
    }
    private constructor() {
        tweetnacl.setPRNG((x:any, n: any) => {
            const nn = getRandomBytes(n * 2);
            for (let i = 0; i < x.length; i++) {
                x[i] = nn[i];
            }
        })
    }
    public init(_privateKey: string) {
        this.privateKey = base64ToUArray(_privateKey);
    }
    public generateKey(): IKeyPair {
        let key = tweetnacl.sign.keyPair();
        return {
            public: UArrayToBase64(key.publicKey),
            private: UArrayToBase64(key.secretKey)
        } as IKeyPair;
    }
    public sign(msg: string): string {
        if (isNullOrUndefined(this.privateKey))
            throw new Error("PrivateKey not defined");
        return UArrayToBase64(tweetnacl.sign(strToUArray(msg), this.privateKey as Uint8Array))
    }
    public signUArray(msg: Uint8Array): string {
        if (isNullOrUndefined(this.privateKey))
            throw new Error("PrivateKey not defined");
        return UArrayToBase64(tweetnacl.sign(msg, this.privateKey as Uint8Array))
    }
    public privateKeyInited(): boolean {
        return !isNullOrUndefined(this.privateKey);
    }
}

export class Encrypt implements IEncrypt {
    public user!: User;
    public encryptBody = true;
    public offlineRetry = false;
    public app = App.getInstance();
    public ed25519: ED25519 = ED25519.getInstance();

    constructor() {
        this.app.setEncryptInstance(this);
    }
    public async getAuth(body: object): Promise<object> {
        body = await this.encryptObject(body);
        const signature: any = await this.app.generateSignature('', 'POST', body);
        return {
            'XSig': signature.key,
            'XNonce': signature.nonce.toString(),
            'XRef': this.app.getId().toString(),
            'UserAuthenticationToken': this.user.getTokenSignature(signature),
            'XTi': this.user.getTokenId()
        };
    }
    public async encryptObject(response: object): Promise<object> {
        const resp1 = Object.assign({}, response);
        let a = await this.iterateObject(resp1, '', this.app.getPublicKey());
        return a;
    }
    // public encrypt(text: string): string {
    //     
    //     const encrypt = new window['JSEncrypt'];
    //     encrypt.setKey(this.app.getPublicKey());
    //     return encodeURIComponent(encrypt.encrypt(text));
    // }
    public async  encrypt(text: string): Promise<string> {
        const JSEncrypt = (await import('jsencrypt')).default
        const encrypt = new JSEncrypt();
        if(this.app.getPublicKey() === undefined){
            await this.app.init()
        }
        const publickey = this.app.getPublicKey()
        encrypt.setPublicKey(publickey);
        const enc = encrypt.encrypt(text);
        console.log('encrypted now',enc, encrypt, publickey)


        // 
        return encodeURIComponent(enc);
    }
    public async sign(message: any) {
        if(!this.ed25519.privateKeyInited())
            this.ed25519.init(this.app.getPrivateKey());
        return this.ed25519.signUArray(hexToUArray(message.toString()));
        // const enc = new JSEncrypt.default();
        // enc.setPrivateKey(this.app.getPrivateKey());
        // return enc.sign(message, sha256, "sha256").toString();
    }
    public generateNewKey(): IKeyPair {
        return this.ed25519.generateKey();
        // const enc = new JSEncrypt.default({ default_key_size: "2048" })
        // let key = enc.getKey();
        // return {
        //     public: key.getPrivateKey(),
        //     private: key.getPrivateKey()
        // } as IKeyPair;
    }
    private async iterateObject(obj: any, stack: any, key: any) {
        for (const property in obj) {
            if ((new RegExp('picture|file|_|recaptcharesponse|geetest_validate|geetest_challenge|geetest_seccode'))
                .test(property.toString().toLocaleLowerCase())) {
                continue;
            }
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === 'object') {
                    this.iterateObject(obj[property], stack + '.' + property, key);
                } else {
                    try {
                        if (!(new RegExp('picture|file|_|recaptcharesponse')).test(property)) {
                            obj[property] = await this.encrypt(obj[property].toString());
                            console.log(obj[property])
                        }
                    } catch (err) {
                        throw err;
                    }
                }
            }
        }
        return obj;
    }
}
function getRandomBytes(arg0: number) {
    return 'testing';
    // throw new Error('Function not implemented.');
}

