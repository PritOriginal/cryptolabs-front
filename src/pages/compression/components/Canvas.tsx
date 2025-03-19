import { useRef } from "react";

export default function Canvas() {
    const ref = useRef<HTMLCanvasElement>(null)

    // useEffect(() => {
    //     if (ref.current) {
    //       const canvas = ref.current.getContext('2d');
    //       // do something here with the canvas
    //     }
    //   }, [])

    let isDrawing = false;
    let x = 0;
    let y = 0;
    const onMouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        x = e.nativeEvent.offsetX;
        y = e.nativeEvent.offsetY;
        isDrawing = true;
    }
    const onMouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            if (ref.current) {
                const context = ref.current.getContext('2d');

                const x1 = x;
                const y1 = y;
                const x2 = e.nativeEvent.offsetX;
                const y2 = e.nativeEvent.offsetY;

                context!.imageSmoothingEnabled = false;

                context!.beginPath();
                context!.strokeStyle = "black";
                context!.lineWidth = 1;
                context!.moveTo(x1 + 0.5, y1 + 0.5);
                context!.lineTo(x2 + 0.5, y2 + 0.5);
                context!.stroke();
                context!.closePath();
            }   

            x = e.nativeEvent.offsetX;
            y = e.nativeEvent.offsetY;
        }
    }
    const onMouseUpHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isDrawing) {
            x = 0;
            y = 0;
            isDrawing = false;
        }
    }

    return(
        <canvas 
            ref={ref}
            id="myPics" 
            width="100" 
            height="100"
            onMouseDown={onMouseDownHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseUp={onMouseUpHandler}
        >
        </canvas>
    );
}