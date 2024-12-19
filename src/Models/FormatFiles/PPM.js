export class PPMModel {
    async load(file, format) {
        const content = format === "PPM-BINARY" ? await file.arrayBuffer() : await file.text();

        if (format === "PPM-TEXT") {
            const lines = content.split("\n").filter(line => !line.startsWith("#")).map(line => line.trim());
            const [header, dimensions, maxColor, ...pixels] = lines;
            const [width, height] = dimensions.split(" ").map(Number);

            const data = {
                header,
                width,
                height,
                maxColor: Number(maxColor),
                pixels: pixels.join(" ").split(" ").map(Number),
            };

            console.log("PPM (Text) loaded:", data);
            return data;
        } else if (format === "PPM-BINARY") {
            const view = new DataView(content);

            let offset = 0;
            const header = String.fromCharCode(view.getUint8(offset++)) + String.fromCharCode(view.getUint8(offset++));

            if (header !== "P6") {
                throw new Error("Invalid binary PPM header");
            }

            while (view.getUint8(offset) === 10 || view.getUint8(offset) === 32) offset++;

            let dimensions = "";
            while (view.getUint8(offset) !== 10) {
                dimensions += String.fromCharCode(view.getUint8(offset++));
            }
            offset++;
            const [width, height] = dimensions.split(" ").map(Number);

            let maxColor = "";
            while (view.getUint8(offset) !== 10) {
                maxColor += String.fromCharCode(view.getUint8(offset++));
            }
            offset++;
            maxColor = Number(maxColor);

            const pixelData = new Uint8Array(content.slice(offset));

            const data = {
                header,
                width,
                height,
                maxColor,
                pixels: Array.from(pixelData),
            };

            console.log("PPM (Binary) loaded:", data);
            return data;
        }
    }

    save(data, format) {
        const header = format === "PPM-TEXT" ? "P3" : "P6";
        const maxColor = 255;

        if (format === "PPM-TEXT") {
            const body = data.pixels.map((value, index) => {
                if (index % (data.width * 3) === 0) return `\n${value}`;
                return `${value}`;
            }).join(" ");
            return `${header}\n${data.width} ${data.height}\n${maxColor}${body}`;
        } else if (format === "PPM-BINARY") {
            const header = `P6\n${data.width} ${data.height}\n${maxColor}\n`;
            const pixelData = new Uint8Array(data.pixels);
            const headerBytes = new TextEncoder().encode(header);
            const combinedBuffer = new Uint8Array(headerBytes.length + pixelData.length);
            combinedBuffer.set(headerBytes);
            combinedBuffer.set(pixelData, headerBytes.length);

            return combinedBuffer;
        }
    }
}

export default PPMModel;
