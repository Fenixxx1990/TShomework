class Task {
  constructor(public priority: number) {}
}

class TaskList {
  private tasks: Task[] = [];

  public sortByPriority() {
    this.tasks = this.tasks.sort((a, b) => {
      return a.priority - b.priority;
    });
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public count() {
    return this.tasks.length;
  }

  public getIterator() {
    return new PriorityTaskIterator(this);
  }
}

interface IIterator<T> {
  current(): T | undefined;

  next(): T | undefined;

  prev(): T | undefined;

  index(): number;

  hasNext(): boolean;
}

class PriorityTaskIterator implements IIterator<Task> {
  private position: number = 0;
  private taskList: TaskList;

  constructor(taskList: TaskList) {
    taskList.sortByPriority();
    this.taskList = taskList;
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }

  prev(): Task | undefined {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }

  index(): number {
    return this.position;
  }

  hasNext(): boolean {
    if (this.position < this.taskList.count() - 1) {
      return true;
    } else {
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
