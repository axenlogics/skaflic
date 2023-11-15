import { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, ButtonType } from '../../../button';
import InputNumeric from '../../../input-numeric';
import styles from '../style.module.css';
import cx from 'classnames';
import { IBuySell, ICreateOrder, IPair, IWallet } from '../../../../helpers/interfaces';
import { PairsManager } from '../../../../models/market';
import { UserService } from '../../../../helpers/userservice';
import { preventExtraNumber, removeExpoNent } from '../../../../helpers/common';
import Link from 'next/link';
import { OrderService } from '../../../../helpers/user/orderservice';

interface Props {
    mainPair: IPair;
    isLogin: boolean;
    mWallet: IWallet,
    bWallet: IWallet,
    // ref: any;
    innerRef?: any,
}

interface State extends IBuySell {
    orderSides: any,
    selectedTab: any,
    rangeValue: any,
    // mainPair?: IPair;
    // model: BuySellI,
}

class StopOrder extends Component<Props, State> {
    rangeItems = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    rangeItemsMob = [25, 50, 75, 100]

    constructor(props: any) {

        super(props);

        this.state = {
            orderSides: ['buy', 'sell'],
            selectedTab: 'buy',
            rangeValue: 0,
            price: undefined,
            stop:undefined,
            amount: undefined,
            total: undefined,
            minA: undefined,
            minP: undefined,
        };
    }
    componentDidMount(): void {
        this.resetBuySell(this.props.mainPair?.id!);
    }
    initInputs(price1: number | undefined) {
        const price = Number(price1).toFixedFloor(this.props.mainPair?.marketPrecision!);
        const minP = this.calculateMin('price');
        const minA = this.calculateMin('amount');
        this.setState({
            price: (price ?? undefined),
            stop: (price ?? undefined),
            amount: undefined,
            total: undefined,
            minA: minA,
            minP: minP,
            rangeValue: 0,
        });
    }
    resetBuySell = (pairId: number) => {
        if(!this.props.mainPair){
            return;
        }
        const pair = {...this.props.mainPair};
        this.initInputs(pair?.rate ?? 0);
        // this.state.amount.to
    }
    pickRate = (rate: number) => {
        this.initInputs(rate);
        // 
    }

    handlekeyPress = (type: any, ev: any) => {
        if (type === 'price') {
            preventExtraNumber(this.state.price!, this.props.mainPair?.marketPrecision!, ev);
        } else if (type === 'amount') {
            preventExtraNumber(this.state.amount!, this.props.mainPair?.basePrecision!, ev);
        } else if (type === 'total') {
            preventExtraNumber(this.state.total!, this.props.mainPair?.marketPrecision!, ev);
        }
    }
    changeValue(type: any, value1: any) {
        let value = value1;
        if (type === 'price' || type === 'total') {
            value = this.removeExpoNent(value1, this.props.mainPair?.marketPrecision!);
        } else if (type === 'amount') {
            value = this.removeExpoNent(value1, this.props.mainPair?.basePrecision!)
        }

        
        this.setState({
            ...this.state,
            [type]: value
        }, () => {
            if (type === 'price' || type === 'amount') {
                let ttl: any = Number(((this.state.price ?? 0) * (this.state.amount ?? 0)).toFixedFloor(this.props.mainPair?.marketPrecision!));
                ttl = this.removeExpoNent(ttl, this.props.mainPair?.marketPrecision!)
                this.setState({ total: ttl ?? undefined }, () => {
                    this.updateRangeSlider();
                });
            } else if (type === 'total') {
                let amt: any = Number((Number(this.state.total!) / Number(this.state.price!)).toFixedFloor(this.props.mainPair?.basePrecision!));
                amt = this.removeExpoNent(amt, this.props.mainPair?.basePrecision!);
                this.setState({ amount: (amt ?? undefined) }, () => {
                    this.updateRangeSlider();
                });

            }
        });
        //    this.setState({[type]: value});
    }
    removeExpoNent = (num: number, toFixed: number) => {
        // if (String(num).indexOf('e-') > -1) {
        //     return Number(num).toFixedFloor(toFixed);
        // }
        return removeExpoNent(num, toFixed)
    }
    updateRangeSlider = () => {
        if (this.state.selectedTab === 'buy') {
            const per = (this.state.total! / this.props.mWallet.available!) * 100;
            this.setState({ rangeValue: per });
        } else {
            const per = (this.state.amount! / this.props.bWallet.available!) * 100;
            this.setState({ rangeValue: per });
        }
    }

    onTabChange(side: string) {
        this.setState({ selectedTab: side, rangeValue: 0 })
    }

