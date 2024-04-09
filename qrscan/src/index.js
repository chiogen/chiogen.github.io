
/** @type {HTMLInputElement} */
const inputElement = document.getElementById('qrcode');
inputElement.addEventListener('input', scanQrCode);

/** @type {HTMLElement} */
const outputElement = document.getElementById('outputTarget');

/**
 * @param {Event} event 
 * @returns 
 */
function scanQrCode(event) {

    const element = event.target;
    if (!element || !element.files || element.files.length === 0)
        return;

    /** @type {File} */
    const file = element.files[0];

    const url = URL.createObjectURL(file);
    const image = new Image();
    image.addEventListener('load', () => {
        URL.revokeObjectURL(url);

        const canvas = new OffscreenCanvas(image.width, image.height);

        /** @type {CanvasRenderingContext2D} */
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0);
        const imageData = ctx.getImageData(0, 0, image.width, image.height);

        const result = jsQR(imageData.data, imageData.width, imageData.height);
        outputElement.innerHTML = result.data;
    });

    image.src = url;

}