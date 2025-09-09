export declare class WhatsappAdapter {
    send(input: {
        to: string;
        body: string;
    }): Promise<{
        id: string;
    }>;
}
