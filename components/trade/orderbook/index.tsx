import React, { Component } from "react";
import SimpleBar from 'simplebar-react';
import { IObOrder, IOrderBook, IPair } from "../../../helpers/interfaces";

declare var window: any;
declare var document: any;

interface Props {
    pickrt?: any;
    isTradeTablet?: boolean;
    sideOrderBook?: boolean;
    orderbook: IOrderBook;
    mainPair:IPair;
    setWidgetHeight?: ((h:number) => void) | undefined,
    orderType?: number
}

interface State {
    pair?: any
    buyOrderBook?: any,
    sellOrderBook?: any,
    loaded: boolean,
    orderBookMode?: number,
    buyTotal?: any,
    sellTotal?: any,
    orderbookHeight: number,
    orderToShow: number,
}

class OrderBook extends Component<Props, State> {
    odbTbodyRef: any = React.createRef();
    odbTrowRef: any = React.createRef();
    bspadingBotm = 0;

    private _isMounted = false;

    constructor(props: Props) {

        super(props);

        this.state = {
            buyOrderBook: [],
            sellOrderBook: [],
            pair: {},
            loaded: false,
            orderBookMode: 0,
            orderbookHeight: 200,
            orderToShow: 8
        };
    }

    updateOrderBook = async () => { }

    private async updateOrdeBookState() {
        // const buyOrderToShow = 8;
        // const sellOrderToShow = 8;

        let sellOrderBook: any = [];
        let buyOrderBook: any = [];
    }

    async componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {

            window['zoomUIBy'] = (window.innerHeight <= 800 && window.innerWidth >= 1024) ? 0.85 : 1;

            await this.setOrderBookHeight();

            // this.setData()

            window.addEventListener('resize', this.setOrderBookHeight);
        }

    }

    componentWillUnmount(): void {
        this._isMounted = false;

        window.removeEventListener('resize', this.setOrderBookHeight)
    }

    orderBookMode = async (mode: number) => {

        await this.setState({
            orderBookMode: mode
        })

        await this.setOrderBookHeight();
        // await this.setData();

    }
    mergeDashes = (totalOrdertoShow: number) => {
        // for()
        let emptyAr = []
        for (let i = 0; i < (totalOrdertoShow); i++) {
            emptyAr.push({ rate: '-', quantity: '-', total: '-',random: Math.random() });
        }
        return emptyAr;
    }
    toFixed = (no: any, precision: number = 2)=>{
        if(isNaN(no)){
            return no;
        }
        return Number(no).toFixedFloor(precision);
    }

   

    setOrderBookHeight = async () => {
        const odbTrowHeight = 31;
        if(!this.props.isTradeTablet){  
            let bsOffHeight = 0;

            if(document.querySelector('.buysell-panel')){                
                bsOffHeight = (document.querySelector('.buysell-tabs').offsetHeight + 20);
            }

            // const odbTbodyHeight = (window.innerHeight / window['zoomUIBy']) - (bsOffHeight + this.odbTbodyRef.current.offsetTop + this.odbTbodyRef.current.offsetHeight + 18)
            const odbTbodyHeight = (window.innerHeight / window['zoomUIBy']) - (340 + this.odbTbodyRef.current.offsetTop + this.odbTbodyRef.current.offsetHeight + 18)
            const orderts = ((odbTbodyHeight / 2) / odbTrowHeight);
            const orderToShow = Math.floor(orderts) * (this.state.orderBookMode === 0 ? 1 : 2);

            await this.setState({
                orderbookHeight: (orderToShow * odbTrowHeight),
                orderToShow: orderToShow
            })
        
            this.bspadingBotm = ((Number('0.' + orderts.toString().split('.')[1]) * 2 ) * 31);
            document.querySelector('.buysell-panel').style.paddingBottom = this.bspadingBotm + 'px'            

            if (this.state.orderBookMode === 0 && document.querySelector('.tradingchart')) {
                if(this.props.setWidgetHeight)
                this.props.setWidgetHeight(this.state.orderbookHeight)
            }
        } else {
            const orderToShow = (8 * (this.state.orderBookMode === 0 ? 1 : 2));
            
            await this.setState({
                orderbookHeight: (orderToShow * odbTrowHeight),
                orderToShow: orderToShow
            })
        }

       
         

    }




    pickRate = (rate?: number | string) => {
        if (rate === undefined) {
            return rate;
        }
        this.props.pickrt(rate);
    }
