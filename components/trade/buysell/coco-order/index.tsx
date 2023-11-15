import { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, ButtonType } from '../../../button';
import InputNumeric from '../../../input-numeric';
import styles from '../style.module.css';
import cx from 'classnames';
import { IBuySell, IPair } from '../../../../helpers/interfaces';
import { PairsManager } from '../../../../models/market';

interface Props{
    mainPair: IPair;
}

interface State extends IBuySell {
    orderSide: any,
    bstabSelected: any,
    rangeValue: any
}

class CocoOrder extends Component<Props, State> {
    rangeItems = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    constructor(props:any) {

        super(props);
        
        this.state = {
            orderSide: ['buy', 'sell'],
            bstabSelected: 'buy',
            rangeValue: 0,
            price: undefined,
            amount: undefined,
            total: undefined,
        };
    }
    initInputs(price: number | undefined) {
        this.setState({ price: price, amount: undefined, total: undefined })
    }
    pairChange1 = (pairId: number) => {
        const pair = PairsManager.getInstance().getPair(pairId);
        
        this.initInputs(pair.rate);
    }
    onTabChange(side: string) {
        this.setState({bstabSelected: side})
    }

    handleRangeChange = (event:any) => {
        this.setState({rangeValue: event.target.value});
    }

    handleRangeStep = (step:any) => {
        this.setState({rangeValue: step});
    }
   

    render(){
        
        return (
        <>
            <Tabs selectedTabClassName={styles[`bstab_selected_${[this.state.bstabSelected]}`]}>
                <TabList className={styles.bstab_list}>
                    <Tab onClick={() => this.onTabChange('buy')} className={styles.bstab}>Buy</Tab>
                    <Tab onClick={() => this.onTabChange('sell')} className={styles.bstab}>Sell</Tab>
                </TabList>
                {this.state.orderSide.map((side:any, index:number) => (
                    <TabPanel key={index}>
                    <div className='row'>
                        <div className='col'>
                            <InputNumeric step="0.01" min="0.01" type="number" placeholder="0,0000" prependTxtS="Price" prependTxtL="Try"/>
                        </div>
                        <div className='col'>
                            <InputNumeric type="number" placeholder="0,00000000" prependTxtS="Amount" prependTxtL="Btc" />
                        </div>
                    </div>
                    <div className={styles.range_slider}>
                        <input 
                            type="range" 
                            min="0" max="100" 
                            value={this.state.rangeValue} 
                            onChange={this.handleRangeChange}
                            className={cx(styles.input_range, styles[side])}
                            style={{background: side === 'buy' ? `linear-gradient(to right, #0ec980 0%, #0ec980 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)` : `linear-gradient(to right, #E94158 0%, #E94158 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)`}}
                            />
                        <div className={styles.range_steps}>
                            {this.rangeItems.map((step) => (
                                <button key={step} onClick={() => this.handleRangeStep(step)} className={styles.range_step} type="button" value="0">{step}%</button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.balance_stats}>
                        <div className={styles.balance_stat}>
                            <div className={styles.balance_txt}>Available / Total <span className='text-white'>TRY</span> Balance</div>
                            <div className={styles.balance_txt}><span className='text-white'>1.252,44</span> / 483.239,34 TRY</div>
                        </div>
                        <div className={styles.balance_stat}>
                            <div className={styles.balance_txt}>Available / Total BTC Balance</div>
                            <div className={styles.balance_txt}>0,35261721 / 1,36273843 BTC</div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <InputNumeric type="number" placeholder="0,00" prependTxtS="Price" prependTxtL="Try" />
                        </div>
                        <div className='col'>
                            <Button type={side === "buy" ? ButtonType.success : ButtonType.danger} className={cx(styles.btn_buysell)}>Buy BTC </Button>
                        </div>
                    </div>
                </TabPanel>
                ))}
            </Tabs>
        </>
        );
    }
}

export default CocoOrder