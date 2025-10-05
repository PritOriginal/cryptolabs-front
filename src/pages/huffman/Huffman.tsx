import SelectFile from "../../components/SelectFile";
import useCompressionService from "../../utils/useCompressionService";
import HuffmanService, { HuffmanCode, HuffmanDetails } from "../../services/HuffmanService";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
import Table from "../../components/Table";

export default function Huffman() {
    const [_, details, compress, decompress] = useCompressionService(HuffmanService)

    const [showDetails, setShowDetails] = useState(true)
    const huffmanDetails = details ? details as HuffmanDetails : { size: 0, compression_ratio: 0, codes: [] };

    const onChangeShowDetails = () => {
        setShowDetails(!showDetails);
    }

    const onSelectedFile = (file: File) => {
        compress(file);
    }

    const onSelectedCompressFile = (file: File) => {
        decompress(file);
    }

    return (
        <>
            <h3 className="title">Алгоритмы сжатия без потерь - Хаффман</h3>
            <div className='container'>
                <div className="block half">
                    <SelectFile onSelectedFile={onSelectedFile}>
                        Выбрать файл
                    </SelectFile>
                    <SelectFile onSelectedFile={onSelectedCompressFile}>
                        Выбрать сжатый файл
                    </SelectFile>
                    <Checkbox checked={showDetails} onChange={onChangeShowDetails} >
                        <p>Показать детали</p>
                    </Checkbox>
                    <p>Степень сжатия: {huffmanDetails.compression_ratio.toFixed(4)}</p>
                </div>
                {showDetails && <>
                    <div className="block half">
                        <Table header={["Значение", "Частота", "Код"]}>
                            {huffmanDetails.codes.map((code) => (
                                <Item key={code.value} code={code} />
                            ))}
                        </Table>
                    </div>
                </>
                }
            </div>
        </>
    )
}

function Item({ code }: { code: HuffmanCode }) {
    return (
        <tr>
            <td>{code.value}</td>
            <td>{code.frequency}</td>
            <td>{code.code}</td>
        </tr>
    );
}