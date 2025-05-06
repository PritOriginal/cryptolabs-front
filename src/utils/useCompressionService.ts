import { useState } from "react";
import CompressionService, { Details } from "../services/CompressionService";
import { downloadFile } from "./downloadFile";

export default function useCompressionService(service: CompressionService): [File | null, Details | null, (file: File) => void, (file: File) => void] {
    const [currentFile, setCurrentFile] = useState<File | null>(null)

    const [details, setDetails] = useState<Details | null>(null)

    const Compress = (file: File) => {
        if (!file) return;
        setCurrentFile(file);
        service.compressWithDetails(file)
            .then((formData) => {
                const details = JSON.parse(formData.get("details")?.toString()!) as Details;
                setDetails(details);
                console.log(details);

                const blob = formData.get("data") as Blob;
                const file = new File([blob], "test");
                downloadFile(file);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const Decompress = (compressedFile: File) => {
        if (!compressedFile) return null
        service.decompressWithDetails(compressedFile)
            .then((formData) => {
                const details = JSON.parse(formData.get("details")?.toString()!) as Details;
                setDetails(details);
                console.log(details);

                const blob = formData.get("data") as Blob;
                const file = new File([blob], "test");
                setCurrentFile(file);
                downloadFile(file);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return [currentFile, details, Compress, Decompress];
}