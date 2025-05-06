import { useEffect, useState } from "react";
import SelectFile from "../../components/SelectFile";
import ArithmeticService, { ArithmeticDetails, FrequencyItem } from "../../services/ArithmeticService";
import useCompressionService from "../../utils/useCompressionService";
import { downloadFile } from "../../utils/downloadFile";
import Table from "../../components/Table";
import Checkbox from "../../components/Checkbox";

export default function Arithmetic() {
    const [file, details, setFile, setCompressedFile] = useCompressionService(ArithmeticService)

    useEffect(() => {
        if (!file) return
        downloadFile(file)
    }, [file])

    const [showDetails, setShowDetails] = useState(true)
    const arithmeticDetails = details ? details as ArithmeticDetails : { size: 0, compression_ratio: 0, frequency_table: [] };

    const onChangeShowDetaisl = () => {
        setShowDetails(!showDetails);
    }

    const onSelectedFile = (file: File) => {
        setFile(file);
    }

    const onSelectedCompressFile = (file: File) => {
        setCompressedFile(file);
    }

    return (
        <>
            <h3 className="title">Алгоритмы сжатия без потерь - Арифметическое</h3>
            <div className='container'>
                <div className="block half">
                    <SelectFile onSelectedFile={onSelectedFile}>
                        Выбрать файл
                    </SelectFile>
                    {/* <button onClick={Compress}>Сжать</button> */}
                    <SelectFile onSelectedFile={onSelectedCompressFile}>
                        Открыть сжатый файл
                    </SelectFile>
                    <Checkbox checked={showDetails} onChange={onChangeShowDetaisl} >
                        <p>Показать детали</p>
                    </Checkbox>
                    <p>Степень сжатия: {arithmeticDetails.compression_ratio.toFixed(4)}</p>
                </div>
                {showDetails &&
                    <div className="block half">
                        <Table header={["Значение", "Частота"]}>
                            {arithmeticDetails.frequency_table.map((item) => (
                                <Item key={item.value} item={item} />
                            ))}
                        </Table>
                    </div>
                }
            </div>
        </>
    );
}

function Item({ item }: { item: FrequencyItem }) {
    return (
        <tr>
            <td>{item.value}</td>
            <td>{item.frequency}</td>
        </tr>
    );
}