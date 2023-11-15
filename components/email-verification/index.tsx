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
class EmailVerification extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

    }

    render() {
        return (
            <>
                <FormCard>
                    <FormCardHeader>
                        <FormCardTitle>
                            Email Verification
                        </FormCardTitle>
                    </FormCardHeader>
                    <FormCardBody>
                        <div>
                            <p className="text-171a1e font-normal sm:text-base text-sm leading-normal tracking-normal text-center pb-[25px]">
                                We've sent a confirmation email with further instructions to your registered email address:<br /><span className="font-bold leading-normal text-primary">mailname@mail.com</span>
                            </p>
                            <div className="bg-41b2c00f h-auto border-t border-solid border-dfdfe4 p-[28px_18.6px_26.7px_21.6px;]">
                                <p className="text-171a1e opacity-70 sm:text-sm text-xs leading-normal tracking-normal font-bold">
                                    If you haven't received the email, please try the following:
                                </p>
                                <div className="pl-4">
                                    <ul>
                                        <li className="pt-[15px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal">Make sure your email address is correct</li>
                                        <li className="pt-[5px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal">Check your Spam or Trash mail folder.</li>
                                        <Link href={"#"} className="cursor-pointer">
                                            <li className="pt-[5px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal"><span className="text-primary">Resend Email</span></li>
                                        </Link>
                                        <li className="pt-[5px] list-disc sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal">If you still havn't received any email please contact decoin support at <Link href={"#"} className="cursor-pointer"><span className="text-primary">support@SKAFLIC.io</span></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </FormCardBody>
                </FormCard>
            </>

        );
    }

}
export default EmailVerification;
