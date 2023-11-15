import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import email from "next-auth/providers/email";
import Link from "next/link";
import React, { Component } from "react";
import { Button, ButtonType } from "../button";
import { FormCard, FormCardBody, FormCardHeader, FormCardTitle } from "../form-card";
import Input from "../input";
import ButtonLoader from "../laoders/btnloader";
// import { Notification } from '../notification';
import { OtpInputField } from "../otp-input";
import Image from "next/image";




interface props {

}
interface state {

}
class Authentication extends Component<props, state> {
    onOtpChange = (otp: string) => {

    }

    render(): React.ReactNode {
        function cx(arg0: string) {
            throw new Error("Function not implemented.");
        }

        return (
            <>
                <FormCard>
                    <FormCardHeader>
                        <FormCardTitle>
                            2FA
                        </FormCardTitle>
                    </FormCardHeader>
                    <FormCardBody className="pt-4">
                        <div className="sm:flex justify-center pb-[25px] pt-[9px]">
                            <button className="sm:mb-0 mb-[25px] text-xs text-171a1e font-bold leading-normal tracking-normal hover:text-white mr-[15px] sm:max-w-[240px] max-w-full h-[56px] w-full border border-solid border-primary rounded-[6px] hover:bg-171a1e">
                                <span className="mr-[5px]">
                                    <Image src="assets/images/icons/google.svg" alt="Block Chain" width={12.8} height={20.9} />
                                </span>
                                Google Authentication
                            </button>
                            <button className="text-xs text-171a1e font-bold leading-normal tracking-normal hover:text-white sm:max-w-[240px] max-w-full h-[56px] w-full border border-solid border-primary rounded-[6px] hover:bg-171a1e">
                                <span className="mr-[10px]">
                                    <Image src="assets/images/icons/sms.svg" alt="Block Chain" width={12.8} height={20.9} />
                                </span>
                                SMS Authentication
                            </button>
                        </div>
                        {/* <Notification className="mb-9" icon="/assets/images/icons/info.png" text="You are logging in from a new device. In order to log in from this device, you need to enter the verification code sent to your e-mail address in the field below." /> */}
                        <OtpInputField labelLeft="Google Authenfication Code" onOtpChange={(otp: string) => this.onOtpChange(otp)} />
                        <Button className="sm:mt-5 mt-3 font-bold w-full text-lg leading-6" type={ButtonType.primary}>Log In</Button>
                    </FormCardBody>
                </FormCard>
            </>

        )
    }
}
export default Authentication;