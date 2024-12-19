export function createTestImage() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 10;
        canvas.height = 10;

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                ctx.fillStyle = (x + y) % 2 === 0 ? 'black' : 'white';
                ctx.fillRect(x, y, 1, 1);
            }
        }

        canvas.toBlob((blob) => {
            const file = new File([blob], 'test-image.png', { type: 'image/png' });
            resolve(file);
        });
    });
}
