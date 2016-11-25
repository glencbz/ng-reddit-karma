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
  private indexAndThreads : any[] = [];
  private karmaChangeSubscription: Subscription;

  createThread(content: string) : void {
    this.threadService.createThread(content);
    this.fetchThreads();
  }

  fetchThreads() : void {
    this.indexAndThreads = _.sortBy(this.threadService.getThreads(), indAndThread => -(indAndThread[1] as Thread).karma);
  }

  findThreadIndexById(id: number) : number{
    return _.findIndex(this.indexAndThreads, it => it[0] === id);
  }

  changeThreadKarma(id: number, change: number) : void {
    var target = this.indexAndThreads.splice(this.findThreadIndexById(id), 1);
    target[1].karma += change;
    var insertIndex = _.sortedLastIndexBy(this.indexAndThreads, target[1].karma, it => -it[1].karma);
    this.indexAndThreads.splice(insertIndex, 0, target);
  }

  ngOnInit() {
    this.karmaChangeSubscription = this.threadService.threadChange$
        .subscribe(([id, change]) => this.changeThreadKarma(id, change));
  }

  constructor(private threadService : ThreadService){}
}
