import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Image from 'next/image';
import Link from "next/link";

interface Props {
}


interface State {

}
class HorzontolIcon extends Component<Props, State> {
    render(): React.ReactNode {
        return (
            <>
                <div className="container px-4 lg:pb-[100px] pb-[30px]">
                    <div className="pb-8">
                        <h2 className="text-center text-primary lg:text-2xl sm:text-xl text-lg">This Is Main Heading</h2>
                    </div>
                    <div className={cx('h-auto lg:p-[42px_122px_16px] p-[53px_15px_42px] rounded-[30px] md:flex md:justify-between')}>
                        <div className={cx('text-center')}>
                            <div className="pb-3">
                                <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>$ 38 Billion</h6>
                            <p className="pb-[10px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-171a1e m-0 w-[145px] mx-auto">Some Text</p>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-171a1e m-0 w-[145px] mx-auto')}>24h trading volume on Binance exchange</p>
                        </div>
                        <div className={cx('text-center')}>
                            <div className="pb-3">
                                <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>350 +</h6>
                            <p className="pb-[10px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-171a1e m-0 w-[145px] mx-auto">Some Text</p>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-171a1e m-0 w-full max-w-auto mx-auto')}>cyryptocurrencies Listing</p>
                        </div>
                        <div className={cx('text-center')}>
                            <div className="pb-3">
                                <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>120 Million</h6>
                            <p className="pb-[10px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-171a1e m-0 w-[145px] mx-auto">Some Text</p>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-171a1e m-0 w-[145px] mx-auto')}>Regeisted User</p>
                        </div>
                    </div>
                    <div className="text-center pt-[26px]">
                        <Link href="#">
                            <button className="max-w-[280px] w-full h-[56px] bg-primary rounded-[6px] text-white leading-normal tracking-normal text-base font-bold">Start Now</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }




}
export default HorzontolIcon;