    handleRangeChange = (event: any) => {
        this.sliderChange(event.target.value);
        this.setState({ rangeValue: event.target.value });
    }
    sliderChange = (step: number) => {
        if (this.state.selectedTab === 'buy') {
            // per / 100 * total =   get
            const total = Number(((step / 100) * this.props.mWallet.available!).toFixedFloor(this.props.mainPair?.marketPrecision!));
            if (total > 0 && this.state.price) {
                const amt: any = (total / (this.state.price ?? 0)).toFixedFloor(this.props.mainPair?.basePrecision!)
                this.setState({ total: total, amount: amt });
            }
        } else {
            const amt = Number(((step / 100) * this.props.bWallet.available!).toFixedFloor(this.props.mainPair?.basePrecision!));
            if (amt > 0 && this.state.price) {
                const total: any = (amt * (this.state.price ?? 0)).toFixedFloor(this.props.mainPair?.marketPrecision!)
                this.setState({ amount: amt, total: total });
            }
        }
    }
    handleRangeStep = (step: any) => {
        this.sliderChange(step);
        this.setState({ rangeValue: step });
    }
    calculateMin = (type: string) => {
        if (type === 'price') {
            const min = 1 / Math.pow(10, this.props.mainPair?.marketPrecision!);
            return min;
        } else if (type === 'amount') {
            const min = 1 / Math.pow(10, this.props.mainPair?.basePrecision!);
            return min;
        }

    }

