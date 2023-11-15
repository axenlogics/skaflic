import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button, ButtonLink, ButtonType } from "../../components/button";
import cx from "classnames";



export function TransactionHistory({ className, icon, text, heading,thead=true, href, buttonLabel, history }: any) {

    // const txhistory=[
    //     {'status':false,'coin':'Turkish Lira','value':'5.783,57000000','date':'09.12.2022 17:14','info':'withdraw with ERC20'},
    //     {'status':true,'coin':'Tether','value':'7.271,05948392','date':'09.12.2022 17:13','info':'withdraw with  TRC20'},
    // ]
    const txhistory = history ?? [];
    
    return (
        <>
            <div className={cx('p-[18px_15px_11px_15px] sm:p-[24px_27px_11px_30px] rounded-[12px] w-full bg-white shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]', className)}>
                <div className={cx('flex items-center pb-2.5 border-solid border-b-[1px] border-e9eff6 ')}>
                    <div className={cx('text-sm sm:text-base font-medium leading-normal tracking-normal flex-1 text-171a1e')}>{heading ? heading : 'Transaction History'}</div>
                    {href && <div><ButtonLink type={ButtonType.default} className='text-xs border-0 bg-e9eff6 text-a2a2a2 rounded-md p-[4px_7.5px_5px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]' href={href}>{buttonLabel ? buttonLabel : 'View All'}</ButtonLink></div>}
                </div>
                <div >
                    {thead && <div className={cx('flex items-center pt-2 pb-3 text-171a1e leading-normal')}>
                        <div className='flex-1 max-w-[20px] sm:max-w-[150px] text-a2a2a2'>Status</div>
                        <div className='flex-1 max-w-[20px] sm:max-w-[200px] text-a2a2a2'>Coin</div>
                        <div className='flex-1 text-xs sm:text-sm text-a2a2a2'>Amount</div>
                        <div className='flex-1 text-xs sm:text-sm text-a2a2a2'>Date</div>
                        <div className='flex-1 text-xs sm:text-sm text-a2a2a2'>Information</div>
                    </div>}
                    {txhistory.length > 0 && txhistory.map((item: any, i: number) =>
                        <div key={i} className={cx('flex items-center py-[5px] text-171a1e leading-normal')}>
                            <div className='flex-1 max-w-[20px] sm:max-w-[150px]'>{(item.status ? 'Completed' : 'Processing')}</div>
                            <div className='flex-1 max-w-[20px] sm:max-w-[200px] text-xs sm:text-sm'>{item.coin}</div>
                            <div className='flex-1 text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html:item.value as any }}></div>
                            <div className='flex-1  text-xs sm:text-sm'>{item.date}</div>
                            <div className='flex-1  text-xs sm:text-sm'>{item.info}</div>
                        </div>
                    )}
                    {txhistory.length == 0 &&
                        <div className='h-16 flex items-center justify-center'>
                            You have no history
                        </div>
                    }
                </div>
            </div>
        </>
    );
}