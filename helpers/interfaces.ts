// import { CurrencyI } from "../models/market";

export interface IUser {
    Mobile?: string,
    Email?: string,
    firstName?: string,
    lastName?: string,
    Password?: string,
    ReferalCode?: string,
    'x-ra'?: number,
    TkExpiry?: number,
    CTime?: string,
    RecaptchaResponse?: string,
    ConfirmPassword?: string,

    Name?: string;
    Id?: number,
    UserId?: number,
    DeviceId?: number,
    DeviceAuthorized?: boolean,
    TokenId?: number,
    Token?: string,
    TwoFactor?: number,
    TwoFa?: boolean,
    FirstLogin?: boolean,
    Modal?: string | null
    TI?: any,

}

export interface ICreateOrder {
    OrderType: number, // 1 = limit order , 2 market order  
    Stop: number,
    Type: number,  // 0 = buy, 1 = sell
    Rate: number,
    Quantity: number,
    PairId: number,
}
export interface IAuth {
    // auth, 
    // initializing, getRedirect, clearRedirect, user, error
}
export interface IsignUp {

}
export interface UserInfoI {

}
export interface ApiResponse {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface IApiResponse {
    Status?: boolean;
    Result?: any;
    Message?: string;
    Code?: number;
}
export interface StkCurrencies {
    id?: number;
    currency?: ICurrency;
    stakingPlan?: IStkPlans[];
    minLocked?: number;
    planNotFound?: boolean;
    allDuration?: number[];
}
export interface IStkPlans {
    id?: number;
    duration?: number;
    apy?: number;
    currency?: ICurrency;
    startDate?: string;
    endDate?: string;
    stakeAmount?: number;
    earned?: any;
    youReceive?: number;
    daysPassed?: number;
    totalDays?: number;
    status?: number;
    selected?: boolean;
    minLocked?: number;
}
// baseCurrency?: ICurrency;
// marketCurrency?: ICurrency;
// basePrecision1?: number;
// marketPrecision?: number;
export interface IPair {
    id?: number;
    name?: string;
    marketCurrency?: ICurrency;
    baseCurrency?: ICurrency;
    rate?: number;
    high?: number;
    low?: number;
    bid?: number;
    ask?: number;
    volume?: number;
    volumeMarketCurrency?: number;
    prevDayPrice?: number;
    trendUp?: boolean;
    trendUp24hr?: boolean;
    precision?: number;
    rateUsd?: number;
    marketPrecision?: number;
    basePrecision?: number;
    hide?: boolean;
    minimumTotal?: number;
    minimumAmount?: number;
    Status?: number;
    leveragePair?: boolean;
    leveragePercentage?: string;
    leveragePairName?: string;
    type?: number;
    change24hour?: PercentageI;
    twitterSentiment?: number,
    isFav?: boolean,
    isMainPair?: boolean,
}
export interface PercentageI {
    value: number;
    isPositive: boolean;
}
export enum currencyTypeI {
    Cryptocurrency, Fiat, Leverage, DStock
}
export interface ICurrency {
    id: number;
    name: string;
    symbol: string;
    leverageSymbol?: string;
    leveragePercentage?: string;
    address?: string;
    isFiat?: boolean;
    currencyType?: currencyTypeI;
    precision?: number;
    withdrawalFee?: number;
    status?: number;
    CustomFee?: TetherFee;
    feePer?: string;
    regex?: string;
    canWithdraw?: boolean;
    imgUrl?: string;
    chainInfoB?: IChainInfo[] | any;
    chainInfo?: IChainInfo[];
}
export interface TetherFee {
    OMNI?: number;
    ERC20?: number;
    TRC20?: number;
}
export interface UserGroupLimit {
    currency?: ICurrency;
    limitation?: string;
    consumed?: string;
}
export interface UserLocketBalanceLimit {
    currency?: ICurrency;
    limit?: number;
}
export interface IWallet {
    id?: number;
    address?: string;
    isMemo?: boolean;
    memo?: number;
    balance?: number;
    available?: number;
    inOrderBalance?: number;
    backupAvailable?: number;
    pending?: number;
    currency?: ICurrency;
    conf?: number;
    minW?: number;
    fiat?: Fiat;
    hide?: boolean;
    btcBalance?: number;
    defaultTradePair?: string;
    investedAmount?: number;
    percenTage?: number;
    currencyId?: number;
    minWithdraw?: any;
    inorderBalance?: any;
    withdrawalFee?: any;
}

export interface Fiat {
    bankName?: string;
    accountTitle?: string;
    accountNumber?: string;
    branchCode?: string;
}
export interface IFill {
    rate?: number;
    quantity?: number;
    fee?: string,
    time?: string,
    pair?: IPair;
    side?: string,
    total?: string,
}

export interface IUserOrder {
    id?: number;
    rate?: number;
    quantity?: number;
    total?: string,
    quantityFilled?: number;
    orderSide?: string;
    fills?: IFill[];
    pairName?: string;
    pair?: IPair,
    status?: string;
    mainOrderType?: string;
    dateAdded?: string,
    lastUpdated?: string;
    fillAmt?: number;
    triggerCondition?: string,
    random?:string,

