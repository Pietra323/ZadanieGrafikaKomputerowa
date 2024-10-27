import * as THREE from 'three';

class CubeModel {
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.materialVariants = [
            this.createGradientMaterials([0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff]),
            this.createGradientMaterials([0xffa500, 0x800080, 0x008080, 0x00ff00, 0x00008b, 0xff69b4]),
            this.createGradientMaterials([0xffffff, 0x000000, 0x808080, 0xc0c0c0, 0x800000, 0x008000]),
            this.createGradientMaterials([0xff4500, 0x2e8b57, 0x4682b4, 0xdaa520, 0xd2691e, 0x9acd32]),
            this.createGradientMaterials([0x1e90ff, 0xb22222, 0x7f7f7f, 0xffff00, 0xff1493, 0x00fa9a]),
            this.createGradientMaterials([0xff6347, 0x8b4513, 0x4682b4, 0x00bfff, 0x9932cc, 0xffd700]),
        ];
        this.cube = new THREE.Mesh(this.geometry, this.materialVariants[0]);
    }

    createGradientMaterials(colors) {
        const materials = [];
        colors.forEach(color => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 256;

            const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, new THREE.Color(color).getStyle());
            gradient.addColorStop(1, '#ffffff');

            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            materials.push(new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
        });
        return materials;
    }

    setColorVariant(variantIndex) {
        if (variantIndex >= 0 && variantIndex < this.materialVariants.length) {
            this.cube.material = this.materialVariants[variantIndex];
        }
    }

    getMesh() {
        return this.cube;
    }
}

export default CubeModel;