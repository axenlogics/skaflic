import styles from "../styles/orderhistory.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import React, { Component, useState } from 'react';
import { render } from "react-dom";
import DateFilter from "../components/date-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { IFill, IUser, IUserOrder, IUserOrderPagination, IUserOrderSearchModel } from "../helpers/interfaces";
// import { UserOrdersTab, queryParams } from "./[...orders]";
import ReactPaginate from 'react-paginate';
import { UserOrdersTab, queryParams } from "./orders";
import { OrderService } from "../helpers/user/orderservice";


interface Props {
    fetchOrder: any,
    orders: IUserOrderPagination,
}

interface State {
    panel: boolean,
    // orders: number[],
    expand: any,
    panelShow: any,
    filterModal: IUserOrderPagination,
    // color: string,
}

class OrderHistory extends Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            panel: false,
            // orders: [1, 2, 3, 4, 5, 6, 7, 8],
            expand: {},
            panelShow: {},
            filterModal: {},
            // color: "red",
        }
    }


    OrderHistory = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 4,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 5,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 6,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        }
    ];

    pannelOpen = async (index: any, order: IUserOrder) => {
        let res = await OrderService.getInstance().fetchOrderFills({ OrderId: order.id!, PairId: order.pair?.id! })
        
        order.fills = res;
        let tfill = 0;
        order.fills.map(i =>{tfill = Number(i.total!) + tfill} );
        order.fillAmt = tfill;
        console.log('panel expand clicked', order, res);
        if (this.state.expand[index]) {
            // this.state.expand = {};

            this.setState({ expand: {} });
        } else {
            this.setState({ expand: {} }, () => {
                this.setState({ expand: { [index]: true } });

            });
        }
        await this.setState(prevState => ({
            panel: !prevState.panel
        }));
        // alert(this.state.panel);
    }


    panelToggle = (i: number) => {
        this.setState({
            panelShow: { [i]: !this.state.panelShow[i] },
            expand: { [i]: false }
        })
    }
    componentDidMount(): void {
        this.fetcOrders({}, 1);
    }
    fetcOrders = (searchModal: IUserOrderSearchModel, pageNo: number) => {
        searchModal.CurrentPageIndex = pageNo ? pageNo : 1;
        this.props.fetchOrder(UserOrdersTab[1], searchModal);
    }
    filderData = (data: any, tab: string, e: any) => {
        console.log('page chagne event', e);
        this.setState({ filterModal: data }, () => {
            if (tab === queryParams[1]) {
                this.fetcOrders(data, (e?.selected ? (e?.selected + 1) : 1));
            }
        });
    }
    render() {
        return (
            <>
                <div>
                    <DateFilter key={queryParams[1]} currentTab={queryParams[1]} filderData={this.filderData} dropVisible={false} />
                </div>
                <div>
                    <table className="w-full lg:table block lg:mt-0 mt-[15px]">
                        <thead className="border-b-none lg:table-header-group hidden">
                            <tr>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Order Type</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Side</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Stop Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Filled</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Average Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Total</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Status</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Details</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.props.orders?.Result?.map((item: IUserOrder, index: any) => {
                                return (
                                    <>
                                        <tr key={(item.id + index).toString()} className={cx('hover:bg-00c8960a even:bg-white lg:table-row block odd:bg-light cursor-pointer h-auto')}>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] lg:table-cell hidden xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium')}>{item.dateAdded}</td>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] lg:table-cell hidden text-[12px] text-171a1e leading-normal text-left font-medium')}>{item.pair?.name}</td>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] lg:table-cell hidden text-171a1e leading-normal text-left font-medium')}>{item.mainOrderType}</td>
                                            <td className={cx('px-4 py-3 lg:hidden flex items-center text-xs text-171a1e leading-normal text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
                                                <div className="left">
                                                    <div className="pb-2">
                                                        {item.pair?.name}
                                                    </div>
                                                    <div className="inline-flex items-center">
                                                        {item.orderSide == 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                                        {item.orderSide == 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}
                                                        <span className="text-success">{item.orderSide}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-auto text-right pr-2">
                                                    <div className="pb-2">20 USDT</div>
                                                    <div>{item.dateAdded}</div>
                                                </div>
                                                <button className="flex" onClick={() => this.panelToggle(index)}>
                                                    <FontAwesomeIcon icon={this.state.panelShow[index] ? faAngleUp : faAngleDown} className="text-lg" />
                                                </button>
                                            </td>
                                            <td className={cx('lg:table-cell hidden xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium')}>
                                                <span>
                                                    {item.orderSide == 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                                    {item.orderSide == 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}
                                                    {/* <span className="text-success">{item.orderSide}</span> */}
                                                    {/* <Image className="mr-[5px]" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} /> */}
                                                </span>
                                                <span className={item.orderSide === 'Buy' ? 'text-success' : 'text-danger'}>{item.orderSide}</span>
                                            </td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Price:</span><div>{item.rate} <span className="text-85919c">{item.pair?.baseCurrency?.symbol}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Amount:</span><div>{item.quantity} <span className="text-85919c">{item.pair?.marketCurrency?.symbol}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Stop Price:</span>{item.triggerCondition}</td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Filled:</span><div>{item.fillAmt} <span className="text-85919c">{item.pair?.baseCurrency?.symbol}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">AVG Price:</span><div>{item.rate} <span className="text-85919c">{item.pair?.baseCurrency?.symbol}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Total:</span><div>{item.total} <span className="text-85919c">{item.pair?.baseCurrency?.symbol}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}>
                                                <span className="flex items-center justify-between w-full">
                                                    <span className="lg:hidden text-sm">Status:</span>
                                                    <div className="flex items-center">
                                                        <div className="h-[8px] w-[8px] rounded-[50%] bg-success mr-[10px]"></div>
                                                        <div>{item.status}</div>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className={cx('lg:table-cell hidden p-[22px_8px_22px_16px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-right font-medium')} onClick={() => this.pannelOpen(index, item)}>
                                                <FontAwesomeIcon icon={this.state.expand[index] ? faAngleUp : faAngleDown} className="text-lg" />
                                            </td>
                                            <td className={cx(`pb-[15px] lg:hidden ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-center`)} onClick={() => this.pannelOpen(index, item)}>
                                                <button className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                                                    Show More
                                                </button>
                                            </td>
                                        </tr>
                                        {
                                            this.state.expand[index] &&

                                            // this.OrderItem(item, index)
                                            <tr className="bg-white lg:table-row block">
                                                <td className="p-[15px_13px] lg:table-cell block" colSpan={12}>
                                                    <div className="lg:flex">
                                                        <div>
                                                            <span className={cx('xl:text-[14px] text-[12px] font-bold')}>TOTAL TRADE: {item.fillAmt} {item.pair?.marketCurrency?.symbol}</span>
                                                            {/* <span className={cx('xl:text-[14px] text-[12px] font-bold')}>{item.fillAmt} {item.pair?.marketCurrency?.symbol}</span> */}
                                                        </div>
                                                        <div className={cx('w-full')}>
                                                            <table className={cx('w-full')}>
                                                                <thead className="lg:table-header-group hidden">
                                                                    <tr>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Date</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Trading Price</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Amount</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Fee</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="lg:table-row-group">
                                                                    {item.fills?.map((fill: IFill, index: number) => (<tr className={cx('lg:table-row block hover:bg-00c8960a even:bg-white odd:bg-light cursor-pointer h-auto')}>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Date:</span>{fill.time}</td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Trading Price:</span><div>{fill.rate} <span className="text-85919c">{item.pair?.marketCurrency?.symbol}</span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Amount:</span><div>{fill.quantity} <span className="text-85919c">{item.pair?.baseCurrency?.symbol}</span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Fee:</span> <div>{fill.fee} <span className="text-85919c"></span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Total:</span><div><span className="font-bold">{fill.total}</span>{item.pair?.marketCurrency?.symbol}</div></td>
                                                                    </tr>
                                                                    ))}

                                                                </tbody>
                                                            </table>

                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>


                                        }
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={e => this.filderData(this.state.filterModal, queryParams[1], e)}
                        // pageRangeDisplayed={5}
                        pageCount={this.props.orders?.PageCount!}
                        className="flex justify-center mt-[25px]"
                        pageClassName="mx-2 cursor-pointer"
                        previousLabel="<"
                        activeLinkClassName="bg-primary text-white"
                        pageLinkClassName="p-[3px_10px] rounded-[4px]"
                    // renderOnZeroPageCount={false} 
                    />
                </div>
            </>
        )
    }
}
export default OrderHistory;