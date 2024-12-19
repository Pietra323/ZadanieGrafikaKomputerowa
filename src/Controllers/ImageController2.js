import React, { useState } from "react";

export const useImageController2 = () => {
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const data = ctx.getImageData(0, 0, img.width, img.height);
                setImageData(data);
            };
            img.src = reader.result;
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const applyPercentBlackSelection = (percent) => {
        if (!imageData) return;

        const binaryData = new ImageData(imageData.width, imageData.height);
        const { data } = imageData;
        const luminanceArray = [];

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            luminanceArray.push(luminance);
        }

        const sortedLuminance = luminanceArray.slice().sort((a, b) => a - b);
        const threshold = sortedLuminance[Math.floor((percent / 100) * sortedLuminance.length)];

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const value = luminance < threshold ? 0 : 255;
            binaryData.data.set([value, value, value, data[i + 3]], i);
        }

        setImageData(binaryData);
    };

    const applyMeanIterativeSelection = () => {
        if (!imageData) return;

        const binaryData = new ImageData(imageData.width, imageData.height);
        const { data } = imageData;
        let threshold = 128;
        let prevThreshold = -1;

        while (Math.abs(threshold - prevThreshold) > 1) {
            prevThreshold = threshold;
            let lowerSum = 0, lowerCount = 0;
            let upperSum = 0, upperCount = 0;

            for (let i = 0; i < data.length; i += 4) {
                const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                if (luminance < threshold) {
                    lowerSum += luminance;
                    lowerCount++;
                } else {
                    upperSum += luminance;
                    upperCount++;
                }
            }

            const lowerMean = lowerCount ? lowerSum / lowerCount : 0;
            const upperMean = upperCount ? upperSum / upperCount : 0;
            threshold = Math.round((lowerMean + upperMean) / 2);
        }

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const value = luminance < threshold ? 0 : 255;
            binaryData.data.set([value, value, value, data[i + 3]], i);
        }

        setImageData(binaryData);
    };

    const applyHistogramEqualization = () => {
        if (!imageData) return;

        const binaryData = new ImageData(imageData.width, imageData.height);
        const { data } = imageData;
        const histogram = Array(256).fill(0);
        const cdf = Array(256).fill(0);

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            histogram[Math.floor(luminance)]++;
        }

        cdf[0] = histogram[0];
        for (let i = 1; i < 256; i++) {
            cdf[i] = cdf[i - 1] + histogram[i];
        }

        const cdfMin = cdf.find(val => val > 0);
        const totalPixels = imageData.width * imageData.height;
        for (let i = 0; i < 256; i++) {
            cdf[i] = Math.round((cdf[i] - cdfMin) / (totalPixels - cdfMin) * 255);
        }

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const value = cdf[Math.floor(luminance)];
            binaryData.data.set([value, value, value, data[i + 3]], i);
        }

        setImageData(binaryData);
    };

    const applyHistogramStretching = () => {
        if (!imageData) return;

        const binaryData = new ImageData(imageData.width, imageData.height);
        const { data } = imageData;
        let minLuminance = Infinity;
        let maxLuminance = -Infinity;

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            minLuminance = Math.min(minLuminance, luminance);
            maxLuminance = Math.max(maxLuminance, luminance);
        }

        for (let i = 0; i < data.length; i += 4) {
            const luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const stretched = ((luminance - minLuminance) / (maxLuminance - minLuminance)) * 255;
            const value = Math.min(Math.max(stretched, 0), 255);
            binaryData.data.set([value, value, value, data[i + 3]], i);
        }

        setImageData(binaryData);
    };

    return {
        image,
        handleImageUpload,
        applyPercentBlackSelection,
        applyMeanIterativeSelection,
        applyHistogramStretching,
        applyHistogramEqualization,
    };
};
