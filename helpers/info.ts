import { AppSettings } from '../config/config';

interface SystemInfo {
    Time: number,
    Version: number,
    Android: string,
    IOS: string
}

export class Info {
    private static instance: Info;
    public timeoffset!: number;
    public loaded = false;
    public resp?: SystemInfo;

    constructor() {
        if (Info.instance) {
            throw new Error("Error: Instantiation failed: Use Info.getInstance() instead of new.");
        }
    }
    public static getInstance() {
        if (Info.instance == null) {
            Info.instance = new Info();
        }
        return this.instance;
    }
    public async init(): Promise<SystemInfo> {
        const startTime = Date.now();
        this.resp = (await (await fetch(AppSettings.apiEndpoint + 'home/info')).json()) as SystemInfo;
        this.timeoffset = Number(this.resp.Time) - (Date.now() - (Date.now() - startTime) / 2);
        this.loaded = true;
        return this.resp;
    }
    //Constants.manifest.version
    // get version from expo instead

    public getTimeOffset() {
        return this.timeoffset;
    }
}
