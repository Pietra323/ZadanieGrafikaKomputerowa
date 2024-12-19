export class EventQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(command) {
        this.queue.push(command);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;
        const command = this.queue.shift();
        await command.execute();
        this.isProcessing = false;
        this.processQueue();
    }
}
