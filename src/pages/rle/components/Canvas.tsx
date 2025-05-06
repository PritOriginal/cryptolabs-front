import { useEffect } from "react";
import { StringWB2ImageData } from "../../../utils/image_data";

interface CanvasProps {
    ref: React.RefObject<HTMLCanvasElement | null>
    file: File | null;
    width: number;
    height: number;
    onEndChange?: () => void;
}

export default function Canvas({ ref, file, width, height, onEndChange }: CanvasProps) {
    useEffect(() => {
        updateCanvas();
    }, [file])

    const updateCanvas = () => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            let str: string;
            if (file) {
                file.bytes().then((value) => {
                    str = new TextDecoder().decode(value);
                    const imageData = StringWB2ImageData(str);
                    ctx?.putImageData(imageData, 0, 0);
                });
            }
        }
    }

    let isDrawing = false;
    let x = 0;
    let y = 0;
    const onMouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!ref.current) return
        const ratio = ref.current.clientWidth / width;

        x = e.nativeEvent.offsetX / ratio;
        y = e.nativeEvent.offsetY / ratio;
        console.log(x, y)
        isDrawing = true;
    }
    const onMouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            if (ref.current) {
                const context = ref.current.getContext('2d');

                const x1 = x;
                const y1 = y;

                const ratio = ref.current.clientWidth / width;
                const x2 = e.nativeEvent.offsetX / ratio;
                const y2 = e.nativeEvent.offsetY / ratio;

                context!.imageSmoothingEnabled = false;
                console.log(x1, y1, x2, y2);
                context!.beginPath();
                context!.strokeStyle = "black";
                context!.lineWidth = 1;
                context!.moveTo(x1 + 0.5, y1 + 0.5);
                context!.lineTo(x2 + 0.5, y2 + 0.5);
                context!.stroke();
                context!.closePath();

                x = e.nativeEvent.offsetX / ratio;
                y = e.nativeEvent.offsetY / ratio;
            }
        }
    }
    const onMouseUpHandler = () => {
        if (isDrawing) {
            x = 0;
            y = 0;
            isDrawing = false;
            onEndChange?.();
        }
    }

    return (
        <>
            <canvas
                ref={ref}
                width={width}
                height={height}
                onMouseDown={onMouseDownHandler}
                onMouseMove={onMouseMoveHandler}
                onMouseUp={onMouseUpHandler}
            >
            </canvas>
        </>
    );
}