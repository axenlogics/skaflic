import React, { Component } from "react";
import Header, { NavbarSize } from "../../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/deposit.module.css'
import { Button } from "../../components/button";
import Image from 'next/image';
import Footer from ".././footer";
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import { TransactionHistory } from "../../components/transaction-history";
import { CoinSelectorDropdwon } from "../../components/coin-selector-dropdown";
import { getSession } from "next-auth/react";
import router, { Router, withRouter } from "next/router";
// import { getReturnQuery } from "../helpers/common";
import { MessageCard } from "../../components/message-card";
import { NoteCard, NoteCardHeading, NoteCardItem } from "../../components/note-card";
import { IChainInfo, IWallet } from "../../helpers/interfaces";
import { WalletService } from "../../helpers/user/walletservice";
import { CurrencyManager } from "../../models/market";
import { App } from "../../models/app";
import { sleep } from "../../helpers/common";
import { User } from "../../models/user";
import { CNotificationType, CustomNotification } from "../../helpers/notification";


interface Props {
    router: Router,

}

interface State {
    mudata: any,
    wdnotes: any,
    wdnotes2: any,
    banks: any,
    wallets: IWallet[],
    selectedWallet?: IWallet,
    history?: any[];
    selectedChain: IChainInfo,
    depositAddress: string,
}

class DepositCryptoPage extends Component<Props, State> {
    public static requireAuth = false;
    constructor(props: Props) {

        super(props);
        const data =
            [
                {
                    'coin': 'Bitcoin',
                    'symbol': 'BTC',
                },
                {
                    'coin': 'Solana',
                    'symbol': 'SOL',
                },
                {
                    'coin': 'tether',
                    'symbol': 'USDT',
                },
                {
                    'coin': 'Bitcoin',
                    'symbol': 'BTC',
                },
                {
                    'coin': 'Solana',
                    'symbol': 'SOL',
                },
                {
                    'coin': 'Bitcoin',
                    'symbol': 'BTC',
                },
            ]
        const wdnotes = [
            `You must send Turkish Lira by Havale or EFT from your personal bank account opened only in your name.`,
            `You can make 24/7 deposit with your AKBANK account.`,
            `FAST transaction is supported up to 5000 Turkish Liras. You can also deposit from any bank 24/7 if the amount is equal or less than 5000 Turkish Liras.`,
            `You can deposit to our AKBANK account from all banks during bank working hours.`,
            `Transfers made by ATM or credit card will not be accepted as it is not possible to confirm the sender information.`,
            `There is no minimum limit for Turkish Lira deposit, you can make your TRY deposits within your limits.`,
            `After your first Turkish Lira deposit transaction, Binance Transfer and crypto withdrawals will be disabled for 48 hours.`,
        ]
        const wdnotes2 = [
            `Send only ${this.state?.selectedWallet?.currency?.symbol} to this deposit address`,
            `Sending coin or token other than USDT to this address may result in the loss of your deposit.`,
            `Ensure the network you are using is Tron TRC-20.`,
            `The transaction information of deposit will be notified after  1 network confirmation.`,
            `The deposit amount will be credited to your balance after 2 network confirmation.`,
            `If you have sent your tokens to an different or incorrect address which does not belong to Skaflic, we are unable to provide you any further assistance. You are suggested to contact the relevant parties (owner of the address or exchange/platform which the address belongs to)`,
            `Do not send NFTs to this address.`,
        ]
        const banks = [
            { 'logo': 'akbank', 'ac': 'Skaflic Teknoloji A.Ş.', 'iban': 'TR03 0001 0026 2839 0794 6473 05', 'provides': 'EFT & 7/24 Havale & FAST', 'show': true },
            { 'logo': 'fibabanka', 'ac': 'Skaflic Teknoloji A.Ş.', 'iban': 'TR03 0001 0026 2839 0794 6473 05', 'provides': 'EFT & 7/24 Havale & FAST', 'show': false },
            { 'logo': 'vakifbank', 'ac': 'Skaflic Teknoloji A.Ş.', 'iban': 'TR03 0001 0026 2839 0794 6473 05', 'provides': 'EFT & 7/24 Havale & FAST', 'show': false },
            { 'logo': 'yapikredi', 'ac': 'Skaflic Teknoloji A.Ş.', 'iban': 'TR03 0001 0026 2839 0794 6473 05', 'provides': 'EFT & 7/24 Havale & FAST', 'show': false },
            { 'logo': 'otherbank', 'ac': 'Skaflic Teknoloji A.Ş.', 'iban': 'TR03 0001 0026 2839 0794 6473 05', 'provides': 'EFT & FAST', 'show': false },
        ]
        this.state = {
            mudata: data,
            wdnotes: wdnotes,
            wdnotes2: wdnotes2,
            banks: banks,
            wallets: [],
            selectedWallet: {},
            history: [],
            selectedChain: {},
            depositAddress: '',
        };

    }
    changeNetwork(chain: IChainInfo) {
        let wlt = this.state.wallets.find(wlt => wlt.currency?.id === chain.depositAddressCurrency)
        this.setState({ selectedChain: chain,depositAddress: wlt?.address! });
    }

