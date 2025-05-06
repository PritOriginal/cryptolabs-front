import { ChangeEvent, ReactNode, useId, useState } from "react";

interface SelectFileProps {
    onSelectedFile?: (file: File) => void;
    children: ReactNode
}

export default function SelectFile({ onSelectedFile, children }: SelectFileProps) {
    const [file, setFile] = useState<File | null>(null);

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setFile(file);
            onSelectedFile?.(file);
        }
    }

    const id = useId();
    return (
        <label className="select-file" htmlFor={id}>
            <input
                type="file"
                id={id}
                style={{ display: 'none' }}
                onChange={onChangeHandle}
            />
            <div className="select-file__container">
                {children}
                <p className="select-file__container__file">{file ? file?.name : "Файл не выбран"}</p>
            </div>
        </label>
    );
}