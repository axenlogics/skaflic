import { ApiCall } from "../apicall";

export class KycService {
    public initialized = false;
    private static instance: KycService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (KycService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (KycService.instance == null) {
            KycService.instance = new KycService();
        }
        return this.instance;
    }
    public async getKycData(modal: any) {
        // kyc info of already submited 
        const res = await ApiCall.getInstance().getAuthData('kyc/get-info', modal, false);
        return res;
    }
    public async updateAccount(modal: any) {
        // FName , Lname, etc
        const res = await ApiCall.getInstance().postAuth('kyc/update-account', modal, true);
        return res;
    }
    public async uploadFile(modal: any) {
        // Front Back Selfie
        const res = await ApiCall.getInstance().postAuth('kyc/upload-files', modal, false);
        return res;
    }
   
}