    checkEmpty = (value: number) => {
        return value === undefined || value === 0;
    }
    createOrder = async () => {
        if (!this.props.isLogin) {
            return;
        }
        const modal: ICreateOrder = {
            Rate: Number(this.state.price) ?? 0,
            Quantity: Number(this.state.amount) ?? 0,
            Type: this.state.selectedTab === 'buy' ? 0 : 1,
            Stop: Number(this.state.stop) ?? 0,
            OrderType : 2, // for market order it will be 0
            PairId: this.props.mainPair.id ?? 1,
            // IsDtradeOrder: false,
            // type: 
        };
        // if (this.state.selectedTab === 'buy') {
        //     if (this.props?.bWallet?.available! < this.state.total!) {
                
        //     }
        // } else {
        //     if (this.props?.mWallet?.available! < this.state.amount!) {
                
        //     }
        // }
        const res: {OrderId: number} = await OrderService.getInstance().createOrder(modal);
        if(res?.OrderId > 0){
            alert('order created successfullly');
        }
        
    }
    render() {
        // const mWalelt = this.props.wallets[this.props.mainPair?.marketCurrency?.id ?? 1];
        // const bWalelt = this.props.wallets[this.props.mainPair?.baseCurrency?.id ?? 2];

        // const max = 10000000;
        return (
            <>
                <Tabs selectedTabClassName={styles[`bstab_selected_${[this.state.selectedTab]}`]}>
                    <TabList className={styles.bstab_list}>
                        <Tab onClick={() => this.onTabChange('buy')} className={styles.bstab}>Buy</Tab>
                        <Tab onClick={() => this.onTabChange('sell')} className={styles.bstab}>Sell</Tab>
                    </TabList>
                    {this.state.orderSides.map((side: any, index: number) => (
                        <TabPanel key={index}>
                            <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
                                <div className='lg:mb-0 mb-3'>
                                    <InputNumeric
                                        value={this.checkEmpty(this.state.price!) ? '' : this.state.price}
                                        onChange={(ev: any) => this.changeValue('price', ev.target.value)}
                                        step={this.state.minP}
                                        min={this.state.minP}
                                        type="number"
                                        onKeyDown={(ev: any) => this.handlekeyPress('price', ev)}
                                        placeholder="0.00" prependTxtS="Price" prependTxtL={this.props.mainPair?.marketCurrency?.symbol} />
                                </div>
                                <div className='lg:mb-0 mb-3'>
                                    <InputNumeric
                                        value={this.checkEmpty(this.state.stop!) ? '' : this.state.stop}
                                        onChange={(ev: any) => this.changeValue('stop', ev.target.value)}
                                        step={this.state.minP}
                                        min={this.state.minP}
                                        type="number"
                                        onKeyDown={(ev: any) => this.handlekeyPress('stop', ev)}
                                        placeholder="0.00" prependTxtS="stop" prependTxtL={this.props.mainPair?.marketCurrency?.symbol} />
                                </div>
                                <div>
                                    <InputNumeric
                                        value={this.checkEmpty(this.state.amount!) ? '' : this.state.amount}
                                        onChange={(ev: any) => this.changeValue('amount', ev.target.value)}
                                        step={this.state.minA}
                                        min={this.state.minA}
                                        onKeyDown={(ev: any) => this.handlekeyPress('amount', ev)}
                                        type="number" placeholder="0.00000000" prependTxtS="Amount" prependTxtL={this.props.mainPair?.baseCurrency?.symbol} />
                                </div>
                            </div>
                            <div className="mt-2 mb-4">
                                <div className='lg:block hidden'>
                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={this.state.rangeValue}
                                        onChange={(ev) => this.handleRangeChange(ev)}
                                        className={cx(styles.input_range, styles[side])}
                                        style={{ background: side === 'buy' ? `linear-gradient(to right, #0ec980 0%, #0ec980 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)` : `linear-gradient(to right, #E94158 0%, #E94158 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)` }}
                                    />
                                    <div className={styles.range_steps}>
                                        {this.rangeItems.map((step) => (
                                            <button key={step} onClick={() => this.handleRangeStep(step)} className={styles.range_step} type="button" value="0">{step}%</button>
                                        ))}
                                    </div>
                                </div>
                                <div className='lg:hidden'>
                                    <div className="grid grid-cols-4 gap-2 justify-between">
                                        {this.rangeItemsMob.map((step) => (
                                            <button key={step} onClick={() => this.handleRangeStep(step)} className="border-solid border border-232842 p-1 text-center text-xs text-white" type="button" value="0">{step}%</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                {side === 'buy' &&
                                <div className="md:flex justify-between mb-1">
                                    <div className="text-xs text-mute md:block hidden">Available / Total <span className='text-white'>{this.props.mainPair?.marketCurrency?.symbol}</span> Balance</div>
                                    <div className="text-xs text-mute md:block hidden">
                                        <span className='text-white'>
                                            {this.props.isLogin ? (this.props.mWallet?.available ?? '-') : '-'}
                                        </span> /
                                        {this.props.isLogin ? (this.props.mWallet?.balance ?? '-') : '-'}
                                        <span className='text-white'>
                                            {this.props.mainPair?.marketCurrency?.symbol}
                                        </span>
                                    </div>
                                    <div className="text-xs text-mute md:hidden flex justify-end">
                                        Balance:
                                        <span className='text-white mx-1'>
                                            {this.props.isLogin ? (this.props.mWallet?.available ?? '-') : '-'}
                                        </span>
                                        <span className='text-white'> {this.props.mainPair?.marketCurrency?.symbol}</span>
                                    </div>
                                </div> }
                                {side !== 'buy' &&
                                <div className="md:flex justify-between mb-1">
                                    <div className="text-xs text-mute md:block hidden">Available / Total <span className='text-white'> {this.props.mainPair?.baseCurrency?.symbol}</span> Balance</div>
                                    <div className="text-xs text-mute md:block hidden">
                                        <span className='text-white'>
                                            {this.props.isLogin ? (this.props.bWallet?.available ?? '-') : '-'}
                                        </span> /
                                        {this.props.isLogin ? (this.props.bWallet?.balance ?? '-') : '-'}<span className='text-white'>{this.props.mainPair?.baseCurrency?.symbol}</span>
                                    </div>
                                    <div className="text-xs text-mute md:hidden flex justify-end">
                                        Balance:
                                        <span className='text-white mx-1'>
                                            {this.props.isLogin ? (this.props.bWallet?.balance ?? '-') : '-'}
                                        </span>
                                        <span className='text-white'> {this.props.mainPair?.baseCurrency?.symbol}</span>
                                    </div>
                                </div>}
                            </div>
                            <div className='lg:grid grid-cols-2 lg:gap-5'>
                                <div className='lg:mb-0 mb-3'>
                                    <InputNumeric
                                        value={this.checkEmpty(this.state.total!) ? '' : this.state.total}
                                        onChange={(ev: any) => this.changeValue('total', ev.target.value)}
                                        step={this.state.minP}
                                        min={this.state.minP}
                                        onKeyDown={(ev: any) => this.handlekeyPress('total', ev)}
                                        type="number" placeholder="0.00" prependTxtS="Total" prependTxtL={this.props.mainPair?.marketCurrency?.symbol} />
                                </div>
                                <div className='col'>
                                    <Button onClick={this.createOrder} type={side === "buy" ? ButtonType.success : ButtonType.danger} className={cx(styles.btn_buysell)}>
                                        {this.props.isLogin && ((this.state.selectedTab === 'buy' ? 'Buy ' : 'Sell ') + this.props.mainPair?.baseCurrency?.symbol)}
                                        {!this.props.isLogin && <Link href="/login">Log In </Link>}
                                        {!this.props.isLogin && ' or '}
                                        {!this.props.isLogin && <Link href="/signup" >Sign Up</Link>}
                                    </Button>
                                </div>
                            </div>
                        </TabPanel>
                    ))}
                </Tabs>
            </>
        );
    }
}

export default StopOrder