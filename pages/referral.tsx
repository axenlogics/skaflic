import styles from "../styles/Referral.module.css";
import cx from "classnames";
import Image from "next/image";
import Header, { NavbarType } from "../components/header";
import Footer from "./footer";
import ReferralHero from "./referralHeros";
import BlueBanner from "../components/blue-banner";

function Referral() {
    return (
        <>
            <Header navbarType={NavbarType.primary} />
            <div className={cx('lg:h-[422px] h-auto bg-2152FA rounded-b-[40px] sm:mb-[60px] mb-[70px]')}>
                <div className={cx('container max-w-[1240px] lg:flex lg:justify-between justify-center xl:p-[30px_65px_0px] p-[30px_16px_0px]')}>
                    <div className="self-center">
                        <h1 className={cx('lg:text-[60px] sm:text-[40px] text-[24px] lg:text-left text-center font-bold leading-normal tracking-normal text-white mb-[30px]')}>Invite your friends.<br />Earn together!</h1>
                        <ul>
                            <li className={cx('sm:text-[16px] text-[14px] lg:text-left text-center font-medium leading-[1.88] tracking-normal text-e3e3e3 list-none')}><span className={cx('mr-[9px] relative top-[-2px]')}><Image src="/assets/images/sparkle.png" alt="sparkels" width={12} height={12} /></span>Up to 40% commission income from transactions of your referrals</li>
                            <li className={cx('sm:text-[16px] text-[14px] lg:text-left text-center font-medium leading-[1.88] tracking-normal text-e3e3e3 list-none')}><span className={cx('mr-[9px] relative top-[-2px]')}><Image src="/assets/images/sparkle.png" alt="sparkels" width={12} height={12} /></span>Up to 10% commission discount to your referrals</li>
                            <li className={cx('sm:text-[16px] text-[14px] lg:text-left text-center font-medium leading-[1.88] tracking-normal text-e3e3e3 list-none')}><span className={cx('mr-[9px] relative top-[-2px]')}><Image src="/assets/images/sparkle.png" alt="sparkels" width={12} height={12} /></span>200 points per your traded referrals</li>
                        </ul>
                    </div>
                    <div className={cx('relative top-[-22px] text-center lg:text-right')}>
                        <Image src="/assets/refralbanner.png" alt="description of image" height={0} width={400} />
                    </div>
                </div>
            </div>
            {/* <BlueBanner headingOne="Invite your friends" headingTwo="Earn together!" source={<Image src="/assets/images/svg/refralbanner.svg" alt="referal" height={400} width={400} />}/> */}
            <section className={cx('pb-[98px]')}>
                <div className={cx('container px-4')}>
                    <div className={cx('lg:flex lg:flex-wrap lg:m-[0px_-30px] lg:justify-between justify-center')}>
                        <div className={cx('lg:max-w-[50%] lg:basis-[50%] w-[100%] lg:pr-[30px] lg:pl-[30px] pb-[30px] lg:pb-0')}>
                            <div className={cx('h-auto sm:p-[36px_14px_56px_24px] p-[36px_14px_56px_15px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-white rounded-[20px]')}>
                                <div className={cx('border-b border-e8e8e8 border-solid')}>
                                    <h6 className={cx('sm:text-[18px] text-[15px] font-medium leading-normal tracking-normal text-171a1a pb-[11px]')}>Your Referral Details</h6>
                                </div>
                                <div className={cx('flex sm:p-[50px_24px_26px] p-[50px_0px_26px] lg:max-w-[526px] mx-auto justify-between')}>
                                    <div>
                                        <h6 className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-center text-777e91 lg:max-w-[140px] max-w-[150px]')}>Current Commission Share</h6>
                                        <p className={cx('sm:text-[21px] text-[18px] font-bold leading-normal tracking-normal text-center text-2152FA')}>% 15</p>
                                    </div>
                                    <div>
                                        <h6 className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-center text-777e91 lg:max-w-[168px] ml-auto')}>Referrals’<br />Commission Discounte</h6>
                                        <p className={cx('sm:text-[21px] text-[18px] font-bold leading-normal tracking-normal text-center text-2152FA')}>% 5</p>
                                    </div>
                                </div>
                                <div className={cx('lg:max-w-[526px] h-auto p-[21px_24px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-light relative mx-auto')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px]font-medium leading-normal tracking-normal text-a2a2a2')}>Referral ID</div>
                                        <div className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-right text-171a1e')}>
                                            463712
                                            <span className={cx('relative ml-[16px]')}>
                                                <Image src="/assets/copy.svg" alt="description of image" height={24} width={24} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('bg-white lg:max-w-[526px] h-auto p-[21px_24px] rounded-[20px] relative mx-auto')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-a2a2a2')}>Link</div>
                                        <div className={cx('sm:text-[16px] text-[11px] font-medium leading-normal tracking-normal text-right text-171a1e')}>
                                            https://skaflic.com/ref=463712
                                            <span className={cx('relative ml-[16px]')}>
                                                <Image src="/assets/copy.svg" alt="description of image" height={24} width={24} />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className={cx('lg:max-w-[526px] h-auto p-[21px_24px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-light relative mx-auto')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-a2a2a2')}>QR Code for sharing</div>
                                        <div>
                                            <span className={cx('absolute right-[24px] top-[13px]')}>
                                                <Image src="/assets/qrcode.png" alt="description of image" height={36} width={36} />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={cx('lg:max-w-[50%] lg:basis-[50%] w-[100%] lg:pr-[30px] lg:pl-[30px]')}>
                            <div className={cx('h-auto sm:p-[36px_14px_56px_24px] p-[36px_14px_56px_15px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-white rounded-[20px]')}>
                                <div className={cx('border-b border-e8e8e8 border-solid flex justify-between items-baseline')}>
                                    <h6 className={cx('sm:text-[18px] text-[15px] font-medium leading-normal tracking-normal text-171a1a pb-[11px]')}>Your Referral Achivements</h6>
                                    <p className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-center text-777e91')}> Overall Ranking
                                        <span className={cx('sm:text-[18px] text-[15px] font-bold leading-normal tracking-normal ml-[10px] txt-gradient-5 txt-gradient')}>#52</span>
                                    </p>
                                </div>
                                <div className={cx('flex sm:p-[50px_24px_26px] p-[50px_0px_26px] lg:max-w-[526px] mx-auto justify-between')}>
                                    <div>
                                        <h6 className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-center text-777e91 lg:max-w-[140px]')}>Overall Registered Referral Number</h6>
                                        <p className={cx('sm:text-[21px] text-[18px] font-bold leading-normal tracking-normal text-center text-2152FA')}>12 User</p>
                                    </div>
                                    <div>
                                        <h6 className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-center text-777e91 lg:max-w-[140px]')}>Overall Traded Referral Number</h6>
                                        <p className={cx('sm:text-[21px] text-[18px] font-bold leading-normal tracking-normal text-center text-2152FA')}>9 User</p>
                                    </div>
                                </div>
                                <div className={cx('lg:max-w-[526px] h-auto p-[21px_24px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-light relative mx-auto')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-a2a2a2')}>Commission Earnings in This Month</div>
                                        <div className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-right text-171a1e')}>
                                            232 TRY
                                        </div>
                                    </div>

                                </div>
                                <div className={cx('bg-white lg:max-w-[526px] h-auto rounded-[20px] relative mx-auto p-[12px_24px]')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-a2a2a2')}>First-time Traded Referrals /<br />Points in This Month</div>
                                        <div className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-right text-171a1e')}>
                                            2 User / 400 Points
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('lg:max-w-[526px] h-auto p-[21px_24px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-light relative mx-auto')}>
                                    <div className={cx('flex justify-between items-center')}>
                                        <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-a2a2a2')}>Overall Commission Earnings</div>
                                        <div className={cx('sm:text-[16px] text-[14px] font-medium leading-normal tracking-normal text-right text-171a1e')}>
                                            1.232
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('container max-w-[1070px] mx-auto sm:pt-[94px] pt-[70px]')}>
                        <h2 className={cx('mb-[30px] text-center')}>
                            <span className={cx('text-[28px] md:text-[36px] font-bold leading-normal tracking-normal txt-gradient-6 txt-gradient')}>
                                Maximize your income
                            </span>
                        </h2>
                        <div className={cx('lg:max-w-[1040px] max-w-full w-full h-auto lg:p-[41px_60px_30px] p-[41px_15px_30px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-white mx-auto')}>
                            <div>
                                <table className={cx('w-full border-separate border-spacing-[0px_10px] mt-[-10px]')}>
                                    <thead>
                                        <tr className={cx('max-w-[920px] w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_15px_29px_15px] rounded-[10px]')}>
                                            <th>
                                                <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-center text-777e91 lg:p-[0px_92px_30px] p-[0px_15px_30px]')}>
                                                    Traded<br />Referral Number
                                                </div>
                                            </th>
                                            <th>
                                                <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-center text-777e91 lg:p-[0px_92px_30px] p-[0px_15px_30px]')}>
                                                    Commission<br />Earning Rate
                                                </div>
                                            </th>
                                            <th>
                                                <div className={cx('sm:text-[14px] text-[12px] font-medium leading-normal tracking-normal text-center text-777e91 lg:p-[0px_92px_30px] p-[0px_15px_30px]')}>
                                                    Commission Discount<br />for Referrals
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className={cx('lg:max-w-[920px] max-w-full w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px] bg-light')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>0 - 9</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 15</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 5</td>
                                        </tr>
                                        <tr className={cx('lg:max-w-[920px] max-w-full w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px]')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>10 - 49</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 20</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 6</td>
                                        </tr>
                                        <tr className={cx('lg:max-w-[920px] max-w-full w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px] bg-light')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>50 - 99</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 25</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 7</td>
                                        </tr>
                                        <tr className={cx('lg:max-w-[920px] max-w-full w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px]')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>100 - 499</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 30</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 8</td>
                                        </tr>
                                        <tr className={cx('lg:max-w-[920px] max-w-fullw-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px] bg-light')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>0 - 9</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 15</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 5</td>
                                        </tr>
                                        <tr className={cx('lg:max-w-[920px] max-w-full w-full h-[80px] lg:p-[28px_130px_29px_87.5px] p-[28px_0px_29px] rounded-[10px]')}>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-l-[10px]')}>0 - 9</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none')}>% 15</td>
                                            <td className={cx('sm:text-[18px] text-[14px] font-bold leading-normal tracking-normal text-center text-dark-light p-[28px_0px] border-none rounded-r-[10px]')}>% 5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <ReferralHero />
                    </div>
                </div>
            </section>
            {/* <Footer/> */}
            <Footer />
        </>

    )
}
export default Referral;
