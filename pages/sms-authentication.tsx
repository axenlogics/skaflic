import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Component } from "react";
import OtpInput from "react18-input-otp";
import { Button, ButtonType } from "../components/button";
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from "../components/form-card";
import Header from "../components/header";
import Input from "../components/input";
import InputPhone from "../components/input-phone";
import ButtonLoader from "../components/laoders/btnloader";
import { OtpInputField } from "../components/otp-input";
import Footer from "./footer";


interface Props {
  
}

interface State {
}

class SMSAuthenticationPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
       
    this.state = {
        };
    }
    
    componentDidMount() {
        
    }
    onOtpChange = (otp:any)=>{

    }
    render() {
        return (
            <React.Fragment>
                <Header logoText={true} />
                <FormScreen className={'my-10'}>
                    <FormWrap>
                        <FormCard>
                            <FormCardHeader>
                                <FormCardTitle>
                                    SMS Authentication
                                </FormCardTitle>
                            </FormCardHeader>
                            <FormCardBody>
                                <InputPhone isDropdownDisable={false} label={'Phone Number'}/>
                                <Button type={ButtonType.outline_primary} className={'w-full mb-6'}>Get Code</Button>
                                <OtpInputField  labelLeft="6 Digit Verification Code Received by SMS" onOtpChange={(otp:string) => this.onOtpChange(otp)} />
                                {<Button 
                                    className='w-full font-medium text-lg leading-6 mt-1'
                                    type={ButtonType.primary}>{'Submit'}</Button>}


                            </FormCardBody>
                        </FormCard>
                    </FormWrap>
                </FormScreen>
            <Footer/> 
        </React.Fragment>
        );
    }

}


export default SMSAuthenticationPage


