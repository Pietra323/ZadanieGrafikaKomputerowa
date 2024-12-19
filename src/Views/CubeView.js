import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCubeController } from '../Controllers/CubeController';

const CubeView = () => {
    const mountRef = useRef(null);
    const {
        cubeRef,
        rotation,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        changetocolor,
    } = useCubeController();

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        renderer.domElement.style.margin = '0';
        mountRef.current.appendChild(renderer.domElement);

        scene.add(cubeRef.current);
        camera.position.set(0, 0, 2);

        const animate = () => {
            requestAnimationFrame(animate);
            if (cubeRef.current) {
                cubeRef.current.rotation.x = rotation.x;
                cubeRef.current.rotation.y = rotation.y;
            }
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [cubeRef, rotation]);

    return (
        <div>
            <div
                ref={mountRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <div style={{ marginTop: '10px' }}>
                {[...Array(6).keys()].map(i => (
                    <button key={i} className="button-28" onClick={() => changetocolor(i)}>Wariant {i + 1}</button>
                ))}
            </div>
        </div>
    );
};

export default CubeView;