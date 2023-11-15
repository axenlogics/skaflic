import styles from "../styles/tradehistory.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import DateFilter from "../components/date-filter";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { IFill, IUserOrderPagination, IUserOrderSearchModel } from "../helpers/interfaces";
// import { UserOrdersTab, queryParams } from "./[...orders]";
import ReactPaginate from 'react-paginate';
import { UserOrdersTab, queryParams } from "./orders";
// import { UserOrdersTab, queryParams, queryParams } from "./orders";

interface Props {
    fetchOrder: any,
    orders: IUserOrderPagination,
}
interface State {
    panelShow: any,
    filterModal: IUserOrderSearchModel,
}

class TradeHistory extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            panelShow: {},
            filterModal: {},
        };
    }

    transactionData = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 4,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 5,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 6,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        }
    ];
    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }
    componentDidMount(): void {
        this.fetcOrders({}, 1);
    }
    fetcOrders = (searchModal: IUserOrderSearchModel, pageNo: number) => {
        searchModal.CurrentPageIndex = pageNo ? pageNo : 1;
        this.props.fetchOrder(UserOrdersTab[2], searchModal);
    }

    filderData = (data: any, tab: string, e: any) => {
        console.log('page chagne event', e);
        this.setState({ filterModal: data }, () => {
            if (tab === queryParams[2]) {
                this.fetcOrders(data, (e?.selected ? (e?.selected + 1) : 1));
            }
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div>
                    <DateFilter key={queryParams[2]} currentTab={queryParams[2]} filderData={this.filderData} dropVisible={false} />

                    {/* <DateFilter dropVisible={false} /> */}
                </div>
                <div className="pt-[25px] lg:pt-0">
                    <table className="w-full lg:table block">
                        <thead className="border-b-none lg:table-header-group hidden">
                            <tr>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Side</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Fee</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Total</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.props.orders?.Result?.map((t: IFill, index: number) =>
                                <tr className={cx('hover:bg-00c8960a lg:table-row block even:bg-white odd:bg-light cursor-pointer h-auto')} key={(t?.quantity! + index).toString()}>
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>{t.time}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>{t.pair?.name}</td>
                                    <td className={cx('px-4 py-3 text-xs lg:hidden flex text-171a1e items-center leading-none text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
                                        <div className="left">
                                            <div className="pb-2">
                                                {t.pair?.name}
                                            </div>
                                            <div className="inline-flex items-center">
                                                {t.side === 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                                {t.side === 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}
                                                <span className={t.side === 'Buy' ? 'text-success' : 'text-danger'}>{t.side}</span>

                                                {/* <span className="text-success">{t.side}</span> */}
                                            </div>
                                        </div>
                                        <div className="ml-auto text-right mr-3">
                                            <div className="pb-2">20 USDT</div>
                                            <div>{t.time}</div>
                                        </div>
                                        <button className="flex" onClick={() => this.panelToggle(index)}>
                                            <FontAwesomeIcon icon={this.state.panelShow[index] ? faAngleUp : faAngleDown} className="text-lg" />
                                        </button>
                                    </td>
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>
                                        <span>
                                            {t.side === 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                            {t.side === 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}

                                            {/* <Image className="mr-[16px]" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} /> */}
                                        </span>
                                        {/* <span className="text-success">{t.side}</span> */}
                                        <span className={t.side === 'Buy' ? 'text-success' : 'text-danger'}>{t.side}</span>

                                    </td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px]  text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Price:</span> <div>{t.rate} <span className="text-85919c">{t.pair?.baseCurrency?.symbol}</span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Amount:</span> <div>{t.quantity} <span className="text-85919c">{t.pair?.marketCurrency?.symbol}</span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Fee:</span>    <div>{t.fee} <span className="text-85919c"></span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Total:</span> <div>{t.total} <span className="text-85919c">{t.pair?.baseCurrency?.symbol}</span></div></td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={e=>this.filderData(this.state.filterModal,queryParams[2], e)}
                        // pageRangeDisplayed={5}

                        pageCount={this.props.orders?.PageCount!}
                        previousLabel="<"
                        className="flex justify-center mt-[25px]"
                        pageClassName="mx-2 cursor-pointer"
                    
                        activeLinkClassName ="bg-primary text-white"
                        pageLinkClassName = "p-[3px_10px] rounded-[4px]"
                        // renderOnZeroPageCount={false} 
                    />

                </div>

            </>
        )
    }
}
export default TradeHistory;