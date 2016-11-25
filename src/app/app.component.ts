import { Component } from '@angular/core';
import * as _ from 'lodash';

class Todo {
  public karma: number = 0;

  changeKarma(change: number): Todo{
    this.karma += change;
    return this;
  }

  constructor(public content: string){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  todos : Todo[] = [];

  createTodo(content: string) : void {
    if (content)
      this.todos.push(new Todo(content));
  }

  deleteTodo(index: number) : void {
    this.todos.splice(index, 1);
  }

  changeTodoKarma(index: number, change: number) : Todo{
    var changed = this.todos[index].changeKarma(change);
    this.todos.splice(index, 1);
    var insertIndex = _.sortedLastIndexBy(this.todos, changed, t => -t.karma);
    this.todos.splice(insertIndex, 0, changed);
    return changed;
  }
}
