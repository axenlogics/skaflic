// import moment from "moment";

import { useRouter } from "next/router";
import { PercentageI } from "./interfaces";


export async function sleep(milliseconds: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, milliseconds)
    });
}
export async function redirectToPage(route: string) {
    window.location.href = 'http://' + window.location.host + route;
}
export function getReturnQuery(url: string) {
    // context.resolvedUrl
    return '?returnUrl=' + url
}
export function randomNo() {
    return Math.random().toString();
}
export function getQueryParams(url: string) {
    var search = url.split('?')[1];
    let parameters = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    // console.log((parameters))
    return parameters;
}
export function toFixedFloor(nm: number, fixed: number) {
    const re = Number(nm).toFixed(fixed < 8 ? 8 : 12).match(new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?'));
    return (re === undefined || re === null) ? nm : re[0];
}
export function randomNumbers(min: number, max: number): number {
    return Number(Math.round(Math.random() * (max - min)) + min);
}
export function commaFormat(num: number) {
    const nn = new Intl.NumberFormat('ja-JP')
    if (isNaN(num)) {
        return '---'
    }
    return nn.format(num);
    // return num;
}
export function perFormat(num: PercentageI) {
    if (num === undefined) {
        return;
    }
    const num1 = (num?.isPositive ? '+' : '-') + num?.value;
    return num1;
}
export function isBrowser() {
    return typeof window !== "undefined";
}
export function GetRouter() {
    const router = useRouter()
    return router;
}
export function preventExtraNumber(num: number, precision: number, ev: any) {
    const str = String(num === undefined ? '' : num).split('.');
    const allowedKeys = [38, 40, 8, 37, 39];
    if ((str.length === 2 && str[1].length === precision && !(allowedKeys.indexOf(ev.keyCode) > -1)) ||
        (str[0].length > 12 && !(allowedKeys.indexOf(ev.keyCode) > -1))) {
        // return true;
        ev.preventDefault();
    }
}
export function removeExpoNent(num: number, toFixed: number) {
    if (Number(num) < 0.000001 && Number(num) !== 0) {
        // return num;
        return Number(num).toFixedFloor(toFixed);
    } else {
        return num;
    }
}

export function toFloor(n: number, precision: number) {
    if (typeof n != 'number')
        n = Number(n);
    const nn = (n as number).toFixed(precision + 1).split('.');
    return n === undefined ? '0' : `${nn[0]}.${nn[1].substring(0, precision)}`
    // const nm = Math.pow(10, precision);
    // return (Math.floor(n * nm) / nm).toFixed(precision);
}

export function toCeil(n: number, precision: number) {
    const nm = Math.pow(10, precision);
    return (Math.ceil(n * nm) / nm).toFixed(precision);
}

export function toFloorFast(n: number, nm: number) {
    return Math.floor(n * nm) / nm;
}

export function toCeilFast(n: number, nm: number) {
    return Math.ceil(n * nm) / nm;
}

export function toPrecision(num: number) {
    return toFixedFloor(Number(num), (num.toString().split('.')[0].length > 5 ? 0 : 8))
}

export function dateTimeFormat(date: any) {
    // return moment(date).format('YYYY-MM-D h:mm:ss')
}

export function timeFormat(date: Date) {
    // return moment(date).format('HH:mm:ss')
}

export function convertToCurrency(num: any) {
    const val = Number(num.replace(/,/g, ''))

    // Nine Zeroes for Billions
    return Math.abs(val) >= 1.0e+9

        ? (Math.abs(val) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions
        : Math.abs(val) >= 1.0e+6

            ? (Math.abs(val) / 1.0e+6).toFixed(2) + "M"
            // Three Zeroes for Thousands
            : Math.abs(val) >= 1.0e+3

                ? (Math.abs(val) / 1.0e+3).toFixed(2) + "K"

                : Math.abs(val);

}


export function isNullOrUndefined(value: any) {
    return (value ?? null) === null;
}

export function isEmptyString(value: any) {
    return (value ?? "") === "";
}

export function isVariableExists(value: any) {
    return window[value] !== undefined;
}

export function UArrayToBase64(buf: Uint8Array) {
    return Buffer.from(buf).toString('base64');
}

export function base64ToUArray(str: string) {
    return new Uint8Array(Buffer.from(str, 'base64'))
}

export function strToUArray(str: string): Buffer {
    return new Buffer(str);
}

export function hexToUArray(hex: string): Uint8Array {
    return Uint8Array.from(hexToBytes(hex));
}

export function hexToBytes(hex: string) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}
export function shortText(text: string, length: number): string {
    if (isNullOrUndefined(text)) {
        return text;
    }
    return text?.substr(0, length);
}
export function getAllMonth(): any {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
}
export function getAllMonthInNumber(): any {
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
}
export function getAllDay(): any {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}
export function getDate(d: string, format = 'd-m-y'): string {
    if (d === undefined)
        return '';
    let nd = d.split(' ')[0];
    let dd = new Date(nd);
    const month = getAllMonth();
    if (format == 'd-m-y') {
        return month[dd.getMonth()].substring(0, 3) + ' ' + dd.getDate() + ', ' + dd.getFullYear();
    }
    else
        return dd.getDate() + ' ' + month[dd.getMonth()].substring(0, 3) + ', ' + dd.getFullYear();
}
export function getDateWithDay(d: string): string {
    if (d === undefined)
        return '';
    let dd = new Date(d);
    const month = getAllMonth();
    const day = getAllDay();
    return day[dd.getDay()].substring(0, 3) + ', ' + dd.getDate() + ' ' + month[dd.getMonth()].substring(0, 3) + ', ' + dd.getFullYear();
}
export function getTime(d: string): string {
    let dd = new Date(d);
    let h = dd.getHours();
    let i = dd.getMinutes();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    let hr = h ? h : 12;
    let m = i < 10 ? '0' + i : i;
    return hr + ':' + m + ' ' + ampm;
}
export function defaultFormat(d: string) {
    if (d === undefined)
        return '';
    const month = getAllMonthInNumber();
    let dd = new Date(d.split(' ')[0]);
    return dd.getDate() + '/' + month[dd.getMonth()] + '/' + dd.getFullYear()
}
export function stringToLess(s: string, n: number) {
    return s.substring(0, n) + (s.length > n ? '...' : '');
}
export function DateNow(n: number = 0, format = 'm/d/y', excludezero = false) {
    let dd = new Date(new Date());
    const month = getAllMonthInNumber();
    if (n != 0) {
        dd.setDate(dd.getDate() - n)
    }
    if (format == 'd-m-y')
        return month[dd.getMonth()].substring(0, 3) + ' ' + dd.getDate() + ', ' + dd.getFullYear();

    if (format == 'm/d/y') {
        if (excludezero)
            return parseInt(month[dd.getMonth()]) + '/' + (dd.getDate().toString().length == 1 ? 0 : '') + dd.getDate() + '/' + dd.getFullYear()
        else
            return month[dd.getMonth()] + '/' + dd.getDate() + '/' + dd.getFullYear()
    }

    if (format == 'y-m-d')
        return dd.getFullYear() + '-' + month[dd.getMonth()] + '-' + dd.getDate()

    if (format == 'y/m/d')
        return dd.getFullYear() + '/' + month[dd.getMonth()] + '/' + dd.getDate()

}

export function getParamValue(url: string, str: any = null) {
    url = url.split('?')[1]
    let turl = JSON.parse('{"' + decodeURI(url.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
    let uobj = Object.keys(turl);
    return uobj.length > 1 ? turl : str == null ? uobj : turl[str]
}

export function __(str: string) {
    // if(str === undefined){
    //     return str;
    // }
    return str;
    // return TranslationInit.getMessageTranslation(str);
}
export function parsehtml(html: any) {
    const regex = /(<([^>]+)>)/ig;
    return html.replace(regex, '');
}
export function userOrderDate(date: string) {
    let dt = new Date(date);
    return dt.getDate() + '.' + (dt.getMonth() + 1) + '.' + dt.getFullYear() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds();
}
export function toFixed(no: any, precision: number = 2) {
    if (isNaN(no)) {
        return no;
    }
    return Number(no).toFixedFloor(precision);
}
export interface INullable {
    value: any,
    hasValue: boolean
}
