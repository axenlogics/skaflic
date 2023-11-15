import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export enum NavDropPositon {
    left = "left",
    right = "right"
}

interface NavProps {
  className?: string;
  children: any;
  show?: boolean;
  isTransition?: boolean;
  iconClassName?: string;
  dropPositon?: NavDropPositon;
}

interface NavLinkProps {
    className?: string;
    children: any;
    href: string;
    isActive?: boolean;
}

const NavList = ({ className, children}: NavProps) => {
    return <ul className={twMerge('lg:flex items-center', className)}>{children}</ul>
}

const NavItem = ({ className, children}: NavProps) => {
    return <Menu as="li" className={twMerge('lg:mx-2', className)}>{children} </Menu>
}

const NavButton = ({ className, children }: NavProps) => {
    return <Menu.Button className={twMerge("nav-link flex w-full justify-between items-center font-medium text-[15px] py-1 px-5 lg:p-1 focus:outline-none", className)}>
                    {children}
            </Menu.Button>
}

const NavLink = ({ className, children, isActive, href }: NavLinkProps) => {
    return <Link href={href} className={twMerge(`nav-link block font-medium text-[15px] py-2 px-5 lg:p-1 ${isActive ? 'text-primary' : ''}`, className)}>{children}</Link>
}

const NavDropDown = ({ className, dropPositon = NavDropPositon.left, iconClassName, show, children, isTransition = true }: NavProps) => {
    if(isTransition){
        return  (<Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            show={show}
            >
            <Menu.Items className={twMerge(`nav-dp lg:absolute ${dropPositon === "left" ? "left-2" : "right-[-52px]"} z-50 mt-2.5 min-w-[220px] relative rounded-xl pt-2.5 pb-3.5 px-7`, className)}>
                <span className={twMerge(`caret-up absolute border-x-[12px] border-x-transparent border-solid border-b-[9px] ${dropPositon === "left" ? "left-[48px]" : "right-[51px]"} top-[-9px]`, iconClassName)}></span>
                {children}</Menu.Items>
        </Transition>
        )
    }
    else {
        return <Menu.Items className={twMerge("nav-dp z-10 min-w-[220px] relative", className)}>{children}</Menu.Items>
    }
}


const NavDropDownLink = ({ className, children, href }: NavLinkProps) => {
    return <Link href={href} className={twMerge(`dp-link flex font-normal items-center py-2 px-5 lg:px-0`, className)}>{children}</Link>
}

const NavDropDownTitle = ({ className, children}: NavProps) => {
    return <h6 className={twMerge('font-medium text-primary lg:pt-3.5 lg:pb-1 pt-2 pb-2 mx-5 lg:mx-0', className)}>{children}</h6>
}

const NavDropDownDivider = ({className} : {className ?: string}) => {
    return <div className={twMerge('dp-divid lg:my-3 lg:mx-0 mx-5 border-t border-solid', className)}></div>
}

export { NavList, NavItem, NavLink, NavButton, NavDropDown, NavDropDownTitle, NavDropDownLink, NavDropDownDivider}