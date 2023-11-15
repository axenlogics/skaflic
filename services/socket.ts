import * as signalR from '@microsoft/signalr';
import * as signalRMsg from '@microsoft/signalr-protocol-msgpack';
import { AppSettings } from '../config/config';
import { ApiCall } from '../helpers/apicall';
import { sleep } from '../helpers/common';
import { IFill, IUserOrder, IPair, ITradeHistory, IOrderBook } from '../helpers/interfaces';
// import { User } from '../helpers/user';
// import { Storage } from '../helpers/storage';
import { PairsManager } from '../models/market';
// import { User } from '../models/user';
import { dispatchPairChange } from '../redux/dispatch';
import { User } from '../models/user';
import { store } from '../redux/Store';
// let msgpack = require("msgpack-lite");
// let BufferSerializer = require("buffer-serializer");
// import { msgpack } from '@microsoft/signalr-protocol-msgpack'
var msgpack = require('../public/js/msgpack.min.js');

// let msgpack: any;
export class Socket {
    private socketConnection: signalR.HubConnection;
    private activeSubscribtions: { [channel: string]: (data: any) => void };
    private _socketTicker?: SocketTicker;
    private _socketPair?: SocketPair;
    private _api: ApiCall = ApiCall.getInstance();
    private static instance: Socket;
    private _sendSubscrptions: { [channel: string]: any } = {};
    private _onReconnected: { [id: string]: (() => void) } = {};
    private _userSocket?: UserSocket;
    private newInstance = true;
    private istickerInit = false;
    private eventInitedStatic = false;
    private eventInitedDynamic = false;
    private ConnectedPair: IPair = {};
    private conectionInProgres = false;
    private constructor() {
        if (Socket.instance) {
            throw new Error("Error: Instantiation failed: Use Socket.getInstance() instead of new.")
        }
        this.activeSubscribtions = {};
        if (!globalThis.document) {
            (globalThis.document as any) = undefined;
        }
        // const this.socketConnection = new signalR.Hubthis.socketConnectionBuilder()
        //     // .withUrl("http://localhost:5096/tradehub")
        //     .withUrl("https://matchenginesocket.zechinc.com/tradehub")
        //     // .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();
        // let buffer;
        // const connection = new signalR.HubConnectionBuilder()
        //     // .withUrl("http://localhost:5096/tradehub")
        //     .withUrl("https://matchenginesocket.zechinc.com/tradehub")
        //     // .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
        //     .configureLogging(signalR.LogLevel.Information)
        //     .build();
        console.log('new instance of socket inited');
        this.socketConnection = new signalR.HubConnectionBuilder()
            .withUrl(AppSettings.socketEndpoint + AppSettings.hubs.marketHub)
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: (retryContext: any) => {
                    // console.warn("retrying", retryContext.elapsedMilliseconds)
                    if (retryContext.elapsedMilliseconds < 2000) {
                        return 1000;
                    } else if (retryContext.elapsedMilliseconds < 10000) {
                        return Math.random() * 2000;
                    } else if (retryContext.elapsedMilliseconds < 60000) {
                        // If we've been reconnecting for less than 60 seconds so far,
                        // wait between 0 and 10 seconds before the next reconnect attempt.
                        return Math.random() * 5000;
                    } else {
                        // If we've been reconnecting for more than 60 seconds so far, stop reconnecting.
                        return Math.random() * 10000;
                    }
                }
            })
            .configureLogging({
                log: (level: any, msg: any) => {
                    // if(level != 0 && msg.indexOf('No client') < 0)
                    // 
                }
            })
            .build();
        // this.socketthis.socketConnection.onreconnecting(a => { console.warn('Reconnecting Occured', a); })
        this.socketConnection.onreconnected((a: any) => {
            // console.warn('Rethis.socketConnection Occured');
            this.reSubscribeSendSubs();
        })
        // this.socketthis.socketConnection.onclose(a => { console.warn("this.socketConnection Closed") })
        this.socketConnection.serverTimeoutInMilliseconds = 8000;
        this.socketConnection.keepAliveIntervalInMilliseconds = 4000;
    }
    public async sendUser() {
        
        const payload: any = await this._api.getSocketAuth(AppSettings.apiEndpoint + AppSettings.hubs.marketHub);
        await this.socketConnection.invoke('UserAuth', payload)
        if (this._userSocket == null) {
            this._userSocket = new UserSocket(this);
        } else {
            this._userSocket.setSocket(this);
        }
        return this._userSocket;
    }
    public getSocketStatus() {
        return this.socketConnection.state;
    }
    public isSocketConnected() {
        return this.socketConnection.state === 'Connected';
    }
    private reSubscribeSendSubs() {
        Object.keys(this._sendSubscrptions).forEach(subs => {
            this.send(subs, this._sendSubscrptions[subs]);
        });
        if (User.getInstance().isLoggedIn())
            // this.userAuth();
            this.runOnReConnection();
    }
    private runOnReConnection() {
        Object.values(this._onReconnected).forEach(cb => cb());
    }
    public onSocketReconnect(id: string, callback: () => void) {
        this._onReconnected[id] = callback;
    }
    public onSocketReconnectRemove(id: string) {
        delete this._onReconnected[id];
    }
    public isNewInstance() {
        return this.newInstance;
    }
    public static getInstance(): Socket {
        if (Socket.instance == null) {
            Socket.instance = new Socket();
        }
        else
            Socket.instance.newInstance = false;
        return this.instance;
    }
    public async start() {
        if (this.conectionInProgres || (this.socketConnection.state === 'Connected' || this.socketConnection.state === 'Connecting' || this.socketConnection.state === 'Reconnecting')) {
            return;
        }
        try {
            this.conectionInProgres = true
            console.log('socket connection called',this.socketConnection.state);
            await this.socketConnection.start();
            this.conectionInProgres = false;
        } catch (ex) {
            console.log('catch socket called');
            await sleep(2000);
            await this.start();
        }
        await this.sendUser();
        // this.initDynamicEvents(pair)
        // window['sc'] = this.socketConnection;

        // await this.socketConnection.invoke('GetPairData', 1);

        // this.reSubscribeSendSubs();
    }
    public async reconnect() {
        try {
            await this.socketConnection.stop();
        } catch (er) { }
        await this.start();
    }
    public async dispose() {
        await this.socketConnection.stop();
    }
    public async stop() {
        await this.socketConnection.stop();
    }
    public async send(channel: string, value: any) {
        await this.getReadyToSend();
        return await this.socketConnection.send(channel, value);
    }
    private async getReadyToSend() {
        let maxWait = 120; // 2mins
        while (this.socketConnection.state != signalR.HubConnectionState.Connected) {
            maxWait--;
            if (maxWait <= 0)
                break;
            await sleep(1000);
        }
    }
    public async sendSubscription(channel: string, value: any) {
        await this.getReadyToSend();
        this._sendSubscrptions[channel] = value;
        return await this.socketConnection.send(channel, value);
    }
    public async removeSendSubscription(channel: string) {
        delete this._sendSubscrptions[channel];
    }
    public on(channel: string, callback: (data: any) => void) {
        this.activeSubscribtions[channel] = callback;
        this.socketConnection.on(channel, callback);
    }
    public off(channel: string) {
        delete this.activeSubscribtions[channel];
        this.socketConnection.off(channel);
    }
    public async listenPair(pair: IPair, onOrderBookUpdates: (data: any) => void, onTradesUpdates: (data: any) => void): Promise<SocketPair> {
        this._socketPair = new SocketPair(pair, this, onOrderBookUpdates, onTradesUpdates);
        // await pairSocket.start();
        return this._socketPair;
    }
    public getSocketPair() {
        return this._socketPair;
    }
    public removeSocketPair() {
     this._socketPair = undefined;
    }
    public async listenUserSokcet(): Promise<UserSocket> {
        // UserSocket
        this._userSocket = new UserSocket(this);
        // await pairSocket.start();
        return this._userSocket;
    }
    public getUserSocket() {
        return this._userSocket;
    }
    public getTickerSocket() {
        return this._socketTicker;
    }
    public async disposeSocketPair() {
        this._socketPair?.dispose();
    }
    public startTickerUpdater(): SocketTicker {
        if (this._socketTicker == null)
            this._socketTicker = new SocketTicker(this);
        this.istickerInit = true;
        return this._socketTicker;
    }
    public getIsTickerInit() {
        return this.istickerInit;
    }
    public requestPairData(pairId: number) {
        this.socketConnection.invoke('GetPairData', pairId);
    }
    private _base64ToArrayBuffer(base64: any) {
        // return Uint8Array.from(window.atob(base64), c => c.charCodeAt(0))
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
    public decodeBuffer(bufer: any) {
        try {
            let buffer = this._base64ToArrayBuffer(bufer);

            // let serializer = new BufferSerializer();
            // let result = serializer.fromBuffer(buffer);
            let res = msgpack.deserialize(buffer)
            return msgpack.deserialize(buffer);
        } catch (error) {
            console.error('eror now', error)
        }
    }

}
export class SocketTicker {
    // private callbacks: { [id: string]: (() => void)} = {};
    private interval: any;
    constructor(private socket: Socket,) {
        this.init();
    }
    private async init() {
        console.log('init scoket called');
        this.socket.on(SocketChannels.ticker(), ticks => {
            console.log('ticker update came', ticks);

            // debugger;
            let rs1 = this.socket.decodeBuffer(ticks);
            this.tickerUpdatesCallback(rs1);
        });
        // await this.socket.requestPairData(1);
        // this.updatePairChange();
    }
    private updatePairChange() {
        dispatchPairChange(PairsManager.getInstance().pairs);
        setTimeout(() => { this.updatePairChange() }, 500);
    }
    // public subscribe(id: string, onTickUpdates: () => void) {
    //     if(this.callbacks[id])
    //         throw new Error("Already Listening");
    //     this.callbacks[id] = onTickUpdates;
    // }
    // public unSubscribe(id: string) {
    //     delete this.callbacks[id];
    // }
    public dispose() {
        this.socket.off(SocketChannels.ticker());
        clearInterval(this.interval);
    }
    private tickerUpdatesCallback(ticks: any) {
        if (typeof ticks === 'string') {
            ticks = JSON.parse(ticks);
        }
        const pairInstance = PairsManager.getInstance();
        ticks.forEach((tick: any[]) => {
            const _pair = pairInstance.getPair(tick[0]);
            if (_pair == undefined) return;
            _pair.prevDayPrice = Number(tick[6]);
            _pair.trendUp = tick[8];
            _pair.rate = Number(tick[5]);
            _pair.high = Number(tick[3]);
            _pair.low = Number(tick[4]);
            _pair.bid = Number(tick[2]);
            _pair.ask = Number(tick[1]);
            _pair.volume = Number(tick[7]);
            _pair.trendUp24hr = _pair.rate > _pair.prevDayPrice;
            store.dispatch({
                type: 'PAIRS_SET',
                payload: { ..._pair }
            });
            pairInstance.setPair(_pair);
        });
        ticks.forEach((tick: any[]) => {
            const _pair = pairInstance.getPair(tick[0]);
            if (_pair == undefined) return;
            if (_pair) {
                if (_pair?.marketCurrency?.id === 4) {
                    _pair.rateUsd = Number(_pair.rate);
                } else {
                    _pair.rateUsd = _pair?.rate! * pairInstance.getUsdtPairRate(_pair?.marketCurrency?.id!);
                }
            }
        });



    }
}
export class SocketPair {
    private _candle: any = AppSettings.chart.defaultCandle; //default candle
    private _onCandleUpdates?: (data: any) => void;
    public constructor(private _pair: IPair, private _socket: Socket,
        private onOrderBookUpdates: (data: any) => void,
        private onTradesUpdates: (data: any) => void) {
    }
    public getActivePair() {
        return this._pair;
    }
    public async start() {
        this._socket.sendSubscription('JoinPairChannel', this._pair.id);
        // this._socket.send('Auth')
        this.initListeners();
    }
    private initListeners() {
        console.log('init listeners called');
        this._socket.on(SocketChannels.orderBook(this._pair.id!), res => {
            let rs1 = this._socket.decodeBuffer(res);
            console.log('update of orderbook', SocketChannels.orderBook(this._pair.id!), rs1);

            this.onOrderBookUpdates(rs1)
        });
        this._socket.on(SocketChannels.newTrade(this._pair.id!), res => {
            let rs1 = this._socket.decodeBuffer(res);
            console.log('update of new trades', SocketChannels.newTrade(this._pair.id!), rs1);
            this.onTradesUpdates(rs1)
        });
    }
    public subscribeCandle(candle: number, onCandleUpdates: (data: any) => void) {
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._candle = candle;
        this._onCandleUpdates = onCandleUpdates;
        this._socket.on('NewPriceBar/' + this._pair.id + '_' + this._candle, this._onCandleUpdates);
    }
    public changeCandle(candle: number) {
        if (this._onCandleUpdates == null)
            throw new Error("callback is not setuped. Please call subscribecandle");
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._candle = candle;
        this._socket.on('NewPriceBar/' + this._pair.id + '_' + this._candle, this._onCandleUpdates);
    }
    public async dispose(switchingToDifferentPair: boolean = true) {

        if (this._pair === undefined) {
            return;
        }
        this._socket.off(SocketChannels.newTrade(this._pair.id!));
        this._socket.off(SocketChannels.orderBook(this._pair.id!));
        this._socket.off('NewPriceBar/' + this._pair.id + '_' + this._candle);
        this._socket.removeSendSubscription('JoinPairChannel');
        if (!switchingToDifferentPair) {
            await this._socket.reconnect(); // reconnect needed so it can remove itself from pair subscrption
        }
    }
}

