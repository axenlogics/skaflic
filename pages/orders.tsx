import Header from "../components/header";
import Footer from "./footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OpenOrders from "./openorder";
import TradeHistory from "./tradehistory";
import OrderHistory from "./orderhistory";
import cx from "classnames";
import { Component } from "react";
import { OrderService } from "../helpers/user/orderservice";
import { IUserOrder, IUserOrderPagination } from "../helpers/interfaces";
import { CurrencyManager, PairsManager } from "../models/market";
import { getQueryParams } from "../helpers/common";


interface Props {
    activeTab: number,

}
interface State {
    openOrders: IUserOrder[],
    OrderHistory: IUserOrderPagination,
    tradeHistory: IUserOrderPagination,
    activeTab: any,

}

export const UserOrdersTab = ['openOrders', 'orderHistory', 'orderFills'];
export const queryParams = ['open-orders', 'order-history', 'order-fills'];


class Orders extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            openOrders: [],
            OrderHistory: {},
            tradeHistory: {},
            activeTab: undefined,
        };
    }
   
    fetchOrders = async (type: any, modal: any) => {
        await CurrencyManager.getInstance().init();
        await PairsManager.getInstance().init()
        if (type === UserOrdersTab[0]) {
            let ord: any = await OrderService.getInstance().getOpenOrders();
            console.log('user orders opne', ord);
            this.setState({ openOrders: ord });
        } else if (type === UserOrdersTab[1]) {
            let ord = await OrderService.getInstance().getOrderHistory(modal);
            this.setState({ OrderHistory: ord });
        } else if (type === UserOrdersTab[2]) {
            let ord = await OrderService.getInstance().getOrderFills(modal);
            this.setState({ tradeHistory: ord });
        }
    }
    cancelOrder = async (order: IUserOrder) => {
        //    
        let madal = { Ids: [order.id], PairId: order.pair?.id };
        let res = await OrderService.getInstance().cancelOrder(madal)
        console.log('orer now in cancel', order, res);
    }
    cancelAll = async (order: IUserOrder) => {
        //    
        let madal = { Ids: [order.id], PairId: order.pair?.id };
        let res = await OrderService.getInstance().cancelOrder(madal)
        console.log('orer now in cancel', order, res);
    }
    defaultTab() {
        let activeTab = 0;
        let params = getQueryParams(window.location.href);
        // let index = 0;
        if (params?.tab && queryParams.indexOf(params.tab) > -1) {
            activeTab = queryParams.indexOf(params.tab);
        }
        console.log('order page url', params, activeTab);
        this.setState({activeTab: activeTab})
    }
    componentDidMount(): void {
      this.defaultTab();
    }

    render(): React.ReactNode {
        return (
            <>
                <Header />
                <main className="cust-h">
                <section className={cx('lg:p-[50px_30px] p-[50px_0px]')}>
                    <div className={cx('container px-4')}>
                        <div>
                            <div>
                               {this.state.activeTab !== undefined && <Tabs defaultIndex={this.state.activeTab} selectedTabClassName={cx('lg:text-[24px] text-[18px] !font-bold leading-normal tracking-normal text-34345b text-center !border-b-[4px] !border-solid !border-primary pb-[8px] pr-[17.5px] pl-[17.5px]')}>
                                    <TabList className={cx('flex align-baseline')}>
                                        <Tab className={cx('flex items-center lg:text-base text-sm font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                            Open Order
                                        </Tab>
                                        <Tab className={cx('flex items-center lg:text-base text-sm font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                            Order History
                                        </Tab>
                                        <Tab className={cx('flex items-center lg:text-base text-sm font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                            Trade History
                                        </Tab>
                                    </TabList>
                                    <div className={cx('max-w-[1508px] h-auto w-full bg-white rounded-[6px] py-10 px-4 mx-auto')}>
                                        <TabPanel  >
                                            <OpenOrders cancelOrder={this.cancelOrder} orders={this.state.openOrders} fetchOrder={this.fetchOrders} />
                                        </TabPanel>
                                        <TabPanel >
                                            <OrderHistory orders={this.state.OrderHistory} fetchOrder={this.fetchOrders} />
                                        </TabPanel>
                                        <TabPanel >
                                            <TradeHistory orders={this.state.tradeHistory} fetchOrder={this.fetchOrders} />
                                        </TabPanel>
                                    </div>
                                </Tabs>}
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </section>
                </main>
        

                <Footer />
            </>
        )
    }
}
// export async function getServerSideProps(context: any) {
//     let activeTab = 0;
//     let params = getQueryParams(context.resolvedUrl);
//     // let index = 0;
//     if (params?.tab && queryParams.indexOf(params.tab) > -1) {
//         activeTab = queryParams.indexOf(params.tab);
//     }
//     console.log('order page url', params, context.resolvedUrl);
//     return {
//         props: { activeTab }
//     }
// }
export default Orders;