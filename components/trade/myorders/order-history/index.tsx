import React, { Component } from 'react';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { IUserOrder } from '../../../../helpers/interfaces';

interface Props {
    scrollHeight?: number,
    orderHistory?: IUserOrder[],
    isTradeTablet?: boolean;
}

interface State {
    openOrders: any;
    detailStatus: any;
    panelShow: any;
}

class OrderHistory extends Component<Props, State> {

    constructor(props: any) {

        super(props);

        this.state = {
            openOrders: [],
            detailStatus: {},
            panelShow: {}
        };
    }

    componentDidMount(): void {
        
    }

    handleOrderDetail = (index: number) => {
        this.setState({
            detailStatus: { [index]: !this.state.detailStatus[index] }
        })
    }

    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }

    OrderDetail = (item: any, index:number) => {
        return (
            <>
                <div className='lg:flex hidden'>
                    <div className='min-w-[245px]  pt-6 px-1'>
                        <h6 className='text-white mb-0 font-medium'>Total Trade: 20.00 <span className="text-8d90b0">USDT</span></h6>
                    </div>
                    <div className='text-right flex-1 text-xs'>
                        <div className="border-solid border-b border-232842 flex items-center">
                            <div className="py-2 px-1 flex-1 text-8d90b0 leading-normal">Amount</div>
                            <div className="py-2 px-1 flex-1 text-8d90b0 leading-normal">Order Price</div>
                            <div className="py-2 px-1 flex-1 text-8d90b0 leading-normal">Fee</div>
                            <div className="py-2 px-1 flex-1 text-8d90b0 leading-normal">Total</div>
                            <div className="py-2 px-1 flex-1 text-8d90b0 leading-normal">Date</div>
                        </div>
                        <div>
                            <div key={index} className="flex items-center">
                                <div className="py-2 px-1 flex-1 leading-normal">0.00746300  <span className="text-8d90b0">BTC</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">319.172 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">0.0300075 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">15 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">10.12.2022 13:04</div>
                            </div>
                            <div key={index} className="flex items-center">
                                <div className="py-2 px-1 flex-1 leading-normal">0.00746300  <span className="text-8d90b0">BTC</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">319.172 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">0.0300075 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">15 <span className="text-8d90b0">TRY</span></div>
                                <div className="py-2 px-1 flex-1 leading-normal">10.12.2022 13:04</div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div className='lg:hidden text-left'>
                    <h6 className='text-white mb-0 font-medium'>Total Trade: 20.00 <span className="text-8d90b0">USDT</span></h6>
                    <div className='flex-1 text-xs'>
                        <div className="border-solid border-b border-232842 flex items-center py-2 text-right">
                            <div className="px-1 flex-1 text-8d90b0 leading-normal text-left">Price/Date</div>
                            <div className="px-1 flex-1 text-8d90b0 leading-normal">Total</div>
                            <div className="px-1 flex-1 text-8d90b0 leading-normal">Amount/ Fee</div>
                        </div>
                        <div key={index} className="flex items-center py-2 text-right">
                            <div className="leading-normal flex-1 px-1 text-left">
                                <div>0.00746300  <span className="text-8d90b0">BTC</span></div>
                                <div className="text-8d90b0">10.12.2022 13:04</div>
                            </div>
                            <div className="leading-normal flex-1 px-1">15 <span className="text-8d90b0">TRY</span></div>
                            <div className="leading-normal flex-1 px-1">
                                <div>
                                    0.0300075 <span className="text-8d90b0">TRY</span>
                                </div>
                                <div>
                                    15 <span className="text-8d90b0">TRY</span>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </>    
        )
    }
    



