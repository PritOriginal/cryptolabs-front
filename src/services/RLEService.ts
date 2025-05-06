import CompressionService from "./CompressionService"

export class RLEService extends CompressionService {
    public compress(file: File): Promise<Blob> {
        return fetch("/api/rle/compress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public decompress(file: File): Promise<Blob> {
        return fetch("/api/rle/decompress", {
            method: "POST",
            body: file,
        }).then(this.getResponseBlob)
    }

    public compressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/rle/compress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }

    public decompressWithDetails(file: File): Promise<FormData> {
        return fetch("/api/rle/decompress/details", {
            method: "POST",
            body: file,
        }).then(this.getResponseFormData)
    }
}

export default new RLEService();