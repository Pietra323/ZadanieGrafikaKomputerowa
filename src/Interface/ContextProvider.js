import React, { createContext, useContext, useRef } from 'react';
import ConeModel from '../Models/ConeModel';
import CubeModel from '../Models/CubeModel';

const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
    const coneModelRef = useRef(new ConeModel());
    const cubeModelRef = useRef(new CubeModel());

    return (
        <ModelContext.Provider value={{ coneModelRef, cubeModelRef }}>
            {children}
        </ModelContext.Provider>
    );
};

export const useModelContext = () => {
    return useContext(ModelContext);
};
