import { Task } from './task';

export class TodoModel {
     id: number;
     title: string;
     task: Task[];
     description: string;
     ownerId: number;
     closed: boolean; // pend instead of closed

    constructor( id: number, title: string, task: Task[],  description: string, ownerId: number, closed: boolean) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.description = description;
        this.ownerId = ownerId;
        this.closed = closed;
    }
}