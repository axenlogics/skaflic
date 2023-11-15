import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import Image from 'next/image';
import Link from "next/link";

interface Props {
}


interface State {

}
class RightImage extends Component<Props, State> {
    render(): React.ReactNode {
        return (
            <>
                <div className="container px-4 lg:pb-[100px] pb-[30px]">
                    <div>
                        <div className="pb-8">
                            <h2 className="text-center text-primary lg:text-2xl sm:text-xl text-lg">This Is Main Heading</h2>
                            <p className="text-171a1e pt-4 max-w-[600px] text-center mx-auto lg:text-base text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                        </div>
                        <div className="sm:flex block items-center">
                            <div className="max-w-[688px] w-full">
                                <div className="flex flex-nowrap shrink-0 items-center pb-5">
                                    <div className="flex flex-nowrap shrink-0">
                                        <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                    </div>
                                    <div className="pl-4">
                                        <h6 className="font-base text-primary leading-normal tacking-normal">Sample 1</h6>
                                        <p className="text-xs text-171a1e pt-3 max-w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    </div>
                                </div>
                                <div className="flex flex-nowrap shrink-0 items-center pb-5">
                                    <div className="flex flex-nowrap shrink-0">
                                        <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                    </div>
                                    <div className="pl-4">
                                        <h6 className="font-base text-primary leading-normal tacking-normal">Sample 1</h6>
                                        <p className="text-xs text-171a1e pt-3 max-w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    </div>
                                </div>
                                <div className="flex flex-nowrap shrink-0 items-center pb-5">
                                    <div className="flex flex-nowrap shrink-0">
                                        <Image className="w-full max-w-[100px] h-[100px]" src="/assets/images/icons/sample.svg" alt="upordown" width={48} height={48} />
                                    </div>
                                    <div className="pl-4">
                                        <h6 className="font-base text-primary leading-normal tacking-normal">Sample 1</h6>
                                        <p className="text-xs text-171a1e pt-3 max-w-[450px]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-[688px] w-full sm:block hidden">
                                <div className="text-right">
                                    <Image className="w-full max-w-[500px] h-[500px]" src="/assets/images/icons/sample.svg" alt="upordown" width={200} height={200} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }




}
export default RightImage;