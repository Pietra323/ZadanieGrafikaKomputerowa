import React, { useRef, useState } from "react";
import { FormatController } from "../Controllers/FormatController";

const FormatView = () => {
    const controller = new FormatController();
    const fileInputRef = useRef();
    const [fileData, setFileData] = useState(null);

    const handleLoad = async (format) => {
        const file = fileInputRef.current.files[0];
        if (!file) return;

        let loadedData;
        if (format.startsWith("PBM")) loadedData = await controller.loadPBM(file, format);
        if (format.startsWith("PGM")) loadedData = await controller.loadPGM(file, format);
        if (format.startsWith("PPM")) loadedData = await controller.loadPPM(file, format);

        if (loadedData) {
            setFileData(loadedData);
            alert(`Dane załadowane w formacie ${format}`);
        }
    };

    const handleSave = async (format) => {
        if (!fileData) {
            alert("Najpierw załaduj dane!");
            return;
        }

        let result;
        if (format.startsWith("PBM")) result = await controller.savePBM(fileData, format);
        if (format.startsWith("PGM")) result = await controller.savePGM(fileData, format);
        if (format.startsWith("PPM")) result = await controller.savePPM(fileData, format);

        if (result) {
            alert(`Dane zapisane w formacie ${format}`);
        }
    };

    return (
        <div>
            <input type="file" ref={fileInputRef} />
            <button onClick={() => handleLoad("PBM-TEXT")}>Załaduj PBM (Text)</button>
            <button onClick={() => handleLoad("PBM-BINARY")}>Załaduj PBM (Binary)</button>
            <button onClick={() => handleSave("PBM-TEXT")}>Zapisz PBM (Text)</button>
            <button onClick={() => handleSave("PBM-BINARY")}>Zapisz PBM (Binary)</button>

            <button onClick={() => handleLoad("PGM-TEXT")}>Załaduj PGM (Text)</button>
            <button onClick={() => handleLoad("PGM-BINARY")}>Załaduj PGM (Binary)</button>
            <button onClick={() => handleSave("PGM-TEXT")}>Zapisz PGM (Text)</button>
            <button onClick={() => handleSave("PGM-BINARY")}>Zapisz PGM (Binary)</button>

            <button onClick={() => handleLoad("PPM-TEXT")}>Załaduj PPM (Text)</button>
            <button onClick={() => handleLoad("PPM-BINARY")}>Załaduj PPM (Binary)</button>
            <button onClick={() => handleSave("PPM-TEXT")}>Zapisz PPM (Text)</button>
            <button onClick={() => handleSave("PPM-BINARY")}>Zapisz PPM (Binary)</button>
        </div>
    );
};

export default FormatView;
