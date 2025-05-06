import CompressionService from "./CompressionService"

export interface ArithmeticDetails {
    compression_ratio: number;
    size: number;
    frequency_table: FrequencyItem[];
}

export interface FrequencyItem {
    value: string;
    frequency: number;
}

export class ArithmeticService extends CompressionService {
    public compress(file: File): Promise<Blob> {
        return fetch("/api/arithmetic/compress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public decompress(file: File): Promise<Blob> {
        return fetch("/api/arithmetic/decompress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public compressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/arithmetic/compress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }

    public decompressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/arithmetic/decompress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }
}

export default new ArithmeticService();