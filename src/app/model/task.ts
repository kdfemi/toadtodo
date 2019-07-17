export class Task {
    id: number;
    task: string;
    finished: boolean;
    constructor(id: number, task: string, finished: boolean) {
        this.id = id;
        this.task = task;
        this.finished = finished;
    }
}
