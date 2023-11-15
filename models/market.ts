import { ICurrency, IPair } from "../helpers/interfaces";
import { MarketService } from "../helpers/market/marketservice";
import { StorageClass } from "../helpers/storage";
import { store } from "../redux/Store";





export class BaseCurrencies {
  public static currencies = ['BTC', 'USDT', 'CROSS'];
}
export class CurrencyManager {
  private readonly key: string = 'currencies-data';
  public currencies: { [id: number]: ICurrency } = {};
  private static instance: CurrencyManager;
  private storage = StorageClass.getInstance();

  private constructor() {
    if (CurrencyManager.instance) {
      throw new Error("Error: Instantiation failed: Use Currencies.getInstance() instead of new.");
    }
  }

  public static getInstance() {
    if (CurrencyManager.instance == null) {
      CurrencyManager.instance = new CurrencyManager();
    }
    return this.instance;
  }

  public connectRedux(currencies: { [id: number]: ICurrency }) {
    this.currencies = currencies;
  }

  public async init() {
    const currencies = await this.storage.tryGet(this.key);
    if (currencies.hasValue) {
      await this.initCurrency(currencies.value);
    } else {
      // const response = demoData.currencies;
      const response = (await MarketService.getInstance().getLocalData(true, false)).currencies;
      // const response = await (await fetch(AppSettings.apiEndpoint + 'market/get-currencies')).json();
      let ncurrencies = JSON.stringify(response);
      this.storage.set(this.key, ncurrencies);
      await this.initCurrency(ncurrencies);
    }
  }
 
  private async initCurrency(currencies: any = null) {
    const currcdata = (currencies == null ? await this.storage.get(this.key) : currencies);
    const object = JSON.parse((currcdata)!);
    this.currencies = object;
  }
  public getCurrency(id: number): ICurrency {
    if (this.currencies != null) {
      return this.currencies[id];
    } else {
      this.initCurrency();
      return this.currencies[id];
    }
  }
  public getCurrencyByName(name: string) {
    name = name.toLowerCase();
    if (this.currencies != null) {
      for (const key in this.currencies) {
        if (typeof this.currencies[key] !== 'undefined') {
          if (this.currencies[key].name.toLocaleLowerCase() === name.toLowerCase()) {
            return this.currencies[key];
          }
        }
      }
    }
  }
  public getCurrencyBySymbol(name: string) {
    name = name.toLowerCase();
    if (this.currencies != null) {
      for (const key in this.currencies) {
        if (typeof this.currencies[key] !== 'undefined') {
          if (this.currencies[key].symbol.toLocaleLowerCase() === name.toLowerCase()) {
            return this.currencies[key];
          }
        }
      }
    }
  }
  public getCurrencies(): ICurrency[] {
    const currencies: ICurrency[] = [];

    // for (const key in this.currencies) {
    //   if (typeof this.currencies[key] !== 'undefined') {
    //     currencies.push(this.currencies[key]);
    //   }
    // }
    return Object.values(this.currencies);
  }

}

export class PairsManager {
  private readonly key: string = 'pair-data';
  public pairs: { [id: number]: IPair } = {};
  private static instance: PairsManager;
  private storage = StorageClass.getInstance();
  private _currencies: CurrencyManager = CurrencyManager.getInstance();
  public counter = 0;
  private constructor() {

    if (PairsManager.instance) {
      throw new Error("Error: Instantiation failed: Use Pairs.getInstance() instead of new.");
    }
  }

  public static getInstance() {
    if (PairsManager.instance == null) {
      PairsManager.instance = new PairsManager();
    }
    return this.instance;
  }

  public connectRedux(pairs: { [id: number]: IPair }) {
    if (!pairs[0]) {
      this.pairs = pairs;
    } else {
      (pairs as IPair[]).forEach(pair => {
        this.pairs[pair.id!] = pair;
      })
    }
  }

  public async init() {
    const pairs = await this.storage.tryGet(this.key);
    if (pairs.hasValue) {
      await this.initPair(pairs.value);
    } else {
      try {
        // const response = demoData.pairs;
        const response = (await MarketService.getInstance().getLocalData(false, true)).pairs;
        // const response = await (await fetch(AppSettings.apiEndpoint + 'market/get-pairs')).json();
        let pairsd = JSON.stringify(response);
        this.storage.set(this.key, pairsd);
        await this.initPair(pairsd);
      } catch (error) {

      }

    }
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
 
  public setPairs(pairs: IPair[]): void {
    for (const key in pairs) {
      if (pairs[key] !== undefined) {
        this.pairs[pairs[key].id ?? 0] = pairs[key];
      }
    }
  }
  public setPair(pair: IPair): void {
    this.pairs[pair.id!] = pair;
  }
  private async initPair(input: any = null) {
    const pcdata = (input == null ? await this.storage.get(this.key) : input);
    const resp = JSON.parse((pcdata)!);
    this.pairs = resp;
  }
  public getPair(id: number): IPair {
    return this.pairs[id];
  }
  public getPairByName(name: string, ignoreSlashDash = false) {
    let _pair: any = {};
    for (const key in this.pairs) {
      if (this.pairs[key].type === 1) {
        if (this.pairs[key].name === name.replace('/', '-')) {
          _pair = this.pairs[key];
          break;
        }
      } else {
        if ((ignoreSlashDash && this.pairs[key].name!.split('-').join('/') === name) ||
          (!ignoreSlashDash && this.pairs[key].name === name)) {
          _pair = this.pairs[key];
          break;
        }
      }
    }
    return _pair;
  }
  public getPairs(): IPair[] {
    return Object.values(this.pairs);
  }
  public getUsdtPairRate(currencyId: number): number {
    for (const key in this.pairs) {
      if (!isNaN(Number(key)) && this.pairs[key] !== undefined) {
        try {
          if (this.pairs[key].baseCurrency?.id! === currencyId && this.pairs[key].rate !== undefined &&
            this.pairs[key].marketCurrency?.id === 4) {
            return this.pairs[key].rate ?? 0;
          }
        } catch (error) {
        }

      }
    }
    return 1;
  }
}


