import { Component } from "react";
import Header, { NavbarType } from "../header";
import styles from "./styles.module.css";
import cx from "classnames";
import Image from "next/image";



interface Props {
    headingOne: string,
    headingTwo?: string,
    source: any,
    list?: any
}

interface State {

}
class BlueBanner extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <>

                <Header navbarType={NavbarType.primary} />
                <div className="lg:h-[422px] h-auto bg-2152FA rounded-b-[40px] mb-[60px]">
                    <div className={cx('container max-w-[1240px] lg:flex lg:justify-between block text-center xl:p-[68px_65px_0px] lg:p-[68px_16px_0px] p-[30px_16px_30px]')}>
                        <div className="self-center">
                            <h1 className="lg:text-[60px] lg:text-left text-center sm:text-[40px] text-[24px] font-bold leading-normal text-white mb-[30px]">{this.props.headingOne}<br />{this.props.headingTwo}</h1>
                            {this.props.list && <ul>
                                {this.props.list.map((item: any, index: number) => (
                                    <li className="text-[16px] font-medium leading-[1.88] tracking-normal text-e3e3e3 list-none" key={index}><span className="mr-[9px] relative top-[-2px]"><Image src="/assets/images/sparkle.png" alt="sparkels" width={12} height={12} /></span>{item}</li>
                                ))}
                                {/* <li><span><Image src="/assets/images/sparkle.png" alt="description of image" width={12} height={12} /></span>Up to 40% commission income from transactions of your referrals</li>
                                <li><span><Image src="/assets/images/sparkle.png" alt="description of image" width={12} height={12} /></span>Up to 10% commission discount to your referrals</li>
                                <li><span><Image src="/assets/images/sparkle.png" alt="description of image" width={12} height={12} /></span>200 points per your traded referrals</li> */}
                            </ul>
                            }
                        </div>
                        <div className="relative lg:w-[300px] lg:h-[271px] sm:w-[250px] sm:h-[220px] w-[200px] h-[200px] mx-auto lg:m-0 ">
                            {this.props.source}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default BlueBanner;