import React, { Component } from "react";
import Header, { NavbarSize } from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Footer from "./footer";
import { TransactionHistory } from "../components/transaction-history";
import { WalletService } from "../helpers/user/walletservice";
import { IDistribution } from "../helpers/interfaces";
import { CurrencyManager } from "../models/market";
import { userOrderDate } from "../helpers/common";


interface Props {
}


interface State {
    dh: any,
    history: IDistribution[]
}


class Distribution extends Component<Props, State> {
    public static auth = true;
    public txTypes: any = {
        5: 'Staking',
        7: 'AirDrop',
        8: 'Giveaway',
        9: 'Trading Competition Reward',
        11: 'Scratching Reward',
        10: 'Leverage Pair Expiration',
        16: 'Dtrade profit withdraw',
    }
    constructor(props: Props) {

        super(props);
        const dh = [
            { 'type': 'Staking', 'coin': 'Turkish Lira', 'value': '5.783,57000000', 'date': '09.12.2022 17:14', 'info': 'withdraw with ERC20' },
            { 'type': 'Staking', 'coin': 'Tether', 'value': '7.271,05948392', 'date': '09.12.2022 17:13', 'info': 'withdraw with  TRC20' },
        ]
        this.state = {
            dh: dh,
            history: [],
        }

    }

    fetchHistory = async () => {
        await CurrencyManager.getInstance().init();
        let hist = await WalletService.getInstance().getDistributionHistory();
        if (hist) {
            console.log('hisotry', hist);
            this.setState({ history: hist.Result! });
        }
        //    
    }

    componentDidMount() {
        this.fetchHistory();
    }
    markZero(val: any) {
        return val;
        // let v = val
        // let nv = v.split('').reverse();
        // let zero = [];
        // for (let el of nv) {
        //     if (el != 0) {
        //         break;
        //     }
        //     zero.push(el);
        // }
        // let vv = val.substring(0, (val.length - zero.length))
        // // 
        // return vv + '<span class="lowvisible">' + zero.join('') + '</span>';
    }

    render() {
        return (
            <React.Fragment>
                <Header navbarSize={NavbarSize.sm} logoText={true} />
                <main className="cust-h">
                    <div className={cx('container py-[10px] sm:py-[40px] px-4')}>
                        <div>
                            <div className={'block lg:flex lg:items-end'}>
                                <div className={'flex items-center'}>
                                    <div className={cx('pr-[30px]')}><span className="initial items-start sm:items-center text-[26px] sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">Distribution</span></div>

                                </div>
                            </div>
                            <div className={cx('mt-10 p-[18px_15px_11px_15px] sm:p-[24px_27px_11px_30px] rounded-[20px] w-full bg-white shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]')}>
                                <div className={cx('flex items-center pb-2.5 border-solid border-b-[1px] border-e9eff6 ')}>
                                    <div className={cx('text-sm sm:text-base font-medium leading-normal tracking-normal flex-1 text-171a1e')}>Distribution History</div>
                                </div>
                                <div >
                                    <div className={cx('flex items-center pt-2 pb-3 text-171a1e leading-normal')}>
                                        <div className='flex-1 max-w-[20px] sm:max-w-[200px] text-a2a2a2'>Date</div>
                                        <div className='flex-1 max-w-[20px] sm:max-w-[200px] text-a2a2a2'>Type</div>
                                        <div className='flex-1 text-xs sm:text-sm text-a2a2a2'>Coin</div>
                                        <div className='flex-1 text-xs sm:text-sm text-a2a2a2'>Amount</div>
                                    </div>
                                    {this.state.history.length > 0 && this.state.history.map((item: IDistribution, i: number) =>
                                        <div key={i} className={cx('flex items-center py-[5px] text-171a1e leading-normal')}>
                                            <div className='flex-1 max-w-[20px] sm:max-w-[200px]'>{userOrderDate(item.Date)}</div>
                                            <div className='flex-1 max-w-[20px] sm:max-w-[200px] text-xs sm:text-sm'>{this.txTypes[item.Type]}</div>
                                            <div className='flex-1  text-xs sm:text-sm'>{CurrencyManager.getInstance().getCurrency(item.CurrencyId).symbol}</div>
                                            <div className='flex-1 text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html: this.markZero(item.Amount) }}></div>
                                        </div>
                                    )}
                                    {this.state.dh.length == 0 &&
                                        <div className='h-16 flex items-center justify-center'>
                                            You have no distribution history
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }

}

export default Distribution