export class UserSocket {
    public constructor(private socket: Socket) {

    }
    public setSocket(socket: Socket) {
        this.socket = socket;
    }
    public async listenWalletUpdates(onWalletUpdates: (data: any) => void) {
        this.socket.on(SocketChannels.userWalletUpdate(), (res) => {
            // debugger;
            console.log('user wallet update came', res);
            onWalletUpdates(res)
        });
    }
    public listenUserOrderUpdates(onUserOrderUpdates: (data: any) => void) {
        // debugger;
        this.socket.on(SocketChannels.userOrderUpdates(), res => {
            console.log('user order update', res);
            onUserOrderUpdates(res);
        });
    }
    public dispose() {
        this.socket.off(SocketChannels.userWalletUpdate());
        this.socket.off(SocketChannels.userOrderUpdates());
    }
}
class SocketChannels {
    public static newTrade(pairId: number): string {
        return `NTRD-${pairId}`;
    };
    public static orderBook(pairId: number): string {
        return `ODB-${pairId}`;
    }
    public static tickerMainPair(PairId: number): string {
        return `TK-${PairId}`;
    }
    public static ticker(): string {
        return "TK";
    }
    public static newPriceBar(pairId: number): string {
        return `NBP-${pairId}`;
    }
    public static userOrderUpdates(): string {
        return "UO";
    }
    public static userWalletUpdate(): string {
        return "WLT";
    }
}