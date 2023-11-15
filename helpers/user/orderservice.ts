import { PairsManager } from "../../models/market";
import { ApiCall } from "../apicall";
import { randomNo, userOrderDate } from "../common";
import { ICreateOrder, IFill, IUserOrder, IUserOrderPagination, IUserOrderSearchModel, MainOrderTypeT, OrderSideT, OrderStatusT } from "../interfaces";

export class OrderService {
    public initialized = false;
    private static instance: OrderService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (OrderService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (OrderService.instance == null) {
            OrderService.instance = new OrderService();
        }
        return this.instance;
    }
    public async createOrder(modal: ICreateOrder) {
        const res = await ApiCall.getInstance().postAuth('order/create-order', modal, false);
        return res;
    }
    public async cancelOrder(modal: any) {
        //  to cancel single order Ids and PairId
        // to cancel multiple orders use Ids array and pairId 0
        const res = await ApiCall.getInstance().postAuth('order/cancel-order', modal, false);
        return res;
    }
    // /order/user-orders
    public async getUserOrders(): Promise<IUserOrder[]> {
        const res: any = await ApiCall.getInstance().getAuthData('order/user-orders', {}, false);
        let orders: IUserOrder[] = [];
        // er;
        try {
            if (res !== false && res !== undefined) {
                res?.forEach((ord: any) => {
                    let ob: IUserOrder = {};
                    ob.id = ord[0];
                    ob.quantity = ord[1];
                    ob.rate = ord[3];
                    ob.mainOrderType = MainOrderTypeT[ord[4]];
                    ob.orderSide = OrderSideT[ord[5]];
                    ob.status = OrderStatusT[ord[6]];
                    ob.pairName = PairsManager.getInstance().pairs[ord[7]].name;
                    ob.pair = PairsManager.getInstance().pairs[ord[7]];
                    ob.total = (Number(ord[1]) * Number(ord[3])).toFixedFloor(ob.pair?.basePrecision!)
                    ob.dateAdded = userOrderDate(ord[9]);
                    ob.lastUpdated = ord[10];
                    ob.fills = ord[12];
                    ob.fillAmt = 0;
                    ob.quantityFilled = 0;
                    ob.triggerCondition = '--';
                    ob.random = randomNo();
                    let fills: IFill[] = []
                    if (ord[12]) {
                        ord[12].forEach((f: any) => {
                            let fill: IFill = {};
                            fill.rate = f[1]
                            fill.quantity = f[2];
                            fill.time = userOrderDate(f[0]);
                            fill.fee = f[3];
                            fill.pair = ob.pair;
                            fill.side = ob.orderSide;
                            fill.total = (Number(fill?.rate)! * Number(fill?.quantity)!).toFixedFloor(ob.pair?.basePrecision!)
                            ob.quantityFilled = Number((ob.quantityFilled!) + (Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);

                            fills.push(fill);

                            ob.fillAmt = Number((ob.fillAmt ?? 0) + (Number(fill?.rate)! * Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);
                        });
                    }
                    ob.fills = fills ?? [];
                    orders.push(ob);
                });

                // })
                return orders;
            }

        } catch (error) {
            return [];
            // er
        }
        return orders;


        // res.forEach(ord => {
        // 

    }
    public async getOpenOrders() {
        const res: any = await ApiCall.getInstance().getAuthData('order/get-open-orders', {}, false);
        let orders: IUserOrder[] = [];
        // er;
        // try {
        if (res !== false && res !== undefined) {
            res?.forEach((ord: any) => {
                let ob: IUserOrder = {};
                ob.id = ord[0];
                ob.quantity = ord[1];
                ob.rate = ord[3];
                ob.mainOrderType = MainOrderTypeT[ord[4]];
                ob.orderSide = OrderSideT[ord[5]];
                ob.status = OrderStatusT[ord[6]];
                ob.pair = PairsManager.getInstance().pairs[ord[7]];
                ob.pairName = PairsManager.getInstance().pairs[ord[7]].name;

                // ob.total = (Number(ord[1]) * Number(ord[3])).toFixedFloor(ob.pair?.marketPrecision!)
                ob.dateAdded = userOrderDate(ord[9]);
                ob.lastUpdated = ord[10];
                ob.fills = ord[12];
                ob.fillAmt = 0;
                ob.quantityFilled = 0;
                ob.triggerCondition = '--'
                let fills: IFill[] = []
                if (ord[12]) {
                    ord[12].forEach((f: any) => {
                        let fill: IFill = {};
                        fill.rate = f[1]
                        fill.quantity = f[2];
                        fill.time = userOrderDate(f[0]);
                        fill.fee = f[3];
                        fill.pair = ob.pair;
                        fill.side = ob.orderSide;
                        fill.total = (Number(fill?.rate)! * Number(fill?.quantity)!).toFixedFloor(ob.pair?.basePrecision!)
                        ob.quantityFilled = Number((ob.quantityFilled!) + (Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);

                        fills.push(fill);

                        ob.fillAmt = Number((ob.fillAmt ?? 0) + (Number(fill?.rate)! * Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);
                    });
                }
                ob.fills = fills ?? [];
                orders.push(ob);
            });

            // })
            return orders;
        } else {
            return []
        }

        // } catch (error) {
        //     // er
        // }

        // res.forEach(ord => {
        // 

    }

    public async getOrderHistory(modal: IUserOrderSearchModel): Promise<IUserOrderPagination> {
        const res: any = await ApiCall.getInstance().getAuthData('order/get-history-orders', modal, false);
        let orders: IUserOrder[] = [];
        if (res !== false && res !== undefined) {
            res?.Result?.forEach((ord: any) => {
                let ob: IUserOrder = {};
                ob.id = ord[0];
                ob.quantity = ord[1];
                ob.rate = ord[3];
                ob.mainOrderType = MainOrderTypeT[ord[4]];
                ob.orderSide = OrderSideT[ord[5]];
                ob.status = OrderStatusT[ord[6]];
                ob.pair = PairsManager.getInstance().pairs[ord[7]];
                ob.pairName = PairsManager.getInstance().pairs[ord[7]].name;

                // ob.total = (Number(ord[1]) * Number(ord[3])).toFixedFloor(ob.pair?.marketPrecision!)
                ob.dateAdded = userOrderDate(ord[9]);
                ob.lastUpdated = ord[10];
                ob.fills = ord[12];
                ob.fillAmt = 0;
                ob.quantityFilled = 0;
                ob.triggerCondition = '--'
                let fills: IFill[] = []
                if (ord[12]) {
                    ord[12].forEach((f: any) => {
                        let fill: IFill = {};
                        fill.rate = f[1]
                        fill.quantity = f[2];
                        fill.time = userOrderDate(f[0]);
                        fill.fee = f[3];
                        fill.pair = ob.pair;
                        fill.side = ob.orderSide;
                        fill.total = (Number(fill?.rate)! * Number(fill?.quantity)!).toFixedFloor(ob.pair?.basePrecision!)
                        ob.quantityFilled = Number((ob.quantityFilled!) + (Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);

                        fills.push(fill);

                        ob.fillAmt = Number((ob.fillAmt ?? 0) + (Number(fill?.rate)! * Number(fill?.quantity)!)).toFixedFloor(ob.pair?.basePrecision!);
                    });
                }
                ob.fills = fills ?? [];
                orders.push(ob);
            });

            // })
            res.Result = orders;
            return res;
        } else {
            return { Count: 1, Result: [], PageCount: 1, CurrentPageIndex: 1 } as IUserOrderPagination
        }
    }
    public async getOrderFills(modal:IUserOrderSearchModel): Promise<IUserOrderPagination> {
        
        const res: any = await ApiCall.getInstance().getAuthData('order/get-trades', modal ??  {}, false);
        let orders: IFill[] = [];
        if (res !== false && res !== undefined) {
            res.Result.forEach((f: any) => {
                let fill: IFill = {};
                fill.rate = f[3]
                fill.quantity = f[4];
                fill.time = userOrderDate(f[0]);
                fill.fee = f[5];
                // fill.pair = ob.pair;
                fill.pair = PairsManager.getInstance().pairs[f[1]];

                fill.side = OrderSideT[f[2]];
                fill.total = (Number(fill?.rate)! * Number(fill?.quantity)!).toFixedFloor(fill.pair?.basePrecision!)
                // ob.quantityFilled = Number((ob.quantityFilled!) + (Number(fill?.quantity)!)).toFixedFloor(ob.pair?.marketPrecision!);

                orders.push(fill);

                // ob.fillAmt = Number((ob.fillAmt ?? 0) + (Number(fill?.rate)! * Number(fill?.quantity)!)).toFixedFloor(ob.pair?.marketPrecision!);
            });
            res.Result = orders;
            return res;
        } else {
            return { Count: 1, Result: [], PageCount: 1, CurrentPageIndex: 1 } as IUserOrderPagination
        }

        // res.forEach(ord => {
        // 
        // })

    }
    public async fetchOrderFills(modal:{OrderId:number, PairId: number }): Promise<IFill[]> {
        // OrderId PairId two params
        const res: any = await ApiCall.getInstance().getAuthData('order/get-order-trades', modal ??  {}, false);
        let orders: IFill[] = [];
        if (res !== false && res !== undefined) {
            res.forEach((f: any) => {
                let fill: IFill = {};
                fill.rate = f[3]
                fill.quantity = f[4];
                fill.time = userOrderDate(f[0]);
                fill.fee = f[5];
                // fill.pair = ob.pair;
                fill.pair = PairsManager.getInstance().pairs[f[1]];

                fill.side = OrderSideT[f[2]];
                fill.total = (Number(fill?.rate)! * Number(fill?.quantity)!).toFixedFloor(fill.pair?.basePrecision!)
                // ob.quantityFilled = Number((ob.quantityFilled!) + (Number(fill?.quantity)!)).toFixedFloor(ob.pair?.marketPrecision!);

                orders.push(fill);

                // ob.fillAmt = Number((ob.fillAmt ?? 0) + (Number(fill?.rate)! * Number(fill?.quantity)!)).toFixedFloor(ob.pair?.marketPrecision!);
            });
           
            return orders;
        } else {
            return [];
        }
    }
    

}
