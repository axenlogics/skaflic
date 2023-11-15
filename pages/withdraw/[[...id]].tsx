import React, { Component } from "react";
import Header, { NavbarSize } from "../../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/withdraw.module.css'
import { Button, ButtonType } from "../../components/button";
import Image from 'next/image';
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import { TransactionHistory } from "../../components/transaction-history";
import { CoinSelectorDropdwon } from "../../components/coin-selector-dropdown";
import Footer from ".././footer";
import { getSession } from "next-auth/react";
// import { getReturnQuery } from "../helpers/common";
import { MessageCard } from "../../components/message-card";
import { NoteCard, NoteCardHeading, NoteCardItem } from "../../components/note-card";
import { IChainInfo, IWallet } from "../../helpers/interfaces";
import { CurrencyManager } from "../../models/market";
import { WalletService } from "../../helpers/user/walletservice";
import { App } from "../../models/app";
import { Router, withRouter } from "next/router";
import { sleep } from "../../helpers/common";
import { User } from "../../models/user";
import { CNotificationType, CustomNotification } from "../../helpers/notification";

interface Props {
    router: Router,
}

interface State {
    wdnotes: any,
    wdnotes2: any,
    wallets: IWallet[],
    selectedWallet?: IWallet,
    history?: any[];
    withdrawAmount: number | null,
    withrawAddress: string,
    youWillReceive?: number;
    selectedChain?: IChainInfo;
}


class WithdrawCryptoPage extends Component<Props, State> {
    public static requireAuth = false;
    constructor(props: Props) {

        super(props);
        const wdnotes = [
            `You can only withdraw to bank accounts registered in your name.`,
            `You can withdraw Turkish Lira to Ziraat Bank, Akbank, VakıfBank and Fibabanka 24/7.`,
            `You can withdraw to any bank during bank working hours. EFT transactions made between 9.00 - 16.45 on weekdays are completed on the same day, and withdrawals made on weekends and holidays are completed on the first business day following.`,
            `FAST transaction is supported up to 5.000 Turkish Liras. You can also withdraw to any bank 24/7 if the amount is equal or less than 5000 Turkish Liras.`
        ]
        const wdnotes2 = [
            `Minimum withdawal amount for USDT on Tron (TRC-20) network is 20,00 USDT.`,
            `Do not participate in an initial Coin Offering (ICO) or token sale directly from your Skaflic account.`,
            `If you’ve mistakenly withdrawn any assets to a wrong address, we are unable to locate the proper receiver of your funds and provide you any further assistance due to the anonymized nature of blockchain networks.`,
            `If you have sent your coins to an incorrect address by mistake, and you know that this address belongs to another platform, you are suggested to contact the customer support of that particular platform.`
        ]
        this.state = {
            wdnotes: wdnotes,
            wdnotes2: wdnotes2,
            wallets: [],
            selectedWallet: {},
            history: [],
            withdrawAmount: null,
            withrawAddress: '',
            youWillReceive: 0,
        };
    }

    fetchWallets = async () => {
        await CurrencyManager.getInstance().init();
        await App.getInstance().init();
        await User.getInstance().init();
        let wlt = await WalletService.getInstance().fetchWallets();
        this.setState({ wallets: Object.values(wlt) }, () => {
            this.checkQueryParam();
        });
        let hist = await WalletService.getInstance().getTransactionHisotry({ Type: 2, CurrencyId: 1 });
        this.setState({ history: hist });
        // console.log(wlt, hist);
        // 
    }

    componentDidMount() {
        this.fetchWallets()
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
        return vv + '<span>' + zero.join('') + '</span>';
    }
    changeAmount = (amount: number) => {
        console.log('amount changes', amount);
        let youRecive = (Number(amount) - Number(this.state.selectedChain?.withdrawFee!)).toFixedFloor(5);
        this.setState({ withdrawAmount: amount, youWillReceive: youRecive });
    }
    chagneAddress = (address: string) => {
        this.setState({ withrawAddress: address });
        console.log('address changes', address)
    }

