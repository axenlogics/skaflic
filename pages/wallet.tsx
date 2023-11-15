import React, { Component, createRef, useState } from "react";
import Header from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/wallet.module.css'
import { Button, ButtonType } from "../components/button";
import Image from 'next/image';
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import { TransactionHistory } from "../components/transaction-history";
import Footer from "./footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";


interface Props {
  
}

interface State {
    txData:any,
    cryptoAsset:any,
    stableAsset:any,
    tab:any
}

class WalletPage extends Component<Props, State> {
    public targetRef:any;
    constructor(props: Props) {
        super(props);
        this.targetRef = createRef();
        const txhistory=[
            {'status':false,'coin':'TRY','value':'5.783,57000000','date':'09.12.2022 17:14'},
            {'status':true,'coin':'USDT','value':'7.271,05948392','date':'09.12.2022 17:13'},
        ]
        const data=
    [
        {
        'coin':'Avalanche',
        'symbol':'AVAX',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'5,00000000',
        'sinOrder':'₺ 2.095,58',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':true,
        'Action':{'Buy':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'AutoInvest':false}
        },
        {
            'coin':'Bitcoin',
            'symbol':'BTC',
            'totalPrice':'428.166',
            'stotalPrice':'₺ 428.166,34',
            'Available':'418.166,34',
            'sAvailable':'₺ 428.166,34',
            'inOrder':'0,01000000',
            'sinOrder':'₺ 4.123,74',
            'OutofSpot':'10.000,00',
            'sOutofSpot':'₺ 0,00',
            'isVisible':false,
            'Action':{'Buy':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'AutoInvest':false}
            },
        {
        'coin':'Solana',
        'symbol':'SOL',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },
        {
        'coin':'DogeCoin',
        'symbol':'DOGE',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },
        {
        'coin':'Polkadot',
        'symbol':'DOT',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },,
        {
        'coin':'Polygon',
        'symbol':'MATIC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },
    ]
    const data2=[
        {
        'coin':'Turkish Lira',
        'symbol':'TRY',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':true,
        'Action':{'Buy':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'AutoInvest':false}
        },
        {
        'coin':'Tether',
        'symbol':'USDT',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },
        {
        'coin':'Binance USD',
        'symbol':'BUSD',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':false,'Trade':true,'AutoInvest':true}
     },
        {
        'coin':'USD Coin',
        'symbol':'USDC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00000000',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'isVisible':false,
        'Action':{'Buy':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'AutoInvest':true}
        },
    ]
    this.state = {
        txData:txhistory,
        cryptoAsset:data,
        stableAsset:data2,
        tab:false
    };
    const t=this;
    }
    
    
    
    componentDidMount() {
        
    }
   
    toggletab = () =>{
        this.setState(prevState => ({
            tab: !prevState.tab
        }))
    }
    toggleCoin = (item:any,ctype:any) =>{
        // ctype 0 stable Asset
        // ctype 1 crypto Asset
        if(ctype==0){
            this.setState(prevState => ({
                stableAsset: prevState.stableAsset.map((v:any)=>{
                    if(v.coin==item.coin){
                        return {...v, isVisible: !item.isVisible};
                    }else
                    return {...v, isVisible: false};
                })
            }))
        }else{
            this.setState(prevState => ({
                cryptoAsset: prevState.cryptoAsset.map((v:any)=>{
                    if(v.coin==item.coin){
                        return {...v, isVisible: !item.isVisible};
                    }else
                    return {...v, isVisible: false};
                })
            }))
        }
    }
    render() {
        // 
        return (
            <React.Fragment>
                <Header logoText={true} />
                <div className={cx('container py-[10px] sm:py-[40px] px-[15px] lg:px-[30px]')}>
                    {this.state.tab && <><div onClick={this.toggletab} className='block md:hidden fixed w-[100%] h-[100%] top-0 z-10 bg-050505'></div></>}
                    <div>
                        <div className={'flex-wrap flex'}>
                            <div className={cx('flex-1 inline-flex mb-2 sm:mb-0 items-center')}><span className="flex items-start sm:items-center text-2xl sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">All Assets</span></div>
                            <div>
                                <Button className='text-xs sm:text-base font-bold mx-[3px] my-2 sm:mx-[10px] md:mx-[12px] lg:mx-[15px] py-[5px] md:py-[8px] px-[7px] sm:px-[10px] md:px-[22px] lg:py-[10px] lg:px-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]' type={ButtonType.primary}>Deposit</Button>
                                <Button className='text-xs sm:text-base font-medium mx-[3px] my-2 sm:mx-[10px] md:mx-[12px] lg:mx-[15px] py-[5px] md:py-[8px] px-[7px] sm:px-[10px] md:px-[22px] lg:py-[10px] lg:px-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]' type={ButtonType.default}>Withdrawal</Button>
                                <Button className='text-xs sm:text-base font-medium mx-[3px] my-2 sm:mx-[10px] md:mx-[12px] lg:mx-[15px] py-[5px] md:py-[8px] px-[7px] sm:px-[10px] md:px-[22px] lg:py-[10px] lg:px-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]' type={ButtonType.default}>Transfer</Button>
                                <Button className='text-xs sm:text-base font-medium mx-[3px] my-2 sm:mx-[10px] md:mx-[12px] lg:mx-[15px] py-[5px] md:py-[8px] px-[7px] sm:px-[10px] md:px-[22px] lg:py-[10px] lg:px-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]' type={ButtonType.default}>Auto-Invest</Button>
                            </div>
                        </div>
                        <div className={'lg:flex pt-3 sm:pt-10'}>
                            <div className={'flex-1 pb-4 sm:pb-8 lg:pb-0'}>
                                <div className={'flex items-center'}>
                                    <div className={cx('text-base sm:text-lg font-medium leading-normal tracking-normal text-171a1e pr-[7px]')}>Estimated Balance</div>
                                    <div className={'cursor-pointer'}><Image src={`/assets/images/icons/eye.svg`} alt={'show'} width={17} height={12} /></div>

                                </div>
                                <div className={'flex-wrap flex items-baseline'}>
                                    <div className={'text-xl sm:text-2xl md:text-3xl font-bold text-171a1e p-[12px_10px_0px_0]'}>884.475,35 <span className="text-[13px] sm:text-sm md:text-lg font-medium leading-normal tracking-normal">TRY</span></div>
                                    <div className={'pr-[10px] text-xs sm:text-sm md:text-lg font-medium leading-normal tracking-normal text-a2a2a2'}>≈  <span > 45.892,47</span> <span >USDT</span></div>
                                    <div className={'text-xs sm:text-sm md:text-lg font-medium leading-normal tracking-normal text-a2a2a2'}>≈  <span>2,76271829</span> <span >BTC</span></div>
                                </div>
                                <div className={'block sm:flex items-center pt-6 sm:pt-8'}>
                                    <div>
                                        <Input placeholder="Search coin"  fControlWrapClassName={'rounded-[18px] max-w-[178px]'} fGroupClassName={'m-0'} iconRight={<Image src={`/assets/images/icons/search.png`} alt={'show'} width={12} height={12} />} />
                                    </div>
                                    <div className={cx('flex-wrap flex items-center text-xs text-a2a2a2 mt-2 sm:mt-0')}>
                                        <div className={'pr-4 sm:pl-6'}>
                                            {/* <input type="checkbox"/> */}
                                            <Checkbox id="hidesm" label="Hide Small Balances" />
                                            {/* <span>Hide Small Balances</span> */}
                                        </div>
                                        <div className="my-3 sm:my-0 sm:pl-6">Convert Low-value Assets to TRY</div>
                                    </div>
                                </div>
                            </div>
                            <TransactionHistory thead={false} className={'mx-auto max-w-[50%]'}/>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className={'relative p-[32px_15px_32px_15px] md:p-[28px_28px_22px_30px] rounded-[12px] shadow-[box-shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] m-[40px_0_80px] bg-white'}>
                        <Tabs defaultIndex={0}  selectedTabClassName={cx('font-bold text-171a1e')}>
                        <TabList className={'flex items-center list-none '}>
                        {!this.state.tab && <div className="hidden md:flex items-center w-full">
                            <Tab className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pr-[30px]' }><div>Total Balance</div></Tab>
                            <Tab className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pr-[30px]' }><div>Spot Wallet</div></Tab>
                            <Tab className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pr-[30px]' }><div>Auto-Invest Wallet</div></Tab>
                            <Tab className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pr-[30px]' }><div>Rewards Wallet</div></Tab>
                            <Tab className={'leading-normal tracking-normal text-adadaf cursor-pointer ml-auto' }><div>Transaction History</div></Tab>
                            </div>
                        }
                        <div className='block md:hidden absolute top-[12px] bg-transparent z-10 '>
                           <FontAwesomeIcon icon={faEllipsisVertical} className='text-lg' onClick={this.toggletab} />
                           {this.state.tab && <div className="bg-white rounded shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] text-[0.81rem] sm:text-base">
                                <Tab onClick={this.toggletab} className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pt-[12px] sm:pt-[7px] px-2 mx-3' }><div>Total Balance</div></Tab>
                                <Tab onClick={this.toggletab} className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pt-[9px] sm:pt-[7px] px-2 mx-3 ' }><div>Spot Wallet</div></Tab>
                                <Tab onClick={this.toggletab} className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pt-[9px] sm:pt-[7px] px-2 mx-3 ' }><div>Auto-Invest Wallet</div></Tab>
                                <Tab onClick={this.toggletab} className={'leading-normal tracking-normal text-a2a2a2 cursor-pointer pt-[9px] pb-2 sm:pt-[7px] px-2 mx-3' }><div>Rewards Wallet</div></Tab>
                            </div>
                           }
                        </div>
                           <Tab className={'block md:hidden absolute right-4 top-2 leading-normal tracking-normal text-adadaf cursor-pointer ml-auto' }><div>Transaction History</div></Tab>
                        </TabList>
                        
                        <div className={cx('hidden sm:flex py-[10px] m-[10px_0_22px] border-solid border-e9eff6 border-t-[1px] border-b-[1px]')}>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-start')}>
                                <div>Asset Name</div>
                            </div>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-end')}>
                                <div >Total Amount</div>
                            </div>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-end')}>
                                <div >Available</div>
                            </div>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-end')}>
                                <div >In Order</div>
                            </div>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-end')}>
                                <div >Out of Spot Wallet</div>
                            </div>
                            <div className={cx('flex-1 text-a2a2a2 text-xs flex p-[0_0px_0_6px] justify-start pl-[25px] md:min-w-[290px] lg:min-w-[436px]')}>
                                <div >Action</div>
                            </div>
                        </div>
                        <TabPanel>
                            <div>
                                <div className={cx('pt-4 sm:pt-0 text-171a1e leading-normal tracking-normal font-medium')}>Stable Assets</div>
                                {this.state.stableAsset.map((item:any,i:number) => 
                                <><div key={item.coin} className={cx('flex-wrap sm:flex-auto sm:flex items-start md:items-center p-[15px_0px_0]')}>
                                <div className={'flex flex-1 items-center relative'}>
                                    <div className={'mr-2 w-7 lg:w-8 h-7 lg:h-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt={item.coin}  width={32} height={32}/></div>
                                    <div>
                                        <div className={cx('text-171a1e font-medium text-[13px] lg:text-sm')}>{item.symbol}</div>
                                        <div className={cx('text-a2a2a2 text-[11px] lg:text-xs')}>{item.coin}</div>
                                    </div>
                                    <div className={'sm:hidden absolute right-0 top-0'} ><FontAwesomeIcon onClick={()=>this.toggleCoin(item,0)} icon={item.isVisible==true?faChevronUp:faChevronDown} /></div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-1 min-w-[110px] sm:min-w-0'}>Total Amount :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.totalPrice}}></div>
                                    <div className={cx('sm:text-right sm:pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.stotalPrice}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>Available :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.Available}}></div>
                                    <div className={cx('sm:text-right sm:pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sAvailable}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>In Order :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.inOrder}} ></div>
                                    <div className={cx('sm:text-right sm:pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sinOrder}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>Out of Spot Wallet :</div>
                                    {/* <div className="block sm:hidden text-171a1e text-sm pb-1">Out of Spot</div> */}
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.OutofSpot}} ></div>
                                    <div className={cx('sm:text-right sm:pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sOutofSpot}</div>
                                </div>
                                <div className={cx(item.isVisible?'block':'hidden','sm:flex pt-2 sm:pt-0 flex-1 pl-0 sm:pl-[20px] md:min-w-[290px] lg:min-w-[458px]')}>
                                    <div className="block sm:hidden text-171a1e text-sm pb-1">Action</div>
                                    <div className={'pb-2 sm:pb-0 flex-wrap flex items-center text-[13px] lg:text-sm'}>
                                    {Object.keys(item.Action).map((itemk:any,k:number) => 
                                        <div key={k} className={'first:ml-1 sm:first:ml-0'}>
                                            <div className={cx('font-medium leading-normal tracking-normal mr-2 sm:mr-3 ',item.Action[itemk]?'text-primary':'text-a2a2a2')}>{itemk}</div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                </div></>
                                )}
                                <div className={cx('text-171a1e leading-normal tracking-normal font-medium m-[21px_0_10px] border-solid border-e9eff6 border-t-[1px] pt-5')}>Crypto Assets</div>
                                {this.state.cryptoAsset.map((item:any,i:number) => 
                                <><div key={item.coin} className={cx('flex-wrap sm:flex-auto sm:flex items-start md:items-center p-[15px_0px_0]')}>
                                <div className={'flex flex-1 items-center relative'}>
                                    <div className={'mr-2 w-7 lg:w-8 h-7 lg:h-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt={item.coin} width={32} height={32}/></div>
                                    <div>
                                        <div className={cx('text-171a1e font-medium text-[13px] lg:text-sm')}>{item.symbol}</div>
                                        <div className={cx('text-a2a2a2 text-[11px] lg:text-xs')}>{item.coin}</div>
                                    </div>
                                    <div className={'sm:hidden absolute right-0 top-0'}><FontAwesomeIcon onClick={()=>this.toggleCoin(item,1)} icon={item.isVisible==true?faChevronUp:faChevronDown} /></div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>Total Amount :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.totalPrice}}></div>
                                    <div className={cx('sm:text-right pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.stotalPrice}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>Available :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.Available}}></div>
                                    <div className={cx('sm:text-right pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sAvailable}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>In Order :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.inOrder}} ></div>
                                    <div className={cx('sm:text-right pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sinOrder}</div>
                                </div>
                                <div className={cx(item.isVisible?'flex':'hidden','sm:block flex-1')}>
                                    <div className={'sm:hidden text-a2a2a2 text-xs pt-[7px] min-w-[110px] sm:min-w-0'}>Out of Spot Wallet :</div>
                                    <div className={cx('sm:text-right font-medium text-171a1e text-[13px] lg:text-sm sm:pl-2')} dangerouslySetInnerHTML={{ __html:item.OutofSpot}} ></div>
                                    <div className={cx('sm:text-right pt-1 text-xs text-a2a2a2 text-[11px] lg:text-xs pl-3 sm:pl-0')}>{item.sOutofSpot}</div>
                                </div>
                                <div className={cx(item.isVisible?'block':'hidden','sm:flex pt-2 sm:pt-0 flex-1 pl-0 sm:pl-[20px] md:min-w-[290px] lg:min-w-[458px]')}>
                                    <div className="block sm:hidden text-171a1e text-sm pb-1">Action</div>
                                    <div className={'pb-2 sm:pb-0 flex-wrap flex items-center text-[13px] lg:text-sm'}>
                                    {Object.keys(item.Action).map((itemk:any,k:number) => 
                                        <div key={k} className={'first:ml-1 sm:first:ml-0'}>
                                            <div className={cx('font-medium leading-normal tracking-normal mr-3',item.Action[itemk]?'text-primary':'text-a2a2a2')}>{itemk}</div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                </div></>
                                )}
                                <div className="border-solid border-e9eff6 border-y-[1px] mt-5 py-[10px] text-center text-xs text-a2a2a2">
                                        View More
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel><div className={'text-center text-a2a2a2'}>Coming soon</div></TabPanel>
                        <TabPanel><div className={'text-center text-a2a2a2'}>Coming soon</div></TabPanel>
                        <TabPanel><div className={'text-center text-a2a2a2'}>Coming soon</div></TabPanel>
                        <TabPanel><div className={'text-center text-a2a2a2'}>Coming soon</div></TabPanel>
                        <TabPanel><div className={'text-center text-a2a2a2'}>Coming soon</div></TabPanel>
                        </Tabs>
                    </div>
                </div>
                    <Footer/>
                
            </React.Fragment>
        );
    }

}


export default WalletPage


