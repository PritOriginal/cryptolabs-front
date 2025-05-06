import CompressionService from "./CompressionService"

export interface HuffmanDetails {
    compression_ratio: number;
    size: number;
    codes: HuffmanCode[];
}

export interface HuffmanCode {
    value: string;
    frequency: number;
    code: string;
}

export class HuffmanService extends CompressionService {
    public compress(file: File): Promise<Blob> {
        return fetch("/api/huffman/compress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public decompress(file: File): Promise<Blob> {
        return fetch("/api/huffman/decompress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public compressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/huffman/compress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }

    public decompressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/huffman/decompress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }
}

export default new HuffmanService();