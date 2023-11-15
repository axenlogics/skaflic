import React, { Component, Fragment } from "react";
import Image from 'next/image';
import cx from "classnames";
import { PairsManager } from "../../../models/market";
import { IPair, IUserSettings } from "../../../helpers/interfaces";
// import { connect } from "react-redux";
import { store } from "../../../redux/Store";
import { connect } from "react-redux";
import { commaFormat, GetRouter, perFormat } from "../../../helpers/common";
import { useRouter, withRouter } from "next/router";
// import Router from "next/dist/server/router";
import { Router } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import { User } from "../../../helpers/user";
import { Menu, Transition } from '@headlessui/react'
import { User } from "../../../models/user";
import { Socket } from "../../../services/socket";
// import connect from "react-redux/es/components/connect";

interface Props {
    mainPairId: number,
    router: Router;
    pairSelectorV2?: boolean,
    pairs: { [id: number]: IPair };
    changePair: any,
}

interface State {
    pairInputSearch: boolean,
    pairTab: any,
    pairTabActive: string,
    searchVal?: string,
    userSettings?: IUserSettings,
    pairMenuStatus: boolean

}

class PairMenu extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            pairInputSearch: false,
            pairTab: ["All", "TRY", "USDT"],
            pairTabActive: "All",
            searchVal: '',
            // userSettings: User.getInstance().initUserSettings(),
            pairMenuStatus: false
        };
    }

    handlePairInput = () => {
        this.setState({ pairInputSearch: !this.state.pairInputSearch })
    }

    handlePairTab = (str: string) => {
        this.setState({ pairTabActive: str })
    }
    changePair(pair: IPair) {
        store.dispatch({ type: 'CHANGE_PAIR', payload: pair.id });
        this.props.router.query.pair = pair?.name?.replace('/', '_');
        this.props.router.push(this.props.router)
        this.props.changePair(pair);

        this.togglePairMenu()
        // 
        // PairsManager.getInstance().changeMainPair(pair);
        // const router = useRouter();
        // router.query.NEWPARAMS = "VALUE"
        // router.push(router)
    }
    filterPair = () => {
        const pairs1 = PairsManager.getInstance().getPairs();
    }

    togglePairMenu = () => {
        this.setState((prevState) => ({
            pairMenuStatus: !prevState.pairMenuStatus
        }))
    }

    componentDidMount() {
        const pairs1 = PairsManager.getInstance().getPairs();
        const pairs = pairs1;

        // [{ fav: true, name: 'BTC/TRY', rate: '428.166', trendup: false, change: '1.25', volume: '22,34M' },
        //     { fav: true, name: 'ETC/TRY', rate: '428.166', trendup: true, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'USDT/TRY', rate: '428.166', trendup: false, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'USDC/TRY', rate: '428.166', trendup: true, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'BNB/TRY', rate: '428.166', trendup: false, change: '1.25', volume: '22,34M' },
        //     { fav: true, name: 'XMR/TRY', rate: '428.166', trendup: false, change: '1.25', volume: '22,34M' },
        //     { fav: true, name: 'XRP/TRY', rate: '428.166', trendup: true, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'ADA/TRY', rate: '428.166', trendup: false, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'SOL/TRY', rate: '428.166', trendup: true, change: '1.25', volume: '22,34M' },
        //     { fav: false, name: 'DOGE/TRY', rate: '428.166', trendup: true, change: '1.25', volume: '22,34M' },
        // ]
        // store.dispatch('PAIRS.SET', pairs1);
        // this.props.dispatch({ type: 'PAIRS.SET', payload: pairs1 });
        // PairsManager.getInstance().applyChangepair();
        // const settings = User.getInstance().getUserSettings()
        // this.setState({ userSettings: settings });

        // this.props.router
    }
    setSorting = (type: boolean) => {
        if (type === undefined) {
            return true;
        } else if (type === false) {
            return true;
        } else if (type === true) {
            return false;
        }
    }
    applySorting = (key: string) => {
        const settings: any = { ...this.state.userSettings };
        
        settings.pairMenu.sorting[key] = this.setSorting(settings.pairMenu.sorting[key]) 
        this.setState({
            ...this.state,
            userSettings: settings,
        },()=>{
            // store.dispatch({ type: 'CHANGE_PAIR', payload: pair.id });

        })
    }
    pairDropdown = () => {

        let filterdPairs = Object.values(this.props.pairs).filter(p => p.Status);
        if (this.state.pairTabActive === 'TRY') {
            filterdPairs = filterdPairs.filter(p => p.marketCurrency?.symbol?.indexOf('TRY')! > -1);
        } else if (this.state.pairTabActive === 'USDT') {
            filterdPairs = filterdPairs.filter(p => p.marketCurrency?.symbol?.indexOf('USDT')! > -1);
        }
        if (this.state.searchVal?.length! > 0) {
            filterdPairs = filterdPairs.filter(p => p.name?.toLowerCase()?.indexOf(this.state.searchVal?.toLowerCase()!)! > -1);
        }
        if(this.state.userSettings?.pairMenu.sorting?.name){
            filterdPairs = filterdPairs.filter(p => p.name?.toLowerCase()?.indexOf(this.state.searchVal?.toLowerCase()!)! > -1);
        }
        if (this.state.userSettings?.pairMenu.sorting?.change24h) {
            filterdPairs = filterdPairs.sort((a,b) => a.change24hour?.value! - a.change24hour?.value!);
        }


        return (
        <Transition
            as={Fragment}
            show={this.state.pairMenuStatus}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute top-full sm:left-0 -left-2.5 z-50 sm:min-w-[550px] ms-sm:w-[calc(100vw-2rem)] pt-2.5 sm:px-7 px-3 pb-4 bg-232842 rounded-xl">
                <div className="relative flex items-center border-b border-solid border-[#353765] py-[7px]">
                    <div className="flex flex-1 items-center">
                        <button type="button" className="w-[18px] h-[18px] relative p-0">
                            <Image src="/assets/images/icons/star.png" alt="Skaflic Logo" fill />
                        </button>
                        {this.state.pairTab.map((item: any, index: number) => (
                            <button key={JSON.stringify(item)} className={cx("py-[7px] px-2.5 bg-none border-0 text-sm font-sans font-medium text-mute", {"!text-white" : (this.state.pairTabActive === item) })} onClick={() => this.handlePairTab(item)} type="button">{item}</button>
                        ))}
                    </div>
                    <div>
                        <button type="button" onClick={this.handlePairInput} className="w-[18px] h-[18px] relative bg-none border-0 z-50">
                            <Image src="/assets/images/icons/search.png" alt="Skaflic Logo" width={18} height={18} />
                        </button>
                        {this.state.pairInputSearch &&
                            <input
                                value={this.state.searchVal}
                                onChange={(ev: any) => this.setState({ searchVal: ev.target.value })}
                                // step={this.state.minP}
                                // min={this.state.minP}
                                className="absolute left-0 right-0 top-0 bottom-0 bg-232842 border-0 px-[15px] text-mute focus:outline-none"
                                type="text"
                                placeholder="Search Ticker" />}
                    </div>
                </div>
                <div className="pt-3">
                    <div className="flex items-center py-2">
                        <div onClick={() => this.applySorting('faverite')} className={cx("text-mute text-xs w-[18px] sm:mr-6 mr-1.5")}></div>
                        <div onClick={() => this.applySorting('name')} className={cx("flex-1 text-mute text-xs min-w-[105px] px-1")}>Name</div>
                        <div onClick={() => this.applySorting('price')} className={cx("flex-1 text-mute text-xs text-right px-1")}>Price (TRY)</div>
                        <div onClick={() => this.applySorting('change24h')} className={cx("flex-1 text-mute text-xs text-right px-1")}>1D Change (%)</div>
                        <div onClick={() => this.applySorting('volume24h')} className={cx("flex-1 text-mute text-xs text-right pl-1")}>1D Volume (TRY)</div>
                    </div>
                    {filterdPairs.map((item: IPair, index: number) => (item.Status &&
                        (<div key={String(item?.id)} onClick={() => this.changePair(item)} className="flex items-center sm:text-sm text-xs cursor-pointer text-right py-2 text-white hover:bg-[#0f1c3b]">
                            <div className={cx("w-[18px] h-[18px] relative sm:mr-6 mr-1.5")}>
                                {!item.isFav && <Image src="/assets/images/icons/star.png" alt="Skaflic Logo" fill />}
                                {item.isFav && <Image src="/assets/images/icons/star-fill.png" alt="Skaflic Logo" fill />}
                            </div>
                            <div className={cx("flex items-center min-w-[105px] flex-1 px-1")}>
                                <div className="w-6 h-6 mr-2 relative">
                                    <Image src={item.baseCurrency?.imgUrl!} alt="Skaflic Logo" fill />
                                </div>
                                <div className="font-medium">
                                    {item.name}
                                </div>
                            </div>
                            <div className={cx("flex-1 px-1 font-ibmplex", item.trendUp ? 'text-success' : 'text-danger')}>{commaFormat(item.rate!)}</div>
                            <div className={cx("flex-1 px-1 font-ibmplex", item.change24hour?.isPositive ? 'text-success' : 'text-danger')}>{perFormat(item.change24hour!)}%</div>
                            <div className={cx("flex-1 pl-1 font-ibmplex")}>{item.volume}</div>
                        </div>)
                    ))}
                </div>
            </Menu.Items>
        </Transition>
        )
    }


    render() {
        // 
        // this.props.mainPairId
        const mainPair: IPair = this.props.pairs[this.props.mainPairId];

        
        return (
            <React.Fragment>
                <div className="relative">
                    <div className="flex">
                        <Menu>
                            {this.state.pairMenuStatus && <div className="fixed left-0 top-0 right-0 bottom-0 bg-transparent z-30" onClick={this.togglePairMenu}></div>}
                            <Menu.Button onClick={this.togglePairMenu} as="div" className="flex items-center relative cursor-pointer z-40">
                                <div className="w-7 h-7 relative mr-2">
                                    <Image src={mainPair?.baseCurrency?.imgUrl! ?? '/assets/images/newcoins/blank.svg'} alt="Skaflic Logo" fill />
                                </div>
                                <div className="md:text-lg text-base text-white font-medium">{mainPair?.name ?? '--/--'}</div>
                                <div className="ml-1">
                                    <FontAwesomeIcon icon={faAngleDown} className='text-15 text-mute' />
                                </div>
                            </Menu.Button>
                            
                            {this.pairDropdown()}
                        </Menu>
                        <div className="ml-4">
                            <div className="md:text-lg text-base text-white font-bold">{commaFormat(mainPair?.rate!) ?? '---'}</div>
                            <div className="text-xs font-medium">
                                <span className="mr-2 text-success">{mainPair?.rateUsd ?? '--' } USD</span>
                                <span className={cx(mainPair?.change24hour?.isPositive ? 'text-success' : 'text-danger')}>{perFormat(mainPair?.change24hour!) ?? '--'}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
// const mapStateToProps = (state: any): any => {
//     return {
//         // pairs: state.pairReducer.pairs,
//         // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
//     }
// }

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         // filterassets: (searchVal: any) => dispatch(filterwallet(searchVal)),
//         // fetchWallet: (wallets: any) => dispatch(fetchWallet(wallets))
//     }
// }
export default (withRouter(PairMenu))
// export default PairMenu