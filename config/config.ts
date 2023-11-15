export class AppSettings {
    
    //===============Staging Environment======================
    // public static baseUrl = 'https://www.cross-demo.zechinc.com';
    // public static apiEndpoint = 'https://www.cross-demo.zechinc.com';
    // public static socketEndpoint = 'https://cross-socket.zechinc.com';



    
    public static chart = {
        defaultCandle: 30 // 30mins
    }
    public static baseUrl = 'https://cross-demo.zechinc.com';
    // https://cross-api.zechinc.com/account/login
    public static apiEndpoint = 'https://newcrossapi.zechinc.com/';

    // public static apiEndpoint = 'https://matchenginesocket.zechinc.com/api/';
    public static recaptchaApiKey = '6Lf9SWQjAAAAAMYEryfs3e18DKMSb8LSFj_ofC6J';

    // public static recaptchaApiKey = '6Lf49tkUAAAAACrAlvp4iUPnQGgmQhlkiY-5uAUd';
    public static homeEndPoint = 'https://cross-demo.zechinc.com/home/'; // php side endpoint
    public static cdnEndPoint = 'https://cdn-demo.zechinc.com/mobileapp/';
    public static cdnEndPoint1 = 'https://cdn-demo.zechinc.com/trade/';
    public static socketEndpoint = 'https://newcrossapi.zechinc.com/';
    public static traderImageEndpoint = 'https://decoin-prod.s3.us-east-2.amazonaws.com';
    public static hubs = {
        marketHub: 'tradehub'
    }
    // public static hubs = {
    //     marketHub: 'market-data'
    // };
    // public static chart = {
    //     defaultCandle: '',
    // };
    //===============Staging Environment End======================
    
    
    //===============Production Environment======================

    // public static baseUrl = 'https://www.decoin.io';
    // public static apiEndpoint = 'https://api.decoin.io/';
    // public static recaptchaApiKey = '6Lf49tkUAAAAACrAlvp4iUPnQGgmQhlkiY-5uAUd';
    // public static homeEndPoint = 'https://www.decoin.io/'; // php side endpoint
    // public static cdnEndPoint = 'https://cdn1.decoin.io/mobileapp/';
    // public static cdnEndPoint1 = 'https://cdn1.decoin.io/trade/';
    // public static socketEndpoint = 'https://socket.decoin.io';
    // public static traderImageEndpoint = 'https://decoin-prod.s3.us-east-2.amazonaws.com';

    //===============Production Environment End======================

}