import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos : string[] = [];

  createTodo(newTodo: string) : void {
    this.todos.push(newTodo);
    console.log(this.todos);
  }

  deleteTodo(index: number) : void {
    this.todos.splice(index, 1);
  }

  changeTodoRank(index: number, change: number): void{
    var newPos = index + change;
    if (newPos > this.todos.length || newPos < 0)
      return;
    var targeted : string = this.todos[index];
    this.todos[index] = this.todos[newPos];
    this.todos[newPos] = targeted;
  }
}
