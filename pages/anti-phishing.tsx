import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Component } from "react";
import OtpInput from "react18-input-otp";
import { Button, ButtonType } from "../components/button";
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardText, FormCardTitle, FormHeader, FormScreen, FormWrap } from "../components/form-card";
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

class AntiPhishingPage extends Component<Props, State> {
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
                                Anti-Phishing
                                </FormCardTitle>
                            </FormCardHeader>
                            <FormCardBody className="pt-5">
                                <FormCardText className="mb-8">In order to prevent phishing attacks, Cross requires you setup an Anti-Phishing security phase or code. This security phrase will be displayed in every email sent to you by Cross.</FormCardText>
                                <Input type="text" placeholder="Enter Anti-Phishing code" label={'Enter Anti Phishing code'}/>
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


export default AntiPhishingPage


