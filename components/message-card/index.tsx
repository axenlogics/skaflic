import Image from 'next/image';
import cx from "classnames";

export function MessageCard({text} : any) {

    return (
        <>
        <div className={cx('flex items-center m-[0px_0px_30px] sm:m-[0px_0px_40px] rounded-[12px] lg:rounded-[12px] bg-fff0c2 bg-blend-normal')}>
            <Image className={'m-[0_18px] sm:m-[0_22px] md:m-[0_30px]'} src={`/assets/images/icons/danger-sign.svg`} alt={'info'}  width={24} height={24}/>
            <div className={'text-xs md:text-sm p-[10px_15px_10px_0] sm:p-[12px_15px_12px_0] '}>
            {text}
            </div>
        </div>
        </>
    );
}