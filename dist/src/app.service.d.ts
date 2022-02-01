export declare class AppService {
    private imagesObj;
    constructor();
    prepareApp(): Promise<void>;
    getImagesFromInternet(): Promise<void>;
    prepareJSON(): Promise<void>;
    prepareData(data: any, index: any): Promise<void>;
    storeData(): Promise<void>;
    createSeeds(): Promise<void>;
}
