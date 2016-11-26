import { Injectable } from '@angular/core';
import { Thread } from './thread';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class ThreadService {
  private threads : Thread[] = [];
  private idCounter : number = 0;

  private dataUpdateSubject = new Subject<Thread[]>();
  dataChange$ = this.dataUpdateSubject.asObservable();

  createThread(content: string) : Thread{
    if (!content)
      return;
    var newThread = new Thread(this.idCounter++, content);
    this.threads.push(newThread);
    this.dataUpdateSubject.next(this.threads);
  }

  deleteThread(id: number) : void {
    _.remove(this.threads, it => it.id === id);
    this.dataUpdateSubject.next(this.threads);
  }

  getThreads() : Thread[]{
    return this.threads;
  }

  changeThreadKarma(id: number, change: number) : Thread{
    var target = _.find(this.threads, it => it.id === id);
    target.karma += change
    this.dataUpdateSubject.next(this.threads);
    return this.threads[id];
  }
}
