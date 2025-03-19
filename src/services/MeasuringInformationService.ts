import BaseService from "./BaseService";

interface ResponseStr {
    payload: string
}
interface ResponseNumber {
    payload: number
}

class MeasuringInformationService extends BaseService {
    public getAlphabet(alphabetSet: string): Promise<ResponseStr> {
        const params = new URLSearchParams({
            alphabet_set: alphabetSet
        })
        return fetch("/api/measuring_information/alphabet?" + params).then(this.getResponse)
    }

    public getVolume(alphabetSet: string, alphabet: string): Promise<ResponseNumber> {
        const params = new URLSearchParams({
            alphabet_set: alphabetSet,
            alphabet: alphabetSet === "custom" ? alphabet : "",
          }).toString()
          
        return fetch("/api/measuring_information/volume?" + params).then(this.getResponse)
    }

    public getAmount(text: string, alphabetSet: string, alphabet: string): Promise<ResponseNumber> {
        const params = new URLSearchParams({
            text: text,
            alphabet_set: alphabetSet,
            alphabet: alphabetSet === "custom" ? alphabet : "",
          }).toString()
        return fetch("/api/measuring_information/amount?" + params).then(this.getResponse)
    }
}

export default new MeasuringInformationService();