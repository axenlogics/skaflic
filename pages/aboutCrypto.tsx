import styles from "../styles/AboutCrypto.module.css";
import cx from "classnames";
import Image from "next/image";
function AboutCrypto() {
    return (

        <section className={cx('sm:pb-[143px] pb-[30px] lg:px-[30px] px-[15px]')}>
            <div className={cx('container max-w-1110')}>
                <h2 className={cx('text-center mb-[30px]')}>
                    <span className="sm:text-[28px] text-[24px] md:text-[36px] leading-normal tracking-normal font-bold txt-gradient txt-gradient-3">Everything you're looking for about cryptocurrencies</span>
                </h2>
                <div className={cx('lg:flex lg:justify-center')}>
                    <div className={cx(' max-w-[520px] w-[100%] lg:mx-[20px] mx-auto lg:pb-0 pb-[44px]')}>
                        <div className={cx('max-w-[520px] w-[100%] h-auto lg:p-[29px_52px_24px_54px] p-[29px_15px_24px] rounded-[20px] shadow-[5px_5px_10px_0_rgba(0, 0, 0, 0.06)] bg-gradient-bottom')}>
                            <div>
                                <h5 className={cx('text-[18px] lg:text-[24px] font-bold leading-normal tracking-normal text-white pb-[17px]')}>Blogs<span className={cx('text-[21px] font-normal leading-normal tracking-normal text-white')}>Chain</span></h5>
                                <div className={cx('text-right')}>
                                    <Image className={cx('align-middle')} src="/assets/blogchain.png" alt="Block Chain" width={300} height={215.4} />
                                </div>
                                <p className={cx('text-[22px] lg:text-[30px] font-medium leading-normal tracking-normal text-white m-0')}>The latest</p>
                                <p className={cx('text-[22px] lg:text-[30px] font-medium leading-normal tracking-normal text-white m-0')}>crypto news and trends</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('pb-[44px]')}>
                            <div className={cx('mx-auto max-w-[520px] h-[180px] w-[100%] lg:p-[29px_35px_32.1px_35px] p-[29px_15px_32.1px] rounded-[20px] flex items-center shadow-[5px_5px_10px_0px_rgba(0, 0, 0, 0.06)] bg-gradient-bottom-green')}>
                                <div className="shrink-0">
                                    <Image className={cx('align-middle xl:mr-[42px] mr-[20px]')} src="/assets/glossary.png" alt="Commonly spoken terms" width={128} height={115.9} />
                                </div>
                                <div className="max-w-[230px]">
                                    <h6 className={cx('text-[18px] lg:text-[24px] font-bold leading-normal tracking-normal text-white pb-[20px]')}>Glossary</h6>
                                    <p className={cx('text-[14px] lg:text-[18px] font-normal leading-normal tracking-normal text-white pr-[15px]')}>Commonly spoken terms in the crypto universe</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx('mx-auto max-w-[520px] h-[180px] w-[100%] lg:p-[29px_35px_32.1px_35px] p-[29px_15px_32.1px] rounded-[20px] flex items-center shadow-[5px_5px_10px_0px_rgba(0, 0, 0, 0.06)] bg-gradient-bottom-magenta')}>
                                <div className="shrink-0">
                                    <Image className={cx('align-middle xl:mr-[42px] mr-[20px]')} src="/assets/analysis.png" alt="market analysis" width={128} height={133.9} />
                                </div>
                                <div className="max-w-[230px]">
                                    <h6 className={cx('text-[18px] lg:text-[24px] font-bold leading-normal tracking-normal text-white pb-[20px]')}>Market Analysis</h6>
                                    <p className={cx('text-[14px] lg:text-[18px] pr-[15px] w-full font-normal leading-normal tracking-normal text-white')}>Real-time market analysis and key metrics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}
export default AboutCrypto;
