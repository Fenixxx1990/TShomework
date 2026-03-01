"use strict";
class Task {
    constructor(priority) {
        this.priority = priority;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            return a.priority - b.priority;
        });
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getIterator() {
        return new PriorityTaskIterator(this);
    }
}
class PriorityTaskIterator {
    constructor(taskList) {
        this.position = 0;
        taskList.sortByPriority();
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
    hasNext() {
        if (this.position < this.taskList.count() - 1) {
            return true;
        }
        else {
            return false;
        }
    }
}
const taskList = new TaskList();
taskList.addTask(new Task(8));
taskList.addTask(new Task(1));
taskList.addTask(new Task(3));
taskList.addTask(new Task(1));
const iterator = taskList.getIterator();
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.hasNext());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
