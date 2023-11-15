import styles from "../styles/openorder.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { IUserOrder } from "../helpers/interfaces";
import { UserOrdersTab } from "./orders";
// import { UserOrdersTab } from "./[...orders]";
interface Props {
    fetchOrder: any,
    orders: IUserOrder[],
    cancelOrder: any,

}
interface State {
    panelShow: any
}

class OpenOrders extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            panelShow: {}
        };
    }
    fetcOrders = () => {
        this.props.fetchOrder(UserOrdersTab[0], {});
    }
    componentDidMount(): void {
        this.fetcOrders()
    }

    OpenOrderData = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 4,
            "date": "09-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 5,
            "date": "05-01-23 15:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 6,
            "date": "02-01-23 12:03:15",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 150550.00,
            "price_pair": "USDT",
            "amount": "0.001359",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.39,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        }
    ];
    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }
    render(): React.ReactNode {
        return (
            <>
                <div className="text-right">
                    <button className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                        <span>
                            <Image className={cx('align-middle mr-[12px]')} src="/assets/images/svg/cross.svg" alt="Cancel Button" height={12.81} width={12.81} />
                        </span>
                        Cancel All
                    </button>
                </div>
                <div>
                    <table className={cx('w-full lg:table block lg:pt-0 pt-[15px]')}>
                        <thead className={cx('border-b-none lg:table-header-group hidden')}>
                            <tr className={cx('')}>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Order Type</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Side</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Price</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Filled</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Total</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Trigger condition</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_10px_9px_15px]')}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.props.orders?.map((t: IUserOrder, index: any) => (
                                <tr className={cx('hover:bg-00c8960a lg:table-row block even:bg-white odd:bg-light cursor-pointer h-auto')} key={t.id}>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] tracking-normal text-left font-medium lg:table-cell hidden')}>{t.dateAdded}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] text-left font-bold lg:table-cell hidden')}>{t.pairName}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] text-left font-medium lg:table-cell hidden')}>{t.mainOrderType}</td>
                                    <td className={cx('px-4 py-3 text-xs items-center lg:hidden flex text-171a1e xl:leading-[0.8px] text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
                                        <div className="left">
                                            <div className="pb-2">
                                                {t.pairName}
                                            </div>
                                            <div className="inline-flex items-center">
                                                {t.orderSide == 'Buy' && <Image className="mr-2" src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} />}
                                                {t.orderSide == 'Sell' && <Image className="mr-2" src={'/assets/images/svg/sell.svg'} alt="buy-sell" height={16} width={16} />}

                                                <span className="text-success">{t.orderSide}</span>
                                            </div>
                                        </div>
                                        <div className="ml-auto text-right pr-3">
                                            <div className="pb-2">20 USDT</div>
                                            <div>{t.dateAdded}</div>
                                        </div>
                                        <button className="flex" onClick={() => this.panelToggle(index)}>
                                            <FontAwesomeIcon icon={this.state.panelShow[index] ? faAngleUp : faAngleDown} className="text-lg" />
                                        </button>
                                    </td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] lg:table-cell hidden text-171a1e xl:leading-[0.8px] text-left font-medium')}>
                                        <span><Image className={cx('xl:mr-[16px] mr-[5px]')} src={'/assets/images/svg/buy.svg'} alt="buy-sell" height={16} width={16} /></span>
                                        <span className={cx('text-success xl:text-[14px] text-[12px]')}>{t.orderSide}</span>
                                    </td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Price:</span>
                                        <div>{t.rate}<span className="text-85919c"> {t.pair?.baseCurrency?.symbol}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Amount:</span>
                                        <div>{t.quantity}<span className="text-85919c">{t.pair?.marketCurrency?.symbol}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Filled:</span>
                                        <div>{t.fillAmt} %</div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Total Price:</span>
                                        <div>{t.total}<span className="text-85919c"> {t.pair?.baseCurrency?.symbol}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Triggerd Condition:</span>
                                        <div>{t.triggerCondition}</div></td>
                                    <td className={cx(`pb-[15px] lg:hidden ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-center`)}>
                                        <button onClick={()=>this.props.cancelOrder(t)} className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                                            <span>
                                                <Image className={cx('align-middle mr-[12px]')} src="/assets/images/svg/cross.svg" alt="Cancel Button" height={12.81} width={12.81} />
                                            </span>
                                            Cancel Order
                                        </button>
                                    </td>
                                    <td onClick={()=>this.props.cancelOrder(t)} className="text-right pr-[10px] lg:table-cell hidden">
                                        <Image src={'/assets/images/svg/cross.svg'} alt="cross" height={12} width={12} />
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}
export default OpenOrders;