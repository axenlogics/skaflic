import React, { Component } from "react";
import cx from "classnames";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { IPair, ITradeHistory } from "../../../helpers/interfaces";
import { toFixed } from "../../../helpers/common";

declare var window: any;
declare var document: any;

interface Props {
    trades?:ITradeHistory[];
    mainPair?: IPair,
    isTradeTablet?: boolean;
    setWidgetHeight?: () => void
}

interface State {
  pair?: any
  marketHistory?: any,
  loaded: boolean,
  orderbookHeight: number,
}

class MarketHistory extends Component<Props, State> {
    odbTbodyRef:any = React.createRef();
    odbTrowRef:any = React.createRef();
    private _isMounted = false;
    
    constructor(props: Props) {

        super(props);
        
        this.state = {
            marketHistory: [],
            pair: {},
            loaded: false,
            orderbookHeight: 200,
        };
    }
    mergeDashes = () => {
        // for()
        let emptyAr = []
        for (let i = 0; i < (50); i++) {
            emptyAr.push({ rate: '-', quantity: '-', time: '-', random: Math.random(),trendUp: true });
        }
        return emptyAr;
    }
    async componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {

            this.setData()

            this.setState({marketHistory: this.mergeDashes()})
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;

        // window.removeEventListener('resize', this.setOrderBookHeight)
    }

    setTradeHistoryHeight = async (obh:number) => {

        await this.setState({
            orderbookHeight: obh * 2
        })        
    }



    
    

    pickRate = (item: any) => {}

    OrderItem = (item: ITradeHistory,index: number) => {
        return  <React.Fragment key={(item.quantity+'-'+ item.random).toString()}>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item)} className='flex border-b border-solid border-transparent'>
                    <div className={cx('flex-1 p-1.5 leading-normal text-left', item.trendUp ? 'text-success' : 'text-danger')}>
                        { toFixed(item.rate, 5) }</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.quantity}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.time}</div>
                </div>}
            </React.Fragment>
    }

    setData = async () => {
        let marketHistory = []

        for(var i = 0; i < 80; i++){
            marketHistory.push({rate: (Math.random() * 17000).toFixed(2), quantity: (Math.random() * 8).toFixed(8), total: (Math.random() * 8).toFixed(3), time: '11:04:21'})
        }


        await this.setState({
            marketHistory: marketHistory,
        })
    }

    render() {
        let trades = this.props.trades?.length ?  this.props.trades : this.mergeDashes();
        
        return (
            <>
                <h6 className="text-white text-sm">Recent Trades</h6>
                <div className='text-white text-xs text-right overflow-hidden px-2.5 -mx-2.5'>
                    <div className='flex border-b border-solid border-232842'>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 text-left'>Price</div>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Total</div>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Time</div>
                    </div>
                    <div ref={this.odbTbodyRef} className="font-ibmplex">
                        <SimpleBar style={{ maxHeight: this.state.orderbookHeight }}>
                            {trades?.map((item:ITradeHistory,i: any) => (
                                this.OrderItem(item, i)
                            ))}
                        </SimpleBar>
                    </div>
                </div>
            </>
        )
    }

}


export default MarketHistory


