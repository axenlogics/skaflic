import React, { useEffect, useState } from 'react';
import OtpInput from 'react18-input-otp';
import styles from './style.module.css';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

interface Props {
    cellCount?: number;
    onOtpChange: any;
    labelLeft?: any;
    labelRight?: any;
    labelBottom?: boolean;
    inputClassName?: string;
    labelClassName?: string;
    labelLeftClassName?: string;
    labelRightClassName?: string;
    labelBottomLeft?: any;
    labelBottomRight?: any;
    labelBLeftClassName?: any;
    labelBRightClassName?: any;
}

export const OtpInputField = (props: Props) => {    
    const cellCount = props.cellCount || 6;
    const [value, setValue] = useState('');

    useEffect(() => {
      let isMounted = true; 
      if(isMounted){
        props.onOtpChange(value)
      }

      return () => {
        isMounted = false
      }
     });

    const handleChange = (otp:string) => setValue(otp);

     return <div className={cx("mb-5", props.inputClassName)}>
          {(props.labelLeft || props.labelRight) && <div className={twMerge("text-34345b font-medium items-center mb-2 flex justify-between", props.labelClassName)}>
            {props.labelLeft && <label className={twMerge(props.labelLeftClassName)}>{props.labelLeft}</label>}
            {props.labelRight && <label className={twMerge("font-bold text-base text-dark-light hover:text-34345b", props.labelRightClassName)}>{props.labelRight}</label>}
          </div>}
          <OtpInput containerStyle={styles.otp_container} value={value} onChange={handleChange} numInputs={6} isInputNum/>
          {(props.labelBottomLeft || props.labelBottomRight) && <div className={twMerge("text-right mt-1")}>
            {props.labelBottomLeft && <label className={props.labelBLeftClassName}>{props.labelBottomLeft}</label>}
            {props.labelBottomRight && <label className={twMerge("font-medium text-ebece9 hover:text-34345b", props.labelBRightClassName)}>{props.labelBottomRight}</label>}              
          </div>}
     </div>
}


