import Link from "next/link";
import Image from 'next/image';
import { Button, ButtonLink, ButtonType } from "../button";
import styles from './style.module.css'
import Input from "../input";
import { useEffect, useState } from "react";
import cx from "classnames";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { store } from "../../redux/Store";
import { UserService } from "../../helpers/userservice";
// import { useAuth } from "../auth/authprovider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCaretDown, faSun, faMoon, faClose, faAngleDown, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from "next-themes";
import { NavButton, NavDropDown, NavDropDownDivider, NavDropDownLink, NavDropDownTitle, NavDropPositon, NavItem, NavLink, NavList } from "./nav-item";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { twMerge } from "tailwind-merge";
import { User } from "../../models/user";
import { useAuth } from "../auth/authprovider";



export enum NavbarType {
    light = 'light',
    primary = 'primary',
    dark = 'dark'
}

const NavVariation = {
    light: {
        logoIcon: '#2152FA',
        logoTxt: 'text-primary',
        nav: 'bg-light dark:bg-dark border-light dark:border-1e2136',
        list: `[&_.nav-link]:text-181a1e hover:[&_.nav-link]:text-primary dark:[&_.nav-link]:text-8184a3 dark:hover:[&_.nav-link]:text-white 
        [&_.nav-dp]:bg-e8effe dark:[&_.nav-dp]:bg-232842 [&_.dp-link]:text-181a1e hover:[&_.dp-link]:text-primary dark:[&_.dp-link]:text-cccfd5 dark:hover:[&_.dp-link]:text-white [&_.dp-divid]:border-[#acacac] dark:[&_.dp-divid]:border-[#353765] 
        [&_.caret-up]:border-b-e8effe  dark:[&_.caret-up]:border-b-232842`
    },
    dark: {
        logoIcon: '#2152FA',
        logoTxt: 'text-primary',
        nav: 'bg-dark border-1e2136',
        list: `[&_.nav-link]:text-cccfd5 hover:[&_.nav-link]:text-white [&_.nav-dp]:bg-232842 [&_.dp-link]:text-cccfd5 hover:[&_.dp-link]:text-white [&_.dp-divid]:border-[#353765] 
        [&_.caret-up]:border-b-232842`
    },
    primary: {
        logoIcon: '#ffffff',
        logoTxt: 'text-white',
        nav: 'bg-primary border-primary',
        list: `[&_.nav-link]:text-white hover:[&_.nav-link]:text-181a1e [&_.nav-link]:text-white :hover:[&_.nav-link]:text-181a1e 
        [&_.nav-dp]:bg-e8effe [&_.dp-link]:text-181a1e hover:[&_.dp-link]:text-primary [&_.dp-divid]:border-[#acacac] 
        [&_.caret-up]:border-b-e8effe`,
    }
} as any;


export enum NavbarSize {
    md = 'md',
    sm = 'sm'
}

export interface Props {
    navbarType?: NavbarType,
    navbarSize?: NavbarSize,
    navbarClasName?: string,
    logoText?: boolean,
    isLoggedIn?: boolean,
    contClassName?: string,
    searchEnabled?: boolean,
    isSessionExist?: boolean,
    navListClassName?: string,
    isTrade?: boolean
}

