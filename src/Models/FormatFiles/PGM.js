class PGMModel {
    async load(file, format) {
        const content = format === "PGM-BINARY" ? await file.arrayBuffer() : await file.text();

        if (format === "PGM-TEXT") {
            const lines = content.split("\n").filter(line => !line.startsWith("#")).map(line => line.trim());
            const [header, dimensions, maxGray, ...pixels] = lines;

            if (header !== "P2") {
                throw new Error("Invalid text PGM header. Expected 'P2'.");
            }

            const [width, height] = dimensions.split(" ").map(Number);

            const data = {
                header,
                width,
                height,
                maxGray: Number(maxGray),
                pixels: pixels.join(" ").split(" ").map(Number),
            };

            console.log("PGM (Text) loaded:", data);
            return data;
        } else if (format === "PGM-BINARY") {
            const view = new DataView(content);

            let offset = 0;
            const header = String.fromCharCode(view.getUint8(offset++)) + String.fromCharCode(view.getUint8(offset++));

            if (header !== "P5") {
                throw new Error("Invalid binary PGM header. Expected 'P5'.");
            }

            while (view.getUint8(offset) === 10 || view.getUint8(offset) === 32) offset++;

            let dimensions = "";
            while (view.getUint8(offset) !== 10) {
                dimensions += String.fromCharCode(view.getUint8(offset++));
            }
            offset++;
            const [width, height] = dimensions.split(" ").map(Number);

            let maxGray = "";
            while (view.getUint8(offset) !== 10) {
                maxGray += String.fromCharCode(view.getUint8(offset++));
            }
            offset++;
            maxGray = Number(maxGray);

            const pixelData = new Uint8Array(content.slice(offset));

            const data = {
                header,
                width,
                height,
                maxGray,
                pixels: Array.from(pixelData),
            };

            console.log("PGM (Binary) loaded:", data);
            return data;
        }
    }

    save(data, format) {
        const header = format === "PGM-TEXT" ? "P2" : "P5";
        const maxGray = 255;

        if (format === "PGM-TEXT") {
            const body = data.pixels.map((p, i) => (i % data.width === 0 ? `\n${p}` : p)).join(" ");
            return `${header}\n${data.width} ${data.height}\n${maxGray}\n${body}`;
        } else if (format === "PGM-BINARY") {
            const header = `P5\n${data.width} ${data.height}\n${maxGray}\n`;
            const pixelData = new Uint8Array(data.pixels);
            const headerBytes = new TextEncoder().encode(header);
            const combinedBuffer = new Uint8Array(headerBytes.length + pixelData.length);
            combinedBuffer.set(headerBytes);
            combinedBuffer.set(pixelData, headerBytes.length);

            return combinedBuffer;
        }
    }
}

export default PGMModel;
