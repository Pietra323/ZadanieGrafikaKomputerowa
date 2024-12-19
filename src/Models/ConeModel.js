import * as THREE from "three";

class ConeModel {
    constructor() {
        this.geometry = new THREE.ConeGeometry(4, 8, 200);
        this.materialVariants = [
            this.createGradientMaterials([0xff0000, 0x00ff00, 0x0000ff]),
            this.createGradientMaterials([0xffa500, 0x800080, 0x008080]),
            this.createGradientMaterials([0xffffff, 0x000000, 0x808080]),
            this.createGradientMaterials([0xff4500, 0x2e8b57, 0x4682b4]),
            this.createGradientMaterials([0x1e90ff, 0xb22222, 0x7f7f7f]),
            this.createGradientMaterials([0xff6347, 0x8b4513, 0x4682b4]),
        ];
        this.mesh = new THREE.Mesh(this.geometry, this.materialVariants[0]);
        this.setColors();
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
            this.mesh.material = this.materialVariants[variantIndex];
            this.mesh.material.needsUpdate = true;
        }
    }


    setColors() {
        const colors = [];
        const segments = this.geometry.attributes.position.count;
        for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * 2 * Math.PI;
            const hue = (angle / (2 * Math.PI)) * 360;
            const rgb = this.hsvToRgb(hue, 1, 1);
            colors.push(rgb.r, rgb.g, rgb.b);
        }
        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }

    hsvToRgb(h, s, v) {
        let r, g, b;
        const i = Math.floor(h / 60);
        const f = h / 60 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
        }
        return { r, g, b };
    }

    getMesh() {
        return this.mesh;
    }
}

export default ConeModel;