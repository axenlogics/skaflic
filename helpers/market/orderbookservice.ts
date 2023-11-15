import { PairsManager } from "../../models/market";
import { ApiCall } from "../apicall";
import { userOrderDate } from "../common";
import { ICreateOrder, IFill, IObOrder, IOrderBook, IPair, ITradeHistory, IUserOrder, MainOrderTypeT, OrderSideT, OrderStatusT } from "../interfaces";

export class OrderbookService {
    public initialized = false;
    public sellOrders: IObOrder[] = [];
    public buyOrders: IObOrder[] = [];
    public eventId: number | null = null;
    private mainPair: IPair = {};
    private basePrecsion: number = 0
    public totalOrderQuantity = { buy: 0, sell: 0 };
    private marketPrecsion: number = 0;
    private static instance: OrderbookService;
    public totalOrderBookOrdersToShow = 10;


    // public localAuth: LocalAuth;
    private constructor() {
        if (OrderbookService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (OrderbookService.instance == null) {
            OrderbookService.instance = new OrderbookService();
        }
        return this.instance;
    }
    public async createOrder(modal: ICreateOrder) {
        const res = await ApiCall.getInstance().postAuth('order/create-order', modal, false);
        return res;
    }
    public refresh() {
        this.sellOrders = [];
        this.buyOrders = [];
        this.eventId = -1;
    }
    public refreshwalletAndHistory() {
        // if(this.parentTrade !== undefined) {
        //     // this.parentTrade.historyOrders = [];
        //     this.parentTrade.socketSerevice.getPairsData(this.parentTrade,true);
        //     // this.parentTrade.initTradingView(this.parentTrade.mainPair,true);
        //     // this.parentTrade.initTradingView(this.parentTrade.mainPair);

        // }
    }
    public init(pair: IPair) {
        this.mainPair = pair;
        this.eventId = null;
        this.basePrecsion = 6 //  this.mainPair.basePrecision!;
        this.marketPrecsion = 6 //this.mainPair.marketPrecision!;
        // this.processInit();
    }
    public processInit(orderData: any) {


        // this.sellOrders = this.processData(orderData[0]);
        // this.buyOrders = this.processData(orderData[1]);
        this.sellOrders = [];
        this.buyOrders = [];
        this.sellOrders = this.processData(orderData[0]);
        this.buyOrders = this.processData(orderData[1]);
        this.sortOrders(this.sellOrders, true);
        this.sortOrders(this.buyOrders, true);
        this.setSpread();
        
        this.eventId = Number(orderData[2]);
        this.orderBookReady = true;
    }
    private orderBookReady = false;
    updateOrderBookUpdate(orderData: any) {
        // this.allupdates.push(orderData);
        if (true) {
            if (orderData[2] !== 0) {
                // if ((orderData[2] - this.eventId !== 1)) {
                //     // this.refreshwalletAndHistory();
                //     // initOb();
                //     return;
                // }
            }
        }
        this.updateOrders(this.sellOrders, orderData[0]);
        this.updateOrders(this.buyOrders, orderData[1]);
        this.sortOrders(this.buyOrders, true);
        this.sortOrders(this.sellOrders, true);
        this.setSpread();
        // this.buyordersSorted();
        // this.sellordersSorted();
        // this.updatelengthofOrderbook();
        this.calculateTotal();
        this.eventId = orderData[2];
        // this.updateOrderbook();
    }
    updateOrders(orders: IObOrder[], newOrders: any[]) {
        const pow = Math.pow(10, this.marketPrecsion);
        newOrders.forEach(order => {
            order[1] = Number(order[1]);
            order[0] = Number(order[0]);
            let index = -1;
            for (let i = 0; i < orders.length; i++) {
                if (orders[i].rate === order[1]) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                if ((Math.floor(order[0] * pow) / pow) <= 0) {
                    orders.splice(index, 1);
                } else {
                    orders[index].quantity = order[0];
                    orders[index].total = Number(Number(orders[index].rate) * Number(orders[index].quantity)).toFixedFloor(this.mainPair.marketPrecision!);
                }
            } else if ((Math.floor(order[0] * pow) / pow) > 0) {
                const _order: IObOrder = {};
                _order.rate = order[1];
                _order.quantity = order[0];
                _order.total = Number(Number(order.rate) * Number(order.quantity)).toFixedFloor(this.mainPair.marketPrecision!);

                // orders from socket babar
                if (_order.quantity !== 0) {
                    orders.push(_order);
                }
            }
        });
    }
    public getSellCount(index: number) {
        const selllength = this.sellOrders.length;
        this.calculateTotal();
        let cnt = 0;
        if (selllength > this.totalOrderBookOrdersToShow) {
            index = index + (selllength - this.totalOrderBookOrdersToShow);
        }

        for (let i = index; i < selllength; i++) {
            if (this.sellOrders[i]) {
                cnt += this.sellOrders[i]?.quantity!;
            }
        }
        return cnt;
    }
    public getBuyCount(index: number) {
        this.calculateTotal();
        let cnt = 0;
        this.sellOrders.forEach((dt, ind) => {
            if (ind > index) {
                return false;
            }
            cnt += dt.quantity!;

        });
        return cnt;
    }
    public calculateTotal(type = 0) {
        const selllength = this.sellOrders.length;
        if (type !== 2) { // in case of 0 and 1
            this.totalOrderQuantity.buy = 0;
            // this.groupedBuy.forEach((order, index) => {
            // if (index < this.totalOrderBookOrdersToShow) {
            // 
            const filterAr = this.sellOrders.filter((order, index) => index < this.totalOrderBookOrdersToShow);
            const qaray = filterAr.map((val: any) => val.quantity);
            const intmax = Math.max(...qaray);
            this.totalOrderQuantity.buy = intmax;
            // }
            // });
        }
        if (type !== 1) { // in case of 0 and 2
            this.totalOrderQuantity.sell = 0;
            const t = selllength - this.totalOrderBookOrdersToShow;
            const filterAr = this.sellOrders.filter((order, index) => index >= t);
            const qaray: any = filterAr.map(val => val.quantity);
            const intmax = Math.max(...qaray);
            this.totalOrderQuantity.sell = intmax;
            // this.groupedSell.forEach((order, index) => {
            //     if (index >= t) {
            //         this.totalOrderQuantity.sell += order.quantity;
            //     }
            // });
        }
    }
    setSpread() {
        let buyBiggest = this.getBiggetQuantity(this.buyOrders);
        let sellBiggest = this.getBiggetQuantity(this.sellOrders);

        this.buyOrders.forEach(ord => {
            ord.spread = (ord.quantity! / buyBiggest) * 100;
        });
        this.sellOrders.forEach(ord => {
            ord.spread = (ord.quantity! / sellBiggest) * 100;
        });
    }
    getBiggetQuantity(array: IObOrder[]) {
        let qntAray: any = array.map(o => o.quantity);
        let max = Math.max(...qntAray);
        return max;
    }
    private processData(orderArray: any): IObOrder[] {
        const orders = [];
        const pow = Math.pow(10, this.mainPair.basePrecision!);
        for (const key in orderArray) {
            if (orderArray[key]) {
                const order: IObOrder = {};
                order.quantity = Number(orderArray[key][0]);
                order.rate = Number(orderArray[key][1]);
                order.total = Number(order.rate * order.quantity).toFixedFloor(this.mainPair.marketPrecision!);
                // if ((Math.floor(order.quantity * pow) / pow) > 0) {
                //     orders.push(order);
                // }
                if (order.quantity > 0) {
                    orders.push(order);
                }
            }
        }
        return orders;
    }
    public parseTradeHistory(history: any): ITradeHistory[] {
        // let history = JSON.parse(res);
        // "0.000447","22844.09","2023-02-07T13:31:31.8193991Z"
        let trades: ITradeHistory[] = []
        // if (history[1] == 1) {
        history.forEach((hist: any) => {
            let trade: ITradeHistory = {};
            trade.quantity = hist[0];
            trade.rate = hist[1];
            let time = new Date(hist[2]);
            trade.time = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
            trade.trendUp = hist[3];
            trade.random = Math.random();
            trades.push(trade);
        });
        // }
        return trades;
    }
    sortOrders(orders: IObOrder[], isBuy: boolean): void {
        if (orders.length > 0) {
            if (!isBuy) {
                orders = orders.sort((a: any, b: any): number => {
                    return a?.rate - b.rate!;
                });
            } else {
                orders = orders.sort((a: any, b: any): number => {
                    return b.rate - a.rate;
                });
            }
        }
    }
    decimal_trunc(figure: any, decimals: number) {
        return Number(figure).toFixedFloor(decimals);
    }
}
