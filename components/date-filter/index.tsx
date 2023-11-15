import styles from "./style.module.css";
import cx from "classnames";
import Image from "next/image";
import React, { Component, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import CustomDateRangePicker from "../daterange-picker";
import { ICurrency, IUserOrderSearchModel } from "../../helpers/interfaces";
import { CurrencyManager } from "../../models/market";
// import { queryParams } from "../../pages/[...orders]";


interface Props {
    dropVisible: false;
    filderData: any;
    currentTab: string;
}

interface State {
    dropVisible: boolean,
    showBackdrop: boolean,
    baseCurrencies: ICurrency[],
    marketCurrencies: ICurrency[],
    modal: IUserOrderSearchModel,
    expand: {
        marketCurrency?: boolean,
        baseCurrency?: boolean,
        side?: boolean,
        date?: string,
    },
}

class DateFilter extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        // Calendar
        this.state = {
            showBackdrop: false,
            dropVisible: false,
            baseCurrencies: [],
            marketCurrencies: [],
            expand: {
                marketCurrency: false,
                baseCurrency: false,
                side: false,
            },
            modal: {
                side: '',
                marketCurrency: 0,
                baseCurrency: 0,
                Date: '',
                CurrentPageIndex: 1,
            }
        }
    }
    resetModal = () => {
        // Type: order_history
        // marketCurrency: 0
        // baseCurrency: 0
        // CurrentPageIndex: 1
        // Date: null
        let mod: IUserOrderSearchModel = {
            side: '',
            marketCurrency: 0,
            baseCurrency: 0,
            CurrentPageIndex: 1,
            // timeOffetset: '',
        }
        this.setState({ modal: mod },()=>{
            this.props.filderData(this.state.modal, this.props.currentTab);
        });

    }
    
    // marketCurrency: 4
    // baseCurrency: 4
    // side: 0
    // CurrentPageIndex: 1
    // Date: 01/22/2023 - 02/20/2023
    updateModal(type: string, value: any) {
        let mod = { ...this.state.modal };
        if (type === 'baseCurrency') {
            mod.baseCurrency = value.id;
        } else if (type === 'marketCurrency') {
            mod.marketCurrency = value.id;
        } else if (type === 'side') {
            mod.side = value === 'Buy' ? 0 : 1;
        } else if(type === 'Date'){
            mod.Date = value;
        }
        this.setState({ modal: mod }, () => {
        this.closebackDrop()
            console.log('modal now', this.state.modal);
        });
    }
    setDateRange = (range: any)=>{
        let startDate = new Date(range[0].startDate).toLocaleDateString();  
        let endtDate = new Date(range[0].endDate).toLocaleDateString();        
        let date = startDate + '_' + endtDate;
        this.updateModal('Date', date);
    }
    pannelOpen = async (type: any) => {
        // alert('faisal');

        // if(type === 'market') {

        const exp: any = { ...this.state.expand };
        // this.setState({})
        exp[type] = exp[type] ? false : true;
        this.setState({ expand: exp });
        // if(exp[type]){
        this.setState({ showBackdrop: true })
    }
    closebackDrop = () => {
        this.setState({ showBackdrop: false });
        this.setState({ expand: { baseCurrency: false, marketCurrency: false, side: false } })
    }
    sides = ['Buy', 'Sell'];
    setCurrencies = async () => {
        await CurrencyManager.getInstance().init();
        let listdata: ICurrency[] = CurrencyManager.getInstance().getCurrencies()
        this.setState({ baseCurrencies: listdata })

    }
    
    componentDidMount(): void {
        this.setCurrencies();
    }
    render() {
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
        }
        return (
            <>
                <div className={cx('lg:flex block items-center relative mb-4 flex-wrap')}>
                    <>
                        {this.state.showBackdrop && <div onClick={() => this.closebackDrop()} className={styles.backdrop}></div>}
                        <div className={cx('lg:flex block items-center xl:basis-auto basis-full flex-wrap')}>
                            <h6 className={('text-[14px] text-dark lg:mb-0 mb-2')}>Date</h6>
                            <CustomDateRangePicker setRange={this.setDateRange} />
                            <div className="lg:flex block items-center xl:basis-auto basis-full ms-xl:my-4 ms-lg:my-0">
                                <h6 className={('text-[14px] text-dark lg:mb-0 mb-2')}>Pair</h6>
                                <div className="relative lg:m-[0px_16px_0px_8px] mb-4">
                                    <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" 
                                    placeholder={this.state.modal.baseCurrency ? CurrencyManager.getInstance().getCurrency(this.state.modal.baseCurrency).symbol : 'All'} />
                                    <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} data-test="test" onClick={() => this.pannelOpen('marketCurrency')}>
                                        {this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                        {!this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    </span>
                                    {this.state.expand?.marketCurrency && <div className={cx('!absolute z-[3] lg:w-[200px] w-full')}>
                                        <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                            <SimpleBar style={{ maxHeight: 260 }}>
                                                <ul>
                                                    {this.state.baseCurrencies.map((t: ICurrency) =>
                                                        <li onClick={() => this.updateModal('baseCurrency', t)} key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                            <div className={cx('mr-[12px]')}>
                                                                <Image src={t.imgUrl!} alt="coin" height={28} width={28} />
                                                            </div>
                                                            <div className={cx('text-[16px] font-bold text-dark')}>
                                                                {t.symbol}
                                                            </div>
                                                            <div className={cx('absolute right-[14px]')}>
                                                                {t.id === this.state.modal.baseCurrency && <Image src={"/assets/images/icons/order-green-tick.svg"} alt="tick" height={12.8} width={15.8} />}
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </SimpleBar>
                                        </div>
                                    </div>}
                                </div>
                                <h6 className={('text-[14px] text-dark lg:mb-0 mb-2')}>/</h6>
                                <div className="relative lg:m-[0px_16px] mb-4">
                                    <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" 
                                    placeholder={this.state.modal.marketCurrency ? CurrencyManager.getInstance().getCurrency(this.state.modal.marketCurrency!).symbol : 'All'} />
                                    <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('baseCurrency')}>
                                        {this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                        {!this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    </span>
                                    {this.state.expand?.baseCurrency && <div className={cx('!absolute z-[3] lg:w-[200px] w-full')}>
                                        <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                            <SimpleBar style={{ maxHeight: 260 }}>
                                                <ul>
                                                    {this.state.baseCurrencies.map((t: ICurrency) =>
                                                        <li onClick={() => this.updateModal('marketCurrency', t)} key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                            <div className={cx('mr-[12px]')}>
                                                                <Image src={t.imgUrl!} alt="coin" height={28} width={28} />
                                                            </div>
                                                            <div className={cx('text-[16px] font-bold text-dark')}>
                                                                {t.symbol}
                                                            </div>
                                                            <div className={cx('absolute right-[14px]')}>
                                                                {t.id === this.state.modal.marketCurrency &&<Image src={"/assets/images/icons/order-green-tick.svg"} alt="tick" height={12.8} width={15.8} />}
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </SimpleBar>
                                        </div>
                                    </div>}
                                </div>
                                <h6 className={('text-[14px] text-dark lg:mb-0 mb-2')}>Side</h6>
                                <div className="relative lg:m-[0px_16px_0px_8px]">
                                    <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" 
                                    placeholder={((this.state?.modal?.side === 1 || this.state?.modal?.side === 0) ? (this.state.modal?.side === 0 ? 'Buy' : 'Sell') : 'All') ?? 'All'} />
                                    <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('side')}>
                                        {this.state.expand?.side && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                        {!this.state.expand?.side && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    </span>
                                    {this.state.expand?.side && <div className={cx('absolute z-[3] lg:w-[200px] w-full')}>
                                        <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                            <SimpleBar style={{ maxHeight: 260 }}>
                                                <ul>
                                                    {this.sides.map((t: any) =>
                                                        <li onClick={() => this.updateModal('side', t)} key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                            {/* <div className={cx('mr-[12px]')}>
                                                                <Image src={t.logo} alt="coin" height={28} width={28} />
                                                            </div> */}
                                                            <div className={cx('text-[16px] font-bold text-dark')}>
                                                                {t}
                                                            </div>
                                                            <div className={cx('absolute right-[14px]')}>
                                                            {t === 'Buy' && this.state.modal.side === 0 && <Image src={"/assets/images/icons/order-green-tick.svg"} alt="tick" height={12.8} width={15.8} />}
                                                            {t === 'Sell' && this.state.modal.side === 1 && <Image src={"/assets/images/icons/order-green-tick.svg"} alt="tick" height={12.8} width={15.8} />}
                                                              
                                                                {/* <Image src={t.activeTick} alt="tick" height={12.8} width={15.8} /> */}
                                                            </div>
                                                        </li>
                                                    )}
                                                </ul>
                                            </SimpleBar>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </>
                    <div className="lg:pt-0 pt-[25px]">
                        <button onClick={()=> this.props.filderData(this.state.modal, this.props.currentTab)} className={cx('px-5 h-[32px] rounded-[3px] text-[14px] text-center text-00c896 border border-solid border-00c896 bg-white hover:bg-00c896 hover:text-white')}>Search</button>
                        <button onClick={this.resetModal} className={cx('px-5 h-[32px] xl:ml-4 ml-2 rounded-[3px] text-[14px] text-center text-black border border-solid border-black bg-white hover:bg-black hover:text-white')}>Reset</button>
                    </div>
                    {/* <div className={cx('absolute lg:top-0 -top-2 right-0 ml-[6px]')}>
                        <button className={cx('xl:p-[0px_18px_0px_10px] p-[0px_12px_0px_4px] h-[32px] lg:m-[0px_16px_0_20px] rounded-[3px] text-[12px] text-center text-black border border-solid border-black bg-white hover:bg-black hover:text-white')}>
                            <Image className="mr-[5px] mt-[-2px]" src="/assets/images/svg/export.svg" alt="export" height={16} width={16} />
                            Export To Excel</button>
                    </div> */}
                </div>
            </>
        )
    }
}
export default DateFilter;