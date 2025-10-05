import { useState } from "react";
import SelectFile from "../../components/SelectFile";
import LZWService, { DictionaryItem, LZWDetails } from "../../services/LZWService";
import useCompressionService from "../../utils/useCompressionService";
import Checkbox from "../../components/Checkbox";
import Table from "../../components/Table";

export default function Lzw() {
    const [_, details, setFile, setCompressedFile] = useCompressionService(LZWService)

    const [showDetails, setShowDetails] = useState(true)
    const lzwDetails = details ? details as LZWDetails : { size: 0, compression_ratio: 0, dictionary: [] };

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
            <h3 className="title">Алгоритмы сжатия без потерь - LZW</h3>
            <div className='container'>
                <div className="block half">
                    <SelectFile onSelectedFile={onSelectedFile}>
                        Выбрать файл
                    </SelectFile>
                    <SelectFile onSelectedFile={onSelectedCompressFile}>
                        Открыть сжатый файл
                    </SelectFile>
                    <Checkbox checked={showDetails} onChange={onChangeShowDetaisl} >
                        <p>Показать детали</p>
                    </Checkbox>
                    <p>Степень сжатия: {lzwDetails.compression_ratio.toFixed(4)}</p>
                </div>
                {showDetails &&
                    <div className="block half">
                        <Table header={["Значение", "Номер"]}>
                            {lzwDetails.dictionary.slice(0, 100).map((item) => (
                                <Item key={item.value} item={item} />
                            ))}
                        </Table>
                    </div>
                }
            </div>
        </>
    );
}

function Item({ item }: { item: DictionaryItem }) {
    return (
        <tr>
            <td>{item.value}</td>
            <td>{item.number}</td>
        </tr>
    );
}