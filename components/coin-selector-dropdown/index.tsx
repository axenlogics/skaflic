import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import { Button } from "../../components/button";
import cx from "classnames";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { IWallet } from '../../helpers/interfaces';

interface Props {
    wallets?: IWallet[],
    changeCoin?: (coin: IWallet) => void,
    selectedWallet:IWallet,
}
export function CoinSelectorDropdwon({ wallets, changeCoin, selectedWallet }: Props) {

    const coinlist = [
        { 'coin': 'Bitcoin', 'symbol': 'BTC', 'selected': false },
        { 'coin': 'Tether', 'symbol': 'USDT', 'selected': false },
        { 'coin': 'Cardano', 'symbol': 'ADA', 'selected': false },
        { 'coin': 'Dogecoin', 'symbol': 'DOGE', 'selected': false },
        { 'coin': 'Bitcoin', 'symbol': 'BTC', 'selected': false },
        { 'coin': 'Tether', 'symbol': 'USDT', 'selected': false },
        { 'coin': 'Cardano', 'symbol': 'ADA', 'selected': false },
        { 'coin': 'Dogecoin', 'symbol': 'DOGE', 'selected': false },
        { 'coin': 'Bitcoin', 'symbol': 'BTC', 'selected': false },
        { 'coin': 'Tether', 'symbol': 'USDT', 'selected': false },
        { 'coin': 'Cardano', 'symbol': 'ADA', 'selected': false },
        { 'coin': 'Dogecoin', 'symbol': 'DOGE', 'selected': false },
        { 'coin': 'Bitcoin', 'symbol': 'BTC', 'selected': false },
        { 'coin': 'Tether', 'symbol': 'USDT', 'selected': false },
        { 'coin': 'Cardano', 'symbol': 'ADA', 'selected': false },
        { 'coin': 'Dogecoin', 'symbol': 'DOGE', 'selected': false },
        { 'coin': 'Bitcoin', 'symbol': 'BTC', 'selected': false },
        { 'coin': 'Tether', 'symbol': 'USDT', 'selected': false },
        { 'coin': 'Cardano', 'symbol': 'ADA', 'selected': false },
        { 'coin': 'Dogecoin', 'symbol': 'DOGE', 'selected': false },
    ]
    const [state, setState] = useState({ 'open': false, 'selected': (selectedWallet?.currency?.symbol ? true : false) });
    const [coins, setCoins] = useState(coinlist);
    const [selectedCoin, setselectedCoin] = useState(selectedWallet ?? {});
    // const [selectedCoin, setselectedCoin] = useState({} as any)
    console.log('selected wallet now',selectedWallet,selectedCoin)


    const [searched, setSearched] = useState({ 'status': false, 'data': {} as any });
    function handleDropdwon(e: any) {
        // 
        setState(prevState => ({
            ...prevState,
            open: (prevState.open ? false : true)
        }));
    }
    function handleSelect(e: IWallet, index: any) {

        setselectedCoin(e);
        // console.log('selected coin', e, changeCoin);
        if (changeCoin) {
            changeCoin(e);
        }
        // coins.map((i:any,ind:any)=>{
        //     if(ind === index){
        //         i.selected=(i.selected?false:true);
        //     }
        //     else
        //     i.selected=false;

        // })
        // setselectedCoin(e)
        // setCoins(coins)
        setState(prevState => ({
            ...prevState,
            open: (prevState.open ? false : true),
            selected: true
        }));
        // return true;
    }
    function searchCoin(e: any) {
        let value = e.target.value
        if (!state.open) {
            setState(prevState => ({
                ...prevState,
                open: true
            }));
        }
        if (value.length > 0) {
            let s = coins.filter(t => (t.symbol.toLowerCase().indexOf(value.toLowerCase()) > -1) || (t.coin.toLowerCase().indexOf(value.toLowerCase()) > -1))
            setSearched(prevState => ({
                ...prevState,
                status: true,
                data: s
            }));
        }
        else {
            setSearched(prevState => ({
                ...prevState,
                status: false,
                data: {}
            }));
        }
    }
    useEffect(() => {
       setselectedCoin(selectedWallet);
    }, [selectedCoin])
    
    let wlt = selectedCoin?.currency?.symbol ? selectedCoin : selectedWallet;
    // console.log('wlt? now', wlt);
    return (
        <>
            <div className={'text-xs text-acacac'}>Select Coin1 {wlt?.currency?.symbol}</div>
            <div className={cx('max-w-full sm:max-w-[361px] relative')}>
                <div onClick={handleDropdwon} className={cx('fixed top-0 bottom-0 left-0 right-0 z-[2px] pointer-events-auto opacity-0', (state.open ? 'opacity-100 visible' : 'invisible'))}></div>
                <div className={cx('h-[50px] sm:h-[60px] relative rounded-[12px] bg-light bg-blend-normal shadow-normal flex leading-normal w-full items-center cursor-pointer top-[3px]')}>
                    <input type="text" onKeyUp={searchCoin} onKeyDown={searchCoin} onClick={handleDropdwon} className={cx('flex-1 border-0 h-[calc(100%-2px)] rounded-[12px] m-0 bg-transparent p-[0_0_0_20px] sm:p-[0_60px_0_20px] text-base md:text-lg sm:text-xl text-171a1e focus:outline-0', (wlt?.currency?.symbol ? 'hidden' : ''))} placeholder="Select coin..." />
                    <div className={cx('flex items-center w-full overflow-hidden text-ellipsis whitespace-nowrap max-w-full text-base text-left text-171a1e p-[0_19.5px]', (wlt?.currency?.symbol ? 'block' : 'hidden'))} onClick={handleDropdwon}>
                        <span className={'w-8 inline-block mr-[5px] text-center'}>
                            <Image className={'rounded-[10px] w-7 h-7 sm:w-8 sm:h-8'} alt="Lite Coin" src={wlt?.currency?.imgUrl!} width={32} height={32} />
                        </span>
                        <span className={'text-base sm:text-lg text-161a1e ml-[10px]'}>{wlt?.currency?.symbol}</span>
                        <span className={cx('text-sm sm:text-base text-a2a2a2 text-left ml-[10px]')} >| &nbsp;{wlt?.currency?.symbol}</span>

                    </div>
                    <div className={cx('flex items-center justify-center w-full h-full max-w-[64px] rounded-tr-[30px] rounded-br-[30px]')} onClick={handleDropdwon}>
                        <span ><Image alt="Arrow" width={10} height={6.25} className={cx(state.open ? 'rotate-180' : '')} src={`/assets/images/icons/arrow-down.svg`} /></span>
                    </div>
                </div>

                <ul className={cx('absolute top-[65px] left-[7px] w-[97.3%] z-[3] rounded-[0_0_10px_10px] m-0  max-h-[260px] border-solid border-dfdfe4 border-[1px] bg-fbfbfb rounded-tr-none rounded-tl-none list-none shadow-normal ', (state.open ? 'opacity-100 visible' : 'invisible opacity-0'))}>
                    <SimpleBar style={{ maxHeight: 260 }} className={styles.simplebarscroll}>
                        <div className={cx(styles.mCustomScrollBox)}>
                            <div className={'[&>li:nth-child(4n)]:bg-f6faff [&>li:nth-child(4n-1)]:bg-f6faff flex flex-wrap m-[5px_0px_5px_5px]'}>
                                {!searched.status && wallets?.map((i, index) =>

                                    <li key={index} className={'w-[49%] flex items-center p-[6.5px_7px] hover:bg-ecf4ff hover:cursor-pointer'} onClick={() => handleSelect(i, index)}>
                                        <span className={'w-8 inline-block mr-[5px] text-center'}>
                                            <Image className={'rounded-[10px]'} alt="" width={28} height={28} src={i.currency?.imgUrl!} />
                                        </span>
                                        <span className="curr-symbol ml-2"> {i.currency?.symbol} </span>
                                        <span className={cx('flex justify-center flex-1 opacity-0 ', (wlt?.currency?.id === i.currency?.id) ? 'opacity-100' : '')}>
                                            <Image alt="" width={15.81} height={12.83} src="/assets/images/icons/order-green-tick.svg" />
                                        </span>
                                    </li>
                                )}
                                {searched.status && wallets?.map((i: IWallet, index: any) =>

                                    <li key={index} className={'w-[49%] flex items-center p-[6.5px_7px] hover:bg-ecf4ff hover:cursor-pointer'} onClick={() => handleSelect(i, index)}>
                                        <span className={'w-8 inline-block mr-[5px] text-center'}>
                                            <Image className={'rounded-[10px]'} alt="" width={28} height={28} src={i.currency?.imgUrl!} />
                                        </span>
                                        <span className="curr-symbol ml-2"> {i.currency?.symbol} </span>
                                        <span className={cx('flex justify-center flex-1 opacity-0 mr-[7px]', (wlt?.currency?.id === i.currency?.id) ? styles.dchecked : '')}>
                                            <Image alt="" width={15.81} height={12.83} src="/assets/images/icons/order-green-tick.svg" />
                                        </span>
                                    </li>
                                )}
                            </div>
                        </div>
                    </SimpleBar>
                </ul>
            </div>
        </>
    );
}