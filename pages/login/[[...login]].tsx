import React, { Component, Fragment, useEffect, useState } from "react";
import { Button, ButtonType } from '../../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardText, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../../components/form-card';
import Input from '../../components/input';
import Link from "next/link";
import cx from "classnames";
import { connect } from "react-redux";
import { loginSuccess, loginUser } from "../../redux/actions/auth";
import InputPhone from "../../components/input-phone";
import { store } from "../../redux/Store";
import { NextResponse } from "next/server";
import { Router, useRouter, withRouter } from "next/router";
import ButtonLoader from "../../components/laoders/btnloader";
// import { useAuth } from "../../components/auth/authprovider";
import { SocialAuthButton } from "../../components/social-auth";
import { ApiCall } from "../../helpers/apicall";
import { IUser } from "../../helpers/interfaces";
import { App } from "../../models/app";
import { User } from "../../models/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Auth } from "../../components/auth/auth";
import { useAuth } from "../../components/auth/authprovider";
import Authentication from "../../components/authentication";


interface Props {
    isLoggedIn: boolean,
    dispatch: any,
    router: any,
    hideshow: any,
}

interface State extends IUser {
    loginMobile: boolean,
    passwordShow: boolean,
    loading: boolean,
    hideshow: boolean,
}

function LoginPage(props: Props) {
    // const auth = true;
    // const [auth, setAuth] = useState<boolean>(true);

    // constructor(props: Props) {

    //     super(props);

    //     this.state = {
    //         loginMobile: false,
    //         passwordShow: false,
    //         email: '',
    //         mobile: '',
    //         password: '',
    //         loading: false,
    //     };
    // }
    const { auth, initializing, getRedirect, clearRedirect, user, error } =
        useAuth()
    const [loginMobile, setloginMobile] = useState<boolean>(false);
    const [loginEmail, setloginEmail] = useState<boolean>(true);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [hideshow, setHideshow] = useState(true);
    const router = useRouter()
    // const { data: session, status } = useSession();

    const handleTab = (tb: string) => {
        if (tb === 'mobile') {
            if (!loginMobile) {
                setloginMobile(true);
            }
            if (loginEmail) {
                setloginEmail(false);
            }
        } else {
            if (!loginEmail) {
                setloginEmail(true);
            }
            if (loginMobile) {
                setloginMobile(false);
            }
        }
        // setloginMobile(true)
        // this.setState({ loginMobile: tb })
    }
    

    const handlePassword = () => {
        // this.setState({
        //     passwordShow: !this.state.passwordShow
        // })
        setPasswordShow(!passwordShow);
    }
    // const changeValue(type: any, value: any) {
    //     this.setState({
    //         ...this.state,
    //         [type]: value
    //     });
    // }

    useEffect(() => {
        if (user) {
            // window.location.href = '/trade';
            router.push('/trade');
        }
    }, [user])
    const loginNow = async () => {
        setLoading(true);
        // await Info.getInstance().init();
        await App.getInstance().init();
        if (!App.getInstance().appInited()) {
            await App.getInstance().AppfirstInit();
        }
        let modal: IUser = { Email: email, Password: password };//, RecaptchaResponse: captchaResponse };
        let res = await auth.logInNow(modal);
        setLoading(false);
        // if(getRedirect() !== null){
        if (res == true) {
            let redirect = getRedirect();
            // if (redirect) {
            clearRedirect();
            router.push(redirect)
            // }
        }
        // }
        // let resp = await ApiCall.getInstance().post('account/login', modal, true);
        // if(resp !== false){
        //     
        //     User.getInstance().save(resp)
        // }
    }
    return (
        // 

        <>
            {!initializing && <FormScreen>
                <FormWrap>
                    <FormHeader />
                    {hideshow &&
                        <FormCard>
                            <FormCardHeader>
                                <FormCardTitle>
                                    Login
                                </FormCardTitle>
                            </FormCardHeader>
                            <FormCardBody>

                                <Input
                                    label="Email"
                                    value={email}
                                    onChange={(ev: any) => setEmail(ev.target.value)}
                                    type="email" />
                                <Input
                                    value={password}
                                    onChange={(ev: any) => setPassword(ev.target.value)}
                                    label="Password"
                                    type={passwordShow ? "text" : "password"}
                                    labelRight={<Link href="/reset-password" className="hover:text-34345b">Forget Password?</Link>}
                                    onClickIconRight={handlePassword}
                                    iconRight={<FontAwesomeIcon icon={passwordShow ? faEye : faEyeSlash} className='text-16 text-bbbbbb' />} />
                                {<Button onClick={loginNow}
                                    className='w-full font-bold text-lg leading-6 mt-1'
                                    type={ButtonType.primary}>{loading ? <ButtonLoader /> : 'Log In'}</Button>}
                            </FormCardBody>
                        </FormCard>
                    }
                    {!hideshow &&

                    <Authentication />
                    }
                    <FormCardOuterWrap>
                        <FormCardOuterText>
                            Do not have an account? <Link className="font-bold text-primary hover:text-34345b" href="/signup">Sign Up</Link>
                        </FormCardOuterText>
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
            }
        </>

    );


}


// export default LoginPage
const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         loginUser: (val: any) => dispatch(loginUser(val)),
//         loginSuccess: () => dispatch(loginSuccess())
//     }
// }
// isLoggedIn
// export default LoginPage;
export default connect(mapStateToProps, null)(withRouter(LoginPage as any))



