import React from 'react';
import styles from './style.module.css';
import cx from "classnames";
import { twMerge } from 'tailwind-merge';

interface Props {
    id: string,
    label?: any,
    className?: any,
    labelClassName?: string,
    svgpath? : string,
    o?:any;
}

const Checkbox = ({ id = "chkbox", label='', className , o=false, labelClassName} : Props) => {
    const [checked, setChecked] = React.useState(true);
    return (
        <div className={cx('flex select-none', className)}>
            <input className='p-0 cursor-pointer hidden' id={id} type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />
            {o &&<label className={twMerge("flex text-34345b font-medium cursor-pointer relative items-center before:content-[''] before:appearance-none before:bg-transparent before:border-solid before:top-[1px] before:border-[1px] before:border-a2a2a2 before:p-[7px] before:rounded-sm",checked?"before:border-[0px] after:content-[''] after:bg-[url('/assets/images/icons/checkmark.svg')] after:absolute after:top-[3px] after:left-[0px] after:w-[16px] after:mr-2 after:h-[16px]":'', labelClassName)} htmlFor={id}><span className={cx( checked?'pl-[8px]':'pl-[6px]','text-a2a2a2')}>{label}</span></label>}
            {!o &&<label className={twMerge("flex text-34345b font-medium cursor-pointer relative items-center before:content-[''] before:appearance-none before:bg-transparent before:border-solid before:border-[1px] before:border-a2a2a2 before:p-[7px] before:rounded-sm",checked?"after:border-solid after:border-[1px] after:border-a2a2a2 after:content-[''] after:absolute after:top-[3px] after:left-[0.35rem] after:w-[0.30rem] after:h-[0.48rem] after:border-r-2 after:border-b-2 after:border-t-0 after:border-l-0 after:rotate-45":'', labelClassName)} htmlFor={id}><span className='pl-[10px] text-a2a2a2'>{label}</span></label>}
        </div>
    );
};
export default Checkbox;