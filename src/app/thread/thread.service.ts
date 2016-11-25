import { Injectable } from '@angular/core';
import { Thread } from './thread';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class ThreadService {
  private threads : Thread[] = [];
  private threadAddSubject = new Subject<Thread>();
  threadAdd$ = this.threadAddSubject.asObservable();
  private threadChangeSubject = new Subject<number[]>();
  threadChange$ = this.threadChangeSubject.asObservable();

  createThread(content: string) : Thread{
    if (!content)
      return;
    var newThread = new Thread(content);
    this.threads.push(newThread);
    return newThread;
  }

  deleteThread(index: number) : void {
    this.threads.splice(index, 1);
  }

  getThreads() : Array<any>[]{
    return _.toPairs(this.threads);
  }

  changeThreadKarma(index: number, change: number) : Thread{
    this.threads[index].karma += change;
    this.threadChangeSubject.next([index, change]);
    return this.threads[index];
  }
}
