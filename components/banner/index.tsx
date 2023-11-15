import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Image from 'next/image';


interface Props {
}


interface State {

}
class Banner extends Component<Props, State> {
    render(): React.ReactNode {
        return (
            <>
                <div className="bg-dark lg:h-[500px] h-auto flex items-center rounded-b-[60px] mb-[30px] px-[4px]">
                    <div className="container">
                        <div className="lg:flex items-center justify-between px-4 lg:pt-0 pt-6 pb-6">
                            <div className="text-center lg:text-left pb-6 lg:pb-0">
                                <h1 className="text-cccfd5 font-bold tracking-normal leading-normal lg:text-3xl sm:text-2xl text-xl lg:max-w-[500px] max-w-[400px] lg:m-0 mx-auto w-full">Buy,Trade and hold 350+ cyryptocurrencies on Skafilic</h1>
                                <p className="text-cccfd5 font-normal tracking-normal leading-normal sm:text-base text-sm pt-6">Trade Bitcoin for free</p>
                                <button className="bg-primary max-w-[280px] h-[42px] rounded-[4px] px-3 mt-6">
                                    <span className="text-white sm:text-sm text-xs font-bold">Signup with email or phone</span>
                                </button>
                            </div>
                            <div className="text-center"><Image className="lg:max-w-[600px] w-full lg:h-[400px] max-w-[400px] h-[250px]" src="/assets/images/icons/finalbanner.jpg" alt="upordown" width={600} height={600} /></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Banner;