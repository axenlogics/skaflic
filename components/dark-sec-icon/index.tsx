import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Image from 'next/image';
import Link from "next/link";

interface Props {
}


interface State {

}
class SecIconDark extends Component<Props, State> {
    render(): React.ReactNode {
        return (
            <>
                <section className={cx('sm:pb-[100px] pb-[30px] lg:px-[30px] px-[15px]')}>
                    <div className={cx('max-w-[1200px] mx-auto')}>
                        <div className={cx('h-auto lg:p-[42px_122px_16px] p-[53px_15px_42px] rounded-[30px] md:flex md:justify-between bg-dark')}>
                            <div className={cx('text-center')}>
                                <div className="pb-3">
                                    <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                </div>
                                <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>$ 38 Billion</h6>
                                <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>24h trading volume on Binance exchange</p>
                            </div>
                            <div className={cx('text-center')}>
                                <div className="pb-3">
                                    <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                </div>
                                <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>350 +</h6>
                                <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-white m-0 w-full max-w-auto mx-auto')}>cyryptocurrencies Listing</p>
                            </div>
                            <div className={cx('text-center')}>
                                <div className="pb-3">
                                    <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                </div>
                                <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>120 Million</h6>
                                <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>Regeisted User</p>
                            </div>
                            <div className={cx('text-center')}>
                                <div className="pb-3">
                                    <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                </div>
                                <h6 className={cx('text-[14px] lg:text-[18px] font-bold leading-normal tracking-normal text-primary pb-[8px]')}>0.10 %</h6>
                                <p className={cx('pb-[30px] text-[12px] lg:text-[12px] font-normal leading-normal tracking-normal text-white m-0 w-full max-w-auto mx-auto')}>Lowest Tracnsaction Fee</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }




}
export default SecIconDark;