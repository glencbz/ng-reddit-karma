import { Component, OnInit } from '@angular/core';
import { ThreadComponent } from './thread/thread.component';
import { ThreadService } from './thread/thread.service';
import { Thread } from './thread/thread';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private threads : Thread[] = [];
  private threadAddSubscription: Subscription;
  private karmaChangeSubscription: Subscription;
  private threadDeleteSubscription: Subscription;

  createThread(content: string) : void {
    this.threadService.createThread(content);
  }

  addThread(newIt : any){
    console.log(this.threadSortedIndex(newIt));
    this.threads.splice(this.threadSortedIndex(newIt), 0, newIt);
  }

  fetchThreads() : void {
    this.threads = _.sortBy(this.threadService.getThreads(), thread => -thread.karma);
  }

  findThreadIndexById(id: number) : number{
    return _.findIndex(this.threads, thread => thread.id === id);
  }

  threadSortedIndex(target : Thread){
    return _.sortedLastIndexBy(this.threads, target, thread => -thread.karma);
  }

  changeThreadKarma(newThread : Thread) : void {
    var targetIndex = this.findThreadIndexById(newThread.id);
    this.threads.splice(targetIndex, 1);
    this.threads.splice(this.threadSortedIndex(newThread), 0, newThread);
  }

  deleteThread(id: number) : void {
    _.remove(this.threads, thread => thread.id === id);
  }

  ngOnInit() {
    this.threadAddSubscription = this.threadService.threadAdd$
        .subscribe(thread => this.addThread(thread));// needs to be wrapped in arrow function to avoid binding `this`
    this.karmaChangeSubscription = this.threadService.threadChange$
        .subscribe(thread => this.changeThreadKarma(thread));
    this.threadDeleteSubscription = this.threadService.threadDelete$
        .subscribe(id => this.deleteThread(id));
  }

  constructor(private threadService : ThreadService){}
}
