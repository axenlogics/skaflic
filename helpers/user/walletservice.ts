import { CurrencyManager } from "../../models/market";
import { store } from "../../redux/Store";
import { FETCH_WALLET } from "../../redux/actions/types";
import { ApiCall } from "../apicall";
import { IDistributionPagination, IWallet } from "../interfaces";





export class WalletService {
  public initialized = false;
  public wallets: { [id: number]: IWallet } = {};
  private static instance: WalletService;
  private constructor() {
    if (WalletService.instance) {
      throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
    }
    // this.localAuth = new LocalAuth(this.storage);
  }
  public static getInstance() {
    if (WalletService.instance == null) {
      WalletService.instance = new WalletService();
    }
    return this.instance;
  }
  public walletStatus = [
    'Unverified', 'Pending', 'Processing', 'Completed', 'Rejected', 'Cancelled', 'Blocked', 'Expired',
    'Submitted', 'Approval', 'Approved', 'Declined', 'Cancelled'
  ];
  public TransactionStatus = [
    'Unconfirmed', 'Confirmed'
  ];
  public withdrawClass = [
    '#fc4c4c', '#fba91c', 'blue', '#00c896', '#fc4c4c', 'grey', '#fc4c4c', '#fba91c',
    'black', 'green', 'green', 'red', 'red  '
  ];
  public walletCls = [
    'danger', 'warning', 'info', 'success', 'danger', 'warning', 'danger', 'warning',
    'Submitted', 'Approval', 'Approved', 'Declined', 'Cancelled'
  ];
  // public localAuth: LocalAuth;

  public getWalletById(id: number) {
    return this.wallets[id];
  }
  public getWallets() {
    return this.wallets;
  }
  // [id: number]: Wallet
  public connectRedux(wallets: { [id: number]: IWallet }) {
    this.wallets = wallets;
  }
  public getAllWallets() {
    return Object.values(this.wallets);
  }
  public async fetchWallets() {
    const res = await ApiCall.getInstance().getAuthData('wallet/get-wallets', {}, false);
    let wallets: { [id: number]: IWallet } = {}
    // 
    if (res !== false && res !== undefined) {
      res[0].forEach((cur: any) => {
        let wallet: IWallet = {}
        wallet.currency = CurrencyManager.getInstance().currencies[cur[0]];
        wallet.id = cur[0];
        wallet.address = wallet.currency.symbol+ wallet.currency.name+cur[1];
        wallet.balance = Number(cur[2]).toFixedFloor(4);
        wallet.available = Number(cur[3]).toFixedFloor(4);
        // wallet.inOrderBalance = wallet.balance - wallet.available;
        wallets[cur[0]] = wallet
      });
      this.wallets = wallets;
      store.dispatch({ type: FETCH_WALLET, payload: this.wallets });
      return this.wallets;

    } else {
      return {};
    }
    // return wallets;
  }
  public async forgetPassword(modal: any) {
    const res = await ApiCall.getInstance().post('auth/reset-passwordd', modal, false);
    return res;
  }
  public async getWalletHisotory(modal: any) {
    // CurrencyId pas modal param
    const res = await ApiCall.getInstance().getAuthData('wallet/wallet-history', modal, false);
    return res;
  } public async getTransactionHisotry(modal: any) {

    // { Type: type, CurrentPageIndex: CurrentPageIndex }
    // type 2 = deposit, 1 = withdrawhistory, 
    //  Type as param in modal
    const res = await ApiCall.getInstance().getAuthData('wallet/wallet-history', modal, false);
    return res;
  }public async getAllAddress(modal: any) {
    // Id of currency of which address want
    const res = await ApiCall.getInstance().getAuthData('wallet/get-all-addresses', modal, false);
    return res;
  }public async getDistributionHistory(): Promise<IDistributionPagination> {
    const res = await ApiCall.getInstance().getAuthData('wallet/distribution-history', {}, false);
    return res;
  }
  public async generateAddress(modal: any) {
    // CurrencyId  as modal param for which address going to generate
    const res = await ApiCall.getInstance().postAuth('wallet/generate-address', modal, false);
    return res;
  }
  public async getwithDrawVerificationSms(modal: any) {
    const res = await ApiCall.getInstance().postAuth('wallet/get-withdraw-verification-sms', {}, false);
    return res;
  }
  public async addAddressLabel(modal: any) {
    // { CurrencyId, Address, Label }
    const res = await ApiCall.getInstance().postAuth('wallet/add-address-label', modal, false);
    return res;
  }
  public async WithrawFunds(modal: any) {
    // { CurrencyId, Amount, Address, Memo, AuthType, Code, ChainId }
    const res = await ApiCall.getInstance().postAuth('wallet/request-withdraw', modal, true);
    return res;
  }
  public async withDrawConfirmEmail(modal: any) {
    // { Hash, Id , Type  }
    const res = await ApiCall.getInstance().postAuth('wallet/confirm-withdraw', modal, false);
    return res;
  }

}
