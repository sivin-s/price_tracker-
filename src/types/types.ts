export type PriceStatus = "initialized" | "updated" | "unchanged";

export interface PriceEntity{
    asin: string;
    price: number;
    status: PriceStatus;
    lastUpdated: Date;
}