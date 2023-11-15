import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Component } from "react";
import { Button, ButtonType } from "../components/button";
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from "../components/form-card";
import Header from "../components/header";
import Input from "../components/input";
import ButtonLoader from "../components/laoders/btnloader";
import Footer from "./footer";
import { UserService } from "../helpers/userservice";

interface Props {

}

interface State {
    OldPassword: string,
    NewPassword: string,
    ConfirmPassword: string,
}

class ChangePasswordPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: '',
        };
    }

    componentDidMount() {

    }
    changeValue(type: any, value: any) {
        this.setState({
            ...this.state,
            [type]: value
        })
    }
    changePassword = async ()=>{
      let res = await UserService.getInstance().changePassword(this.state);
      
    }
    render() {
        return (
            <React.Fragment>
                <Header logoText={true} />
                <FormScreen className={'my-10'}>
                    <FormWrap>
                        {/* <FormHeader /> */}
                        <FormCard>
                            <FormCardHeader>
                                <FormCardTitle>
                                    Change Password
                                </FormCardTitle>
                            </FormCardHeader>
                            <FormCardBody>

                                <Input
                                    value={this.state.OldPassword}
                                    onChange={(ev: any) => this.changeValue('OldPassword', ev.target.value)}
                                    label="Old Password"
                                    type={"password"}
                                    iconLeft={<FontAwesomeIcon icon={faLock} className='text-16 text-bbbbbb' />} />
                                <Input
                                    value={this.state.NewPassword}
                                    onChange={(ev: any) => this.changeValue('NewPassword', ev.target.value)}
                                    label="New Password"
                                    type={"password"}
                                    iconLeft={<FontAwesomeIcon icon={faLock} className='text-16 text-bbbbbb' />} />
                                <Input
                                    value={this.state.ConfirmPassword}
                                    onChange={(ev: any) => this.changeValue('ConfirmPassword', ev.target.value)}
                                    label="Confirm New Password"
                                    type={"password"}
                                    iconLeft={<FontAwesomeIcon icon={faLock} className='text-16 text-bbbbbb' />} />
                                {<Button
                                    className='w-full font-medium text-lg leading-6 mt-1'
                                    onClick={this.changePassword}
                                    type={ButtonType.primary}>
                                        {'Change Password'}
                                    </Button>}


                            </FormCardBody>
                        </FormCard>
                    </FormWrap>
                </FormScreen>
                <Footer />
            </React.Fragment>
        );
    }

}


export default ChangePasswordPage


