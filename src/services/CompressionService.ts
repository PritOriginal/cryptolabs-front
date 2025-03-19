import BaseService, { IResponse } from "./BaseService";

class CompressionService extends BaseService {
    public compress(): Promise<IResponse> {
        return fetch("/api/compression/compress").then(this.getResponse)
    }

    public decompress(): Promise<IResponse> {
        return fetch("/api/compression/decompress").then(this.getResponse)
    }
}

export default new CompressionService();