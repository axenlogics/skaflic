import React, { Component } from "react";
import Header, { NavbarSize, NavbarType } from "../../components/header";
import BuySell from "../../components/trade/buysell";
import Chart from "../../components/trade/chart";
import OrderBook from "../../components/trade/orderbook";
import PairMenu from "../../components/trade/pair-menu";
import PairTicker from "../../components/trade/pair-ticker";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../../../styles/trade.module.css';
import MyOrders from "../../components/trade/myorders";
import Image from 'next/image';
import { CurrencyManager, PairsManager } from "../../models/market";
import MarketHistory from "../../components/trade/market-history";
import withRouter from "next/dist/client/with-router";
import { Router } from "next/dist/client/router";
import { getReturnQuery, randomNumbers, sleep } from "../../helpers/common";
// import { store } from "../../redux/Store";
import { connect } from "react-redux";
import { NextSeo } from "next-seo";
import { Page_titles } from "../../models/page_titles";
import { IOrderBook, IPair, ITradeHistory } from "../../helpers/interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import { Socket } from "../../services/socket";
import withAuth from "../../components/auth/withAuth";
import { IUseAuth } from "../../components/auth/authprovider";
import { UserService } from "../../helpers/userservice";
import { User } from "../../models/user";
import { WalletService } from "../../helpers/user/walletservice";
import { OrderService } from "../../helpers/user/orderservice";
import { OrderbookService } from "../../helpers/market/orderbookservice";
import { MarketService } from "../../helpers/market/marketservice";
import OpenOrder from "../../components/trade/myorders/open-order";

declare var window: any;
declare var document: any;

interface Props {
    router: Router;
    mainPairId: number;
    pairs: { [id: number]: IPair };
    dispatch: Dispatch,
    session: IUseAuth,
    isSessionExist: boolean,
    tickerData: any[];
    orderBook: any[];
    test: string,

}

interface State {
    marketStats: any;
    rate: number;
    isTradeTablet: boolean;
    isTradeMobile: boolean;
    orderbook: IOrderBook;
    tradeHistory: ITradeHistory[];
    orderType?: number

}

class TradePage extends Component<Props, State> {
    private refreshTime: any;
    private _isMounted = false;
    private _isFirstLoad = false;
    private _ticker: any;
    // private _pageLoaded = false;
    tradeHistoryRef = React.createRef<any>()
    pairTickerRef = React.createRef<any>()
    orderBookRef = React.createRef<any>()
    chartRef = React.createRef<any>()
    myOrdersRef = React.createRef<any>()

    constructor(props: Props) {
        super(props);

        this.state = {
            marketStats: [],
            rate: 0,
            isTradeTablet: false,
            isTradeMobile: false,
            orderbook: { buy: [], sell: [], eventId: 0 },
            tradeHistory: [],
            orderType: 1
        };

        this.setWidgetHeight = this.setWidgetHeight.bind(this);
        this.getOrderType = this.getOrderType.bind(this);
        // this.setTicker();
        // this.initialPair();

    }
    setTicker = async () => {
        if (this._isMounted === false) {
            this._ticker = await MarketService.getInstance().getTicker({});
        }
    }


