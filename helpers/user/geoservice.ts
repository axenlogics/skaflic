import { ApiCall } from "../apicall";

export class GeoService {
    public initialized = false;
    private static instance: GeoService;

    // public localAuth: LocalAuth;
    private constructor() {
        if (GeoService.instance) {
            throw new Error("Error: Instantiation failed: Use User.getInstance() instead of new.");
        }
        // this.localAuth = new LocalAuth(this.storage);
    }
    public static getInstance() {
        if (GeoService.instance == null) {
            GeoService.instance = new GeoService();
        }
        return this.instance;
    }
    public async getCountries() {
        const res = await ApiCall.getInstance().get('geo/countries', {});
        return res;
    }
    public async getRegions(modal: any) {
        // getcoiuntry as Id  // Id
        const res = await ApiCall.getInstance().getAuthData('geo/regions', {}, false);
        return res;
    }
    public async getCities(modal: any) {
        // getcoiuntry as Id  // Id
        const res = await ApiCall.getInstance().getAuthData('geo/cities', {}, false);
        return res;
    }
    public async getNationalities(modal: any) {
        // getcoiuntry as Id  // Id
        const res = await ApiCall.getInstance().getAuthData('geo/nationalities', {}, false);
        return res;
    }
   
}
