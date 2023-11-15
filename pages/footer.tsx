import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import styles from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Footer (){
    return(
        <> 
        <div className={cx('sm:p-[46px_60px_30px] p-[46px_15px_30px] bg-101123')}>
            <div className="container px-4">
            <div className='grid grid-cols-2 lg:grid-cols-5 lg:gap-2 gap-4'>
                <div className={cx('')}>
                    <div>
                        <h6 className={cx('text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>About Us</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                About Us
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Term Of Use
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/kyc">
                                KYC
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Services</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Overview
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Trade Basics
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/trade">
                                Exchange
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Platform Security
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Account Security
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('mt-[30px] sm:mt-0 text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Privileges</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Referral
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Ranking
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Market Analysis
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Fees & Limits
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('mt-[30px] sm:mt-0 text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Sources</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Support Center
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Suggestion
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Listing Application
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                API
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cccfd5')} href="/">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('mt-[30px] sm:mt-0 lg:col-auto col-span-2 flex flex-col lg:items-stretch items-center justify-right shrink-0')}>
                    <div>
                        <h6 className={cx('mt-[30px] sm:mt-0 text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Community</h6> 
                    </div>
                    <div className={cx('flex shrink-0 lg:justify-between justify-start lg:pb-0 pb-[30px]')}>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/telegram.svg" alt="Telegram" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/facebook.svg" alt="Facebook" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/twitter.svg" alt="Twitter" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/linkedin.svg" alt="Linkdin" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/instagram.svg" alt="description of image" height={24} width={24} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-9'>
                <div className={cx('lg:text-[12px] text-[10px] leading-normal tracking-normal font-normal text-center text-cccfd5')}>Copyright © 2023 - 2023 Skaflic Finance. All rights reserved.</div>
            </div>
            </div>
        </div>

        </>
    )
}
export default Footer;
