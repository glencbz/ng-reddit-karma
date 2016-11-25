import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from './thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent {
  @Input() index: number;
  @Input() karma: number = 0;
  @Input() content: string;

  deleteWasClicked(): void{
    if (this.threadService)
      this.threadService.deleteThread(this.index);
  }

  changeKarmaWasClicked(change: number): void{
    if (this.threadService)
      this.threadService.changeThreadKarma(this.index, change);
    else
      this.karma += change;
  }

  constructor(private threadService? : ThreadService){}
}
