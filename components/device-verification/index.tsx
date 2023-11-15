import React, { Component } from "react";
import Header from "../header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/dashboard.module.css'
import { Button, ButtonLink, ButtonType } from "../button";
import Image from 'next/image';
import Footer from "../../pages/footer";
import Link from "next/link";
import { FormCard, FormCardBody, FormCardHeader, FormCardTitle } from "../form-card";

interface Props {

}

interface State {
    txData: any,
    cryptoAsset: any,
    stableAsset: any,
    tab: any
}
class Deviceverification extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

    }

    render() {
        return (
            <>
                <FormCard>
                    <FormCardHeader>
                        <FormCardTitle>
                            New Device Authorization
                        </FormCardTitle>
                    </FormCardHeader>
                    <FormCardBody>
                        <div className="">
                            <p className="text-171a1e font-normal sm:text-base text-sm leading-normal tracking-normal text-center pb-[25px]">
                                Now that you have authorized your new device, please log onto the SKAFLIC Platform:
                            </p>
                            <div className="sm:pb-[33px] pb-[20px]">
                                <ul>
                                    <li className="sm:p-[16px] p-[12px] bg-41b2c00f border-b border-solid border-dfdfe4">
                                        <span className="sm:text-base text-sm text-171a1e font-bold leading-normal tracking-normal">Device:</span>
                                        <span className="sm:text-base text-sm text-171a1e font-normal leading-normal tracking-normal ml-[10px]">Some device name</span>
                                    </li>
                                    <li className="sm:p-[16px] p-[12px] bg-white">
                                        <span className="sm:text-base text-sm text-171a1e font-bold leading-normal tracking-normal">Location:</span>
                                        <span className="sm:text-base text-sm text-171a1e font-normal leading-normal tracking-normal ml-[10px]">0.031489</span>
                                    </li>
                                    <li className="sm:p-[16px] p-[12px] bg-41b2c00f border-b border-solid border-dfdfe4">
                                        <span className="sm:text-base text-sm text-171a1e font-bold leading-normal tracking-normal">IP Address:</span>
                                        <span className="sm:text-base text-sm text-171a1e font-normal leading-normal tracking-normal ml-[10px]">195.589.25</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-41b2c00f h-auto border-t border-solid border-dfdfe4 p-[15px_18.6px_15px_21.6px;]">
                                <div>
                                    <ul>
                                        <li className="pt-[5px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal">In case you want to limit or erase new access point, please login to the <Link href={"#"} className="text-primary font-bold cursor-pointer">Account page</Link> and delete it at any time.</li>
                                        <li className="pt-[15px] pb-[15px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal">If you have any questions or if something doesn't look right - <Link href={"#"} className="text-primary font-bold cursor-pointer">please Contact Us Now</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sm:pt-[33px] pt-[20px] sm:pb-[33px] pb-[20px] text-primary text-base text-center font-bold leading-normal tracking-normal">
                                <Link href={"#"} className="cursor-pointer">Log In</Link>
                            </div>
                        </div>
                    </FormCardBody>
                </FormCard>
            </>

        );
    }

}
export default Deviceverification;