    pasteAddress = () => {
        window.navigator.clipboard.readText().then((copiedText) => {

            this.setState({ withrawAddress: copiedText });
            // console.log(copiedText); // copied text will be shown here.
        }).catch(() => {

        });
    }
    withdrawNow = async  () => {
        let modal = {
            Address: this.state.withrawAddress, // 1DgGS8acMuMxTCYVtMi5rKVjPLUim6jm9g
            Memo: '',
            Amount: this.state.withdrawAmount,
            CurrencyId: this.state.selectedWallet?.currency?.id,
            Label: '0000',
            Code: 0,
            AuthType: 4,
            ChainId: this.state.selectedChain?.chainId,
            ReqType: 'web'
        }
        let res = await WalletService.getInstance().WithrawFunds(modal);
        if(res !== false){
            CustomNotification.show(res, CNotificationType.Success);
        }

    }
    changeCoin = async (wlt: IWallet) => {

        if (!wlt.currency?.id) {
            return;
        }
        const wdnotes2 = [
            `Minimum withdawal amount for ${wlt?.currency?.symbol} on Tron (TRC-20) network is 20,00 ${wlt?.currency?.symbol}.`,
            `Do not participate in an initial Coin Offering (ICO) or token sale directly from your Skaflic account.`,
            `If you’ve mistakenly withdrawn any assets to a wrong address, we are unable to locate the proper receiver of your funds and provide you any further assistance due to the anonymized nature of blockchain networks.`,
            `If you have sent your coins to an incorrect address by mistake, and you know that this address belongs to another platform, you are suggested to contact the customer support of that particular platform.`
        ]
        this.props.router.query.id = (wlt.currency?.id!).toString();
        this.props.router.push(this.props.router);
        const activeChain = wlt.currency?.chainInfo?.find(ch => ch.canWithdraw === true);
        if (activeChain) {
            this.changeNetwork(activeChain);
        } else {
            this.changeNetwork({});
        }
        // this.props.router.push({
        //     pathname: '/withdraw/' + wlt.currency?.id,
        // }, undefined, { shallow: true });
        this.setState({ selectedWallet: wlt, wdnotes2: wdnotes2 });
        let hist = await WalletService.getInstance().getTransactionHisotry({ Type: 2, CurrencyId: wlt.currency?.id })
        this.setState({ history: hist });
        console.log('coin now in deposit', wlt);
    }
    changeNetwork(chain: IChainInfo) {
        this.setState({ selectedChain: chain });
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
                    <div >

                        <div className={'block lg:flex lg:items-end'}>
                            <div className={'flex items-center'}>
                                <div className={cx('pr-[30px]')}><span className="initial items-start sm:items-center text-[26px] sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">Withdraw</span></div>
                            </div>

                        </div>

                        <div className={'flex-wrap lg:flex-nowrap flex p-[25px_0_40px] sm:p-[30px_0_40px] md:p-[45px_0_40px]'}>
                            <div className={'lg:max-w-[812px] w-full lg:mr-[60px]'}>
                                <MessageCard text="Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales." />
                                <div className={'rounded-[15px] sm:rounded-[12px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                    <div className={'block sm:flex items-center pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                        <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Crypto Withdrawal</div>
                                        {/* <div className={'flex flex-wrap items-center'}>
                                            <div className={'text-acacac text-xs font-medium mr-[7px]'}>Remaining Daily Withdrawal Limit:</div>
                                            <div className={'text-171a1e text-[13px] lg:text-sm font-bold'}>50,00000000 BTC</div>
                                        </div> */}
                                    </div>
                                    <div className={'pt-5 sm:pt-[25px]'}>
                                        <div className={'block md:flex flex-wrap lg:flex-nowrap items-center mb-[32px]'}>
                                            <div className="flex-1  sm:min-w-[361px]">
                                                <CoinSelectorDropdwon selectedWallet={this.state.selectedWallet!} changeCoin={this.changeCoin} wallets={this.state.wallets} />
                                                {/* <CoinSelectorDropdwon/> */}
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
                                        {/* <div className={'text-xs text-acacac'}>Saved USDT withdrawal addresses</div> */}
                                        {/* <div className={'flex flex-wrap items-center'}>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[12px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Patos Si USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[12px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Binance USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[12px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Binance USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className={'py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[12px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-sm sm:text-base text-171a1e font-medium'}>
                                                    <Image className="mr-[7px]" src={`/assets/images/svg/banks/addbank.svg`} alt={'Add Address'}  width={24} height={24}/>Add Address</div>
                                            </div> */}
                                        {this.state.selectedWallet?.currency?.symbol && this.state.selectedChain?.chainId && <div className={'pt-[35px]'}>

                                            <div className={'pt-[15px]'}>
                                                <div><Input
                                                    value={this.state.withrawAddress}
                                                    onChange={(ev: any) => this.chagneAddress(ev.target.value)}
                                                    //  step={0.00000001}
                                                    //  type="number"
                                                    label="Recipient’s address"
                                                    onClickIconRight={() => this.pasteAddress()}
                                                    iconRight="Paste" /></div>
                                            </div>
                                            <div className={'pt-[15px]'}>
                                                <div>
                                                    <Input
                                                        label={"Net amount to send" + " (Minimum withdrawable Amount: "+ this.state.selectedChain.minWithdraw+ this.state.selectedWallet.currency?.symbol + ")"}
                                                        value={this.state.withdrawAmount}
                                                        onChange={(ev: any) => this.changeAmount(ev.target.value)}
                                                        step={0.00001}
                                                        type="number"
                                                        onClickIconRight={() => this.changeAmount(this.state.selectedWallet?.available!)}

                                                        labelRight={<>Available Balance:&nbsp;
                                                            <span className="text-171a1e font-bold text-xs sm:text-sm">
                                                                {this.state.selectedWallet.available}&nbsp; {this.state.selectedWallet?.currency?.symbol}
                                                            </span></>} labelRightClassName={'text-xs'} labelBottom="true" labelBottomLeft={<>Transaction Fee:&nbsp;
                                                                <span className='text-171a1e font-bold text-xs sm:text-sm'>{this.state.selectedChain.withdrawFee} {this.state.selectedWallet?.currency?.symbol}</span></>} labelBLeftClassName={'text-acacac text-xs font-medium'}
                                                        labelBRightClassName={'text-acacac text-xs font-medium'} labelBottomRight={<>You will recive:&nbsp;
                                                            <span className='text-171a1e font-bold text-xs sm:text-sm'>{(this.state.youWillReceive! < 0) ? 0 : this.state.youWillReceive} {this.state.selectedWallet?.currency?.symbol}</span></>}
                                                        iconRight="Max" /></div>
                                            </div>
                                            <div onClick={this.withdrawNow} className={'pt-[15px]'}>
                                                <Button type={ButtonType.primary} className={'w-full text-white bg-danger mt-5'}>Confirm</Button>
                                            </div>
                                        </div>}
                                        {!this.state.selectedChain?.chainId && this.state.selectedWallet?.currency?.symbol && <span className="text-171a1e font-bold text-xs sm:text-sm">Withdraw is Disabled for this currency</span>}
                                    </div>
                                </div>
                            </div>
                            {this.state.selectedWallet?.currency?.symbol && <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                <NoteCard>
                                    <NoteCardHeading>Please note before you withdraw:</NoteCardHeading>
                                    {this.state.wdnotes2.map((item: any, i: number) =>
                                        <NoteCardItem className={'pt-6'} key={i}>{1 + i}. {item}</NoteCardItem>
                                    )}
                                </NoteCard>
                            </div>}
                        </div>
                        <TransactionHistory key={JSON.stringify(this.state.history)} history={this.state.history} heading="Withdrawal History" href="withdraw-history" />


                    </div>

                </div>
                <Footer />

            </React.Fragment>
        );
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

export default withRouter(WithdrawCryptoPage)

