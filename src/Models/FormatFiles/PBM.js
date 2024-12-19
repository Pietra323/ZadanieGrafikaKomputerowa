class PBMModel {
    async load(file, format) {
        const content = await file.text();

        if (format === "PBM-TEXT") {
            const lines = content.split("\n").filter(line => !line.startsWith("#")).map(line => line.trim());
            const [header, dimensions, ...pixels] = lines;

            if (header !== "P1") {
                throw new Error("Invalid PBM (Text) header. Expected 'P1'.");
            }

            const [width, height] = dimensions.split(" ").map(Number);

            const data = {
                header,
                width,
                height,
                pixels: pixels.join("").split("").map(Number),
            };

            console.log("PBM (Text) loaded:", data);
            return data;
        } else if (format === "PBM-BINARY") {
            const content = await file.arrayBuffer();
            const view = new DataView(content);

            let offset = 0;
            const header = String.fromCharCode(view.getUint8(offset++)) + String.fromCharCode(view.getUint8(offset++));

            if (header !== "P4") {
                throw new Error("Invalid PBM (Binary) header. Expected 'P4'.");
            }

            while (view.getUint8(offset) === 10 || view.getUint8(offset) === 32) offset++;

            let dimensions = "";
            while (view.getUint8(offset) !== 10) {
                dimensions += String.fromCharCode(view.getUint8(offset++));
            }
            offset++;
            const [width, height] = dimensions.split(" ").map(Number);

            const pixelData = new Uint8Array(content.slice(offset));

            const data = {
                header,
                width,
                height,
                pixels: Array.from(pixelData),
            };

            console.log("PBM (Binary) loaded:", data);
            return data;
        }
    }
    save(data, format) {
        const header = format === "PBM-TEXT" ? "P1" : "P4";
        const body = data.pixels.map((p, i) => (i % data.width === 0 ? `\n${p}` : p)).join(" ");
        return `${header}\n${data.width} ${data.height}\n${body}`;
    }
}

export default PBMModel;
