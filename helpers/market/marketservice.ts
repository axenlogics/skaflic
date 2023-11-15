import { PairsManager } from "../../models/market";
import { store } from "../../redux/Store";
import { ApiCall } from "../apicall";
import { IChainInfo, ICreateOrder, ICurrency, ILocalData, ILocalDataSet, IPair, IUserOrder } from "../interfaces";

export class MarketService {
    public initialized = false;
    private static instance: MarketService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (MarketService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (MarketService.instance == null) {
            MarketService.instance = new MarketService();
        }
        return this.instance;
    }
    public async getOrderBook(modal: any) {
        // Id  of pair as modal body
        const res = await ApiCall.getInstance().get('market/get-orderbook', modal);
        return res;
    }
    public async getTicker(modal: any) {
        // Id  of pair as modal body
        const res = await ApiCall.getInstance().get('market/get-ticker', modal);
        return res;
    }
    public async getTotalUsdVolume(modal: any) {
        // Id  of pair as modal body
        const res = await ApiCall.getInstance().getText('market/get-total-volume', {});
        return res;
    }
    public async fetchPairs(): Promise<any[]> {
        // [1,"BTC/USDT",2,1,"10.00000000","0.00001000",2,6,1,0,0]
        const res: any = await ApiCall.getInstance().get('market/get-pairs', {});
        return res;
        // 
      }
    public setTicker(ticks: any) {
        if (typeof ticks === 'string') {
          ticks = JSON.parse(ticks);
        }
        const pairInstance = PairsManager.getInstance();
        ticks.forEach((tick: any[]) => {
          const _pair = pairInstance.getPair(tick[0]);
          if (_pair == undefined) return;
          _pair.prevDayPrice = Number(tick[6]);
          _pair.trendUp = tick[8];
          _pair.rate = Number(tick[5]);
          _pair.high = Number(tick[3]);
          _pair.low = Number(tick[4]);
          _pair.bid = Number(tick[2]);
          _pair.ask = Number(tick[1]);
          _pair.volume = Number(tick[7]);
          _pair.trendUp24hr = _pair.rate > _pair.prevDayPrice;
          if (store) {
            store.dispatch({
              type: 'PAIRS_SET',
              payload: { ..._pair }
            });
          }
          pairInstance.setPair(_pair);
        });
        ticks.forEach((tick: any[]) => {
          const _pair = pairInstance.getPair(tick[0]);
          if (_pair == undefined) return;
          if (_pair) {
            if (_pair?.marketCurrency?.id === 4) {
              _pair.rateUsd = Number(_pair.rate);
            } else {
              _pair.rateUsd = _pair?.rate! * pairInstance.getUsdtPairRate(_pair?.marketCurrency?.id!);
            }
          }
        });
    
    
    
      }
   

    public async createOrder(modal: ICreateOrder) {
        const res = await ApiCall.getInstance().postAuth('order/create-order', modal, false);
        return res;
    }
    // [1,"BTC/USDT",2,1,"10.00000000","0.00001000",2,6,1,0,0]
    public async getLocalData(isGetCurrencies: boolean, isGetPairs: boolean): Promise<ILocalDataSet> {

        const res: ILocalData = await ApiCall.getInstance().get('market/get-data', {version:1});
        let orders: IUserOrder[] = [];
        let allCurrencies: { [id: number]: ICurrency } = {};
        let allPairs: { [id: number]: IPair } = {};
        // res.forEach(ord => {
        // 
        // let currecies = 
        if (res.Currencies) {
            res.Currencies.forEach(cr => {
                const cur: ICurrency = {
                    id: Number(cr[0]),
                    name: cr[1],
                    symbol: cr[2],
                    currencyType: cr[3],
                    precision: Number(cr[4]),
                    withdrawalFee: Number(cr[5]),
                    canWithdraw: (cr[9]),
                    status: Number(cr[8]),
                    chainInfo:[],
                    imgUrl: "/assets/images/newcoins/" + cr[1].split(' ').join('_').toLowerCase() + ".svg"
                };
                
                if (!isNaN((cr[0]))) {
                    allCurrencies[Number(cr[0])] = cur;
                }
            });
            res.Currencies.forEach(cur => {
              let id: any = cur[0];
              // if (allCurrencies[cur].chainInfoB !== undefined) {
                cur[11].forEach((chain: any) => {
                  const chainInfo: IChainInfo = {};
                  chainInfo.chainId = chain[4];
                  chainInfo.chainName = chain[3];
                  chainInfo.canDeposit = chain[7];
                  chainInfo.canWithdraw = chain[6];
                  chainInfo.withdrawFee = Number(chain[5]);
                  chainInfo.minWithdraw = 0;
                  chainInfo.depositAddressCurrency = chain[8] === 0 ? allCurrencies[id].id : chain[8];
                  if (Number(chain[9]) === 0) {
                    chainInfo.feePer = undefined;
                  } else {
                    chainInfo.feePer = chain[9];
                  }
                  allCurrencies[id].chainInfo?.push(chainInfo);
                });
              // }
            });
        }
        if (res.Pairs) {
            res.Pairs.forEach(pr => {
                const pair: IPair = {};
                pair.name = pr[1];
                pair.type = pr[9];
                pair.id = Number(pr[0]);
                pair.marketCurrency = allCurrencies[Number(pr[2])];
                pair.baseCurrency = allCurrencies[Number(pr[3])];
                pair.marketPrecision = Number(pr[6]);
                pair.basePrecision =  Number(pr[7]);
                pair.precision = Number(pr[4]);
                pair.minimumTotal = Number(pr[6]);
                pair.minimumAmount = Number(pr[7]);
                pair.Status = Number(pr[8]);
                pair.rate = 0;
                pair.volume = 0;
                pair.volumeMarketCurrency = 0;
                pair.low = 0;
                pair.high = 0;
                pair.change24hour = {
                    value: 2.1,
                    isPositive: false,
                };
                pair.twitterSentiment = 158;
                pair.isFav = false;
                pair.trendUp = false;
                pair.trendUp24hr = false;
                if (!isNaN((pr[0]))) {
                    allPairs[Number(pr[0])] = pair;
                }
            });
        }
        return { currencies: allCurrencies, pairs: allPairs, version: res.Version }
        
        // })
        // return orders;
    }
   
}
