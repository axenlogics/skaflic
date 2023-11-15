import React, { Component } from "react";
import Header, { NavbarSize } from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Footer from "./footer";
import { TransactionHistory } from "../components/transaction-history";


interface Props {
  
}

interface State {
}

class WithdrawHistory extends Component<Props, State> {
    public static auth = true;
    constructor(props: Props) {

        super(props);

    }
    
    
    
    componentDidMount() {
        
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
                            <TransactionHistory className='mt-10' heading="Withdraw History" href="deposit-history" buttonLabel="Deposit History"/>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }

}

export default WithdrawHistory