    initialPair = async () => {
        // if (typeof window === 'undefined'){
        //     await sleep(10);
        //     this.initialPair();
        //     return;
        // }
        const url = window.location.href;
        let pairs = PairsManager.getInstance().getPairs();
        let pp = PairsManager.getInstance().pairs;
        let p1 = this.props.pairs;
        if (url.indexOf('/trade') > -1) {
            if (url.split('/')[url.split('/').length - 1] === 'trade') {
                // initialState.selectedPair = 1

                this.props.dispatch({ type: 'CHANGE_PAIR', payload: (this.props.mainPairId ? this.props.mainPairId : 1) });
            } else {

                const pairName = url.split('/')[url.split('/').length - 1];
                let pairMatch = false;
                // if (pairName?.length > 0) {
                const pName = String(pairName).toLowerCase().replace('_', '/')
                pairs.forEach(pair => {
                    if (pair.id !== 0 && pair.name?.toLowerCase() === pName) {
                        pairMatch = true;
                        const id = pair.id === undefined ? 1 : pair.id;
                        this.props.dispatch({ type: 'CHANGE_PAIR', payload: id });

                        // store.dispatch('pair')
                        // store.dispatch({ type: 'CHANGE_PAIR', payload: pair.id });

                    }
                })
                if (!pairMatch) {

                    this.props.dispatch({ type: 'CHANGE_PAIR', payload: this.props.mainPairId ? this.props.mainPairId : 1 });
                    // const pair = PairsManager.getInstance().getPair(1)
                    // this.props.router.push({
                    //     pathname: '/trade/' + pair.name?.replace('/', '_'),
                    //     // query: { sortBy: 'price' }
                    // },
                    //     undefined, { shallow: true }
                    // )
                    // initialState.selectedPair = 1
                }
            }
        }
    }
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        // if (this.props.pairs !== nextProps.pairs) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }
    // getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    //     

    //     return false;
    // }
    checkRouterReady = async () => {
        let props = this.props;
        let status = props.pairs[props.mainPairId]?.Status
        if (props.router.isReady && status) {

            const pair = PairsManager.getInstance().getPairs().find(p => p.id === props.mainPairId && p.Status);
            if (pair !== undefined) {
                this.props.router.query.pair = pair?.name?.replace('/', '_');
                this.props.router.push(this.props.router)
                this.changePair(pair);
            }
        } else {
            await sleep(50);
            this.checkRouterReady();
        }
    }


    initPairs = () => {
        // PairsManager.getInstance().pairs;
    }
    initSOcket = async () => {
        // 
        // console.log('ticker now', this._ticker);
        await Socket.getInstance().start();
        // 
        // Socket.getInstance().initEvents((userOrder: any)=>{
        //   
        // });
    }
    fetchUserData = async () => {

    }
    initTradePage = async () => {
        if (this.props.orderBook) {
            this.setOrderBOok(this.props.orderBook)
        }
        this.IinitTicker();
        await this.setPairsAll();
        this.initSOcket();
        await this.initialPair();
        this.checkRouterReady();
        await User.getInstance().loadData();
        await WalletService.getInstance().fetchWallets();

    }
    setOrderBOok = (ob: any) => {
        let obService = OrderbookService.getInstance();
        if (ob[3] === 1) {
            obService.processInit(ob);
        } else {
            obService.updateOrderBookUpdate(ob);
        }
        let setOb: IOrderBook = {
            buy: obService.buyOrders,
            sell: obService.sellOrders,
        }
        this.setState({ orderbook: setOb });
    }
    setTradeHistory = (trades: any) => {
        let obService = OrderbookService.getInstance();
        if (typeof trades === 'string') {
            trades = JSON.parse(trades);
        }
        if (trades[1] === 1) {
            if (trades[0].length > 50) {
                trades[0] = trades[0].splice(0, 20);
            }
            let td = obService.parseTradeHistory(trades[0]);
            this.setState({ tradeHistory: td });
        } else {
            let td = obService.parseTradeHistory(trades);

            let td1 = [...this.state.tradeHistory];
            // let newtd = td.concat(td1);
            Array.prototype.push.apply(td, td1);
            this.setState({ tradeHistory: td });
        }
    }
    changePair = async (pair: IPair) => {
        let socket = Socket.getInstance();
        if (!socket.isSocketConnected()) {
            await sleep(100);
            // await this.initSOcket();
            this.changePair(pair);
            return;
        }
        // Socket.getInstance().disposeSocketPair();
        let obService = OrderbookService.getInstance();
        obService.init(pair);

        if (socket.getSocketPair() && socket.getSocketPair()?.getActivePair().id === pair.id) {
            return;
        }
        const pairSubscription = await Socket.getInstance().listenPair(pair, (ob: any) => {
            this.setOrderBOok(ob);
        }, trades => {
            this.setTradeHistory(trades);
        });
        await pairSubscription.start();
        await socket.requestPairData(pair.id!);
        this._isFirstLoad = true;

    }
    IinitTicker = () => {
        Socket.getInstance().startTickerUpdater();
    }
    componentWillUnmount() {
        let socket = Socket.getInstance();

        this._isMounted = false;
        console.log('unmount called');
        document.getElementsByTagName('html')[0].style = null;
        if (socket.isSocketConnected()) {
            socket.disposeSocketPair();
            socket.getUserSocket()?.dispose();
            socket.getTickerSocket()?.dispose();
            socket.removeSocketPair();
            socket.stop();
        }

        // socket.getSocketPair()
        // let obService = OrderbookService.getInstance();
        // obService.init(pair);

    }
    componentDidMount() {
        console.log('ticker data now', this.props.tickerData)
        this.initTradePage();
        // UserService.getInstance().getLocalData();
        // pair managment


        // end pair managment
        this._isMounted = true;

        if (this._isMounted) {
            this.initPairs();
            const dt = [{ name: 'BTC / TRY', rate: 319.283, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'ETH / TRY', rate: 800.475, trend: 2.81, trendup: true, time: '02:17' },
            { name: 'AVAX / TRY', rate: 257.1, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'XRP / TRY', rate: 0.8, trend: 2.81, trendup: true, time: '02:17' }
            ]
            this.setState({ marketStats: dt })

            this.screenSize()

            this.applyChangeInZoom()

            window.addEventListener('resize', this.screenSize);

            window.addEventListener('resize', this.applyChangeInZoom);
        }
        this.props.dispatch({ type: 'ISLOGGED_IN', payload: this.props.isSessionExist });
    }


