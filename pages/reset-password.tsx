import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../components/form-card';
import Input from '../components/input';
// import { Notification } from '../components/notification';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Restpass from "../components/resetpassword-forget";
import UpdateMsgReset from "../components/update-msg";


interface Props {
}

interface State {
    resetforgot: boolean,
    updatemsg: boolean
}

class ResetPasswordPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            resetforgot: true,
            updatemsg: false
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <FormScreen>
                <FormWrap>
                    <FormHeader />
                    {this.state.resetforgot &&
                        <>
                            <FormCard>
                                <FormCardHeader>
                                    <FormCardTitle className="relative">
                                        <Link href="/login" className="absolute left-0">
                                            <FontAwesomeIcon icon={faArrowCircleLeft} />
                                        </Link>
                                        Reset Password</FormCardTitle>
                                </FormCardHeader>
                                <FormCardBody className="pt-8">
                                    {/* <Notification className="mb-9" icon="/assets/images/icons/info.png" text="The withdrawal will be disabled for 24 hours once the password is reset." /> */}
                                    <Input label="E-mail Address" type="email" />
                                    <Button className="mt-5 font-bold w-full text-lg" type={ButtonType.primary}>Submit</Button>
                                </FormCardBody>
                            </FormCard>
                            <FormCardOuterWrap>
                                <FormCardOuterText>
                                    You can create a new password by clicking the link sent to your e-mail address.
                                </FormCardOuterText>
                            </FormCardOuterWrap>
                        </>
                    }
                    {!this.state.resetforgot &&
                        <Restpass />
                    }
                    {this.state.updatemsg &&
                        <UpdateMsgReset />
                    }
                </FormWrap>
            </FormScreen>
        );
    }

}

export default ResetPasswordPage



