import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button } from "../../components/button";
import cx from "classnames";
import { UserService } from '../../helpers/userservice';

interface Props {
    acc: any,
    className: string,
    getAccountInfo: any
}
export function LoginDeviceManagement({ className, acc, getAccountInfo }: Props) {

    const txhistory = [
        { 'os': 'Windows 10 Other Chrome 108.0.0 ', 'date': '09.12.2022 17:14', 'ip': '139.135.36.71', 'location': 'Turkey' },
        { 'os': 'MacOS X 10.15.7 Mac Chrome 107.0.0', 'date': '09.12.2022 17:13', 'ip': '139.135.36.71', 'location': 'Istanbul Turkey' },
        { 'os': 'Windows 10 Other Chrome 108.0.0 ', 'date': '09.12.2022 17:14', 'ip': '139.135.36.71', 'location': 'Istanbul Turkey' },
        { 'os': 'MacOS X 10.15.7 Mac Chrome 107.0.0', 'date': '09.12.2022 17:13', 'ip': '139.135.36.71', 'location': 'Istanbul Turkey' },
        { 'os': 'Windows 10 Other Chrome 108.0.0 ', 'date': '09.12.2022 17:14', 'ip': '139.135.36.71', 'location': 'Istanbul Turkey' },
        { 'os': 'MacOS X 10.15.7 Mac Chrome 107.0.0', 'date': '09.12.2022 17:13', 'ip': '139.135.36.71', 'location': 'Istanbul Turkey' },
    ]
    function markZero(val: any) {
        let v = val
        let nv = v.split('').reverse();
        let zero = [];
        for (let el of nv) {
            if (el != 0) {
                break;
            }
            zero.push(el);
        }
        let vv = val.substring(0, (val.length - zero.length))
        // 
        return vv + '<span class="text-ebece9">' + zero.join('') + '</span>';
    }
    // let acc = { "FT": 1, "Ul": 1, "LLg": "2023-02-17T11:18:09", "RvSh": 0, "EST": 234990695.937282303, "ESTUSD": 0.0, "Sms": false, "GAu": false, "Dv": [{ "I": 56, "Ip": "127.0.0.1", "D": "Windows 10 Other Chrome 110.0.0", "L": "Unknown", "Lg": "2023-02-16T12:46:30", "C": true }, { "I": 50, "Ip": "127.0.0.1", "D": "Windows 10 Other Chrome 109.0.0", "L": "Unknown", "Lg": "2023-02-13T11:50:38", "C": false }], "Ulg": [{ "D": "2023-02-17T11:18:09", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-17T09:48:40", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T15:09:22", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T14:57:52", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T12:46:30", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }], "KYC": null, "AP": false, "Api": false, "Em": "babarzech@gmail.com", "DvCt": 1.0, "TotalDv": 2, "UPgCt": 8.0, "TotalLg": 36 };
    const removeDeivce = async (dv: any) => {
        acc['Dv'].splice(acc['Dv'].indexOf(dv), 1);
        console.log(dv);
        // 
        let res = await UserService.getInstance().removeDevice({ Id: dv.I });
        if (res !== false) {
            getAccountInfo();
            alert(res);
        }

    }
    return (
        <>
            <div className={cx('p-[18px_15px_11px_15px] sm:p-[33px_27px_13px_30px] rounded-xl w-full bg-white shadow-normal', className)}>
                <Tabs defaultIndex={0} selectedTabClassName={'!text-171a1e font-medium'}>
                    <div className={cx('flex items-center pb-2.5 border-solid border-b-[1px] border-e9eff6 ')}>
                        <TabList className={'hidden md:flex items-center list-none w-full justify-start'}>
                            <Tab className={'text-sm sm:text-base text-a2a2a2 leading-normal tracking-normal md:pr-[54px] cursor-pointer'}><div>Last Login</div></Tab>
                            <Tab className={'text-sm sm:text-base sm:text-a2a2a2 leading-normal tracking-normal cursor-pointer'}><div>Device Management</div></Tab>
                        </TabList>
                    </div>
                    <div className='pt-2'>
                        <TabPanel>
                            <div className={cx('flex items-center pb-[3px] text-171a1e leading-normal')}>
                                <div className='flex-1 basis-[33%] text-xs sm:text-sm text-a2a2a2'>Device</div>
                                <div className='flex-1 basis-[23%] pl-4 text-xs sm:text-sm text-a2a2a2'>Date</div>
                                <div className='flex-1 basis-[23%] pl-8  text-xs sm:text-sm text-a2a2a2'>IP Address</div>
                                <div className='flex-1 basis-[20%] text-end text-xs sm:text-sm text-a2a2a2'>Location</div>
                            </div>
                            {acc.Ulg.map((item: any, i: number) =>
                                <div key={i} className={cx('flex items-center py-[7px] text-171a1e leading-normal')}>
                                    <div className='flex-1 basis-[33%] text-xs sm:text-sm md:whitespace-pre'>{item.Dv}</div>
                                    <div className='flex-1 basis-[23%] pl-4 text-xs sm:text-sm'>{item.D}</div>
                                    <div className='flex-1 basis-[23%] pl-8  text-xs sm:text-sm'>{item.Ip}</div>
                                    <div className='flex-1 basis-[20%] text-end text-xs sm:text-sm'>{item.L}</div>
                                </div>
                            )}
                        </TabPanel>
                        <TabPanel>
                            <div className={cx('flex items-center pb-[3px] text-171a1e leading-normal')}>
                                <div className='flex-1 basis-[35%] text-xs sm:text-sm text-a2a2a2'>Device</div>
                                <div className='flex-1 basis-[15%]  text-xs sm:text-sm text-a2a2a2'>Location</div>
                                <div className='flex-1 basis-[15%] pl-4 text-xs sm:text-sm text-a2a2a2'>Recent Activity</div>
                                <div className='flex-1 basis-[15%] pl-8  text-xs sm:text-sm text-a2a2a2'>IP Address</div>
                                <div className='flex-1 basis-[10%] text-end text-xs sm:text-sm text-a2a2a2'>Action</div>
                            </div>
                            {acc.Dv.map((item: any, i: number) =>
                                <div key={i} className={cx('flex items-center py-[5px] text-171a1e leading-normal')}>
                                    <div className='flex-1 basis-[35%] text-xs sm:text-sm md:whitespace-pre'>{item.D}</div>
                                    <div className='flex-1 basis-[15%] text-xs sm:text-sm md:whitespace-pre'>{item.L}</div>
                                    <div className='flex-1 basis-[15%] pl-4 text-xs sm:text-sm'>{item.Lg}</div>
                                    <div className='flex-1 basis-[15%] pl-8  text-xs sm:text-sm'>{item.Ip}</div>
                                    <div onClick={() => removeDeivce(item)} className='flex-1 basis-[10%] flex justify-end text-xs sm:text-sm group'>
                                        {!item.dl && !item.C && <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className='scale-[.65]' width="18pt" height="18pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                                            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" className='group-hover:fill-danger' stroke="none">
                                                <path d="M34 5096 c-21 -18 -28 -32 -28 -60 0 -36 42 -79 1219 -1256 l1220 -1220 -1223 -1223 c-880 -880 -1222 -1228 -1222 -1244 0 -53 40 -93 93 -93 16 0 364 342 1244 1222 l1223 1223 1220 -1220 c1177 -1177 1220 -1219 1256 -1219 28 0 42 7 60 28 52 59 124 -19 -1198 1303 l-1223 1223 1223 1223 c880 880 1222 1228 1222 1244 0 53 -40 93 -93 93 -16 0 -364 -342 -1244 -1222 l-1223 -1223 -1223 1223 c-1322 1322 -1244 1250 -1303 1198z" />
                                            </g>
                                        </svg>
                                        }
                                    </div>
                                </div>
                            )}
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </>
    );
}