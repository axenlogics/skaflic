import React from 'react'
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

export const SocialAuthButton = ({ className, btnClassName, textGoogle, textApple, onClickGoogle, onClickApple}: any) => {
  return  (
        <>
            <div className='text-center border-b border-solid border-f1f1f1 mt-8 mb-7 text-base text-dbdbdb leading-[.1em]'>
                    <span className='px-1 bg-white'>or</span>
            </div>
        
  
            <div className={twMerge('grid gap-6 grid-cols-2', className)}>
                <button onClick={onClickGoogle} type="button" className={twMerge('border-0 bg-24292f items-center text-white text-sm font-sans rounded-[5px] px-3 sm:px-5 py-1.5 flex-1 inline-flex text-center leading-7', btnClassName)}>
                    <Image className='mr-3' src="/assets/images/icons/google.png" alt="google" width={24} height={24} />
                    <span>{textGoogle} </span>
                </button>
                <button onClick={onClickApple} type="button" className={twMerge('border-0 bg-24292f items-center text-white text-sm font-sans rounded-[5px] px-3 sm:px-5 py-1.5 flex-1 inline-flex text-center leading-7', btnClassName)}>
                    <Image className='mr-3' src="/assets/images/icons/apple.png" alt="apple" width={24} height={24} />
                    {textApple}
                </button>
            </div>
        </>
    )
    }