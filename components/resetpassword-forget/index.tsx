import React, { Component } from "react";
import { Button, ButtonType } from '../button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../form-card';
import Input from '../input';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IUser } from "../../helpers/interfaces";

interface Props {

}
interface State extends IUser {
    passwordShow: boolean,
}
class Restpass extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            passwordShow: false,
            Password: '',
 

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

    }
    render(): React.ReactNode {
        return (
            <>
                <FormCard>
                    <FormCardHeader>
                        <FormCardTitle className="relative">
                            Reset Password</FormCardTitle>
                    </FormCardHeader>
                    <FormCardBody className="pt-8">
                        {/* <Input label="E-mail Address" type="email" /> */}
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
                        <Button className="mt-5 font-bold w-full text-lg" type={ButtonType.primary}>Submit</Button>
                    </FormCardBody>
                </FormCard>
            </>

        )
    }
}
export default Restpass;



