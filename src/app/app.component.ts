import { Component } from '@angular/core';

class Todo {
  public karma: number = 0;
  changeKarma(change: number){
    this.karma += change;
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
    this.todos.push(new Todo(content));
  }

  deleteTodo(index: number) : void {
    this.todos.splice(index, 1);
  }
}
