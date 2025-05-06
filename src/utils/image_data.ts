export const ImageData2StringWB = (imageData: ImageData) => {
    const array = imageData.data;
    let str = "";
    for (let i = 3; i < array.length; i += 4) {
        const element = array[i];
        str += element > 0 ? "B" : "W";
    }
    return str
}

export const StringWB2ImageData = (str: string) => {
    const uint8c = new Uint8ClampedArray(100 * 100 * 4);
    for (let i = 0; i < str.length; i++) {
        const s = str[i];
        uint8c[i * 4] = 0;
        uint8c[i * 4 + 1] = 0;
        uint8c[i * 4 + 2] = 0;
        uint8c[i * 4 + 3] = s == "B" ? 255 : 0;
    }
    return new ImageData(uint8c, 100, 100)
}