import { Component } from '@angular/core';
import { ThreadComponent } from './thread/thread.component';
import * as _ from 'lodash';

class Thread{
  karma: number = 0;
  constructor(public content : string){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  threads : Thread[] = [];

  createThread(content: string) : void {
    if (!content)
      return;
    var newThread = new Thread(content);
    this.threads.push(newThread);
  }

  deleteThread(index: number) : void {
    this.threads.splice(index, 1);
  }

  changeThreadKarma(params: number[]) : void{
    var [index, change] = params;
    var changed = this.threads[index];
    changed.karma += change;
    this.threads.splice(index, 1);
    var insertIndex = _.sortedLastIndexBy(this.threads, changed, t => -t.karma);
    this.threads.splice(insertIndex, 0, changed);
  }
}
