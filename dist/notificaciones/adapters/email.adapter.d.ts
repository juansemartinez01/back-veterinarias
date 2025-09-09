export declare class EmailAdapter {
    send(input: {
        to: string;
        subject?: string;
        body: string;
    }): Promise<{
        id: string;
    }>;
}
