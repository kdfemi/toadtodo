import { Task } from './task';

export class TodoModel {
     id: number;
     title: string;
     task: Task[];
     description: string;
     owner: string;
     closed: boolean; // pend instead of closed

    constructor( id: number, title: string, task: Task[],  description: string, owner: string, closed: boolean) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.description = description;
        this.owner = owner;
        this.closed = closed;
    }
}