    // let findord = userOrdersAll.find(o => o.Id === ob.Id);
    // var index = userOrdersAll.indexOf(findord);
}
export interface IChainInfo {
    chainId?: number;
    currencyId?: number;
    chainName?: string;
    withdrawFee?: number;
    minWithdraw?: number;
    canWithdraw?: boolean;
    canDeposit?: boolean;
    depositAddressCurrency?: number;
    isSelected?: {};
    feePer?: string;
  }
export interface IUserOrderSearchModel {
    // clear modal 
    // this.model['marketCurrency'] = 0;
    // this.model['baseCurrency'] = 0;
    // this.model['side'] = 3;
    // this.model['timeOffetset'] = new Date().getTimezoneOffset().toString();
    // this.model['Date'] = 'null';
    // this.model['timeOffetset'] = new Date().getTimezoneOffset().toString();
    Date?: any,
    side?: any,
    marketCurrency?: number,
    baseCurrency?: number,
    timeOffetset?: string,
    CurrentPageIndex?: number,
}
export interface IUserOrderPagination {
    Count?: number,
    CurrentPageIndex?: number,
    PageCount?: number,
    Result?: IUserOrder[]
}
// export const 
export interface ILocalData {
    Version: number,
    Pairs: any[],
    Currencies: any[],
}
export interface IKycModal {
    City?: string,
    Day?: string,
    Fname?: string,
    Lname?: string,
    Mname?: string,
    Month?: string,
    Nation?: string | number,
    Street?: string,
    Year?: string,
    Zip?: string,
}
export interface ILocalDataSet {
    version: number,
    pairs: { [id: number]: IPair },
    currencies: { [id: number]: ICurrency },
}
export const OrderSideT = ['Buy', 'Sell']
export const OrderStatusT = ['Active', 'Complete', 'Cancelled', 'OnHold'];
export const MainOrderTypeT = ['Market', 'Limit', 'Stop-limit']

export interface IResetTimeMode {
    days?: string;
    hours?: string;
    minuts?: string;
    secconds?: string;
}
export interface IShowPoupMode {
    secconds?: number;
    showPopUP?: boolean;
    stockTradeDisabled?: boolean;
    tradingHalt?: boolean;
}
export interface ITradeHistory {
    rate?: string,
    quantity?: string,
    trendUp?: boolean,
    time?: string,
    random?: number,
}
export interface IObOrder {
    rate?: number,
    quantity?: number,
    total?: number,
    spread?: number;
    active?: boolean,
    random?: boolean,
}

export interface IOrderBook {
    buy?: IObOrder[];
    sell?: IObOrder[];
    eventId?: number,
    refresh?: boolean,
}
export interface IpairResetSettingMode {
    start?: string;
    end?: string;
    tstart?: string;
    recur?: string;
    dayoff?: any[];
}
export interface IBuySell {
    price?: number,
    stop?:number,
    amount?: number,
    total?: number,
    percentage?: number,
    minP?: number,
    minA?: number,
}
export interface IDistribution {
    Amount: number,
    CurrencyId: number,
    LeverageCurrencyId: number,
    Type: number,
    Date: string
}
export interface IDistributionPagination {
    Count?: number,
    CurrentPageIndex?: number,
    PageCount?: number,
    Result?: IDistribution[]
    
}
export interface IUserSettings {
    pairMenu: {
        selectedTab?: '',
        sorting?: {
            faverite?: boolean,
            name?: boolean,
            price?: boolean,
            change24h?: boolean,
            volume24h?: boolean,
        }
    }
}
export const LoginEmails: IUser[] = [
    { Email: 'skaflic@gmail.com', Password: '123' },
    { Email: 'babarzech@gmail.com', Password: 'Babar123' },
    { Email: 'admin@gmail.com', Password: '123' },
    { Email: 'admin@admin.com', Password: '123' },
]

// chains string
// {"1":{"id":1,"name":"Bitcoin","symbol":"BTC","currencyType":0,"precision":0,"withdrawalFee":0.0006,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":1,"chainName":"BEP20","canDeposit":true,"canWithdraw":true,"withdrawFee":1.80659644,"minWithdraw":0,"depositAddressCurrency":3},{"chainId":8,"chainName":"TRC20","canDeposit":true,"canWithdraw":true,"withdrawFee":1.80659644,"minWithdraw":0,"depositAddressCurrency":3}],"imgUrl":"/assets/images/newcoins/bitcoin.svg"},"2":{"id":2,"name":"Tether","symbol":"USDT","currencyType":0,"precision":0,"withdrawalFee":10,"canWithdraw":4,"status":1,"chainInfo":[],"imgUrl":"/assets/images/newcoins/tether.svg"},"3":{"id":3,"name":"Ethereum","symbol":"ETH","currencyType":0,"precision":0,"withdrawalFee":0.001,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":2,"chainName":"BEP20","canDeposit":false,"canWithdraw":true,"withdrawFee":1361238727.24179,"minWithdraw":0,"depositAddressCurrency":3,"feePer":"10.0000"}],"imgUrl":"/assets/images/newcoins/ethereum.svg"},"4":{"id":4,"name":"LItecoin","symbol":"LTC","currencyType":0,"precision":0,"withdrawalFee":0.01,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":2,"chainName":"BEP20","canDeposit":true,"canWithdraw":true,"withdrawFee":928936367.8588017,"minWithdraw":0,"depositAddressCurrency":3,"feePer":"10.0000"}],"imgUrl":"/assets/images/newcoins/litecoin.svg"},"5":{"id":5,"name":"cosmos","symbol":"ATOM","currencyType":0,"precision":0,"withdrawalFee":0.01,"canWithdraw":8,"status":1,"chainInfo":[{"chainId":3,"chainName":"BEP20","canDeposit":false,"canWithdraw":true,"withdrawFee":8344.84156526,"minWithdraw":0,"depositAddressCurrency":3}],"imgUrl":"/assets/images/newcoins/cosmos.svg"},"6":{"id":6,"name":"Turkish Lira","symbol":"TRY","currencyType":0,"precision":0,"withdrawalFee":0,"canWithdraw":8,"status":1,"chainInfo":[],"imgUrl":"/assets/images/newcoins/turkish_lira.svg"}}