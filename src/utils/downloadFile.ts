export const downloadFile = (file: File) => {
    const url = window.URL.createObjectURL(file as Blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.name);
    document.body.appendChild(link);
    link.click();
}