// this function not set of buy sell prcision
    OrderItemBuy = (item: IObOrder, index: number) => {
        return <React.Fragment key={JSON.stringify(item?.quantity + '-' + item?.random)}>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item.rate)} className={`flex relative z-10 cursor-pointer border-b border-solid border-transparent before:absolute before:top-0 before:bottom-[-1px] before:${item.active ? 'w-2' : 'w-0'} before:left-[-10px] before:bg-[#184538]`}>

                <div className='absolute top-0 h-full -z-10 right-0 bg-[#184538]' style={{ width: item.spread + '%' }}></div>
                <div className='flex-1 p-1.5 leading-normal text-left'>{this.toFixed(item.rate, this.props.mainPair?.marketPrecision!)}</div>
                <div className='flex-1 p-1.5 leading-normal'>{this.toFixed(item?.quantity, this.props.mainPair?.basePrecision)}</div>
                {!this.props.sideOrderBook && <div className='flex-1 p-1.5 leading-normal'>{item?.total}</div>}
            </div>}
            {item.rate === undefined && <div className='flex'>
                <div className='flex-1 p-1.5 leading-normal'>-</div>
                <div className='flex-1 p-1.5 leading-normal'>-</div>
                {!this.props.sideOrderBook && <div className='flex-1 p-1.5 leading-normal'>-</div>}
            </div>}
        </React.Fragment>
    }

    OrderItemSell = (item: IObOrder, index: number) => {
        return <React.Fragment key={JSON.stringify(item?.quantity + '-' + item?.random)}>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item.rate)} className={`flex relative z-10 cursor-pointer border-b border-solid border-transparent before:absolute before:top-0 before:bottom-[-1px] before:${item.active ? 'w-2' : 'w-0'} before:right-[-10px] before:bg-[#4f2332]`}>
                <div className='absolute top-0 h-full -z-10 right-0 bg-[#4f2332]' style={{ width: item.spread + '%' }}></div>
                <div className='flex-1 p-1.5 leading-normal text-left'>{this.toFixed(item.rate, this.props.mainPair?.marketPrecision!) }</div>
                <div className='flex-1 p-1.5 leading-normal'>{this.toFixed(item?.quantity, this.props.mainPair?.basePrecision)}</div>
                {!this.props.sideOrderBook &&<div className='flex-1 p-1.5 leading-normal'>{item?.total}</div>}
            </div>}
            {item.rate === undefined && <div className='flex'>
                <div className='flex-1 p-1.5 leading-normal text-left'>-</div>
                <div className='flex-1 p-1.5 leading-normal'>-</div>
                {!this.props.sideOrderBook && <div className='flex-1 p-1.5 leading-normal'>-</div>}
            </div>}
        </React.Fragment>
    }



    render() {
        // let dashesBuy = this.mergeDashes(this.state.orderToShow - this.props.orderbook.buy?.length!);
        // let buyOrders = [...dashesBuy, ...this.props.orderbook.buy!] 
        let SellOrders = []
        let buyOrders = [];
        let dashesSell = this.mergeDashes(this.state.orderToShow - this.props.orderbook.sell?.length!);
        let sellInprops: any = [...this.props.orderbook?.sell!]
        SellOrders = dashesSell.concat(sellInprops);

        let dashesBuy = this.mergeDashes(this.state.orderToShow - this.props.orderbook.buy?.length!);
        let buyInprops: any = [...this.props.orderbook?.buy!]
        buyOrders = buyInprops.concat(dashesBuy);

        // let buyOrders = 

        return (
            <>
                <div className='flex items-center'>
                    {!this.props.sideOrderBook && <h6 className="text-white text-sm">Order Book</h6>}
                    <div className="flex ml-auto [&_button]:bg-none [&_button]:border-0 [&_button]:w-6">
                        <button type="button" onClick={() => this.orderBookMode(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h7v7H4V4z" fill="#ea3943"></path>
                                <path d="M4 13h7v7H4v-7z" fill="#26de81"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                        <button type="button" onClick={() => this.orderBookMode(2)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h7v16H4V4z" fill="#26de81"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                        <button type="button" onClick={() => this.orderBookMode(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M4 4h7v16H4V4z" fill="#ea3943"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z" fill="currentColor">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='text-white text-xs text-right overflow-hidden px-2.5 -mx-2.5'>
                    <div className="flex relative z-10 border-b border-solid border-232842" ref={this.odbTbodyRef}>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 text-left'>Price (TRY)</div>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Amount (BTC)</div>
                        {!this.props.sideOrderBook && <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Total (TRY)</div>}
                    </div>
                    {this.state.orderBookMode !== 2 && <div style={{height: this.state.orderbookHeight + 'px'}}>
                        <SimpleBar className="font-ibmplex" style={{ maxHeight: this.state.orderbookHeight }}>
                        {SellOrders?.map((item: any, index: number) => (
                            this.OrderItemSell(item, index)
                        ))}
                    </SimpleBar></div>}
                    {this.state.orderBookMode !== 1 && <div style={{height: this.state.orderbookHeight + 'px'}}><SimpleBar className="font-ibmplex" style={{ maxHeight: this.state.orderbookHeight }}>
                        {buyOrders?.map((item: any, index: number) => (
                            this.OrderItemBuy(item, index)
                        ))}
                    </SimpleBar></div>
                    }


                </div>



            </>
        );
    }

}


export default OrderBook