    fetchWallets = async () => {
        await CurrencyManager.getInstance().init();
        await App.getInstance().init();
        await User.getInstance().init();
        let wlt = await WalletService.getInstance().fetchWallets();
        this.setState({ wallets: Object.values(wlt) },()=>{
            this.checkQueryParam();
        });
        let hist = await WalletService.getInstance().getTransactionHisotry({ Type: 2, CurrencyId: 1 });
        this.setState({ history: hist });
        // console.log(wlt, hist);
        // 
    }
    componentDidMount() {
        this.fetchWallets();
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
        // 
        return vv + '<span class="lowvisible">' + zero.join('') + '</span>';
    }
    handleClick(e: any) {
        var d = this.state.banks;
        d.map((i: any, ind: any) => {
            if (i.logo === e.logo) {
                i.show = (i.show ? false : true);
            }
            else
                i.show = false;

        })
        this.setState({
            banks: d
        })
    }
    copyAddress = ()=>{
        navigator.clipboard.writeText(this.state.depositAddress);
        CustomNotification.show('Address coped', CNotificationType.Success);
    }
    changeCoin = async (wlt: IWallet) => {
        const wdnotes2 = [
            `Send only ${wlt?.currency?.symbol} to this deposit address`,
            `Sending coin or token other than ${wlt?.currency?.symbol} to this address may result in the loss of your deposit.`,
            `Ensure the network before Deposit`,
            `If you have sent your tokens to an different or incorrect address which does not belong to Skaflic, we are unable to provide you any further assistance. You are suggested to contact the relevant parties (owner of the address or exchange/platform which the address belongs to)`,
            `Do not send NFTs to this address.`,
        ]
        this.props.router.query.id = (wlt.currency?.id!).toString();
        this.props.router.push(this.props.router);
        const activeChain = wlt.currency?.chainInfo?.find(ch => ch.canWithdraw === true);
        if (activeChain) {
            this.changeNetwork(activeChain);
        } else {
            this.changeNetwork({});
        }
        this.setState({ selectedWallet: wlt, wdnotes2: wdnotes2 });
        let hist = await WalletService.getInstance().getTransactionHisotry({ Type: 2, CurrencyId: wlt.currency?.id })
        this.setState({ history: hist });
        console.log('coin now in deposit', wlt);
    }
    checkQueryParam = async () => {
        if (!this.props.router.isReady) {
            await sleep(100);
            this.checkQueryParam();
            return;
        }
        let findWlt = this.state.wallets.find(wlt => wlt.currency?.id === Number(this.props.router?.query?.id))
        if (findWlt) {
            this.changeCoin(findWlt)
            // this.setState({ selectedWallet: findWlt });
        }
        console.log('query params', this.props.router.query)

    }
    render() {
        return (
            <React.Fragment>
                <Header navbarSize={NavbarSize.sm} logoText={true} />
                <div className={cx('container py-[10px] sm:py-[40px] px-4')}>
                    <div>
                        <div className={'block lg:flex lg:items-end'}>
                            <div className={'flex items-center'}>
                                <div className={cx('pr-[30px]')}><span className="initial items-start sm:items-center text-[26px] sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">Deposit</span></div>

                            </div>


                        </div>
                        <div className={'flex-wrap lg:flex-nowrap flex p-[25px_0_100px] sm:p-[45px_0_40px]'}>
                            <div className={'lg:max-w-[812px] w-full lg:mr-[60px]'}>
                                {/* {this.state.selectedWallet?.currency?.symbol && <MessageCard text={"Send only " + this.state.selectedWallet?.currency?.symbol +
                                    " to this deposit address. Sending any other coin or token, using any other network while sending to this address may result in the loss of your crypto asset."} />} */}
                                <div className={'rounded-[15px] sm:rounded-[12px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                    <div className={'pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                        <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Crypto Deposit {this.state.selectedWallet?.currency?.symbol}</div>

                                    </div>
                                    <div className={'pt-[25px]'}>
                                        <div className={'block sm:flex flex-wrap lg:flex-nowrap items-center mb-[32px]'}>
                                            <div className="flex-1  sm:min-w-[361px]">
                                                <CoinSelectorDropdwon selectedWallet={this.state.selectedWallet!} changeCoin={this.changeCoin} wallets={this.state.wallets} />
                                            </div>
                                            {this.state.selectedWallet?.currency?.symbol && (this.state.selectedWallet?.currency?.chainInfo?.length! > 0) && <div className="mt-7 md:mt-0">
                                                <div className={'text-xs text-acacac'}>Select Network</div>
                                                <div className={'flex items-center'}>
                                                    {this.state.selectedWallet.currency.chainInfo?.map((chain: IChainInfo, i: number) =>
                                                        <div onClick={() => this.changeNetwork(chain)}
                                                            className={'cursor-pointer flex items-center mt-[5px] w-ful w-[140px] sm:w-[164px] p-[3px_12px] sm:p-[5px_24px] text-xs rounded-[12px] sm:rounded-[12px]bg-light bg-blend-normal shadow-normal ' + (chain.chainId === this.state.selectedChain?.chainId ? '' : 'opacity-[0.20426433]')}>
                                                            <Image className={'h-6 w-6 sm:h-8 sm:w-8'}
                                                                src={CurrencyManager.getInstance().getCurrency(chain?.depositAddressCurrency!).imgUrl!} alt={'Tron'} width={32} height={32} />
                                                            <div className={'py-[5px] px-[7px]'}><span>{CurrencyManager.getInstance().getCurrency(chain?.depositAddressCurrency!).name}</span> <span className={'block'}>({chain.chainName})</span></div>
                                                        </div>
                                                        // <NoteCardItem className={'pt-6'} key={i}>{1 + i}. {item}</NoteCardItem>
                                                    )}
                                                    {/* <div className={'flex items-center mt-[5px] mr-6 w-ful w-[140px] sm:w-[164px] p-[3px_12px] sm:p-[5px_24px] text-xs rounded-[12px] sm:rounded-[12px]bg-light bg-blend-normal shadow-normal '}>
                                                        <Image className={'h-6 w-6 sm:h-8 sm:w-8'} src={`/assets/images/coins/svg/ethereum.svg`} alt={'Ethereum'} width={32} height={32} />
                                                        <div className={'py-[5px] px-[7px]'}><span>Ethereum </span><span className={'block'}>(ERC-20)</span></div>
                                                    </div> */}

                                                </div>
                                            </div>}
                                        </div>
                                        {this.state.selectedWallet?.currency?.symbol && this.state.selectedChain?.chainId && <div className={'flex flex-wrap md:flex-nowrap items-center pt-0 md:pt-[50px]'}>
                                            <div className={'flex-1 sm:min-w-[320px]'}>
                                                <div>
                                                    <div><Input 
                                                    label={this.state.selectedWallet.currency.symbol + " Deposit Address ("+this.state.selectedChain.chainName+")"} 
                                                    value={this.state.depositAddress} 
                                                    type={"text"}
                                                    labelLeftClassName={'text-acacac text-xs'} 
                                                    onClickIconRight={this.copyAddress}
                                                    disabled='true'
                                                    iconRight={<Image className={'w-4 h-4 sm:w-6 sm:h-6'} 
                                                    src={`/assets/images/icons/copy-icon.svg`} 
                                                    alt={'copy'} 
                                                    width={24} height={24} />} 
                                                    fControlClassName={'text-sm md:text-base font-medium text-171a1e p-[13px_12px]'} 
                                                    fControlWrapClassName={'rounded-[12px] bg-light bg-blend-normal shadow-normal'} /></div>
                                                </div>
                                                <div className={'  py-[9px] px-[7px] mt-8'}>
                                                    {/* <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                        <div className="flex-1">Minimum Deposit Amount</div>
                                                        <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'} dangerouslySetInnerHTML={{ __html: this.markZero('0,01000000') + '&nbsp;' + this.state.selectedWallet?.currency?.symbol }}></div>
                                                     </div> */}
                                                    {/* <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                        <div className="flex-1">Tron (TRC-20) network confirmations for arrival</div>
                                                        <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'}>1</div>
                                                    </div> */}
                                                    <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                        <div className="flex-1">{this.state.selectedWallet.currency.symbol} ({this.state.selectedChain.chainName}) network confirmations for unlock</div>
                                                        <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'}>{12}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'flex justify-center my-5 sm:mt-0 sm:block min-w-[165px] w-full sm:w-auto sm:pl-6'}>
                                                <div><span className="block ml-[7px] mb-[10px] text-acacac text-xs">QR Code</span><Image className={'w-[130px] h-[130px] md:w-[145px] md:h-[145px] lg:h-[165px] lg:w-[165px]'} src={`https://chart.googleapis.com/chart?chs=175x175&cht=qr&chld=L|0&chl=TJNUxR2ZPNViPV2N3ocZB7AA3rqunjnBPi&choe=UTF-8`} alt={'QR Code'} width={165} height={165} /></div>
                                            </div>
                                        </div>}
                                        {!this.state.selectedChain?.chainId && this.state.selectedWallet?.currency?.symbol && <span className="text-171a1e font-bold text-xs sm:text-sm">Deposit is Disabled for this currency</span>}

                                    </div>
                                </div>
                            </div>
                            <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                {this.state?.selectedWallet?.currency?.symbol && <NoteCard>
                                    <NoteCardHeading>Please note before you deposit:</NoteCardHeading>
                                    {this.state.wdnotes2.map((item: any, i: number) =>
                                        <NoteCardItem key={i}>{1 + i}. {item}</NoteCardItem>
                                    )}
                                </NoteCard>}

                            </div>
                        </div>
                        <TransactionHistory key={JSON.stringify(this.state.history)} history={this.state.history} heading="Deposit History" href="deposit-history" />
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }

}
export function getInitialProps() {
    let test = 'testing'
    return {
        props: { test: 'testing' }
    }

}

// export async function getServerSideProps(context: any) {
//     const session = await getSession(context)
//     // 

//     if (!session) {
//         return {
//             redirect: {
//                 source: '/login',
//                 destination: '/login' + getReturnQuery(context.resolvedUrl),
//                 permanent: false,

//             },

//         }
//     }
//     return {
//         props: { session }
//     }
// }
export default withRouter(DepositCryptoPage)


