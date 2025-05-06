import { useState } from "react";
import SelectFile from "../../components/SelectFile";
import RSAService from "../../services/RSAService"
import { downloadFile } from "../../utils/downloadFile";

export default function Rsa() {
    const [file, setFile] = useState<File | null>(null);
    const [key, setKey] = useState<File | null>(null);

    const geyKeys = () => {
        RSAService.getKeys()
            .then((data) => {
                console.log(data)
                const publicKey = new File([data.payload.public], "rsa_public_key.txt");
                const privateKey = new File([data.payload.private], "rsa_private_key.txt");
                downloadFile(publicKey);
                downloadFile(privateKey);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const encrypt = () => {
        if (!file || !key) return;
        RSAService.encrypt(file, key)
            .then((blob) => {
                const file = new File([blob], "encrypted_data.txt");
                downloadFile(file);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const decrypt = () => {
        if (!file || !key) return;
        RSAService.decrypt(file, key)
            .then((blob) => {
                const file = new File([blob], "decrypted_data.txt");
                downloadFile(file);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const onSelectedFile = (file: File) => {
        setFile(file);
    }

    const onSelectedKey = (key: File) => {
        setKey(key);
    }

    return (
        <>
            <h3 className="title">Шифрование - RSA</h3>
            <div className='container'>
                <div className="block half">
                    <button onClick={geyKeys}>Получить ключи</button>
                    <SelectFile onSelectedFile={onSelectedFile}>
                        <p>Файл</p>
                    </SelectFile>
                    <SelectFile onSelectedFile={onSelectedKey}>
                        Ключ
                    </SelectFile>
                    <div className="row row-full">
                        <button onClick={encrypt} disabled={file == null || key == null}>Зашифровать</button>
                        <button onClick={decrypt} disabled={file == null || key == null}>Расшифровать</button>
                    </div>
                </div>
            </div>
        </>
    )
}