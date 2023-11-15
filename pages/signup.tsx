import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../components/form-card';
import Input from '../components/input';
import Link from "next/link";
import Checkbox from "../components/checkbox";
import InputPhone from "../components/input-phone";
import { ApiResponse, IUser } from "../helpers/interfaces";
import { UserService } from "../helpers/userservice";
import { SocialAuthButton } from "../components/social-auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import EmailVerification from "../components/email-verification";
import DeviceVerification from "./device-verification";
import Deviceverification from "../components/device-verification";


interface Props {

}

interface State extends IUser {
    passwordShow: boolean,
    terms?: boolean,
    PDPAConsent?: boolean,
    promotionalMessages?: boolean,
    variations?: boolean,
    variation1?: boolean,
}

class SignupPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            passwordShow: false,
            Mobile: '',
            Email: '',
            firstName: '',
            lastName: '',
            Password: '',
            variations: false,
            variation1: false
        };
    }



    componentDidMount() {
    }

    handlePassword = () => {
        this.setState({
            passwordShow: !this.state.passwordShow
        })
    }
    changeValue(type: any, value: any) {
        this.setState({
            ...this.state,
            [type]: value
        });
    }
    createAccount = async () => {
        const model: any = {
            // phone: this.state.mobile,
            Email: this.state.Email,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword,
        }

        const res: ApiResponse = await UserService.getInstance().createAccount(model);
        if (res.Status) {

        }
    }
    render() {
        return (
            <FormScreen>
                <FormWrap>
                    <FormHeader />
                    {!this.state.variations &&
                        <FormCard>
                            <FormCardHeader>
                                <FormCardTitle>
                                    Signup
                                </FormCardTitle>
                            </FormCardHeader>
                            <FormCardBody>
                                <Input label="E-mail Address" type="email" />
                                <Input
                                    value={this.state.Password}
                                    onChange={(ev: any) => this.changeValue('Password', ev.target.value)}
                                    label="Password"
                                    type={this.state.passwordShow ? "text" : "password"}
                                    onClickIconRight={this.handlePassword}
                                    iconRight={<FontAwesomeIcon icon={this.state.passwordShow ? faEye : faEyeSlash} className='text-16 text-bbbbbb' />} />
                                <Input
                                    value={this.state.ConfirmPassword}
                                    onChange={(ev: any) => this.changeValue('ConfirmPassword', ev.target.value)}
                                    label="Confirm Password"
                                    type={this.state.passwordShow ? "text" : "password"}
                                    onClickIconRight={this.handlePassword}
                                    iconRight={<FontAwesomeIcon icon={this.state.passwordShow ? faEye : faEyeSlash} className='text-16 text-bbbbbb' />} />
                                <div className="flex text-xs mb-2.5">
                                    <Checkbox id="chk2" className="self-start" />
                                    <p className="m-0 text-[rgb(23 26 30 / 50%)] mt-[-1px]"> I hereby declare that, I read and accept the <Link href="/">Terms of Use </Link>, <Link href="/">Privacy Policy</Link></p>
                                </div>
                                <Button className="mt-5 font-bold w-full text-lg" type={ButtonType.primary}>Sign Up</Button>
                            </FormCardBody>
                        </FormCard>
                    }
                    {!this.state.variations && this.state.variation1 &&
                        <EmailVerification />
                    }
                    {!this.state.variation1 && this.state.variations &&
                        <Deviceverification />
                    }
                    <FormCardOuterWrap>
                        <FormCardOuterText>
                            Have an Account? <Link className="font-bold text-primary hover:text-34345b" href="/login">Log In</Link>
                        </FormCardOuterText>
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
        );
    }



}

export default SignupPage


