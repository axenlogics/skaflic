import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../components/form-card';
// import { Notification } from '../components/notification';
import Link from "next/link";
import { OtpInputField } from "../components/otp-input";


interface Props {
  
}

interface State {
  
}

class DeviceVerificationPage extends Component<Props, State> {
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
                            <FormCardTitle>New Device Verification</FormCardTitle>
                        </FormCardHeader>
                        <FormCardBody className="pt-4">
                            {/* <Notification className="mb-9" icon="/assets/images/icons/info.png" text="You are logging in from a new device. In order to log in from this device, you need to enter the verification code sent to your e-mail address in the field below." /> */}
                            <OtpInputField labelLeft="6 Digit Verification Code Received by E-mail Address" onOtpChange={(otp:string) => this.onOtpChange(otp)} />
                            <Button className="sm:mt-5 mt-3 font-bold w-full text-lg leading-6" type={ButtonType.primary}>Log In</Button>
                        </FormCardBody>
                    </FormCard>
                    <FormCardOuterWrap className="mt-5">
                        <FormCardOuterText className="mb-2">
                           <Link href="/" className="text-cddaf7 hover:text-white">Switch to another verification option </Link>
                        </FormCardOuterText>
                        <FormCardOuterText className="mb-2">
                            <Link href="/" className="text-cddaf7 hover:text-white">Reset Security Verification</Link>
                        </FormCardOuterText>
                        <FormCardOuterText>
                            <Link href="/" className="text-cddaf7 hover:text-white">Have not received the verification code?</Link>
                        </FormCardOuterText>    
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
        );
    }

}

export default DeviceVerificationPage