    screenSize = () => {
        this.setState({
            isTradeTablet: window.innerWidth < 1200,
            isTradeMobile: window.innerWidth < 768
        });

        console.log('isTradeTablet', this.state.isTradeTablet)
    }




    applyChangeInZoom = async (isZoom = true) => {

        window['zoomUIBy'] = (window.innerHeight <= 800 && window.innerWidth >= 1200) ? 0.85 : 1;

        const htmlEle = document.getElementsByTagName('html')[0];
        htmlEle.style.transform = window['zoomUIBy'] === 1 ? null : 'scale(' + window['zoomUIBy'] + ')';
        htmlEle.style.width = window['zoomUIBy'] === 1 ? null : window.innerWidth / window['zoomUIBy'] + 'px';
        htmlEle.style.height = window['zoomUIBy'] === 1 ? null : window.innerHeight * (htmlEle.offsetHeight / htmlEle.getBoundingClientRect().height) + 'px';
    }


    pickRate = (rate: number) => {
        // this.childRef.current?.picRate(rate);
        this.setState({ rate: rate })
        // this.childRef.
    }
    reFreshPairs = async () => {
        // await sleep(500);
        // 
        this.props.dispatch({
            type: 'PAIRS_SET_REFRESH',
            payload: '',
        });
        // 
    }

    getOrderType = (type:number) => {
        console.log('type', type)
        // this.setState({
        //     orderType: type
        // })
    }

