// import styles from "./style.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
// import styles from "./style.module.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Component, useState } from 'react';
import React from "react";
import Header, { NavbarType } from "../components/header";
import Footer from "./footer";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown, faL } from '@fortawesome/free-solid-svg-icons'
import { IKycModal } from "../helpers/interfaces";
import { GeoService } from "../helpers/user/geoservice";
import { KycService } from "../helpers/user/kycservice";
import { CNotificationType, CustomNotification } from "../helpers/notification";


interface Props {

}
interface State extends IKycModal {
    dropVisible: boolean,
    showBackdrop: boolean,
    expand: {
        marketCurrency?: boolean,
        baseCurrency?: boolean,
        side?: boolean,
        date: '',
        con?: boolean,
    },
    hideshow?: boolean,
    hideshow1?: boolean,
    months: number[],
    days: number[],
    years: number[],
    countries: string[],
}

class Kyc extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showBackdrop: false,
            dropVisible: false,
            expand: {
                marketCurrency: false,
                baseCurrency: false,
                side: false,
                con: false,
                date: '',

            },
            hideshow: true,
            hideshow1: true,
            City: '',
            Day: '',
            Fname: '',
            Lname: '',
            Mname: '',
            Month: '',
            Nation: '',
            Street: '',
            Year: '',
            Zip: '',
            days: [],
            months: [],
            years: [],
            countries: [],
        }
    }
    month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    pannelOpen = async (type: any) => {
        // alert('faisal');

        // if(type === 'market') {

        const exp: any = { ...this.state.expand };
        // this.setState({})
        exp[type] = exp[type] ? false : true;
        this.setState({ expand: exp });
        // if(exp[type]){
        this.setState({ showBackdrop: true })
    }
    closebackDrop = () => {
        this.setState({ showBackdrop: false });
        this.setState({ expand: { baseCurrency: false, marketCurrency: false, side: false, con: false, date: '' } })
    }
    nextpara = async () => {
        let modal = {
            City: this.state.City,
            Day: this.state.Day,
            Fname: this.state.Fname,
            Lname: this.state.Lname,
            Mname: this.state.Mname,
            Month: 2, //this.state.Month,
            Nation: 4, // this.state.Nation,
            Street: this.state.Street,
            Year: this.state.Year,
            Zip: this.state.Zip,
        }
        let res = await KycService.getInstance().updateAccount(modal);
        CustomNotification.show(res, CNotificationType.Success);
        // console.log('kyc response', res, modal);
        this.setState({ hideshow: false });
    }
    nextpara1 = () => {
        this.setState({ hideshow1: false });
    }
    getDays = (year: any, month: any) => {
        return new Date(year, month, 0).getDate();
    };

    changeValue(type: any, value: any) {
        this.setState({
            ...this.state,
            [type]: value
        }, () => {
            console.log('value now', this.state)
        });
        this.closebackDrop();
    }
    updateDays() {
        let day = [];
        for (let i = 1; i < 32; i++) {
            day.push(i);
        }
        this.setState({ days: day });
    }
    updateYears = (startYear?: any) => {
        var currentYear = new Date().getFullYear(), years = [];
        startYear = startYear || 1980;
        while (startYear <= currentYear) {
            years.push(startYear++);
        }
        this.setState({ years: years });
        // return years;
    }
    daysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    }
    updateCountries = async () => {
        //    let countries = await GeoService.getInstance().getCountries();
        //    
        //    i
        var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
        this.setState({ countries: country_list });
        //    console.log('countries array', countries);
    }
    componentDidMount(): void {
        this.updateDays();
        this.updateYears();
        this.updateCountries();

    }

    render(): React.ReactNode {


        return (
            <>
                <Header navbarType={NavbarType.primary} />
                <div className="container mx-auto p-[0_15px]">
                    <div className="h-auto bg-white mt-[53px] mb-[100px] shadow-[0_10px_5px_0_rgba(8,12,52,0.06)] rounded-[6px] lg:p-[40px_56px_35px] p-[40px_15px_35px]">
                        <div className="border-b border-solid border-dfdfe4">
                            <h1 className="sm:text-[32px] text-[20px] font-bold leading-normal tracking-normal text-171a1e lg:mb-[40px] mb-[15px]">KYC Verification</h1>
                        </div>
                        {this.state.hideshow &&
                            <form action="">
                                <div className="lg:flex block">
                                    <div className="lg:max-w-[626px] max-w-full w-full lg:border-r border-solid border-dfdfe4 pt-[25px]">
                                        <div className="flex justify-between lg:pr-[50px] pr-0">
                                            <div className="lg:max-w-[309px] max-w-full w-full pr-[20px]">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">First Name</label>
                                                <input
                                                    value={this.state.Fname}
                                                    onChange={(ev: any) => this.changeValue('Fname', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[309px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                                    placeholder="Jack" />
                                            </div>
                                            <div className="lg:max-w-[309px] max-w-full w-full">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Middle Name</label>
                                                <input
                                                    value={this.state.Mname}
                                                    onChange={(ev: any) => this.changeValue('Mname', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[309px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                                    placeholder="Optional..." />
                                            </div>
                                        </div>
                                        <div className="pt-[25px]">
                                            <div className="lg:max-w-[412px] max-w-full w-full">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Last Name</label>
                                                <input
                                                    value={this.state.Lname}
                                                    onChange={(ev: any) => this.changeValue('Lname', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[412px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0" type="text" id="first" name="first" placeholder="Dowson" />
                                            </div>
                                        </div>
                                        <div className="pt-[25px]">
                                            <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Date of Birth</label>
                                            {this.state.showBackdrop && <div onClick={() => this.closebackDrop()} className="fixed top-0 bottom-0 left-0 right-0 pointer-events-auto opacity-100 bg-transparent z-[1]"></div>}
                                            <div className={cx('xl:flex block items-center w-full lg:pr-[35px] pr-0')}>
                                                <div className="relative xl:pb-0 pb-[15px] xl:m-[0px_15px_0px_0px] lg:m-[0px_4px] m-[0px_4px_15px] lg:max-w-[197px] max-w-full w-full">
                                                    <input
                                                        value={this.state.Day}
                                                        onChange={(ev: any) => this.changeValue('Day', ev.target.value)}
                                                        className={cx('border border-solid border-080c341f bg-white sm:h-[56px] h-[42px] xl:max-w-[197px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')}
                                                        type="text"
                                                        placeholder="Day" />
                                                    <span className={cx('bg-FBFBFB max-w-[64px] border border-solid border-080c341f sm:h-[56px] h-[42px] block w-full rounded-[4px] absolute top-0 right-0')} data-test="test" onClick={() => this.pannelOpen('marketCurrency')}>
                                                        {this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleUp} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                        {!this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleDown} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                    </span>
                                                    {this.state.expand?.marketCurrency && <div className={cx('!absolute z-[3] xl:w-[200px] w-full')}>
                                                        <div className={cx('h-[250px] overflow-y-scroll shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                                            {/* <SimpleBar style={{ maxHeight: 260 }}> */}
                                                            <ul>
                                                                {this.state.days.map((t: any) =>
                                                                    <li
                                                                        onClick={() => { this.changeValue('Day', t) }}
                                                                        key={t.toString()} className={cx('list-none text-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:bg-00c89612')}>
                                                                        <div
                                                                            className={cx('text-[16px] font-bold text-dark')}>
                                                                            {t}
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            {/* </SimpleBar> */}
                                                        </div>
                                                    </div>}
                                                </div>
                                                {/* <h6 className={('text-[14px] leading-[0.56px] mx-[0px_10px] text-dark lg:block inline-block lg:p-0 p-[0px_0px_15px_5px]')}>/</h6> */}
                                                <div className="relative xl:pb-0 pb-[15px] xl:m-[0px_15px_0px_0px] lg:m-[0px_4px] m-[0px_4px_15px] lg:max-w-[197px] max-w-full w-full">
                                                    <input
                                                        value={this.state.Month}
                                                        onChange={(ev: any) => this.changeValue('Month', ev.target.value)}
                                                        className={cx('border border-solid border-080c341f bg-white sm:h-[56px] h-[42px] lg:max-w-[197px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')}
                                                        type="text"
                                                        placeholder="Month..." />
                                                    <span className={cx('bg-FBFBFB max-w-[64px] border border-solid border-080c341f sm:h-[56px] h-[42px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('baseCurrency')}>
                                                        {this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleUp} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                        {!this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleDown} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                    </span>
                                                    {this.state.expand?.baseCurrency && <div className={cx('!absolute z-[3] xl:w-[200px] w-full')}>
                                                        <div className={cx('h-[250px] overflow-y-scroll shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                                            {/* <SimpleBar style={{ maxHeight: 260 }}> */}
                                                            <ul>
                                                                {this.month.map((t: any) =>
                                                                    <li
                                                                        onClick={() => { this.changeValue('Month', t) }}
                                                                        key={t.id} className={cx('list-none text-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:bg-00c89612')}>
                                                                        <div className={cx('text-[16px] font-bold text-dark')}>
                                                                            {t}
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            {/* </SimpleBar> */}
                                                        </div>
                                                    </div>}
                                                </div>
                                                {/* <h6 className={('text-[14px] leading-[0.56px] mx-[0px_10px] text-dark lg:block inline-block lg:p-0 p-[0px_0px_15px_5px]')}>side</h6> */}
                                                <div className="relative xl:pb-0 pb-[15px] xl:m-[0px_15px_0px_0px] m-[0px_4px] lg:max-w-[197px] max-w-full w-full">
                                                    <input
                                                        value={this.state.Year}
                                                        onChange={(ev: any) => this.changeValue('Year', ev.target.value)}
                                                        className={cx('border border-solid border-080c341f bg-white sm:h-[56px] h-[42px] lg:max-w-[197px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')}
                                                        type="text"
                                                        placeholder="Year..." />
                                                    <span className={cx('bg-FBFBFB max-w-[64px] border border-solid border-080c341f sm:h-[56px] h-[42px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('side')}>
                                                        {this.state.expand?.side && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleUp} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                        {!this.state.expand?.side && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleDown} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                    </span>
                                                    {this.state.expand?.side && <div className={cx('absolute z-[3] xl:w-[197px] w-full')}>
                                                        <div className={cx('h-[250px] overflow-y-scroll shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                                            {/* <SimpleBar style={{ maxHeight: 260 }}> */}
                                                            <ul>
                                                                {this.state.years.map((t: any) =>
                                                                    <li
                                                                        onClick={() => { this.changeValue('Year', t) }}
                                                                        key={t.id} className={cx('list-none h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:bg-00c89612 text-center')}>
                                                                        <div

                                                                            className={cx('text-[16px] font-bold text-dark')}>
                                                                            {t}
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            {/* </SimpleBar> */}
                                                        </div>
                                                    </div>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:max-w-[626px] max-w-full w-full lg:pl-[60px] pl-0">
                                        <div className="pt-[25px]">
                                            <div className="relative xl:m-[0px_15px_0px_0px] lg:m-[0px_4px] m-[0px_4px_15px] lg:max-w-[566px] max-w-full w-full">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Nationality</label>
                                                <input
                                                    value={this.state.Nation}
                                                    onChange={(ev: any) => this.changeValue('Nation', ev.target.value)}
                                                    className={cx('border border-solid border-080c341f bg-white sm:h-[56px] h-[42px] lg:max-w-[566px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_20px] sm:text-[16px] text-[14px] text-171a1e font-bold')}
                                                    type="text"
                                                    placeholder="Central African Republic" />
                                                <span className={cx('bg-FBFBFB max-w-[64px] border border-solid border-080c341f sm:h-[56px] h-[42px] block w-full rounded-[4px] absolute top-[31px] right-0')} data-test="test" onClick={() => this.pannelOpen('con')}>
                                                    {this.state.expand?.con && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleUp} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                    {!this.state.expand?.con && <FontAwesomeIcon className={cx('absolute sm:top-[17px] top-[11px] right-[22px]')} icon={faAngleDown} style={{ fontSize: 20, color: '#8c8fae' }} />}
                                                </span>
                                                {this.state.expand?.con && <div className={cx('!absolute z-[3] xl:w-[559.9px] w-full')}>
                                                    <div className={cx('h-[250px] overflow-y-scroll shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                                        {/* <SimpleBar style={{ maxHeight: 260 }}> */}
                                                        <ul>
                                                            {this.state.countries.map((t: any) =>
                                                                <li
                                                                    onClick={() => { this.changeValue('Nation', t) }}
                                                                    key={t} className={cx('list-none text-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:bg-00c89612')}>
                                                                    <div className={cx('text-[16px] font-bold text-dark')}>
                                                                        {t}
                                                                    </div>
                                                                </li>
                                                            )}
                                                        </ul>
                                                        {/* </SimpleBar> */}
                                                    </div>
                                                </div>}
                                            </div>
                                        </div>
                                        <div className="flex justify-between pt-[25px]">
                                            <div className="lg:max-w-[412px] max-w-full w-full pr-[20px]">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">City</label>
                                                <input
                                                    value={this.state.City}
                                                    onChange={(ev: any) => this.changeValue('City', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[412px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                                    placeholder="Lahore" />
                                            </div>
                                            <div className="lg:max-w-[197px] max-w-full w-full">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Zip Code</label>
                                                <input
                                                    value={this.state.Zip}
                                                    onChange={(ev: any) => this.changeValue('Zip', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[197px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                                    placeholder="04060..." />
                                            </div>
                                        </div>
                                        <div className="flex justify-between pt-[25px]">
                                            <div className="lg:max-w-[632px] max-w-full w-full">
                                                <label className="block text-[14px] leading-normal tracking-normal text-0b0c19 opacity-50 pb-[10px]" htmlFor="first">Address</label>
                                                <input
                                                    value={this.state.Street}
                                                    onChange={(ev: any) => this.changeValue('Street', ev.target.value)}
                                                    className="bg-FBFBFB lg:max-w-[632px] max-w-full w-full sm:text-[16px] text-[14px] font-bold leading-normal tracking-normal text-171a1e sm:h-[56px] h-[42px] rounded-[4px] border border-solid border-080c341f px-[20px] outline-0"
                                                    type="text"
                                                    id="first"
                                                    name="first"
                                                    placeholder="Kotovskogo str., 3, app. 46" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:text-right text-center xl:mt-[62px] mt-[30px]">
                                    <button onClick={this.nextpara} type="button" className="max-w-[374px] w-full sm:p-[15px_37px] p-[8px_37px] border border-solid bg-primary border-primary rounded-[4px] sm:text-base text-sm text-white font-bold tracking-normal">
                                        Next
                                    </button>
                                </div>
                            </form>
                        }
                        {!this.state.hideshow && this.state.hideshow1 &&
                            <>
                                <div className="xl:flex block">
                                    <div className="xl:max-w-[800px] max-w-full w-full pt-[25px]">
                                        <div>
                                            <div className="flex items-center">
                                                <span className="">
                                                    <Image className="mr-[16px]" src="/assets/images/svg/attention.svg" alt="ID FRONT" height={24} width={24} />
                                                </span>
                                                <span className="sm:text-xl text-sm text-171a1e font-bold tracking-normal leading-normal">
                                                    Attention
                                                </span>
                                            </div>
                                            <div className="pl-[40px] pt-[20px]">
                                                <h4 className="sm:text-base text-sm text-primary font-bold tracking-normal leading-normal pb-[10px]">Upload both sides as separate files:</h4>
                                                <p className="sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal pr-[30px]">Regardless of document type, please upload both sides of the document (also in case of Passposts and Driver Licenses) as separate files.</p>
                                            </div>
                                            <div className="pl-[40px] pt-[20px]">
                                                <h4 className="sm:text-base text-sm text-primary font-bold tracking-normal leading-normal pb-[10px]">Picture of document and the note:</h4>
                                                <p className="sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal pr-[30px]">Picture should contain the document and a note next to your face. The handwritten note must say Comapny name and the current date. All the corners of the documents must be visible.</p>
                                            </div>
                                            <div className="pl-[40px] pt-[20px]">
                                                <h4 className="sm:text-base text-sm text-primary font-bold tracking-normal leading-normal pb-[10px]">Latin/english characters:</h4>
                                                <p className="pb-[25px] sm:text-sm text-xs text-171a1e font-normal tracking-normal leading-normal pr-[30px]">Please try upload documents that (also) contain latin characters and only in exceptions upload documents with only non-latin characters.</p>
                                            </div>
                                        </div>
                                        <div className="sm:flex block pb-[30px]">
                                            <div className="relative sm:mb-0 mb-[15px] xl:max-w-[240px] max-w-full w-full xl:h-[186px] h-[240px] border border-solid border-41b2c00f p-[17px_15px] mr-[30px] text-center bg-41b2c00f flex flex-col justify-center">
                                                <div className="pb-[10px]">
                                                    <Image className="mr-[16px]" src="/assets/images/svg/fron-id.svg" alt="ID FRONT" height={36} width={36} />
                                                </div>
                                                <input className="opacity-0 max--w-[224px] h-[185px] absolute left-0 w-full" type="file" />
                                                <div className="text-[12px] text-171a1e font-bold leading-normal tracking-normal">
                                                    Frontside of your Passport/ National ID/ Driver License
                                                </div>
                                            </div>
                                            <div className="relative sm:mb-0 mb-[15px] xl:max-w-[240px] max-w-full w-full xl:h-[186px] h-[240px]  border border-solid border-41b2c00f p-[17px_15px] mr-[30px] text-center bg-41b2c00f flex flex-col justify-center">
                                                <div className="pb-[10px]">
                                                    <Image className="mr-[16px]" src="/assets/images/svg/back-id.svg" alt="ID FRONT" height={36} width={36} />
                                                </div>
                                                <input className="opacity-0 max--w-[224px] h-[185px] absolute left-0 w-full" type="file" />
                                                <div className="text-[12px] text-171a1e font-bold leading-normal tracking-normal">
                                                    Backside of your Passport/ National ID/ Driver License
                                                </div>
                                            </div>
                                            <div className="relative sm:mb-0 mb-[15px] xl:max-w-[240px] max-w-full w-full xl:h-[186px] h-[240px]  border border-solid border-41b2c00f p-[17px_15px] lg:mr-[30px] mr-0 text-center bg-41b2c00f flex flex-col justify-center">
                                                <div className="pb-[10px]">
                                                    <Image className="mr-[16px]" src="/assets/images/svg/selfi.svg" alt="ID FRONT" height={36} width={36} />
                                                </div>
                                                <input className="opacity-0 max--w-[224px] h-[185px] absolute left-0 w-full" type="file" />
                                                <div className="text-[12px] text-171a1e font-bold leading-normal tracking-normal">
                                                    Please upload a selfie of you holding your ID and the note
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="xl:max-w-[466px] max-w-full w-full pl-[60px] pt-[25px] bg-img xl:flex hidden">
                                    </div>
                                </div>
                                <div className="xl:text-right text-center">
                                    <button onClick={this.nextpara1} type="button" className="max-w-[374px] w-full sm:p-[15px_37px] p-[8px_37px] border border-solid bg-primary border-primary rounded-[4px] sm:text-base text-[14px] text-white font-bold tracking-normal">
                                        Next
                                    </button>
                                </div>
                            </>
                        }
                        {!this.state.hideshow1 && !this.state.hideshow &&
                            <>
                                <div className="text-center">
                                    <div className="sm:pt-[50px] pt-[25px] sm:pb-[25px] pb-[15px]">
                                        <Image className="mr-[16px]" src="/assets/images/svg/process.svg" alt="ID FRONT" height={183} width={183} />
                                    </div>
                                    <h1 className="mx-auto max-w-[504px] w-full sm:pt-[25px] pt-[15px] pb-[25px] sm:text-[32px] text-[20px] text-171a1e leading-normal tracking-normal font-bold">
                                        Your documents are being processed
                                    </h1>
                                    <p className="mx-auto max-w-[436px] w-full pb-[25px] sm:text-base text-sm text-171a1e font-normal leading-normal tracking-normal">
                                        Standard processing time is about 3 days. We will inform you about your status by email
                                    </p>
                                    <div className="text-center pb-[25px]">
                                        <button type="button" className="sm:max-w-[158.5px] max-w-[374px] w-full sm:p-[15px_37px] p-[8px_37px] border border-solid bg-primary border-primary rounded-[4px] sm:text-base text-sm text-white font-bold tracking-normal">
                                            <Link href={"#"}>ACCOUNT</Link>
                                        </button>
                                    </div>
                                </div>
                            </>
                        }
                        <>
                            <div className="text-center hidden">
                                <div className="sm:pt-[50px] pt-[25px] sm:pb-[25px] pb-[15px]">
                                    <Image className="mr-[16px]" src="/assets/images/svg/thanks.svg" alt="ID FRONT" height={183} width={183} />
                                </div>
                                <h1 className="mx-auto max-w-[504px] w-full sm:pt-[25px] pt-[15px] pb-[25px] sm:text-[32px] text-[20px] text-171a1e leading-normal tracking-normal font-bold">
                                    Your documents are being processed
                                </h1>
                                <p className="mx-auto max-w-[436px] w-full pb-[25px] sm:text-base text-sm text-171a1e font-normal leading-normal tracking-normal">
                                    Standard processing time is about 3 days. We will inform you about your status by email
                                </p>
                                <div className="text-center pb-[25px]">
                                    <button type="button" className="sm:max-w-[158.5px] max-w-[374px] w-full sm:p-[15px_37px] p-[8px_37px] border border-solid bg-primary border-primary rounded-[4px] sm:text-base text-sm text-white font-bold tracking-normal">
                                        <Link href={"#"}>ACCOUNT</Link>
                                    </button>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
export default Kyc;