import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ConeModel from '../Models/ConeModel';
import { useConeController } from '../Controllers/ConeController';

const ConeView = () => {
    const mountRef = useRef(null);
    const coneModelRef = useRef(null);
    const { rotation, changetocolor, variantIndex } = useConeController(coneModelRef, mountRef);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        renderer.domElement.style.margin = '0';
        mountRef.current.appendChild(renderer.domElement);

        const coneModel = new ConeModel();
        coneModelRef.current = coneModel;
        scene.add(coneModel.getMesh());

        camera.position.z = 15;

        const animate = () => {
            requestAnimationFrame(animate);
            if (coneModelRef.current) {
                coneModelRef.current.getMesh().rotation.x = rotation.x;
                coneModelRef.current.getMesh().rotation.y = rotation.y;
            }
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [rotation]);

    useEffect(() => {
        if (coneModelRef.current) {
            coneModelRef.current.setColorVariant(variantIndex);
        }
    }, [variantIndex]);

    return (
        <div>
            <div ref={mountRef} />
            <div style={{ marginTop: '10px' }}>
                {[...Array(6).keys()].map(i => (
                    <button key={i} className="button-28" onClick={() => changetocolor(i)}>Wariant {i + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default ConeView;