    setWidgetHeight = (obh: number) => {


        if (this.state.isTradeTablet)
            return

        this.tradeHistoryRef.current.setTradeHistoryHeight(obh)
        this.chartRef.current.setChartHeight(this.orderBookRef.current.offsetHeight - (this.pairTickerRef.current.offsetHeight + 10))

        this.myOrdersRef.current.setScrollHeight()
    }
    async setPairsAll() {
        // await sleep(1000);
        // this.setPairsAll();
        await CurrencyManager.getInstance().init();
        await PairsManager.getInstance().init();
        console.log('ticker now', this._ticker);
        // await PairsManager.getInstance().setTicker(this._ticker ?? []);
        let pairs = PairsManager.getInstance().pairs;
        // 
        if (Object.keys(this.props.pairs).length === 0) {
            this.props.dispatch({
                type: 'PAIRS_SET_ALL',
                payload: pairs,
            })
        }
        clearInterval(this.refreshTime);
        this.refreshTime = setInterval(() => {
            // this.applyChangepair();
            this.reFreshPairs();
        }, 2000);
    }
    async applyChangepair() {
        // await sleep(300);
        // pairs = this.props.pairs;
        let keys: string[] = Object.keys(this.props.pairs);
        for (let key of keys) {
            let pair = { ...this.props.pairs[Number(key)] }
            pair.rate = randomNumbers(pair?.rate!, (pair?.rate! + 10));
            pair.rateUsd = pair.rate ? (pair.rate) / 1000 : 0;

            pair.volume = randomNumbers(10, 1000);
            pair.change24hour = {
                value: randomNumbers(1, 10),
                isPositive: randomNumbers(1, 0) ? true : false,
            }

            // setPair(this.pairs[Number(key)]);
            this.props.dispatch({
                type: 'PAIRS_SET',
                payload: { ...pair }
            });
        }
        // 
    }
    render() {
        // const { data: session, status } = this.props.session
        const mainPair = this.props.pairs[this.props.mainPairId];
        // const mainPair = this.props.pairs[this.props.mainPairId];
        // 

        return (
            <React.Fragment>
                <NextSeo
                    title={
                        (mainPair?.rate ? (((mainPair?.rate) + ' | ' + (mainPair?.name) + ' | ' + Page_titles.trade?.title)) : Page_titles.trade?.title)}
                    description={Page_titles.trade.description}
                />
                <Header isTrade={true} isSessionExist={this.props.isSessionExist} navbarType={NavbarType.dark} navbarSize={NavbarSize.sm} contClassName='max-w-full' logoText={false} searchEnabled={false} />

                <div className="bg-dark py-2 md:px-5">
                    <>
                        {!this.state.isTradeTablet && <div className='lg:flex'>
                            <div className="flex flex-wrap flex-1">
                                <div className="flex-1 max-w-[370px]">
                                    <div className="p-2.5 rounded-[4px] mr-2.5 bg-ffffff0a">
                                        <MarketHistory ref={this.tradeHistoryRef} mainPair={mainPair} trades={this.state.tradeHistory} key={String(this.state.isTradeTablet)} isTradeTablet={false} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div ref={this.pairTickerRef} className={cx("flex rounded-[4px] bg-ffffff0a py-[8.5px] pr-[10px] lg:pl-[15px] pl-[10px]")}>
                                        <PairMenu changePair={this.changePair} mainPairId={this.props.mainPairId} pairs={this.props.pairs} pairSelectorV2={false} />
                                        <PairTicker mainPair={mainPair} />
                                    </div>
                                    <div className='mt-2.5'>
                                        <Chart ref={this.chartRef} />
                                    </div>
                                </div>
                                <div className='mt-2.5 relative basis-full'>
                                    <MyOrders ref={this.myOrdersRef} key={String(this.state.isTradeTablet)} isTradeTablet={false} />
                                </div>
                            </div>
                            <div className='max-w-[450px] ml-2.5'>
                                <div ref={this.orderBookRef} className="p-2.5 rounded-[4px] bg-ffffff0a">
                                    <OrderBook orderType={this.state.orderType} setWidgetHeight={this.setWidgetHeight} mainPair={mainPair} orderbook={this.state.orderbook} key={String(this.state.isTradeTablet)} isTradeTablet={false} pickrt={this.pickRate} />
                                </div>
                                <div className='p-2.5 mt-2.5 relative rounded-[4px] bg-ffffff0a buysell-panel'>
                                    <BuySell _setOrderType={this.getOrderType} key={String(mainPair?.id)} mainPair={mainPair} ratep={this.state.rate} />
                                </div>
                            </div>
                        </div>}


                        {this.state.isTradeTablet &&
                            <>
                                <div className={cx("flex rounded-[4px] bg-ffffff0a py-[8.5px] pr-[10px] lg:pl-[15px] pl-2.5")}>
                                    <PairMenu changePair={this.changePair} mainPairId={this.props.mainPairId} pairs={this.props.pairs} pairSelectorV2={false} />
                                    <PairTicker mainPair={mainPair} />
                                </div>
                                <Tabs selectedTabClassName="relative !text-white !border-b-primary bg-ffffff0a">
                                    <TabList className="flex mb-2 text-center">
                                        <Tab className="text-sm flex-1 text-mute py-2 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">Market</Tab>
                                        <Tab className="text-sm flex-1 text-mute py-2 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">Trade</Tab>
                                        <Tab className="text-sm flex-1 text-mute py-2 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">My Orders</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <Chart />
                                        <div className="p-2.5 mt-2.5 rounded-[4px] bg-ffffff0a">
                                            <OrderBook mainPair={mainPair} orderbook={this.state.orderbook} key={String(this.state.isTradeTablet)} isTradeTablet={true} pickrt={this.pickRate} />
                                        </div>
                                        <div className="p-2.5 rounded-[4px] mt-2.5 bg-ffffff0a">
                                            <MarketHistory mainPair={mainPair} trades={this.state.tradeHistory} key={String(this.state.isTradeTablet)} isTradeTablet={true} />
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="flex mt-2.5">
                                            <div className='p-2.5 relative flex-1 rounded-[4px] bg-ffffff0a buysell_panel'>
                                                <BuySell key={String(mainPair?.id)} mainPair={mainPair} ratep={this.state.rate} />
                                            </div>
                                            <div className="py-2.5 rounded-[4px] md:basis-96 basis-40 border-l-2 border-solid border-232842 bg-ffffff0a">
                                                <OrderBook mainPair={mainPair} orderbook={this.state.orderbook} isTradeTablet={true} sideOrderBook={true} pickrt={this.pickRate} />
                                            </div>
                                        </div>
                                        <MyOrders key={String(this.state.isTradeTablet)} isTradeTablet={true} />
                                    </TabPanel>
                                    <TabPanel>
                                        <MyOrders key={String(this.state.isTradeTablet)} isTradeTablet={true} />
                                    </TabPanel>
                                </Tabs>
                            </>}
                    </>
                </div>
                <style>
                    {
                        `
                        html {
                            transform-origin: top left;
                            background-color: #020f2d;
                        }
                        body{
                            background-color: #020f2d;
                        }

                        @media screen and (min-width:1200px){
                            html {
                                overflow: hidden;
                            }
                        }
                     `
                    }
                </style>
            </React.Fragment>
        );
    }

