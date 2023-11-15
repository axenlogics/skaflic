import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../components/form-card';
import Link from "next/link";
import { OtpInputField } from "../components/otp-input";

interface Props {
  
}

interface State {
  
}

class OtpPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        
        this.state = {
            
        };
    }

    
    
    componentDidMount() {
    }

    onOtpChange = (otp:string) => {
        
    }

    render() {
        return (
            <FormScreen>
                <FormWrap>
                    <FormHeader />
                    <FormCard>
                        <FormCardHeader>
                            <FormCardTitle>One Time Password</FormCardTitle>
                        </FormCardHeader>
                        <FormCardBody className="pt-[30px]">
                            <OtpInputField labelLeft="+90 532 111 11 11" labelLeftClassName="text-acacac" labelRight="99sn" labelBottomRight={<span className="cursor-pointer" onClick={() => alert('Resend Code')}>Resend Code</span>} onOtpChange={(otp:string) => this.onOtpChange(otp)} />
                            <OtpInputField labelLeft="your.email@domain.com" labelLeftClassName="text-acacac" labelRight="99sn" labelBottomRight={<span className="cursor-pointer" onClick={() => alert('Resend Code')}>Resend Code</span>} onOtpChange={(otp:string) => this.onOtpChange(otp)} />
                            <Button className="font-bold w-full text-lg leading-6" type={ButtonType.primary}>Log In</Button>
                        </FormCardBody>
                    </FormCard>
                    <FormCardOuterWrap className="mt-5">
                        <FormCardOuterText className="mb-2">
                           <Link href="/" className="hover:text-white">Switch to another verification option </Link>
                        </FormCardOuterText>
                        <FormCardOuterText className="mb-2">
                            <Link href="/" className="hover:text-white">Reset Security Verification</Link>
                        </FormCardOuterText>
                        <FormCardOuterText>
                            <Link href="/" className="hover:text-white">Have not received the verification code?</Link>
                        </FormCardOuterText>    
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
        );
    }

}

export default OtpPage



