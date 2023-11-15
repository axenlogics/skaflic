import { Component } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import cx from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
    label: any,
    content: any,
    number: any
}

interface State {
    pannelOpen: boolean,

}
class Accordians extends Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            pannelOpen: false
        }
    }
    togglePanel = () => {
        this.setState({ pannelOpen: this.state.pannelOpen ? false : true });
    }

    render() {
        return (
            <>
                <div className="max-w-[1320px] w-full sm:p-[29px_49px_28px_31px] p-[29px_15px_28px_15px] rounded-[20px] bg-eef2ff relative mb-[20px]">
                    <div className="flex items-baseline">
                        <p className="sm:text-[18px] text-[14px] txt-gradient-10 txt-gradient leading-normal tracking-normal font-bold m-0 sm:pr-[28px] pr-[10px]">{this.props.number}</p>
                        <h5 className="sm:text-[18px] text-[14px] font-medium leading-normal tracking-normal text-22262e m-0">{this.props.label}</h5>
                        <span className="block absolute sm:right-[48px] right-[15px] sm:top-[32px] top-[29px] cursor-pointer" onClick={this.togglePanel}>
                            {this.state.pannelOpen &&
                                <FontAwesomeIcon icon={faAngleUp} style={{ fontSize: 20, color: '#343a59' }} />
                            }
                            {!this.state.pannelOpen &&
                                <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: 20, color: '#343a59' }} />
                            }
                        </span>
                    </div>
                    {this.state.pannelOpen &&
                        <div className="text-[16px] font-normal leading-normal tracking-normal text-22262e sm:p-[15px_45px] p-[15px_26px]">
                            {this.props.content}
                        </div>
                    }

                </div>
            </>
        )
    }
}
export default Accordians;