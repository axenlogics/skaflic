import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Image from 'next/image';
import Link from "next/link";


interface Props {
}


interface State {

}
class ListIcons extends Component<Props, State> {
    render(): React.ReactNode {
        return (
            <>
                <section className="sm:pb-[100px] pb-[30px]">
                    <div className="container px-4">
                        <div className="lg:flex block">
                            <div className="flex items-center w-full h-auto mr-4 shadow-[1px_1px_10px_rgba(2,15,45,0.09)] rounded-[6px] sm:p-6 p-[24px_5px] lg:mb-0 mb-3">
                                <div className="flex-nowrap flex shrink-0">
                                    <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                    </div>
                                <div className="pl-4">
                                    <h6 className="font-base text-primary leading-normal tacking-normal">Sample 1</h6>
                                    <p className="text-xs text-171a1e pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    <div className="pt-2">
                                        <Link className="text-primary text-xs font-bold" href="#">Click here</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center w-full h-auto mr-4 shadow-[1px_1px_10px_rgba(2,15,45,0.09)] rounded-[6px] sm:p-6 p-[24px_5px] lg:mb-0 mb-3">
                                <div className="flex-nowrap flex shrink-0"><Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample1.svg" alt="upordown" width={100} height={100} /></div>
                                <div className="pl-4">
                                    <h6 className="font-base text-primary leading-normal tacking-normal">Sample 2</h6>
                                    <p className="text-xs text-171a1e pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    <div className="pt-2">
                                        <Link className="text-primary text-xs font-bold" href="#">Click here</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center w-full h-auto shadow-[1px_1px_10px_rgba(2,15,45,0.09)] rounded-[6px] sm:p-6 p-[24px_5px] lg:mb-0 mb-3">
                                <div className="flex-nowrap flex shrink-0"><Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample2.svg" alt="upordown" width={100} height={100} /></div>
                                <div className="pl-4">
                                    <h6 className="font-base text-primary leading-normal tacking-normal">Sample 3</h6>
                                    <p className="text-xs text-171a1e pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    <div className="pt-2">
                                        <Link className="text-primary text-xs font-bold" href="#">Click here</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }




}
export default ListIcons;