function Header({ isTrade = false, isSessionExist, navbarType = NavbarType.dark, navbarSize = NavbarSize.md, navbarClasName, navListClassName, logoText = true, isLoggedIn, contClassName, searchEnabled = true }: Props) {
    const { auth, initializing, getRedirect, clearRedirect, user, error } = useAuth();
    const [islogedInSet, setLogedIn] = useState('');
    const [menu, setMenu] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();



    const changeData = (val: string) => {

    }
    const logout = async () => {
        await auth.signOut()
        // const res = await UserService.getInstance().logOut();
        // const res1 = await signOut({ callbackUrl: '/' });
    }
    const startup = async () => {
        if (localStorage !== undefined && islogedInSet === '') {
            // if (status === 'authenticated') {

            // const res = localStorage.getItem('userInfo')

            const res = localStorage.getItem('userInfo')
            if (res !== null) {
                // await auth.UpdateUser(res);
                // if (session.user !== null) {
                store.dispatch({ type: 'ISLOGGED_IN', payload: res !== null });
                setLogedIn('true');
                // }
            }
            // }
        }
    }
    // if (status === 'authenticated') {

    //     // const res = localStorage.getItem('userInfo')

    //     if (user !== null) {
    //         store.dispatch({ type: 'ISLOGGED_IN', payload: session.user !== null});
    //         setLogedIn('true');
    //     }

    // }

    const isLogin = user?.Email ? true : false;
    const email = user?.Email;

    const handleTheme = (theme: string) => {
        localStorage.setItem('theme-mode', theme);

        setTheme(theme)
    }

    const toggleMenu = () => {
        setMenu(prevState => !prevState)
    }

    useEffect(() => {
        checkIsMobile()

        window.addEventListener('resize', checkIsMobile)

        const isTrade = router.pathname.indexOf('trade') > - 1;
        const themeMode = localStorage.getItem('theme-mode');
        isTrade ? setTheme(themeMode ? themeMode : 'dark') : setTheme('light');

        startup();
    }, [])

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 1024)
    }
    const orderPageLink = (type: any)=>{
        router.query = {tab:'openorders'};
        router.push(router)
    }


    return (
        <header>
            <nav className={twMerge(navbarSize === 'sm' ? 'py-1.5 md:px-1' : 'py-2 md:px-1', 'border-b border-solid', NavVariation['dark']['nav'], navbarClasName)}>
                <div className={twMerge('mx-auto container flex justify-between items-center px-4', contClassName)}>
                    <Link href="/" className={cx(`relative inline-block ${isTrade ? 'w-[130px]' : 'w-[150px]'} h-8`)}>
                        <Image src="/assets/images/logo.svg" alt="Skaflic Logo" fill priority />
                    </Link>

                    {!isMobile && <>
                        <NavList className={twMerge(`ml-5 flex-1 ${NavVariation['dark']['list']}`, navListClassName)}>
                            <NavItem className="relative">
                                <NavButton>
                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor"><defs><style></style></defs><path d="M0 0h236.308v236.308H0V0zm393.846 0h236.308v236.308H393.846V0zM1024 0H787.692v236.308H1024V0zM0 393.846h236.308v236.308H0V393.846zm630.154 0H393.846v236.308h236.308V393.846zm157.538 0H1024v236.308H787.692V393.846zM236.308 787.692H0V1024h236.308V787.692zm157.538 0h236.308V1024H393.846V787.692zm630.154 0H787.692V1024H1024V787.692z"></path></svg>
                                </NavButton>
                                <NavDropDown className='lg:left-[-42px]' iconClassName='left-[42px]'>
                                    <div className="gap-7 columns-2">
                                        <div className="min-w-[170px]">
                                            <NavDropDownTitle>Services</NavDropDownTitle>
                                            <NavDropDownDivider />
                                            <NavDropDownLink href="#">Overview</NavDropDownLink>
                                            <NavDropDownLink href="#">Trade Basics</NavDropDownLink>
                                            <NavDropDownLink href="#">Exchange</NavDropDownLink>
                                            <NavDropDownLink href="#">Platform Security</NavDropDownLink>
                                            <NavDropDownLink href="#">Account Security</NavDropDownLink>
                                        </div>
                                        <div className="min-w-[170px]">
                                            <NavDropDownTitle>Privileges</NavDropDownTitle>
                                            <NavDropDownDivider />
                                            <NavDropDownLink href="#">Referral</NavDropDownLink>
                                            <NavDropDownLink href="#">Ranking</NavDropDownLink>
                                            <NavDropDownLink href="#">Market Analysis</NavDropDownLink>
                                            <NavDropDownLink href="#">Auto-Invest</NavDropDownLink>
                                            <NavDropDownLink href="#">Fees &amp; Limits</NavDropDownLink>
                                        </div>
                                    </div>
                                </NavDropDown>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/trade">Market</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/trade">Exchange</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/trade">Buy Crypto</NavLink>
                            </NavItem>
                            {(isLogin) && <>
                                <NavItem className="relative lg:ml-auto">
                                    <NavButton>
                                        Wallet
                                        <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown dropPositon={NavDropPositon.right}>
                                        <NavDropDownTitle>Overall</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/deposit">Deposit</NavDropDownLink>
                                        <NavDropDownLink href="/withdraw">Withdraw</NavDropDownLink>
                                        <NavDropDownLink href="/distribution">Distribution</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        My Orders
                                        <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown dropPositon={NavDropPositon.right}>
                                        <NavDropDownTitle>Orders</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/orders?tab=open-orders">Open Order</NavDropDownLink>
                                        <NavDropDownLink  href="/orders?tab=order-history">Order History</NavDropDownLink>
                                        <NavDropDownLink href="/orders?tab=order-fills">Trade History</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        <Image className="mr-2" src="/assets/images/bitcoin.png" alt="Skaflic Logo" width={30} height={30} />
                                        {email?.split('@')[0]}
                                        <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown dropPositon={NavDropPositon.right}>
                                        <NavDropDownTitle className="flex">
                                            {email?.split('@')[0].slice(0, 3)}***{email?.split('@')[1]}
                                            <Image className="ml-auto self-center" src="/assets/images/icons/verify.png" alt="Verify" width={18} height={18} priority />
                                        </NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="dashboard">Dashboard</NavDropDownLink>
                                        <NavDropDownLink href="#">Security</NavDropDownLink>
                                        <NavDropDownLink href="/kyc">Verification</NavDropDownLink>
                                        <NavDropDownLink href="#">Referral</NavDropDownLink>
                                        <NavDropDownLink href="#">Rewards</NavDropDownLink>
                                        <NavDropDownLink href="#">Points</NavDropDownLink>
                                        <NavDropDownDivider />
                                        <div className="dp-link cursor-pointer font-normal items-center py-2" onClick={logout}>Log Out</div>
                                    </NavDropDown>
                                </NavItem>
                            </>}
                        </NavList>
                        {!(isLogin) && <div className="flex items-center">
                            <ButtonLink href='/login' type={navbarType === NavbarType.primary ? ButtonType.outline_white : ButtonType.outline_primary} className='min-w-[75px] leading-4 ml-5'>Login</ButtonLink>
                            <ButtonLink href='/signup' type={navbarType === NavbarType.primary ? ButtonType.white : ButtonType.primary} className='min-w-[75px] leading-4 ml-5'>Signup</ButtonLink>
                        </div>}
                    </>}
                    {isMobile && <>
                        <Button type={ButtonType.primary} onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className='text-base' />
                        </Button>

                        <div className={`fixed ${menu ? 'flex flex-col items-end overflow-y-auto' : 'hidden'} w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(24,26,30,0.3)] z-40 pl-10`}>
                            <div className={`fixed w-full h-full left-0 right-0 top-0 bottom-0 z-30`} onClick={toggleMenu}></div>
                            <NavList className={`flex-1 max-w-[310px] w-full relative z-40 ${NavVariation[navbarType]['nav']} ${NavVariation[navbarType]['list']}`}>
                                <NavItem className='flex p-5'>
                                    <ButtonLink href='/login' type={navbarType === NavbarType.primary ? ButtonType.outline_white : ButtonType.outline_primary} className="flex-1 rounded-full leading-5">Login</ButtonLink>
                                    <ButtonLink href='/signup' type={navbarType === NavbarType.primary ? ButtonType.white : ButtonType.primary} className="flex-1 rounded-full leading-5 ml-3">Signup</ButtonLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/easy-trade">Market</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/trade">Exchange</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/trade">Buy Crypto</NavLink>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        Wallet
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownTitle>Overall</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/deposit">Deposit</NavDropDownLink>
                                        <NavDropDownLink href="/withdraw">Withdraw</NavDropDownLink>
                                        <NavDropDownLink href="/distribution">Distribution</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        My Orders
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownTitle>Orders</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/orders">Open Order</NavDropDownLink>
                                        <NavDropDownLink href="/orders">Order History</NavDropDownLink>
                                        <NavDropDownLink href="/orders">Trade History</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        <span>
                                            <Image className="mr-2" src="/assets/images/bitcoin.png" alt="Skaflic Logo" width={30} height={30} />
                                            {user?.Email?.split('@')[0]}
                                        </span>
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownTitle className="flex">
                                            {user?.Email?.split('@')[0].slice(0, 3)}***{user?.Email?.split('@')[1]}
                                            <Image className="ml-auto self-center" src="/assets/images/icons/verify.png" alt="Verify" width={18} height={18} priority />
                                        </NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="dashboard">Dashboard</NavDropDownLink>
                                        <NavDropDownLink href="#">Security</NavDropDownLink>
                                        <NavDropDownLink href="#">Verification</NavDropDownLink>
                                        <NavDropDownLink href="#">Referral</NavDropDownLink>
                                        <NavDropDownLink href="#">Rewards</NavDropDownLink>
                                        <NavDropDownLink href="#">Points</NavDropDownLink>
                                        <NavDropDownDivider className="lg:my-1.5" />
                                        <div className="dp-link cursor-pointer font-normal items-center py-4 px-5" onClick={logout}>Log Out</div>
                                    </NavDropDown>
                                </NavItem>
                            </NavList>
                        </div>
                    </>
                    }
                </div>
            </nav>
        </header>
    )
}
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
export default connect(mapStateToProps, null)(Header)
// export default Header