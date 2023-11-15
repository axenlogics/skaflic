import { ApiCall } from "../apicall";





export class ApiAccountService {
    public initialized = false;
    private static instance: ApiAccountService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (ApiAccountService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (ApiAccountService.instance == null) {
            ApiAccountService.instance = new ApiAccountService();
        }
        return this.instance;
    }
    public async forgetPassword(modal: any) {
        const res = await ApiCall.getInstance().post('auth/reset-passwordd', modal, false);
        return res;
    }
    public async createOrder(modal: any) {
        const res = await ApiCall.getInstance().postAuth('order/create-order', modal, false);
        return res;
    }
   
}
