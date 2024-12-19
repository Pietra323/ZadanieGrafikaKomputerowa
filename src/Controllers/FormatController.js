import { EventQueue } from './EventQueue';
import PBMModel from "../Models/FormatFiles/PBM";
import PGMModel from "../Models/FormatFiles/PGM";
import PPMModel from "../Models/FormatFiles/PPM";

export class FormatController {
    constructor() {
        this.eventQueue = new EventQueue();
    }

    async loadPBM(file, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const pbmModel = new PBMModel();
                    const data = await pbmModel.load(file, format);
                    console.log("PBM loaded:", data);
                    resolve(data);
                },
            });
        });
    }

    async savePBM(data, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const pbmModel = new PBMModel();
                    const result = pbmModel.save(data, format);
                    console.log("PBM saved:", result);
                    resolve(result);
                },
            });
        });
    }

    async loadPGM(file, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const pgmModel = new PGMModel();
                    const data = await pgmModel.load(file, format);
                    console.log("PGM loaded:", data);
                    resolve(data);
                },
            });
        });
    }

    async savePGM(data, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const pgmModel = new PGMModel();
                    const result = pgmModel.save(data, format);
                    console.log("PGM saved:", result);
                    resolve(result);
                },
            });
        });
    }

    async loadPPM(file, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const ppmModel = new PPMModel();
                    const data = await ppmModel.load(file, format);
                    console.log("PPM loaded:", data);
                    resolve(data);
                },
            });
        });
    }

    async savePPM(data, format) {
        return new Promise((resolve) => {
            this.eventQueue.enqueue({
                execute: async () => {
                    const ppmModel = new PPMModel();
                    const result = ppmModel.save(data, format);
                    console.log("PPM saved:", result);
                    resolve(result);
                },
            });
        });
    }
}
