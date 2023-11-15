import { Component } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from 'next/link';
import cx from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag , faLock, faSunPlantWilt } from "@fortawesome/free-solid-svg-icons";
interface Props {

    title: any;
    icon:any;

}

interface State {

}
class MartketOpportunities extends Component<Props, State>{

    private MarketData = [
        {
            "id": 1,
            "heading1": "Pairs",
            "heading2": "Last Price",
            "heading3": "1 Day Change",
            "logo": "/assets/btc",
            "coinname": "BTC",
            "status": "TRY",
            "vol": "Vol 55,45M TRY",
            "lastprice": 428.166,
            "totalprice": 23.925,
            "daychange": 125,
            "border": "border-E94158",
            "bg-color": "bg-E94158"
        },
        {
            "id": 2,
            "heading1": "Pairs",
            "heading2": "Last Price",
            "heading3": "1 Day Change",
            "logo": "/assets/btc",
            "coinname": "BTC",
            "status": "TRY",
            "vol": "Vol 55,45M TRY",
            "lastprice": 428.166,
            "totalprice": 23.925,
            "daychange": 125,
            "border": "border-E94158",
            "bg-color": "bg-E94158"
        },
        {
            "id": 3,
            "heading1": "Pairs",
            "heading2": "Last Price",
            "heading3": "1 Day Change",
            "logo": "/assets/btc",
            "coinname": "BTC",
            "status": "TRY",
            "vol": "Vol 55,45M TRY",
            "lastprice": 428.166,
            "totalprice": 23.925,
            "daychange": 125,
            "border": "border-E94158",
            "bg-color": "bg-E94158"
        },
        {
            "id": 4,
            "heading1": "Pairs",
            "heading2": "Last Price",
            "heading3": "1 Day Change",
            "logo": "/assets/btc",
            "coinname": "BTC",
            "status": "TRY",
            "vol": "Vol 55,45M TRY",
            "lastprice": 428.166,
            "totalprice": 23.925,
            "daychange": 125,
            "border": "border-E94158",
            "bg-color": "bg-E94158"
        },
        {
            "id": 5,
            "heading1": "Pairs",
            "heading2": "Last Price",
            "heading3": "1 Day Change",
            "logo": "/assets/btc",
            "coinname": "BTC",
            "status": "TRY",
            "vol": "Vol 55,45M TRY",
            "lastprice": 428.166,
            "totalprice": 23.925,
            "daychange": 125,
            "border": "border-E94158",
            "bg-color": "bg-E94158"
        },
    ]
    constructor(props: Props) {
        super(props)
        // Calendar
    }

    render() {
        
        return (
            <>
                <div className={cx('flex flex-wrap pb-[17.6px]')}>
                    <div className={cx('max-w-[400px] mx-auto w-[100%]')}>
                        <div className={cx('h-auto rounded-[20px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)] p-[18.3px_10px_16.1px_10px] sm:p-[18.3px_15px_16.1px_21px] bg-white')}>
                            <div  className={cx('pb-[26px]')}>
                                <span className={'align-middle'}>
                                    <i className={`las la-2x txt-gradient txt-gradient-11 ${this.props.icon}`}></i>
                                </span>
                            
                                    <span className={cx('inline-block align-middle')}>
                                        <h6 className={cx('text-[16px] leading-normal tracking-normal font-bold text-101123 m-0 pl-[11px]')}>{this.props.title}</h6>
                                    </span>
                            </div>
                            {this.MarketData.map((y: any, i) => (
                                <div key={y.id}>
                                    {(i == 0) &&
                                        <div className={cx('flex pb-[8px]')}>
                                            <div className={cx('w-[227px] pl-[8px] text-[10px] leading-normal tracking-normal text-a2a2a2')}>{y.heading1}</div>
                                            <div className={cx('sm:w-[74px] w-[158px] text-[10px] leading-normal tracking-normal text-a2a2a2')}>{y.heading2}</div>
                                            <div className={cx('w-[64px] text-[10px] leading-normal tracking-normal text-a2a2a2')}>{y.heading3}</div>
                                        </div>
                                    }
                                    <div className={cx('flex pb-[10px] items-center')}>
                                        <div className={cx('flex w-[227px]')}>
                                            <div className={cx('pr-[12px]')}>
                                                <Image src={y.logo + '.png'} alt="coins" width={32} height={32} />
                                            </div>
                                            <div className={cx('sm:text-[14px] text-[12px] font-medium text-171a1e leading-normal tracking-normal')}>
                                                {y.coinname}<span className={cx('text-[10px] leading-normal tracking-normal font-normal text-a2a2a2')}>/{y.status}</span><br />
                                                <span className={cx('text-[10px] leading-normal tracking-normal font-normal text-a2a2a2')}>{y.vol}</span>
                                            </div>
                                        </div>
                                        <div className={cx('w-[82px] h-[32px]')}>
                                            <span className={cx('sm:text-[14px] text-[12px] font--bold leading-normal tracking-normal text-0EC980')}>{y.lastprice}</span><br />
                                            <span className={cx('text-[10px] leading-normal tracking-normal font-normal text-a2a2a2 float-right pr-[27px]')}>${y.totalprice}</span>
                                        </div>
                                        <div className={styles.daychange}>
                                            <button className={cx('max-w-[66px] w-[100%] sm:h-[32px] h-[25px] p-[0px_15px_0px_14px] rounded-[2px] bg-0EC980 border border-0EC980 text-[12px] font-medium leading-normal tracking-normal text-white')}>%{y.daychange}</button>
                                            {/*this button will be use for red  <button className={styles.btn2}>%125</button> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default MartketOpportunities;