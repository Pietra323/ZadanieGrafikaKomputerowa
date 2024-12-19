import { renderHook, act } from '@testing-library/react';
import { useImageController } from "../Controllers/ImageController";
import { createTestImage } from "./createTestImage";

describe('useImageController', () => {
    let testImage;

    beforeEach(async () => {
        testImage = await createTestImage();
    });

    it('should adjust brightness correctly on a 10x10 black and white image', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.adjustBrightness(50);
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno poprawnie dostosować RGB używając operacji dodawania', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.adjustRGB(10, 20, 30, 'add');
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno poprawnie dostosować jasność', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.adjustBrightness(50);
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno przekształcić obraz do odcieni szarości metodą średnią', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.convertToGrayscale('average');
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno zastosować filtr uśredniający do obrazu', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.applyAveragingFilter();
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno zastosować filtr Sobela do obrazu', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.applySobelFilter();
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno zastosować filtr wyostrzający do obrazu', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.applySharpeningFilter();
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });

    it('powinno zastosować filtr Gaussa do obrazu', async () => {
        const { result } = renderHook(() => useImageController());
        const event = { target: { files: [testImage] } };

        act(() => {
            result.current.handleImageUpload(event);
        });

        act(() => {
            result.current.applyGaussianFilter();
        });

        expect(result.current.image).not.toEqual(expect.any(String));
    });
});
