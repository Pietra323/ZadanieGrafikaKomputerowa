import React, { useState } from 'react';
import { useImageController2 } from "../Controllers/ImageController2";

const ImageView2 = () => {
    const {
        image,
        handleImageUpload,
        applyPercentBlackSelection,
        applyMeanIterativeSelection,
        applyHistogramStretching,
        applyHistogramEqualization,
    } = useImageController2();

    const [percent, setPercent] = useState(50);

    return (
        <div>
            <input
                type="file"
                onChange={handleImageUpload}
            />

            {image ? (
                <div>
                    <h3>Wczytany obraz:</h3>
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            ) : null}

            <div>
                <button onClick={() => applyPercentBlackSelection(percent)}>
                    użyj Procentowej selekcji czarnego
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={percent}
                    onChange={(e) => setPercent(e.target.value)}
                />
            </div>
        </div>
    );
};

export default ImageView2;
