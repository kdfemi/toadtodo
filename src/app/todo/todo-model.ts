import { Task } from './task';

export class TodoModel {
     id: number;
     title: string;
     task: Task[];
     description: string;
     ownerId: number;

    constructor( id: number, title: string, task: Task[],  description: string, ownerId: number) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.description = description;
        this.ownerId = ownerId;
    }
}
