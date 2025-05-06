import BaseService, { IResponse } from "./BaseService";

interface RSAKeysResponse extends IResponse {
    payload: RSAKeys
}

interface RSAKeys {
    public: string;
    private: string;
}

export class RSAService extends BaseService {
    public getKeys(): Promise<RSAKeysResponse> {
        return fetch("/api/rsa/keys").then(this.getResponse)
    }

    public encrypt(data: File, key: File): Promise<Blob> {
        const formData = new FormData();
        formData.append("data", data);
        formData.append("key", key)
        return fetch("/api/rsa/encrypt", {
            method: "POST",
            body: formData,
        }).then(this.getResponseBlob)
    }

    public decrypt(data: File, key: File): Promise<Blob> {
        const formData = new FormData();
        formData.append("data", data);
        formData.append("key", key)
        return fetch("/api/rsa/decrypt", {
            method: "POST",
            body: formData,
        }).then(this.getResponseBlob)
    }
}

export default new RSAService();