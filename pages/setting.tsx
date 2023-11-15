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
import { Switch } from '@headlessui/react';

interface Props {

}
interface State {
    txData: any;
    cryptoAsset: any;
    stableAsset: any;
    tab: any;
    toggleTwitter: boolean;
    togglePlatform: boolean;
    toggleMarketing: boolean;

}

class AccountSetting extends Component<Props, State> {
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
            tab: false,
            toggleTwitter: false,
            togglePlatform: false,
            toggleMarketing: false
        };
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
    idInfo = [
        {
            "title": "First Name",
            "description": "Jonh"
        },
        {
            "title": "Last Name",
            "description": "Doe"
        },
        {
            "title": "Republic of Turkey ID",
            "description": "48392291732"
        },
        {
            "title": "Nationality",
            "description": "Türkiye"
        },
        {
            "title": "Birth Date",
            "description": "25.12.1982"
        },
        {
            "title": "Residential Area Document Code",
            "description": "xxxx-xxxx-xxxx-xxxx"
        },
        {
            "title": "Address",
            "description": "Yol Sok. Munir Cad. Hasbul Mah. No:14"
        },
        {
            "title": "City",
            "description": "Esenler"
        },
        {
            "title": "Region",
            "description": "İstanbul"
        },
        {
            "title": "Job",
            "description": "Select from List"
        },
        {
            "title": "Monthly Income",
            "description": "0-10.000"
        },
        {
            "title": "Gender",
            "description": "Select from List"
        }
    ];


    toggleTwitter = () => {
        this.setState((prevState) => ({
            toggleTwitter: !prevState.toggleTwitter
        }))
    }
    togglePlatform = () => {
        this.setState((prevState) => ({
            togglePlatform: !prevState.togglePlatform
        }))
    }
    toggleMarketing = () => {
        this.setState((prevState) => ({
            toggleMarketing: !prevState.toggleMarketing
        }))
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
    render(): React.ReactNode {
        return (
            <>
                            <div className={'lg:flex'}>
                                <div className={cx('w-full xl:pr-[28px] lg:pr-[15px] pr-0 max-w-[840px] mx-auto lg:mx-0')}>
                                    <div className="bg-white h-auto max-w-[810px] w-full rounded-[20px] sm:p-[30px_32.5px_40px] p-[30px_15px_40px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] mt-[40px]">
                                        <Tabs defaultIndex={1} selectedTabClassName={'!text-171a1e font-medium leading-normal tracking-normal text-[14px]'}>
                                            <TabList className="flex border-b border-solid border-e9eff6">
                                                <Tab className="text-a2a2a2 font-medium leading-normal tracking-normal lg:text-[14px] text-[12px] lg:pr-[45px] md:pr-[15px] pr-[10px] text-center mb-[16px] cursor-pointer">Profile Settings</Tab>
                                                <Tab className="text-a2a2a2 font-medium leading-normal tracking-normal lg:text-[14px] text-[12px] lg:pr-[45px] md:pr-[15px] pr-[10px] text-center mb-[16px] cursor-pointer">Identity Information</Tab>
                                                <Tab className="text-a2a2a2 font-medium leading-normal tracking-normal lg:text-[14px] text-[12px] lg:pr-[45px] md:pr-[15px] pr-[10px] text-center mb-[16px] cursor-pointer">Notification and Marketing</Tab>
                                                <Tab className="text-a2a2a2 font-medium leading-normal tracking-normal lg:text-[14px] text-[12px] lg:pr-[45px] md:pr-[15px] pr-[10px] text-center mb-[16px] cursor-pointer">Social Media</Tab>
                                            </TabList>
                                            <TabPanel>
                                                <div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Nickname</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">Set a customized nickname for your profile.</span>
                                                        </div>
                                                        <div className="pr-[5px] sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">BitcoinKAFASI</span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Avatar</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">Select an avatar to personalize your account.</span>
                                                        </div>
                                                        <div className="pr-[5px] sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="mr-[6px]">
                                                                <Image className='' src={`/assets/images/icons/userbtcicon.svg`} alt={'Profile Image'} width={36} height={36} />
                                                            </span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Twitter User Id</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">Add your Twitter ID to entitle for awards.</span>
                                                        </div>
                                                        <div className="pr-[5px] sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">@johndoe</span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">E-mail Address</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">You can update your e-mail address.</span>
                                                        </div>
                                                        <div className="pr-[5px] sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">bitcoin@gmail.com</span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Mobile Number</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">You can update your mobile number. (Document required)</span>
                                                        </div>
                                                        <div className="pr-[5px] sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">0 532 111 11 11</span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Referans Link</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal">You can copy your referans link.</span>
                                                        </div>
                                                        <div className="sm:pt-0 pt-[15px]">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">https://skaflic.com/ref=126172</span>
                                                            <span className="cursor-pointer">
                                                                <Image src="/assets/copy.svg" alt="description of image" height={24} width={24} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div>
                                                    {this.idInfo.map((t: any, index: any) =>
                                                        <div key={t.title} className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                            <div className="flex flex-col">
                                                                <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">{t.title}</span>
                                                                {/* <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal"></span> */}
                                                            </div>
                                                            <div className="pr-[5px] flex items-center sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                                <span className="text-xs mr-[8px]">
                                                                    <Checkbox id={index} className="self-start text-success" labelClassName="before:border-success before:border-success after:border-success" />
                                                                </span>
                                                                <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[6px]">{t.description}</span>
                                                                <span className="cursor-pointer">
                                                                    <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                <div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Order Confirmation Pop-up</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal max-w-[316px]">If the order reminder function is enabled, it will need to be
                                                                reconfirmed every time an order is submitted.</span>
                                                        </div>
                                                        <div className="pr-[5px] flex items-center sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span className="text-[14px] font-medium text-171a1e leading-normal tracking-normal mr-[16px] max-w-[166px] sm:text-right text-left">Market, Limit, Stop, OCO
                                                                at Exchange Page</span>
                                                            <span className="text-xs">
                                                                <Checkbox id="cb1" className="self-start text-success" labelClassName="before:border-success before:border-success after:border-success" />
                                                            </span>
                                                            <span className="cursor-pointer">
                                                                <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'} width={10} height={10} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Twitter Engagement</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal max-w-[342px]">In case you win an award, it will be shared via @SkaflicDestek
                                                                Twitter account by tagging the Twitter ID in your profile.</span>
                                                        </div>
                                                        <div className="sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span>
                                                                <Switch
                                                                    checked={this.state.toggleTwitter}
                                                                    onChange={this.toggleTwitter}
                                                                    className={`${this.state.toggleTwitter ? 'bg-00d672' : 'bg-ebece9'} relative inline-flex h-[16.3px] w-[33.9px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={`${this.state.toggleTwitter ? 'translate-x-[18px]' : 'translate-x-0'} pointer-events-none inline-block h-[12.2px] w-[12.2px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                    />
                                                                </Switch>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center sm:border-none border-b border-solid border-e9eff6">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Platform Notifications</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal max-w-[283px]">Once enabled, you will receive relevant notifications
                                                                within the app and website.</span>
                                                        </div>
                                                        <div className="sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span>
                                                                <Switch
                                                                    checked={this.state.togglePlatform}
                                                                    onChange={this.togglePlatform}
                                                                    className={`${this.state.togglePlatform ? 'bg-00d672' : 'bg-ebece9'} relative inline-flex h-[16.3px] w-[33.9px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={`${this.state.togglePlatform ? 'translate-x-[18px]' : 'translate-x-0'} pointer-events-none inline-block h-[12.2px] w-[12.2px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                    />
                                                                </Switch>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="pt-[22px] sm:flex block justify-between items-center">
                                                        <div className="flex flex-col">
                                                            <span className="sm:text-[16px] text-[14px] font-medium text-171a1e leading-normal tracking-normal">Marketing Notification</span>
                                                            <span className="text-[12px] font-normal text-a2a2a2 leading-normal tracking-normal max-w-[192px]">Select whether you want to receive
                                                                marketing emails from us.</span>
                                                        </div>
                                                        <div className="sm:pt-0 pt-[15px] sm:mb-0 mb-[15px]">
                                                            <span>
                                                                <Switch
                                                                    checked={this.state.toggleMarketing}
                                                                    onChange={this.toggleMarketing}
                                                                    className={`${this.state.toggleMarketing ? 'bg-00d672' : 'bg-ebece9'} relative inline-flex h-[16.3px] w-[33.9px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                                                                    <span className="sr-only">Use setting</span>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        className={`${this.state.toggleMarketing ? 'translate-x-[18px]' : 'translate-x-0'} pointer-events-none inline-block h-[12.2px] w-[12.2px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                    />
                                                                </Switch>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                            <TabPanel>
                                                COMING SOON
                                            </TabPanel>
                                        </Tabs>
                                    </div>
                                </div>
                                <div className={cx('xl:pl-[30px] sm:pl-[15px] mb-10 mt-10 flex-1 max-w-[480px] mx-auto lg:mx-0')}>
                                    <ButtonLink href="#" className={cx('rounded-[20px] sm:rounded-[30px] border-0 bg-blend-normal shadow-normal bg-gradient-alert w-full py-[2px] pl-[28px] pr-[15px] text-base xl:text-lg sm:text-[16px] text-[14px]  font-bold text-left flex items-center')} type={ButtonType.primary}>Start Trade with “0” fee <div className={cx('ml-auto')}><div className="w-[70px] h-[45px] sm:w-20 sm:h-[55px]"><Image src={`/assets/images/icons/bell-icon.svg`} alt={'show'} width={80} height={55} /></div></div></ButtonLink>
                                    <div className={cx('mt-[30px] px-[24px] pt-[27px] pb-[18px] rounded-[20px] bg-white bg-blend-normal shadow-normal')}>
                                        <ul className="list-none mb-[7px]"><div className="flex items-center text-base font-medium">Referral <div className="ml-auto"><Image src={`/assets/images/icons/sample-qr.svg`} alt={'Referral QR'} width={24} height={24} /></div></div>
                                            <li className={cx('text-a2a2a2 pt-1 text-[11px] flex items-center')}>Registered <span className={cx('text-181a1e font-medium text-xs ml-auto')}>12</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Traded <span className={cx('text-181a1e font-medium text-xs ml-auto')}>9</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Commission Earn (TRY) <span className={cx('text-181a1e font-medium text-xs ml-auto')}>1.220</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Ranking <span className={cx('text-181a1e font-medium text-xs ml-auto')}>#52</span></li>
                                        </ul>
                                        <Button className={cx('fullwidth', ' block mt-2 text-xs')} type={ButtonType.primary}>Referans linkini kopyala</Button>
                                    </div>
                                    {/* KYC SECTION */}
                                    <div className={cx('w-full mt-10 p-[31px_15px_31px_15px] sm:p-[31px_25px_31px_30px] rounded-[20px] bg-white bg-blend-normal shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]')}>
                                        <div className={cx('flex')}>
                                            <div className={cx('text-171a1e', 'font-medium', 'xl:text-base text-[14px] flex-1')}>Identity Verification (KYC)</div>
                                            <div className={cx('flex items-center')} >
                                                <div className={cx('text-success', 'font-bold', 'xl:text-base' , 'text-[14px]')}>Level 2</div>
                                                <div className={cx('flex')}><span className={'w-[120px] h-4 inline-block ml-[9px] rounded-lg bg-e9eff6 bg-blend-normal shadow-normal'}><span className={'block h-full rounded-lg bg-success bg-blend-normal'} style={{ width: `100%` }}></span></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* KYC SECTION */}
                                    {/* SECURITY SECTION */}
                                    <div className={cx('w-full mt-10 p-[31px_15px_31px_15px] sm:p-[31px_25px_31px_30px] rounded-[20px] bg-white bg-blend-normal shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]')}>
                                        <div className={cx('flex')}>
                                            <div className={cx('text-171a1e', 'font-medium', 'xl:text-base flex-1','text-[14px]')}>Security Level</div>
                                            <div className={cx('flex items-center')} >
                                                <div className={cx('text-success', 'font-bold', 'xl:text-base', 'text-[14px]')}>High</div>
                                                <div className={cx('flex')}><span className={'w-[120px] h-4 inline-block ml-[9px] rounded-lg bg-e9eff6 bg-blend-normal shadow-normal'}><span className={'block h-full rounded-lg bg-success bg-blend-normal'} style={{ width: `100%` }}></span></span></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* SECURITY SECTION */}
                                </div>
                            </div>
     
            </>
        )
    }

}
export default AccountSetting;