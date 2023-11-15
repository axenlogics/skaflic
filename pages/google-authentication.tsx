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
import { faChevronDown, faChevronUp, faCopy } from "@fortawesome/free-solid-svg-icons";
import AccountSetting from "./setting";
import { TransactionReward } from "../components/transaction-reward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faL } from '@fortawesome/free-solid-svg-icons'
import { LoginDeviceManagement } from "../components/login-devicemanagement";


interface Props {

}

interface State {
    txData: any,
    cryptoAsset: any,
    stableAsset: any,
    tab: any
}

class GoogleAuthenticationPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        const txhistory = [
            { 'status': false, 'coin': 'TRY', 'value': '5.783,57000000', 'date': '09.12.2022 17:14' },
            { 'status': true, 'coin': 'USDT', 'value': '7.271,05948392', 'date': '09.12.2022 17:13' },
        ]
        const data =
            [
                {
                    'coin': 'Avalanche',
                    'symbol': 'AVAX',
                    'totalPrice': '428.166',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '418.166,34',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': false, 'Sell': false, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': false, 'autoInvest': false }
                },
                {
                    'coin': 'Bitcoin',
                    'symbol': 'BTC',
                    'totalPrice': '428.166',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '418.166,34',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': false, 'Sell': false, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': false, 'autoInvest': false }
                },
                {
                    'coin': 'Solana',
                    'symbol': 'SOL',
                    'totalPrice': '17.463,46370000',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '17.463,46370000',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
                },
                {
                    'coin': 'DogeCoin',
                    'symbol': 'DOGE',
                    'totalPrice': '428.166',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '418.166,34',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
                },
                {
                    'coin': 'Polkadot',
                    'symbol': 'DOT',
                    'totalPrice': '428.166',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '418.166,34',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
                }, ,
                {
                    'coin': 'Polygon',
                    'symbol': 'MATIC',
                    'totalPrice': '428.166',
                    'stotalPrice': '₺ 428.166,34',
                    'Available': '418.166,34',
                    'sAvailable': '₺ 428.166,34',
                    'inOrder': '0,00',
                    'sinOrder': '₺ 0,00',
                    'OutofSpot': '10.000,00',
                    'sOutofSpot': '₺ 0,00',
                    'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
                },
            ]
        const data2 = [
            {
                'coin': 'Turkish Lira',
                'symbol': 'TRY',
                'totalPrice': '428.166',
                'stotalPrice': '₺ 428.166,34',
                'Available': '418.166,34',
                'sAvailable': '₺ 428.166,34',
                'inOrder': '0,00',
                'sinOrder': '₺ 0,00',
                'OutofSpot': '10.000,00',
                'sOutofSpot': '₺ 0,00',
                'Action': { 'BUY': false, 'Sell': false, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': false, 'autoInvest': false }
            },
            {
                'coin': 'Tether',
                'symbol': 'USDT',
                'totalPrice': '17.463,46370000',
                'stotalPrice': '₺ 428.166,34',
                'Available': '17.463,46370000',
                'sAvailable': '₺ 428.166,34',
                'inOrder': '0,00',
                'sinOrder': '₺ 0,00',
                'OutofSpot': '10.000,00',
                'sOutofSpot': '₺ 0,00',
                'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
            },
            {
                'coin': 'Binance USD',
                'symbol': 'BUSD',
                'totalPrice': '428.166',
                'stotalPrice': '₺ 428.166,34',
                'Available': '418.166,34',
                'sAvailable': '₺ 428.166,34',
                'inOrder': '0,00',
                'sinOrder': '₺ 0,00',
                'OutofSpot': '10.000,00',
                'sOutofSpot': '₺ 0,00',
                'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': false, 'Trade': true, 'autoInvest': true }
            },
            {
                'coin': 'USD Coin',
                'symbol': 'USDC',
                'totalPrice': '428.166',
                'stotalPrice': '₺ 428.166,34',
                'Available': '418.166,34',
                'sAvailable': '₺ 428.166,34',
                'inOrder': '0,00',
                'sinOrder': '₺ 0,00',
                'OutofSpot': '10.000,00',
                'sOutofSpot': '₺ 0,00',
                'Action': { 'BUY': true, 'Sell': true, 'Deposit': true, 'Withdraw': true, 'Transfer': true, 'Trade': true, 'autoInvest': true }
            },
        ]
        this.state = {
            txData: txhistory,
            cryptoAsset: data,
            stableAsset: data2,
            tab: false
        };
    }



    componentDidMount() {

    }
    markZero(val: any) {
        let v = val
        let nv = v.split('').reverse();
        let zero = [];
        for (let el of nv) {
            if (el != 0) {
                break;
            }
            zero.push(el);
        }
        let vv = val.substring(0, (val.length - zero.length))
        return vv + '<span class="text-a2a2a2">' + zero.join('') + '</span>';
    }
    toggleCoin = (item: any, ctype: any) => {
        // ctype 0 stable Asset
        // ctype 1 crypto Asset
        if (ctype == 0) {
            this.setState(prevState => ({
                stableAsset: prevState.stableAsset.map((v: any) => {
                    if (v.coin == item.coin) {
                        return { ...v, isVisible: !item.isVisible };
                    } else
                        return { ...v, isVisible: false };
                })
            }))
        } else {
            this.setState(prevState => ({
                cryptoAsset: prevState.cryptoAsset.map((v: any) => {
                    if (v.coin == item.coin) {
                        return { ...v, isVisible: !item.isVisible };
                    } else
                        return { ...v, isVisible: false };
                })
            }))
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header logoText={true} />
                <div className="bg-white h-auto">
                    <div className={'container py-[10px] sm:py-[20px] px-4'}>
                        <h1 className="lg:text-[42px] text-2xl leading-normal tracking-normal text-171a1e p-[40px_0px] lg:text-left text-center">
                            Google Authentication
                        </h1>
                    </div>
                </div>
                <div className={'container py-[25px] sm:py-[40px] px-4'}>
                    <div className="lg:flex block sm:mb-[40px] mb-[15px]">
                        <div className="xl:mr-[40px] mr-[20px] lg:mb-0 mb-[20px] lg:max-w-[734px] max-w-full w-full sm:h-[430px] h-auto bg-white shadow-[0_10px_5px_0_rgba(8,12,52,0.06)] rounded-[6px] xl:p-[44px] p-[22px]">
                            <div className="flex items-center">
                                <div className="mr-[25px] bg-primary sm:h-[62px] h-[30px] w-[30px] sm:w-[62px] rounded-[50%]"><span className="text-center block sm:pt-[10px] pt-[5px] sm:px-0 px-[10px] sm:text-[28px] text-sm text-white leading-normal tracking-normal font-bold">1</span></div>
                                <div>
                                    <h6 className="text-sm leading-normal tracking-normal font-normal text-171a1e opacity-50">Step 1</h6>
                                    <h2 className="xl:text-[22px] sm:text-lg text-sm font-bold leading-normal tracking-normal text-171a1e">Install Google Authentication</h2>
                                </div>
                            </div>
                            <div className="sm:flex block items-center justify-center shrink-0 xl:ml-[48px] ml-0 pt-[35px]">
                                <div className="xl:pr-[60px] sm:pr-[30px] pr-0 text-center">
                                    <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">IOS App</label>
                                    <div className="mt-[10px] sm:mx-0 mx-auto bg-41b2c00f border border-solid border-41b2c00f h-auto sm:max-w-[200px] max-w-[130px] w-full rounded-[6px] shadow-[0_10px_5px_0_rgba(8,12,52,0.06)]">
                                        <Image className=" sm:h-[200px] sm:max-w-[200px] max-w-[130px] h-[130px] w-full" src="/assets/images/barcode.png" alt="IOS" height={200} width={200} />
                                    </div>
                                </div>
                                <div className="pt-[15px] sm:pt-[15px] text-center">
                                    <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">Android App</label>
                                    <div className="mt-[10px] sm:mx-0 mx-auto bg-41b2c00f border border-solid border-41b2c00f h-auto sm:max-w-[200px] max-w-[130px] w-full rounded-[6px] shadow-[0_10px_5px_0_rgba(8,12,52,0.06)]">
                                        <Image className="sm:h-[200px] sm:max-w-[200px] max-w-[130px] h-[130px] w-full" src="/assets/images/barcode.png" alt="IOS" height={200} width={200} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:max-w-[734px]  max-w-full w-full sm:h-[430px] h-auto bg-white shadow-[0_10px_5px_0_rgba(8,12,52,0.06)] rounded-[6px] xl:p-[44px] p-[22px]">
                            <div className="flex items-center">
                                <div className="mr-[25px] bg-primary sm:h-[62px] sm:w-[62px] h-[30px] w-[30px] rounded-[50%]"><span className="text-center block sm:pt-[10px] pt-[5px] sm:px-0 px-[10px] sm:text-[28px] text-sm text-white leading-normal tracking-normal font-bold">2</span></div>
                                <div>
                                    <h6 className="text-sm leading-normal tracking-normal font-normal text-171a1e opacity-50">Step 2.</h6>
                                    <h2 className="xl:text-[22px] sm:text-lg text-sm font-bold leading-normal tracking-normal text-171a1e">Scan or enter the code manually</h2>
                                </div>
                            </div>
                            <div className="sm:flex block items-center justify-center xl:ml-[48px] ml-0 pt-[35px]">
                                <div className="xl:pr-[60px] sm:pr-[30px] pr-0 text-center">
                                    <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">Scan QR</label>
                                    <div className="mt-[10px] sm:mx-0 mx-auto bg-41b2c00f border border-solid border-41b2c00f h-auto sm:max-w-[200px] max-w-[130px] w-full rounded-[6px] shadow-[0_10px_5px_0_rgba(8,12,52,0.06)]">
                                        <Image className="sm:h-[200px] sm:max-w-[200px] max-w-[130px] h-[130px] w-full" src="/assets/images/barcode.png" alt="IOS" height={200} width={200} />
                                    </div>
                                </div>
                                <div className="pt-[15px] sm:pt-[15px] text-center sm:text-left">
                                    <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">or Enter Code</label>
                                    <div className="mt-[10px]">
                                        <input className="max-w-[309px] w-full sm:h-[56px] h-[42px] bg-41b2c00f sm:text-base text-sm font-bold leading-normal tracking-normal text-171a1e border border-solid border-080c341f px-3 outline-primary" type="text" placeholder="JFLW62SHNU4U2NSSI5CGITBZGRG" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:flex block mb-[40px]">
                        <div className="xl:mr-[40px] mr-[20px] lg:mb-0 mb-[20px] lg:max-w-[734px] max-w-full w-full sm:h-[382px] h-auto bg-white shadow-[0_10px_5px_0_rgba(8,12,52,0.06)] rounded-[6px] xl:p-[44px] p-[22px]">
                            <div className="flex items-center">
                                <div className="mr-[25px] bg-primary sm:h-[62px] sm:w-[62px] h-[30px] w-[30px] rounded-[50%]"><span className="text-center block sm:pt-[10px] pt-[5px] sm:px-0 px-[10px] sm:text-[28px] text-sm text-white leading-normal tracking-normal font-bold">3</span></div>
                                <div>
                                    <h6 className="text-sm leading-normal tracking-normal font-normal text-171a1e opacity-50">Step 3.</h6>
                                    <h2 className="xl:text-[22px] sm:text-lg text-sm font-bold leading-normal tracking-normal text-171a1e">Backup the secret key</h2>
                                </div>
                            </div>
                            <h6 className="pt-[25px] sm:pl-[88px] pl-0 text-base leading-loose tracking-normal font-normal text-171a1e opacity-70">When you lose, damage or change your phone, you can reset your Google 2FA.</h6>
                            <div className="relative sm:pl-[88px] pl-0 mt-[40px]">
                                <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">Secret Code</label>
                                <input className={cx('bg-41b2c00f mt-[10px] border border-solid border-080c341f sm:h-[56px] h-[42px] lg:max-w-[566px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')} type="text" placeholder="JFLW62SHNU4U2NSSI5CGITBZGRGEYTKCGBRFGNLEK5TTI3L" />
                                <span className={cx('bg-FBFBFB max-w-[64px] border border-solid border-080c341f sm:h-[56px] h-[42px] block w-full rounded-[4px] absolute top-[30px] right-0 cursor-pointer')}>
                                    <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faCopy} style={{ fontSize: 20, color: '#42b2c0' }} />
                                </span>
                            </div>
                        </div>
                        <div className="lg:max-w-[734px] max-w-full w-full sm:h-[281px] h-auto bg-white shadow-[0_10px_5px_0_rgba(8,12,52,0.06)] rounded-[6px] xl:p-[44px] p-[22px]">
                            <div className="flex items-center">
                                <div className="mr-[25px] bg-primary sm:h-[62px] sm:w-[62px] h-[30px] w-[30px] rounded-[50%]"><span className="text-center block sm:pt-[10px] pt-[5px] sm:px-0 px-[10px] sm:text-[28px] text-sm text-white leading-normal tracking-normal font-bold">4</span></div>
                                <div>
                                    <h6 className="text-sm leading-normal tracking-normal font-normal text-171a1e opacity-50">Step 4.</h6>
                                    <h2 className="xl:text-[22px] sm:text-lg text-sm font-bold leading-normal tracking-normal text-171a1e">Enter the Google 6-digit Verification Code</h2>
                                </div>
                            </div>
                            <div className="relative sm:pl-[88px] pl-0 mt-[40px]">
                                <label className="text-sm font-normal text-171a1e opacity-70 tracking-normal" htmlFor="">Enter Code</label>
                                <input className={cx('bg-41b2c00f mt-[10px] border border-solid border-080c341f sm:h-[56px] h-[42px] lg:max-w-[566px] max-w-full w-full rounded-[4px] border-r-none outline-primary p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')} type="text" placeholder="565656" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </React.Fragment>
        );
    }

}


export default GoogleAuthenticationPage