    // static getInitialProps = async (context: any) => {
    //     let tickerData = await MarketService.getInstance().getTicker({});

    //     let orderBook;
    //     let tradeHistory;
    //     let url = context.asPath.split('/');
    //     let pairId = 0;
    //     // console.log(context.resolvedUrl);
    //     if (url?.length === 3) {
    //         let pairs = await MarketService.getInstance().fetchPairs();
    //         let paramPair = url[2]?.replace('_', '/')
    //         pairs?.forEach(p => {
    //             if (paramPair === p[1]) {
    //                 pairId = p[0];
    //                 console.log('pair found');
    //             }
    //         });
    //         if (pairId > 0) {
    //             orderBook = await MarketService.getInstance().getOrderBook({ Id: pairId });
    //             orderBook[3] = 1;
    //         }
    //     }
    //     console.log('context now', tickerData, orderBook);

    //     if (context?.asPath === '/trade' || pairId === 0) {
    //         return {
    //             redirect: {
    //                 source: '/trade',
    //                 destination: '/trade/BTC_USDT',
    //                 permanent: false,

    //             }
    //         }
    //     }
    //     // 
    //     // const isSessionExist = session !== null;
    //     return {
    //         props: { tickerData, orderBook }
    //     }
    // }
}
// export async function getServerSideProps() {
//     let test = 'test';
//     return {
//         props: {test}, // will be passed to the page component as props
//     }
// }


const mapStateToProps = (state: any) => {
    return {
        mainPairId: state.pairReducer.selectedPair,
        pairs: state.pairReducer.pairs,
        // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
    }
}

export default connect(mapStateToProps, null)(withRouter(TradePage));
// export default TradePage
// export default withRouter(TradePage);


