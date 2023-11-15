import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button } from "../../components/button";
import cx from "classnames";
import { User } from '../../models/user';
import { userOrderDate } from '../../helpers/common';

export interface Props {
    acc: any;
}

export function UserStats({ acc }: Props) {

    const txhistory = [
        { 'status': false, 'coin': 'TRY', 'value': '5.783,57000000', 'date': '09.12.2022 17:14' },
        { 'status': true, 'coin': 'USDT', 'value': '7.271,05948392', 'date': '09.12.2022 17:13' },
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
        return vv + '<span class="text-a2a2a2">' + zero.join('') + '</span>';
    }
    // let acc = { "FT": 1, "Ul": 1, "LLg": "2023-02-17T11:18:09", "RvSh": 0, "EST": 234990695.937282303, "ESTUSD": 0.0, "Sms": false, "GAu": false, "Dv": [{ "I": 56, "Ip": "127.0.0.1", "D": "Windows 10 Other Chrome 110.0.0", "L": "Unknown", "Lg": "2023-02-16T12:46:30", "C": true }, { "I": 50, "Ip": "127.0.0.1", "D": "Windows 10 Other Chrome 109.0.0", "L": "Unknown", "Lg": "2023-02-13T11:50:38", "C": false }], "Ulg": [{ "D": "2023-02-17T11:18:09", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-17T09:48:40", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T15:09:22", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T14:57:52", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }, { "D": "2023-02-16T12:46:30", "Ip": "127.0.0.1", "L": "Unknown", "Dv": "Windows 10 Other Chrome 110.0.0" }], "KYC": null, "AP": false, "Api": false, "Em": "babarzech@gmail.com", "DvCt": 1.0, "TotalDv": 2, "UPgCt": 8.0, "TotalLg": 36 };

    return (
        <>
            <div className={'sm:flex w-full rounded-xl bg-white bg-blend-normal shadow-normal p-[17px_20px_17px_15px] sm:p-[20px_30px_27px_20px]'}>
                <div>
                    <div className={'flex'}>
                        <Image className='mr-[22px] w-12 h-12 sm:w-13 sm:h-13 md:w-16 md:h-16' src={`/assets/images/icons/user.png`} alt={'Profile Image'} width={64} height={64} />
                        <div className={'flex flex-col justify-between'}>
                            <div className='block'><div className='flex items-center'>
                                <Image className='mr-[5px]' src={`/assets/images/icons/default-level.svg`} alt={'Edit'} width={18} height={18} />
                                <span className={cx('text-16', 'font-medium', 'text-171a1e')}>
                                    {acc.Em}
                                </span>
                            </div>
                                <span className={cx('text-acacac', 'text-xs', 'font-medium pl-3')}>13.273 Obi-Point</span></div>
                        </div>
                    </div>
                    <div className={'pt-1 sm:pt-[15px] flex flex-wrap'}>
                        <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                            <div className='text-a2a2a2 text-xs font-medium text-left'>User ID</div>
                            <span className='ml-1 mr-2 block sm:hidden'>:</span>
                            <div className='font-medium'>{User.getInstance().getId()}</div>
                        </div>
                        <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                            <div className='text-a2a2a2 text-xs font-medium text-left'>Registration</div>
                            <span className='ml-1 mr-2 block sm:hidden'>:</span>
                            <div className='font-medium'>{userOrderDate((acc.LLg!) ) }</div>
                        </div>
                    </div>
                </div>
                <div className={'flex flex-1 flex-col sm:justify-between pt-1 sm:pt-0'}>
                    <div className='block'>
                        <div className='flex sm:block items-center'>
                            <span className={cx('text-acacac', 'text-lg', ' block sm:text-right whitespace-pre')}>Estimated Value</span>
                            <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        </div>
                        <span className={cx('text-181a1e', 'font-medium block sm:text-right')}>{acc.EST} BTC</span>
                        <span className={cx('text-181a1e', 'font-medium block sm:text-right')}>$ {acc.ESTUSD}</span>
                    </div>
                    <div className='block'>
                        <div className='flex sm:block items-center'>
                            <span className={cx('text-acacac', 'text-xs', 'font-medium block sm:text-right whitespace-pre')}>Last Login</span>
                            <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        </div>
                        <span className={cx('text-181a1e', 'font-medium block sm:text-right')}>{userOrderDate((acc.LLg!))}</span>
                    </div>
                </div>
            </div>
        </>
    );
}