OrderItem = (item: IUserOrder, index: number) => {
    return (
        <>
            {!this.props.isTradeTablet && <div key={item?.random?.toString()}>
                <div className="items-center font-ibmplex flex">
                    <div className="py-2 px-1 flex-1 leading-normal max-w-[36px] text-left">
                        {item.orderSide === 'Buy' && <Image src="/assets/images/svg/icon_buy.svg" alt="Buy" width={16} height={16} />}
                        {item.orderSide === 'Sell' && <Image src="/assets/images/svg/icon_sell.svg" alt="Buy" width={16} height={16} />}
                    </div>
                    <div className="py-2 px-1 flex-1 leading-normal max-w-[100px] text-[15px] font-medium text-left font-sans">{item.pairName}</div>
                    <div className="py-2 px-1 flex-1 leading-normal max-w-[50px] text-left">{item.mainOrderType}</div>
                    <div className="py-2 px-1 flex-1 leading-normal"> {item.quantity}  <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.triggerCondition}</div>
                    <div className="py-2 px-1 flex-1 leading-normal text-left pl-7">{item.fillAmt} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{(Number(item.rate) * Number(item.quantity)).toFixedFloor(item.pair?.basePrecision!)} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal text-8d90b0">{item.dateAdded}</div>
                    <div className="py-2 pl-1 pr-2 flex-1 leading-normal max-w-[100px]">
                        <div className="inline-flex items-center text-8d90b0 cursor-pointer" onClick={() => this.handleOrderDetail(index)}>
                            {item.status}
                            {!this.state.detailStatus[index] && <FontAwesomeIcon icon={faCirclePlus} className='text-mute text-14 ml-1.5' />}
                            {this.state.detailStatus[index] && <FontAwesomeIcon icon={faCircleMinus} className='text-mute text-14 ml-1.5' />}
                        </div>
                    </div>
                </div>
                {this.state.detailStatus[index] && this.OrderDetail(item, index)}
            </div>}

            {this.props.isTradeTablet && <div key={item.random} className="border-solid border-b border-232842">
                <div className='flex items-center p-2' onClick={() => this.panelToggle(index)}>
                    <div className='text-left'>
                        <div className="pb-2">
                            {item.pairName}
                        </div>
                        <div className="inline-flex items-center">
                            {item.orderSide == 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                            {item.orderSide == 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}
                            <span className="text-success">{item.orderSide}</span>
                        </div>
                    </div>
                    <div className="ml-auto text-right pr-3">
                        <div className="pb-2">{item.quantity} <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                        <div>{item.dateAdded}</div>
                    </div>
                    <FontAwesomeIcon icon={this.state.panelShow[index] ? faAngleUp : faAngleDown} className="text-lg" />
                </div>
                <div className={`p-3 ${this.state.panelShow[index] ? 'block' : 'hidden'}`}>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Price:</div>
                        <div>{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Order Type:</div>
                        <div>{item.mainOrderType}</div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Trigger Condition:</div>
                        <div>{item?.triggerCondition}</div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Filled</div>
                        <div>{item?.fillAmt} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Average Price:</div>
                        <div>{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Total:</div>
                        <div>{(Number(item.rate) * Number(item.quantity)).toFixedFloor(item.pair?.basePrecision!)} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    </div>
                    <div className="py-2 px-1 flex justify-between leading-normal">
                        <div>Status:</div>
                        <div>{item?.status}</div>
                    </div>
                    <div className="py-2 pl-1 pr-2 leading-normal text-center">
                        <button type='button' onClick={() => this.handleOrderDetail(index)} className="bg-dark inline-flex items-center py-2 px-3">
                            <FontAwesomeIcon icon={this.state.detailStatus[index] ? faAngleUp : faAngleDown} className="text-lg leading-tight mr-1.5" />
                            Show Trade Detail</button>
                    </div>
                    {this.state.detailStatus[index] && this.OrderDetail(item, index)}
                </div>
            </div>}
        </>
    )
}



render(){

    return (
        <div className="py-2 px-3 rounded-[3px] bg-ffffff0a text-white text-xs text-right">
                {!this.props.isTradeTablet && <div className="flex border-solid border-b border-232842 items-center">
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal max-w-[36px] text-left">Side</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal max-w-[100px] text-left">Pair</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal max-w-[50px] text-left">Type</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Amount</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Order Price</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Trigger Condition</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal text-left pl-7">Filled</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Average Price</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Total</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Date</div>
                    <div className="py-2 pl-1 pr-2 flex-1 text-8d90b0 font-medium leading-normal max-w-[100px]">Status/Details</div>
                </div>}
                <div className="myorder-tbody">
                    <SimpleBar style={{ height: this.props.scrollHeight }}>
                        {this.props.orderHistory?.map((item: any, index: number) => (
                            this.OrderItem(item, index)
                        ))}
                    </SimpleBar>
                </div>

           
        </div>
    );
}
}

export default OrderHistory