export declare class S3Service {
    private client;
    presignPut(params: {
        bucket: string;
        key: string;
        contentType?: string;
        expiresSec?: number;
    }): Promise<{
        url: string;
        key: string;
    }>;
    presignGet(params: {
        bucket: string;
        key: string;
        expiresSec?: number;
    }): Promise<{
        url: string;
    }>;
}
