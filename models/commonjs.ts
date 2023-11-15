import { AppSettings } from "../config/config";
import { toFixedFloor } from "../helpers/common";

export class CommonJs {
    private static instance: CommonJs;
    public static getInstance() {
        if (CommonJs.instance == null) {
            CommonJs.instance = new CommonJs();
        }
        return this.instance;
    }
    formatDtradeDate(date: any){
        return new Date(date).toLocaleDateString()
    }
    txUrl(url: string): { url: string, txId: string } {
        const splitedUrl = url.split(',');
        return { url: splitedUrl[1].replace('$TXID', splitedUrl[0]), txId: splitedUrl[0] };
    }
    flagImageUrlMaker(FlagName: any) {
        // 
        // try {
        if (FlagName === undefined || FlagName === '') {
            return FlagName;
        }
        const flagename = AppSettings.cdnEndPoint1 + 'assets/images/flags/' +
            FlagName.toLowerCase().replace(/ /g, "-") + '.svg';
        return flagename;
        // } catch (error) {
        //     
        //   return undefined;  
        // }

    }
    perPrecision(number: any) {
        number = toFixedFloor(Number(number), 2);;
        if (Number(number) === 0) {
            number = number.indexOf('-') > -1 ? number.replace('-', '') : number;
        }
        return number;
    }
    convertUTCDateToLocalDate(utctime: any): Date {
        let newDate;
        if (!(utctime.indexOf('Z') > -1)) {
            newDate = new Date(utctime + 'Z');
        } else {
            newDate = new Date(utctime);
        }
        // const newDate = new Date(utctime + 'Z');
        return newDate;
    }
    convertUTCDateToLocalAmPm(utctime: any) {

        let newDate;
        if (!(utctime.indexOf('Z') > -1)) {
            newDate = new Date(utctime + 'Z');
        } else {
            newDate = new Date(utctime);
        }
        return newDate.toLocaleTimeString();
    }
    utcToSessionDate(utcTime: any) {
        const date = this.convertUTCDateToLocalDate(utcTime);
        const localTime = this.convertUTCDateToLocalAmPm(utcTime);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const month1 = monthNames[date.getMonth()];
        // date.toLocaleString('default', { month: 'long' });
        const dayName = days[date.getDay()];
        const finalFormat = dayName + ', ' + month1 + ' ' + date.getDate() + ', ' + date.getFullYear()
            + ', ' + localTime;
        return finalFormat;
    }
    isPositiveNumber(number: any) {
        // const checkIfZero =
        return Number(number).toString().indexOf('-') > -1 ? false : true;
    }
    setProfileImage(imageUrl: string): string {
        if (imageUrl) {
            if (imageUrl.toString().toLowerCase().indexOf(AppSettings.traderImageEndpoint) === -1) {
                imageUrl = AppSettings.traderImageEndpoint + '/' + imageUrl.toString();
            }
        } else {
            imageUrl = 'assets/images/user-default.svg';
        }
        return imageUrl;
    }

}