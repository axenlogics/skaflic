import React, { Component } from 'react';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { OrderService } from '../../../../helpers/user/orderservice';
import { IUserOrder } from '../../../../helpers/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
    scrollHeight?: number;
    openOrders: IUserOrder[];
    isTradeTablet?: boolean;
}

interface State {
    openOrders: any;
    panelShow: any
}

class OpenOrder extends Component<Props, State> {

    constructor(props: any) {

        super(props);

        this.state = {
            openOrders: [],
            panelShow: {}
        };
    }
    componentDidMount(): void {

    }
    cancelOrder = async (order: IUserOrder) => {
        //    
        let madal = { Ids: [order.id], PairId: order.pair?.id };
        let res = await OrderService.getInstance().cancelOrder(madal)
        console.log('orer now in cancel', order, res);
    }
    percentageFilled(item: IUserOrder) {
        let per = (Number(item.quantityFilled) / Number(item.quantity)) * 100;
        //    
        return per;
    }

    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }


    OrderItem = (item: IUserOrder, index: number) => {
        return (
            <>
                <div key={item.random}>
                    {!this.props.isTradeTablet && <div className="items-center font-ibmplex flex">
                        <div className="py-2 px-1 flex-1 leading-normal max-w-[36px] text-left">
                            {item.orderSide === 'Buy' && <Image src="/assets/images/svg/icon_buy.svg" alt="Buy" width={16} height={16} />}
                            {item.orderSide === 'Sell' && <Image src="/assets/images/svg/icon_sell.svg" alt="Buy" width={16} height={16} />}
                        </div>
                        <div className="py-2 px-1 flex-1 leading-normal max-w-[100px] text-[15px] font-medium text-left font-sans">{item.pairName}</div>
                        <div className="py-2 px-1 flex-1 leading-normal max-w-[50px] text-left">{item.mainOrderType}</div>
                        <div className="py-2 px-1 flex-1 leading-normal"> {item.quantity} <span className="text-8d90b0">{item.pair?.marketCurrency?.symbol}</span></div>
                        <div className="py-2 px-1 flex-1 leading-normal">{item.rate} <span className="text-8d90b0">{item.pair?.baseCurrency?.symbol}</span></div>
                        <div className="py-2 px-1 flex-1 leading-normal">{item?.fillAmt}</div>
                        <div className="py-2 px-1 flex-1 leading-normal text-left pl-7">{this.percentageFilled(item)}%
                            <span className="w-[50px] h-1 inline-block ml-2" style={{ background: `linear-gradient(to right, rgb(14, 201, 128) 0%, rgb(14, 201, 128) ${this.percentageFilled(item)}%, rgb(35, 40, 66) ${this.percentageFilled(item)}%, rgb(35, 40, 66) 100%)` }}></span>
                        </div>
                        <div className="py-2 px-1 flex-1 leading-normal text-8d90b0">{item.dateAdded}</div>
                        <div onClick={() => this.cancelOrder(item)} className="py-2 pl-1 pr-2 flex-1 leading-normal max-w-[55px]">
                            <button type='button' className="bg-none border-0 relative w-3 h-3"><Image src="/assets/images/svg/x.svg" alt="Cancel" fill /></button>
                        </div>
                    </div>}

                    {this.props.isTradeTablet && <div className="border-solid border-b border-232842">
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
                                <div>{item?.fillAmt}</div>
                            </div>
                            <div className="py-2 px-1 flex justify-between leading-normal">
                                <div>Filled</div>
                                <div>
                                    {this.percentageFilled(item)}%
                                    <span className="w-[50px] h-1 inline-block ml-2" style={{ background: `linear-gradient(to right, rgb(14, 201, 128) 0%, rgb(14, 201, 128) ${this.percentageFilled(item)}%, rgb(35, 40, 66) ${this.percentageFilled(item)}%, rgb(35, 40, 66) 100%)` }}></span>
                                </div>
                            </div>
                            <div className="py-2 pl-1 pr-2 leading-normal text-center">
                                <button type='button' onClick={() => this.cancelOrder(item)} className="bg-dark py-2 px-3">Cancel Order</button>
                            </div>
                        </div>

                    </div>}
                </div>

            </>
        )
    }


    render() {

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
                    <div className="py-2 px-1 flex-1 text-8d90b0 font-medium leading-normal">Date</div>
                    <div className="py-2 pl-1 pr-2 flex-1 text-8d90b0 font-medium leading-normal max-w-[55px]">Action</div>
                </div>}
                <div className="myorder-tbody">
                    <SimpleBar style={{ height: this.props.scrollHeight }}>
                        {this.props.openOrders.map((item: any, index: number) => (
                            this.OrderItem(item, index)
                        ))}
                    </SimpleBar>
                </div>
            </div>
        );
    }
}

export default OpenOrder