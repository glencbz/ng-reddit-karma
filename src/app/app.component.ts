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
  private dataChangeSubscription: Subscription;

  createThread(content: string) : void {
    this.threadService.createThread(content);
  }

  assignThreads(threads: Thread[]) : void{
    this.threads = _.sortBy(threads, thread => -thread.karma);
  }

  ngOnInit() {
    this.dataChangeSubscription = this.threadService.dataChange$
        .subscribe(threads => this.assignThreads(threads)); // needs to be wrapped in arrow function to avoid binding `this`
  }

  constructor(private threadService : ThreadService){}
}
