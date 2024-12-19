import { useState } from "react";

export const useImageController = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                setImage(reader.result);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        event.target.value = null;
    };

    const adjustRGB = (r, g, b, operation) => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    if (operation === 'add') {
                        data[i] = Math.min(255, data[i] + r);
                        data[i + 1] = Math.min(255, data[i + 1] + g);
                        data[i + 2] = Math.min(255, data[i + 2] + b);
                    }
                    if (operation === 'subtract') {
                        data[i] = Math.max(0, data[i] - r);
                        data[i + 1] = Math.max(0, data[i + 1] - g);
                        data[i + 2] = Math.max(0, data[i + 2] - b);
                    }
                    if (operation === 'multiply') {
                        data[i] = Math.min(255, data[i] * r);
                        data[i + 1] = Math.min(255, data[i + 1] * g);
                        data[i + 2] = Math.min(255, data[i + 2] * b);
                    }
                    if (operation === 'divide') {
                        data[i] = data[i] / (r || 1);
                        data[i + 1] = data[i + 1] / (g || 1);
                        data[i + 2] = data[i + 2] / (b || 1);
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const adjustBrightness = (brightness) => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, Math.max(0, data[i] + brightness));
                    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightness));
                    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightness));
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const convertToGrayscale = (method) => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    let gray = 0;
                    if (method === 'average') {
                        gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    } else if (method === 'red') {
                        gray = data[i];
                    } else if (method === 'green') {
                        gray = data[i + 1];
                    } else if (method === 'blue') {
                        gray = data[i + 2];
                    } else if (method === 'average_two') {
                        gray = (data[i] + data[i + 1]) / 2;
                    } else if (method === 'max') {
                        gray = Math.max(data[i], data[i + 1], data[i + 2]);
                    } else if (method === 'min') {
                        gray = Math.min(data[i], data[i + 1], data[i + 2]);
                    }
                    data[i] = data[i + 1] = data[i + 2] = gray;
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const applyAveragingFilter = () => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const kernel = [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1]
                ];

                const kernelSize = 3;
                const halfKernel = Math.floor(kernelSize / 2);

                for (let y = halfKernel; y < canvas.height - halfKernel; y++) {
                    for (let x = halfKernel; x < canvas.width - halfKernel; x++) {
                        let r = 0, g = 0, b = 0;
                        for (let ky = 0; ky < kernelSize; ky++) {
                            for (let kx = 0; kx < kernelSize; kx++) {
                                const pixelIndex = ((y + ky - halfKernel) * canvas.width + (x + kx - halfKernel)) * 4;
                                r += data[pixelIndex];
                                g += data[pixelIndex + 1];
                                b += data[pixelIndex + 2];
                            }
                        }
                        const idx = (y * canvas.width + x) * 4;
                        data[idx] = r / 9;
                        data[idx + 1] = g / 9;
                        data[idx + 2] = b / 9;
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const applySobelFilter = () => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const sobelX = [
                    [-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]
                ];
                const sobelY = [
                    [1, 2, 1],
                    [0, 0, 0],
                    [-1, -2, -1]
                ];

                const width = canvas.width;
                const height = canvas.height;

                for (let y = 1; y < height - 1; y++) {
                    for (let x = 1; x < width - 1; x++) {
                        let gx = 0, gy = 0;

                        for (let ky = -1; ky <= 1; ky++) {
                            for (let kx = -1; kx <= 1; kx++) {
                                const pixelIndex = ((y + ky) * width + (x + kx)) * 4;
                                gx += data[pixelIndex] * sobelX[ky + 1][kx + 1];
                                gy += data[pixelIndex] * sobelY[ky + 1][kx + 1];
                            }
                        }

                        const magnitude = Math.sqrt(gx * gx + gy * gy);
                        const magnitudeNormalized = Math.min(255, magnitude);
                        const idx = (y * canvas.width + x) * 4;
                        data[idx] = data[idx + 1] = data[idx + 2] = magnitudeNormalized;
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const applySharpeningFilter = () => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const kernel = [
                    [0, -1, 0],
                    [-1, 5, -1],
                    [0, -1, 0]
                ];

                const kernelSize = 3;
                const halfKernel = Math.floor(kernelSize / 2);

                for (let y = halfKernel; y < canvas.height - halfKernel; y++) {
                    for (let x = halfKernel; x < canvas.width - halfKernel; x++) {
                        let r = 0, g = 0, b = 0;
                        for (let ky = 0; ky < kernelSize; ky++) {
                            for (let kx = 0; kx < kernelSize; kx++) {
                                const pixelIndex = ((y + ky - halfKernel) * canvas.width + (x + kx - halfKernel)) * 4;
                                r += data[pixelIndex] * kernel[ky][kx];
                                g += data[pixelIndex + 1] * kernel[ky][kx];
                                b += data[pixelIndex + 2] * kernel[ky][kx];
                            }
                        }
                        const idx = (y * canvas.width + x) * 4;
                        data[idx] = Math.min(255, Math.max(0, r));
                        data[idx + 1] = Math.min(255, Math.max(0, g));
                        data[idx + 2] = Math.min(255, Math.max(0, b));
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    const applyGaussianFilter = () => {
        if (image) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = image;
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const kernel = [
                    [1, 2, 1],
                    [2, 4, 2],
                    [1, 2, 1]
                ];
                const kernelSize = 3;
                const halfKernel = Math.floor(kernelSize / 2);

                for (let y = halfKernel; y < canvas.height - halfKernel; y++) {
                    for (let x = halfKernel; x < canvas.width - halfKernel; x++) {
                        let r = 0, g = 0, b = 0, weight = 0;
                        for (let ky = 0; ky < kernelSize; ky++) {
                            for (let kx = 0; kx < kernelSize; kx++) {
                                const pixelIndex = ((y + ky - halfKernel) * canvas.width + (x + kx - halfKernel)) * 4;
                                const kWeight = kernel[ky][kx];
                                r += data[pixelIndex] * kWeight;
                                g += data[pixelIndex + 1] * kWeight;
                                b += data[pixelIndex + 2] * kWeight;
                                weight += kWeight;
                            }
                        }
                        const idx = (y * canvas.width + x) * 4;
                        data[idx] = r / weight;
                        data[idx + 1] = g / weight;
                        data[idx + 2] = b / weight;
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                setImage(canvas.toDataURL());
            };
        }
    };

    return {
        image,
        handleImageUpload,
        adjustRGB,
        adjustBrightness,
        convertToGrayscale,
        applyAveragingFilter,
        applySobelFilter,
        applySharpeningFilter,
        applyGaussianFilter,
    };
};
