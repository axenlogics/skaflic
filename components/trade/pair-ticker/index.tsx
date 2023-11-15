import React, { Component } from "react";
import styles from './style.module.css';
import Image from 'next/image';
import cx from "classnames";
import { connect } from "react-redux";
import { PairsManager } from "../../../models/market";
import { IPair} from "../../../helpers/interfaces";

interface Props {
    mainPair: IPair;
}

interface State {
  
}

class PairTicker extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        
        this.state = {
            
        };
    }

    
    
    componentDidMount() {
    }

    render() {
        const mainPair = this.props.mainPair;
        return (
            <React.Fragment>
                <div className='md:flex hidden items-center flex-1 lg:ml-10 ml-5'>
                    <div className="mx-3">
                        <div className='text-mute text-xs'>24h Low</div>
                        <div className='text-white text-xs mt-1.5 font-ibmplex'>{mainPair?.rate ?? '--'} </div>
                    </div>
                    <div className="mx-3">
                        <div className='text-mute text-xs'>24h High</div>
                        <div className='text-white text-xs mt-1.5 font-ibmplex'>{mainPair?.rate ?? '--'} </div>
                    </div>
                    <div className="mx-3">
                        <div className='text-mute text-xs'>24h Volume ({mainPair?.baseCurrency?.symbol ?? '--'})</div>
                        <div className='text-white text-xs mt-1.5 font-ibmplex'>{mainPair?.volumeMarketCurrency ?? '--'} </div>
                    </div>
                    <div className="mx-3">
                        <div className='text-mute text-xs'>24h Volume ({mainPair?.marketCurrency?.symbol ?? '--'})</div>
                        <div className='text-white text-xs mt-1.5'>{mainPair?.volume ?? '--'} </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
    
// export default PairTicker
const mapStateToProps = (state: any) => {
    return {
        mainPairId: state.pairReducer.selectedPair,
        // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // filterassets: (searchVal: any) => dispatch(filterwallet(searchVal)),
        // fetchWallet: (wallets: any) => dispatch(fetchWallet(wallets))
    }
}
export default (PairTicker)

// export default connect(mapStateToProps, mapDispatchToProps)(PairTicker)