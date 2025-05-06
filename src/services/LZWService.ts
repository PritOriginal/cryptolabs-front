import CompressionService from "./CompressionService"

export interface LZWDetails {
    compression_ratio: number;
    size: number;
    dictionary: DictionaryItem[];
}

export interface DictionaryItem {
    value: string;
    number: number;
}

export class LZWService extends CompressionService {
    public compress(file: File): Promise<Blob> {
        return fetch("/api/lzw/compress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public decompress(file: File): Promise<Blob> {
        return fetch("/api/lzw/decompress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public compressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/lzw/compress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }

    public decompressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/lzw/decompress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }
}

export default new LZWService();