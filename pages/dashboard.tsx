import React, { Component } from "react";
import Header from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/dashboard.module.css'
import { Button, ButtonLink, ButtonType } from "../components/button";
import Image from 'next/image';
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import { TransactionHistory } from "../components/transaction-history";
import Footer from "./footer";
import { UserStats } from "../components/user-stats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AccountSetting from "./setting";
import { TransactionReward } from "../components/transaction-reward";
import { LoginDeviceManagement } from "../components/login-devicemanagement";
import { UserService } from "../helpers/userservice";


interface Props {
  
}

interface State {
    txData:any,
    cryptoAsset:any,
    stableAsset:any,
    tab:any,
    accntInfo: any;
}

class DashboardPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
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
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
        },
        {
            'coin':'Bitcoin',
            'symbol':'BTC',
            'totalPrice':'428.166',
            'stotalPrice':'₺ 428.166,34',
            'Available':'418.166,34',
            'sAvailable':'₺ 428.166,34',
            'inOrder':'0,00',
            'sinOrder':'₺ 0,00',
            'OutofSpot':'10.000,00',
            'sOutofSpot':'₺ 0,00',
            'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
            },
        {
        'coin':'Solana',
        'symbol':'SOL',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'DogeCoin',
        'symbol':'DOGE',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'Polkadot',
        'symbol':'DOT',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },,
        {
        'coin':'Polygon',
        'symbol':'MATIC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
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
        'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
        },
        {
        'coin':'Tether',
        'symbol':'USDT',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'Binance USD',
        'symbol':'BUSD',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':false,'Trade':true,'autoInvest':true}
     },
        {
        'coin':'USD Coin',
        'symbol':'USDC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
    ]
    this.state = {
            txData:txhistory,
            cryptoAsset:data,
            stableAsset:data2,
            tab:false,
            accntInfo: {},
        };
    }
    
    
    
    componentDidMount() {
        this.getAccountInfo();
    }
    getAccountInfo = async ()=>{
      let res =  await UserService.getInstance().getAccountInfo();
      this.setState({accntInfo: res});
    }
    markZero(val:any){
        let v=val
        let nv=v.split('').reverse();
        let zero=[];
        for(let el of nv){
            if(el!=0){
                break; 
            }
            zero.push(el);
        }
        let vv=val.substring(0,(val.length-zero.length))
        return vv+'<span class="text-a2a2a2">'+zero.join('')+'</span>';
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
        let acc = {"FT":1,"Ul":1,"LLg":"2023-02-17T11:18:09","RvSh":0,"EST":234990695.937282303,"ESTUSD":0.0,"Sms":false,"GAu":false,"Dv":[{"I":56,"Ip":"127.0.0.1","D":"Windows 10 Other Chrome 110.0.0","L":"Unknown","Lg":"2023-02-16T12:46:30","C":true},{"I":50,"Ip":"127.0.0.1","D":"Windows 10 Other Chrome 109.0.0","L":"Unknown","Lg":"2023-02-13T11:50:38","C":false}],"Ulg":[{"D":"2023-02-17T11:18:09","Ip":"127.0.0.1","L":"Unknown","Dv":"Windows 10 Other Chrome 110.0.0"},{"D":"2023-02-17T09:48:40","Ip":"127.0.0.1","L":"Unknown","Dv":"Windows 10 Other Chrome 110.0.0"},{"D":"2023-02-16T15:09:22","Ip":"127.0.0.1","L":"Unknown","Dv":"Windows 10 Other Chrome 110.0.0"},{"D":"2023-02-16T14:57:52","Ip":"127.0.0.1","L":"Unknown","Dv":"Windows 10 Other Chrome 110.0.0"},{"D":"2023-02-16T12:46:30","Ip":"127.0.0.1","L":"Unknown","Dv":"Windows 10 Other Chrome 110.0.0"}],"KYC":null,"AP":false,"Api":false,"Em":"babarzech@gmail.com","DvCt":1.0,"TotalDv":2,"UPgCt":8.0,"TotalLg":36};
        return (
            <React.Fragment>
                <Header logoText={true} />
                <div className={'container py-[10px] sm:py-[40px] px-4'}>
                   
                            <div className={''}>
                                <div className={cx('md:flex mx-auto lg:mx-0')}>    
                                    <div className=" mt-7 w-full sm:mt-0 ">
                                        <UserStats acc={acc} />
                                    </div>
                                    
                                </div>
                                <div className={cx('mb-7 md:flex mx-auto lg:mx-0')}>
                                    <div className={cx('w-full basis-[50%] md:mr-4 mt-7 p-[18px_15px_5px_15px] sm:p-[30px_25px_5px_30px] rounded-xl bg-white bg-blend-normal shadow-normal')}>
                                            <div className={cx('flex')}>
                                                <div className={cx('text-171a1e','font-medium','text-base flex-1')}>Identity Verification (KYC)</div>
                                            </div>
                                            <div className={'w-full border-b-[1px] border-solid border-e9eff6 pt-2'}></div>
                                            <div>
                                                <div className={cx('flex','items-center mt-[26px] mb-[8px]')}>
                                                    <div className={cx('text-center border-solid border-[1px] border-e9eff6 rounded-[50px] w-[48px] h-[48px] flex items-center justify-center  mr-[13px]')}><h4 className={cx('text-e9eff6 m-0')}>1</h4></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>2 BTC</div>
                                                        <div className={cx('text-xs','text-777e91')}>24h Withdrawal Limit</div>
                                                    </div>
                                                    <Button className={cx('max-w-[120px] py-[11px] w-full h-full text-xs whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-md border-0 ')} type={ButtonType.disable}>Done</Button>
                                                </div>
                                                <div className={cx('flex','py-3 relative')}>
                                                    <div className={cx('absolute left-5 top-0 sm:left-6 h-[20px] border-[1px] border-solid border-e9eff6')}></div>
                                                </div>
                                                <div className={cx('flex','items-center  mb-[21px] mt-[8px]')}>
                                                    <div className={cx('text-center border-solid border-[1px] border-primary rounded-[50px] w-[48px] h-[48px] flex items-center justify-center  mr-[13px]')}><h4 className={cx('text-primary m-0')}>2</h4></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>100 BTC</div>
                                                        <div className={cx('text-xs','text-777e91')}>24h Withdrawal Limit</div>
                                                    </div>
                                                    <ButtonLink href={'/kyc'} className={cx('max-w-[200px] max-h-[40px] pt-[5px] w-full h-full text-xs whitespace-normal tracking-normal','text-white','font-medium','text-xs shadow-md')} type={ButtonType.primary}>Submit KYC Documents</ButtonLink>
                                                </div>
                                                <div className={cx('flex','py-3 relative')}>
                                                    <div className={cx('absolute left-5 top-0 sm:left-6 h-[20px] border-[1px] border-solid border-e9eff6')}></div>
                                                </div>
                                                <div className={cx('flex','items-center  mb-[21px] mt-[8px]')}>
                                                    <div className={cx('text-center border-solid border-[1px] border-primary rounded-[50px] w-[48px] h-[48px] flex items-center justify-center  mr-[13px]')}><h4 className={cx('text-primary m-0')}>3</h4></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Higher Limit than 100 BTC</div>
                                                        {/* <div className={cx('text-xs','text-777e91')}>24h Withdrawal Limit</div> */}
                                                    </div>
                                                    <Button className={cx('max-w-[120px] max-h-[40px] pt-[5px] w-full h-full text-xs whitespace-normal tracking-normal','text-white','font-medium','text-xs shadow-md')} type={ButtonType.primary}><div>Contact us</div></Button>
                                                </div>
                                            </div>

                                    </div>
                                    
                                    <div className={cx('w-full basis-[50%] md:ml-4 mt-7 p-[18px_15px_15px_15px] sm:p-[30px_25px_15px_30px] rounded-xl bg-white bg-blend-normal shadow-normal')}>
                                            <div className={cx('flex')}>
                                                <div className={cx('text-171a1e','font-medium','text-base flex-1')}>Security Level</div>
                                            </div>
                                            <div className={'w-full border-b-[1px] border-solid border-e9eff6 pt-2'}></div>
                                            <div>
                                                <div className={cx('flex','items-center mt-5 sm:mt-[26px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px]"><div className="w-11 h-11 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/google-authentication.svg`} alt={'Google Authentication'}  width={48} height={48}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Google Authentication</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Deactive</span><span className="text-ffc500 font-bold">High Priority</span></div>
                                                    </div>
                                                    <ButtonLink href={'/google-authentication'} className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal font-medium shadow-md border-0 ')} type={ButtonType.primary}>Activate</ButtonLink>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[42px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-11 h-11 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/sms-verification.png`} alt={'SMS Verification'}  width={48} height={48}/></div><div className="absolute left-[18px] top-[18px] w-9 h-9 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/active-gaurd.svg`} alt={'Active'}  width={48} height={48}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>SMS Authentication</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-success pl-1 pr-2">Activated</span></div>
                                                    </div>
                                                    <ButtonLink href={'/sms-authentication'} className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-md border-0 ')} type={ButtonType.disable}>Deactivate</ButtonLink>
                                                </div>
                                                <div className={cx('flex','items-center mt-5 sm:mt-[26px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-7 h-7 sm:w-10 sm:h-10"><Image src={`/assets/images/icons/anti-phishing.png`} alt={'Anti-Phishing'}  width={40} height={40}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Anti-Phishing</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Deactive</span></div>
                                                    </div>
                                                    <ButtonLink href={'/anti-phishing'} className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal font-medium shadow-md border-0 ')} type={ButtonType.primary}>Activate</ButtonLink>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[30px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-7 h-7 sm:w-10 sm:h-10"><Image src={`/assets/images/icons/password.png`} alt={'Password'}  width={40} height={40}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Password</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Weak</span></div>
                                                    </div>
                                                    <ButtonLink href={'/change-password'}  className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal text-white font-medium shadow-md border-0 ')} type={ButtonType.primary}>Change</ButtonLink>
                                                </div>
                                            </div>

                                    </div>
                                </div>
                                    <LoginDeviceManagement getAccountInfo={this.getAccountInfo} acc={acc}  className="mt-0"/>
                            </div>
                </div>
                    <Footer/>
                
            </React.Fragment>
        );
    }

}


export default DashboardPage


