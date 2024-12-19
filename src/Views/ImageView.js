import React, { useState } from 'react';
import { useImageController } from "../Controllers/ImageController";

const ImageView = () => {
    const { image, handleImageUpload, adjustRGB, adjustBrightness, convertToGrayscale, applyAveragingFilter, applySobelFilter, applySharpeningFilter, applyGaussianFilter, } = useImageController();
    const [r, setR] = useState(0);
    const [g, setG] = useState(0);
    const [b, setB] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [grayscaleMethod, setGrayscaleMethod] = useState('average');

    const handleAdjustRGB = (operation) => {
        adjustRGB(parseInt(r), parseInt(g), parseInt(b), operation);
    };

    const handleAdjustBrightness = () => {
        adjustBrightness(parseInt(brightness));
    };

    const handleConvertToGrayscale = () => {
        convertToGrayscale(grayscaleMethod);
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleImageUpload}
            />

            {image ? (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={image} alt="Uploaded"/>
                </div>
            ) : (
                <p>Nie wybrano pliku.</p>
            )}

            <div>
                <label>Czerwony:</label>
                <input
                    type="number"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                    min="-255"
                    max="255"
                />
                <label>Zielony:</label>
                <input
                    type="number"
                    value={g}
                    onChange={(e) => setG(e.target.value)}
                    min="-255"
                    max="255"
                />
                <label>Niebieski:</label>
                <input
                    type="number"
                    value={b}
                    onChange={(e) => setB(e.target.value)}
                    min="-255"
                    max="255"
                />
            </div>

            <button onClick={() => handleAdjustRGB('add')}>Dodaj RGB</button>
            <button onClick={() => handleAdjustRGB('subtract')}>Odejmij RGB</button>
            <button onClick={() => handleAdjustRGB('multiply')}>Pomnóż RGB</button>
            <button onClick={() => handleAdjustRGB('divide')}>Podziel RGB</button>

            <div>
                <label>Brightness:</label>
                <input
                    type="number"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                    min="-255"
                    max="255"
                />
            </div>
            <button onClick={handleAdjustBrightness}>Dostosuj jasność</button>

            <div>
                <label>Metoda skali szarości:</label>
                <select onChange={(e) => setGrayscaleMethod(e.target.value)} value={grayscaleMethod}>
                    <option value="average">Średnia RGB</option>
                    <option value="red">Czerwony Channel</option>
                    <option value="green">Zielony Channel</option>
                    <option value="blue">Niebieski Channel</option>
                    <option value="average_two">Średnia dwóch kanałów</option>
                    <option value="max">Max RGB</option>
                    <option value="min">Min RGB</option>
                </select>
            </div>
            <button onClick={handleConvertToGrayscale}>Konwerstuj skalę szarości</button>
            <div>
                <button onClick={applyAveragingFilter}>Zastosuj filtr średniej</button>
                <button onClick={applySobelFilter}>Zastosuj filtr Sobela</button>
                <button onClick={applySharpeningFilter}>Zastosuj filtr wyostrzający</button>
                <button onClick={applyGaussianFilter}>Zastosuj filtr Gaussa</button>
            </div>
        </div>
    );
};

export default ImageView;
