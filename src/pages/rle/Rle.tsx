import { useEffect, useRef, useState } from "react";
import Canvas from "./components/Canvas";
import { ImageData2StringWB } from "../../utils/image_data";
import SelectFile from "../../components/SelectFile";
import useCompressionService from "../../utils/useCompressionService";
import RLEService from "../../services/RLEService";

export default function Rle() {
    const [file, details, compress, decompress] = useCompressionService(RLEService)
    const [currentFile, setCurrentFile] = useState(file)

    const huffmanDetails = details ? details : { size: 0, compression_ratio: 0 };

    useEffect(() => {
        setCurrentFile(file);
    }, [file])

    const onSelectedFile = (file: File) => {
        setCurrentFile(file);
    }

    const onSelectedCompressFile = (file: File) => {
        decompress(file);
    }

    const onCompress = () => {
        if (!currentFile) return
        compress(currentFile);
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const string2file = (str: string) => {
        const blob = new Blob([str], { type: "plain/text" });
        const file = new File([blob], "test");
        setCurrentFile(file);
    }

    const clearCanvas = () => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context?.clearRect(0, 0, canvas.width, canvas.height);

        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height)
        const str = ImageData2StringWB(imageData!);

        string2file(str);
    }

    const worstCase = () => {
        const characters = "WB";
        let str = "";
        for (let i = 0; i < 10000; i++) {
            str += characters.charAt(i % 2);
        }

        string2file(str);
    }

    const randomCanvas = () => {
        const characters = "WB";
        let str = "";
        for (let i = 0; i < 10000; i++) {
            str += characters.charAt(Math.round(Math.random()));
        }

        string2file(str);
    }

    const onChangeEndCanvas = () => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const imageData = context?.getImageData(0, 0, canvas.width, canvas.height)
        const str = ImageData2StringWB(imageData!);

        string2file(str);
    }

    return (
        <>
            <h3 className="title">Алгоритмы сжатия без потерь - RLE</h3>
            <div className='container'>
                <div className="block half">
                    <SelectFile onSelectedFile={onSelectedFile}>
                        Выбрать файл
                    </SelectFile>
                    <SelectFile onSelectedFile={onSelectedCompressFile}>
                        Открыть сжатый файл
                    </SelectFile>
                    <p>Степень сжатия: {huffmanDetails.compression_ratio.toFixed(4)}</p>
                </div>
                <div className="block half" style={{ flexDirection: "row" }}>
                    <div className="block" style={{ width: "75%" }}>
                        <Canvas
                            ref={canvasRef}
                            file={currentFile}
                            width={100}
                            height={100}
                            onEndChange={onChangeEndCanvas}
                        />
                    </div>
                    <div style={{ width: "25%", display:"flex", flexDirection:"column", gap:"8px" }}>
                        <div className="block">
                            <button onClick={clearCanvas}>Очистить</button>
                            <button onClick={randomCanvas}>Случаный</button>
                            <button onClick={worstCase}>Худший случай</button>
                        </div>
                        <button style={{width:"100%"}} onClick={onCompress}>Сжать</button>
                    </div>
                </div>
            </div>
        </>
    );
}