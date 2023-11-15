import React, { Component } from 'react';
import styles from './style.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OpenOrder from './open-order';
import TradeHistory from './trade-history';
import OrderHistory from './order-history';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { OrderService } from '../../../helpers/user/orderservice';
import { IFill, IUserOrder } from '../../../helpers/interfaces';
import { Socket } from '../../../services/socket';
import { sleep } from '../../../helpers/common';

declare var document: any;

interface Props {
    isTradeTablet?: boolean
}

interface State {
    checked: boolean,
    scrollHeight: any,
    openOrders: IUserOrder[],
    orderHisotry: IUserOrder[];
    fills: IFill[];
    userOrders: IUserOrder[],
}

class MyOrders extends Component<Props, State> {
    _Mounted = false;
    _listenUserOrderInited = false;
    private _isMounted = false;

    constructor(props: Props) {

        super(props);

        this.state = {
            checked: false,
            scrollHeight: 'auto',
            openOrders: [],
            orderHisotry: [],
            fills: [],
            userOrders: [],

        };
    }

    componentDidMount(): void {
    this._Mounted = true;
        this._isMounted = true;

        if (this._isMounted) {
            
        }
        
        this.getOrders();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    setScrollHeight = async () => {

        const buysellHeight = document.querySelector('.buysell-panel').offsetHeight;
        const mytbodyOffset = document.querySelector('.myorder-tbody').offsetTop;

        let scrollHeight;
        scrollHeight = buysellHeight - (mytbodyOffset + 8);

        this.setState({
            scrollHeight: scrollHeight
        })
    }

    handleChange = (checked: boolean) => {
        this.setState({ checked });
    }

    cancelAllOrders = async () => {
        let madal = {Ids: [], PairId: 1};
        let res = await OrderService.getInstance().cancelOrder(madal)
        console.log('orer now in cancel', res);
    
        // alert('Cancel all orders')
    }

    getOrders = async () => {
        // setData = async () => {
        // export const OrderStatusT = ['Active', 'Complete', 'Cancelled', 'OnHold'];

        let orders = await OrderService.getInstance().getUserOrders();
        if (orders !== undefined) {
            let openOrders = orders.filter(ord => ord.status === 'Active' || ord.status === 'OnHold');
            let orderHistory = orders.filter(ord => ord.status === 'Complete' || ord.status === 'Cancelled');
            let fills: any = [];
            orders.map(ord => {
                //    fills.concat(ord.fills) 
                fills = [...fills, ...ord.fills!];
            });
            // debugg
            // console.log('fills now', fills)
            await this.setState({
                userOrders: orders,
                openOrders: openOrders,
                orderHisotry: orderHistory,
                fills: fills,
            });
        }


        // console.log('user orders', orders)
        this.connecToSocket();

        // }
    }
    connecToSocket = async () => {
        let socket = Socket.getInstance();
        if(this._listenUserOrderInited){
            return;
        }
        if (!socket.isSocketConnected()) {
            await sleep(100);
            await this.connecToSocket();
            // this.changePair(pair);
            return;
        }
        
        console.log('connect to socket called', socket.isSocketConnected());

        let userSocket = await Socket.getInstance().getUserSocket();
        userSocket?.listenUserOrderUpdates(ord => {
            console.log('user order order update came');    
        });
        this._listenUserOrderInited = true;
    }
   


    render() {

        return (
            <React.Fragment>
                {!this.props.isTradeTablet && <div className="absolute right-0 items-center text-sm text-mute flex">
                    <div className="mr-2">
                        <label className='flex items-center cursor-pointer'>
                            <span className='mr-2 select-none'>Hide Other Pairs</span>
                            <Switch checked={this.state.checked} onChange={this.handleChange} checkedIcon={false} offColor='#232842' onColor='#2152fa' onHandleColor='#8c8fae' offHandleColor='#8c8fae' uncheckedIcon={false} width={34} height={17} />
                        </label>
                    </div>
                    <button className="py-1.5 px-2 ml-2.5 font-sans text-mute text-sm font-medium bg-ffffff0a hover:text-white" type='button' onClick={this.cancelAllOrders}>Cancel All Orders</button>
                </div>}
                <Tabs className='myorder_tabs' selectedTabClassName="relative !text-white !border-b-primary bg-ffffff0a">
                    <TabList className="flex mb-2">
                        <Tab className="text-sm text-mute py-1 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">Open Orders</Tab>
                        <Tab className="text-sm text-mute py-1 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">Order History</Tab>
                        <Tab className="text-sm text-mute py-1 px-4 bg-none cursor-pointer border-b-transparent border-solid border-b-4">Trade History</Tab>
                    </TabList>
                    <TabPanel>
                        <OpenOrder openOrders={this.state.openOrders} scrollHeight={this.state.scrollHeight} isTradeTablet={this.props.isTradeTablet} />
                    </TabPanel>
                    <TabPanel>
                        <OrderHistory orderHistory={this.state.orderHisotry} scrollHeight={this.state.scrollHeight} isTradeTablet={this.props.isTradeTablet}/>
                    </TabPanel>
                    <TabPanel>
                        <TradeHistory fills={this.state.fills} scrollHeight={this.state.scrollHeight} isTradeTablet={this.props.isTradeTablet} />
                    </TabPanel>
                </Tabs>
                <style>
                    {
                        `
                        .simplebar-track.simplebar-vertical{
                            width: 8px !important;
                        }
                        .simplebar-track{
                            right: -8px;
                        }
                        .simplebar-scrollbar:before{
                            background: #2152fa;
                        }
                        `
                    }
                </style>
            </React.Fragment>
        );
    }
}

export default MyOrders