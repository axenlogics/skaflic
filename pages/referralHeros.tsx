// import styles from "../styles/ReferralHero.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Component, useState } from 'react';
import React from "react";

interface Props {

}
interface State {

}

class ReferralHero extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {};
    }

    // const [Clrazul , setClrazul] = useState();
    heroData = [
        {
            "rank": 1,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 2,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 3,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 4,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 5,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 6,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 7,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 8,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 9,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 10,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
        {
            "rank": 11,
            "userID": "483***6",
            "RRN": 32,
            "FTTRNumber": 54,
            "CEarning": 857,
            "status": "TRY",
            "points": 10.800
        },
    ]

    render(): React.ReactNode {


        return (

            <>
                <div className={cx('max-w-[1320px] w-full')}>
                    <div>
                        <h2 className={cx('sm:mt-[90px] mt-[70px] text-center mb-[30px]')}>
                            <span className={cx('text-[28px] md:text-[36px] font-bold leading-normal tracking-normal txt-gradient-6 txt-gradient')}>Referral Heroes</span>
                        </h2>
                    </div>
                    <div className={cx('h-auto sm:p-[33px_18px_31px_20px] p-[33px_10px_31px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] bg-white')}>
                        <div>
                            <Tabs defaultIndex={0} selectedTabClassName="!font-bold !text-171a1e">
                                <TabList className={cx('border-b border-e8e8e8 border-solid')}>
                                    <Tab className={cx('list-none inline-block sm:mr-[45px] mr-[15px] pb-[12px] cursor-pointer pl-[6px] text-[14px] leading-normal tracking-normal font-normal text-acacac')}>
                                        This Month
                                    </Tab>
                                    <Tab className={cx('list-none inline-block sm:mr-[45px] mr-[15px] cursor-pointer pl-[6px] text-[14px] leading-normal tracking-normal font-normal text-acacac')}>
                                        This Year
                                    </Tab>
                                    <Tab className={cx('list-none inline-block sm:mr-[45px] mr-[15px] cursor-pointer pl-[6px] text-[14px] leading-normal tracking-normal font-normal text-acacac')}>
                                        All Time
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    <div className='w-full'>
                                        <table className={cx('w-full mt-[-10px] border-separate border-spacing-[0px_10px]')}>
                                            <thead>
                                                <tr className={cx('h-[83px]')}>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Rank
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            User ID
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Registered<br />Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            First Time Traded<br/>Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-right text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Commission<br/>Earnings
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-right text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Points
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.heroData.map((t:any) =>(
                                                    <tr className={cx('h-[80px] sm:p-[28px_130px_29px_87.5px] p-[28px_15px_29px] rounded-[10px] odd:bg-light even:bg-white cursor-pointer hover:bg-01f11f0a')} key={t.rank}>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-l-[10px]')}>#{t.rank}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.userID}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.RRN}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.FTTRNumber}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.CEarning} {t.status}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-r-[10px]')}>{t.points}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='w-full'>
                                        <table className={cx('w-full mt-[-10px] border-separate border-spacing-[0px_10px]')}>
                                            <thead>
                                                <tr className={cx('h-[83px]')}>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Rank
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            User ID
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Registered<br />Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            First Time Traded<br/>Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-right text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Commission<br/>Earnings
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-right text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Points
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.heroData.map((t:any) =>(
                                                    <tr className={cx('h-[80px] sm:p-[28px_130px_29px_87.5px] p-[28px_15px_29px] rounded-[10px] odd:bg-light even:bg-white cursor-pointer hover:bg-01f11f0a')} key={t.rank}>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-l-[10px]')}>#{t.rank}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.userID}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.RRN}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.FTTRNumber}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.CEarning} {t.status}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-r-[10px]')}>{t.points}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='w-full'>
                                        <table className={cx('w-full mt-[-10px] border-separate border-spacing-[0px_10px]')}>
                                            <thead>
                                                <tr className={cx('h-[83px]')}>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Rank
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-left text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            User ID
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Registered<br />Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            First Time Traded<br/>Referral Number
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal sm:text-right text-center text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Commission<br/>Earnings
                                                        </div>
                                                    </th>
                                                    <th className={cx('align-middle sm:table-cell hidden')}>
                                                        <div className={cx('sm:text-[14px] text-[12px] font-bold leading-normal tracking-normal text-right text-777e91 sm:p-[28px_20px_0px] p-[28px_0px_0px] max-w-[174px] mx-auto')}>
                                                            Points
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.heroData.map((t:any) =>(
                                                    <tr className={cx('h-[80px] sm:p-[28px_130px_29px_87.5px] p-[28px_15px_29px] rounded-[10px] odd:bg-light even:bg-white cursor-pointer hover:bg-01f11f0a')} key={t.rank}>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-l-[10px]')}>#{t.rank}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-left text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.userID}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.RRN}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-center text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.FTTRNumber}</td>
                                                        <td className={cx('sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none')}>{t.CEarning} {t.status}</td>
                                                        <td className={cx('sm:table-cell hidden sm:text-[16px] text-[12px] font-bold leading-normal tracking-normal text-right text-171a1e sm:p-[28px_20px] p-[28px_10px] border-none rounded-r-[10px]')}>{t.points}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}
export default ReferralHero;
