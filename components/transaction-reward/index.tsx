import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button } from "../button";
import cx from "classnames";

export function TransactionReward({ className, icon, text, heading } : any) {

    const txhistory=[
        {'estatus':false,'coin':'TRY','value':'5.783,57000000','date':'09.12.2022 17:14','channel':'Bank Transfer','status':'Processing'},
        {'estatus':true,'coin':'USDT','value':'7.271,05948392','date':'09.12.2022 17:13','channel':'Tron TRC-20','status':'Processing'},
        {'estatus':false,'coin':'TRY','value':'124.783,57000000','date':'09.12.2022 17:14','channel':'Bank Transfer','status':'Sent'},
        {'estatus':true,'coin':'ETH','value':'12,83920000','date':'09.12.2022 17:13','channel':'Ethereum ERC-20','status':'Received'},
        {'estatus':false,'coin':'TRY','value':'100,00000000','date':'09.12.2022 17:14','channel':'Bank Transfer','status':'Sent'},
        {'estatus':true,'coin':'AVAX','value':'120,00000000','date':'09.12.2022 17:13','channel':'Avalanche C-Chain','status':'Received'},
    ]
    function markZero(val:any){
        let v=val
        let nv=v.split('').reverse();
        let zero=[];
        for(let el of nv){
            if(el!=0){
                break; 
            }
            zero.push(el);
        }
        let vv=val.substring(0,(val.length-zero.length))
        // 
        return vv+'<span class="text-ebece9">'+zero.join('')+'</span>';
    }
    return (
        <>
    <div className={cx('p-[18px_15px_11px_15px] sm:p-[33px_27px_13px_30px] rounded-[20px] w-full bg-white shadow-normal',className)}>
        <Tabs defaultIndex={0}  selectedTabClassName={'!text-171a1e font-medium'}>
            <div className={cx('flex items-center pb-2.5 border-solid border-b-[1px] border-e9eff6 ')}>
                <TabList className={'hidden md:flex items-center list-none w-full justify-start'}>
                    <Tab className={'text-sm sm:text-base text-a2a2a2 leading-normal tracking-normal md:pr-[54px] cursor-pointer'}><div>Transaction History</div></Tab>
                    <Tab className={'text-sm sm:text-base sm:text-a2a2a2 leading-normal tracking-normal cursor-pointer'}><div>Reward History</div></Tab>
                </TabList>
            </div>
            <div className='pt-3'>
                <TabPanel>
                {txhistory.map((item:any,i:number) => 
                    <div key={i} className={cx('flex items-center py-[2px] text-171a1e leading-normal',i>1?'opacity-[0.15018137]':'')}>
                        <div className='flex-1 max-w-[20px] sm:max-w-[30px]'><div className={cx('w-[8px] h-[8px] rounded-[10px] p-0',item.estatus?'bg-success':'bg-danger')}></div></div>
                        <div className='flex-1 max-w-[20px] sm:max-w-[50px] text-xs sm:text-sm'>{item.coin}</div>
                        <div className='flex-1 text-end text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html:markZero(item.value)}}></div>
                        <div className='flex-1 pl-8 text-center text-xs sm:text-sm'>{item.date}</div>
                        <div className='flex-1 pl-8  text-xs sm:text-sm'>{item.channel}</div>
                        <div className='flex-1 pl-8 text-xs sm:text-sm'>{item.status}</div>
                    </div>
                )}
                </TabPanel>
                <TabPanel>
                    {txhistory.map((item:any,i:number) => 
                        <div key={i} className={cx('flex items-center py-[2px] text-171a1e leading-normal',i>1?'opacity-[0.15018137]':'')}>
                            <div className='flex-1 max-w-[20px] sm:max-w-[30px]'><div className={cx('w-[8px] h-[8px] rounded-[10px] p-0',item.estatus?'bg-success':'bg-danger')}></div></div>
                            <div className='flex-1 max-w-[20px] sm:max-w-[50px] text-xs sm:text-sm'>{item.coin}</div>
                            <div className='flex-1 text-end text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html:markZero(item.value)}}></div>
                            <div className='flex-1 text-end text-xs sm:text-sm'>{item.date}</div>
                            <div className='flex-1 text-xs sm:text-sm'>{item.channel}</div>
                            <div className='flex-1 text-xs sm:text-sm'>{item.status}</div>
                        </div>
                    )}
                </TabPanel>
            </div>
        </Tabs>
    </div>
    </>
    );
}