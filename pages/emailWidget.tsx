import styles from "../styles/EmailWidget.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
function EmailWidget() {
    return (
        <>
            <section className={cx('sm:p-[0px_15px_98px] p-[0px_15px_30px]')}>
                <div className={cx('max-w-[400px] w-[100%] mx-auto')}>
                    <div className={cx('text-center')}>
                        <p className={cx('lg:text-[18px] text-[14px] font-medium leading-normal tracking-normal text-c5c5c5 pb-[18px]')}>Start trading with <span className={cx('lg:text-[18px] text-[14px] font-medium leading-normal tracking-normal text-85919c')}>zero commission</span></p>
                        <div>
                            <div className={cx('relative')}>
                                <input className={cx('max-w-[400px] w-[100%] h-[60px] lg:text-[18px] text-[14px] font-medium leading-[60] tracking-normal text-7f7f7f p-[0px_8px_0px_37px] rounded-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.08)] border-solid border-f5f5f5 bg-f5f9ff] text-left outline-0')} type="text" placeholder="Mobile Phone / E-mail" />
                                <span className={cx('bg-2072ef h-[40px] w-[40px] rounded-[50%] border-solid border-2072ef absolute top-[10px] right-[6px]')}>
                                    <Image className={cx('relative top-[10px]')} src="/assets/arrowright.svg" alt="Arrow" width={16} height={16} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )

}
export default EmailWidget;
