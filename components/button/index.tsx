import Link from 'next/link';
import styles from './style.module.css';
import cx from "classnames";
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  className?: string,
  type: ButtonType,
  children: any,
  onClick?: () => void
}

interface ButtonLinkProps {
  className?: string,
  type: ButtonType,
  children: any,
  href: string
}

const buttonType = {
  "primary" : "text-white bg-primary border-primary hover:text-white hover:bg-primary hover:border-primary",
  "success" : "text-white bg-success border-success hover:text-white hover:bg-success hover:border-success",
  "danger" : "text-white bg-danger border-danger hover:text-white hover:bg-danger hover:border-danger",
  "default" : "text-black bg-white border-white hover:text-black hover:bg-white hover:border-white",
  "disable" : "text-a2a2a2 bg-e9eff6 border-white hover:text-black hover:bg-e9eff6 hover:border-white",
  "white" : "text-primary bg-white border-white hover:text-white hover:bg-white hover:text-primary",
  "outline_primary": "text-primary border-primary hover:text-white hover:bg-primary hover:border-primary",
  "outline_white": "text-white border-white hover:text-primary hover:bg-white hover:border-white",

} as any;

export function Button({ className, type, children, onClick } : ButtonProps) {
  const btnType = buttonType[type];

    return (
      <button className={twMerge('inline-block font-medium text-center px-3 py-2 border border-solid align-middle select-none text-base rounded-md font-sans', className, btnType)} onClick={onClick}>{children}</button>
    );
}

export function ButtonLink({ className, href, type, children } : ButtonLinkProps) {
  const btnType = buttonType[type];

  return (
    <Link href={href} className={twMerge('inline-block font-medium text-center px-3 py-2 border border-solid align-middle select-none text-base rounded-md font-sans', btnType, className)}>{children}</Link>
    );
}

export enum ButtonType {
  primary = "primary",
  success = "success",
  danger = "danger",
  default = "default",
  disable = "disable",
  white = "white",
  outline_primary = "outline_primary",
  outline_white = "outline_white"
}

