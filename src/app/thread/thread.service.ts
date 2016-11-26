import { Injectable } from '@angular/core';
import { Thread } from './thread';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

@Injectable()
export class ThreadService {
  private threads : Thread[] = [];
  private idCounter : number = 0;

  private threadAddSubject = new Subject<Thread>();
  threadAdd$ = this.threadAddSubject.asObservable();
  private threadChangeSubject = new Subject<Thread>();
  threadChange$ = this.threadChangeSubject.asObservable();
  private threadDeleteSubject = new Subject<number>();
  threadDelete$ = this.threadDeleteSubject.asObservable();

  createThread(content: string) : Thread{
    if (!content)
      return;
    var newThread = new Thread(this.idCounter++, content);
    this.threads.push(newThread);
    this.threadAddSubject.next(_.last(this.threads));
  }

  deleteThread(id: number) : void {
    _.remove(this.threads, it => it.id === id);
    this.threadDeleteSubject.next(id);
  }

  getThreads() : Thread[]{
    return this.threads;
  }

  changeThreadKarma(id: number, change: number) : Thread{
    var target = _.find(this.threads, it => it.id === id);
    target.karma += change
    this.threadChangeSubject.next(target);
    return this.threads[id];
  }
}
