import { ApiCall } from "../apicall";

export class LanguageService {
    public initialized = false;
    private static instance: LanguageService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (LanguageService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (LanguageService.instance == null) {
            LanguageService.instance = new LanguageService();
        }
        return this.instance;
    }
    public async getLanguages(modal: any) {
        // kyc info of already submited 
        const res = await ApiCall.getInstance().get('locale/get-languages', modal);
        return res;
    }
    public async getKycData(modal: any) {
        // kyc info of already submited 
        const res = await ApiCall.getInstance().get('locale/get-languages', modal);
        return res;
    }
}
