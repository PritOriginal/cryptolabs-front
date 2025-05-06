import BaseService from "./BaseService";

export interface Details {
    compression_ratio: number;
    size: number;
    [key: string]: any;
}

export default abstract class CompressionService extends BaseService {
    abstract compressWithDetails(file: File): Promise<FormData>;
    abstract decompressWithDetails(file: File): Promise<FormData> 
    abstract compress(file: File): Promise<Blob>;
    abstract decompress(file: File): Promise<Blob> 
}