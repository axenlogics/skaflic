import React, { Component } from 'react';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { IFill } from '../../../../helpers/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface Props{
    scrollHeight?: number,
    fills?: IFill[];
    isTradeTablet?: boolean;
}

interface State{
    openOrders: any;
    panelShow: any;
}

class TradeHistory extends Component<Props, State> {

    constructor(props:any) {

        super(props);
        
        this.state = {
            openOrders: [],
            panelShow: {}
        };
    }

    componentDidMount(): void {
        
    }

    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }


    OrderItem = (item: IFill, index:number) => {
        return (
            <>
                {!this.props.isTradeTablet && <div key={index} className="items-center font-ibmplex flex">
                    <div className="py-2 px-1 flex-1 leading-normal max-w-[36px] text-left">
                        {item.side === 'Buy' && <Image src="/assets/images/svg/icon_buy.svg" alt="Buy" width={16} height={16} />}
                        {item.side === 'Sell' && <Image src="/assets/images/svg/icon_sell.svg" alt="Buy" width={16} height={16} />}
                    </div>
                    <div className="py-2 px-1 flex-1 leading-normal max-w-[100px] text-[15px] font-medium text-left font-sans">{item.pair?.name}</div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.quantity}  <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item?.fee}</div>
                    <div className="py-2 px-1 flex-1 leading-normal">{item.total}</div>
                    <div className="py-2 pl-1 pr-2 flex-1 leading-normal text-8d90b0">{item.time}</div>
                </div> }

                {this.props.isTradeTablet && <div key={index} className="border-solid border-b border-232842 lg:hidden">
                    <div className='flex items-center p-2' onClick={() => this.panelToggle(index)}>
                        <div className='text-left'>
                            <div className="pb-2">
                                {item.pair?.name}
                            </div>
                            <div className="inline-flex items-center">
                                {item.side == 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                {item.side == 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}
                                <span className="text-success">{item.side}</span>
                            </div>
                        </div>
                        <div className="ml-auto text-right pr-3">
                            <div className="pb-2">{item.quantity} <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                            <div>{item.time}</div>
                        </div>
                        <FontAwesomeIcon icon={this.state.panelShow[index] ? faAngleUp : faAngleDown} className="text-lg" />
                    </div>
                    <div className={`p-3 ${this.state.panelShow[index] ? 'block' : 'hidden'}`}>
                        <div className="py-2 px-1 flex justify-between leading-normal">
                            <div>Price:</div>
                            <div>{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                        </div>
                        <div className="py-2 px-1 flex justify-between leading-normal">
                            <div>Amount:</div>
                            <div>{item.quantity} <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                        </div>
                        <div className="py-2 px-1 flex justify-between leading-normal">
                            <div>Fee:</div>
                            <div>{item?.fee}</div>
                        </div>
                        <div className="py-2 px-1 flex justify-between leading-normal">
                            <div>Total:</div>
                            <div>{item?.total}</div>
                        </div>
                        
                    </div>
                </div>}
            </>
        ) 
    }
    

    render(){
        
        return (
            <div className="py-2 px-3 rounded-[3px] bg-ffffff0a text-white text-xs text-right">
                {!this.props.isTradeTablet && <div className="border-solid border-b border-232842 items-center flex">
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal max-w-[36px] text-left">Side</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal max-w-[100px] text-left">Pair</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Amount</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Order Price</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Fee</div>
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Total</div>
                    <div className="py-2 pl-1 pr-2 flex-1 text-8d90b0 font-medium leading-normal">Date</div>
                </div> }
                <div className="myorder-tbody">
                    <SimpleBar style={{ height: this.props.scrollHeight }}>
                        {this.props.fills?.map((item:any, index: number) => (
                            this.OrderItem(item, index)
                        ))}
                    </SimpleBar>
                </div>
            </div>
        );
    }
}

export default TradeHistory