import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})

export class ThreadComponent {
  @Input() index: number;
  @Input() karma: number = 0;
  @Input() content: string;
  @Output() onKarmaClick = new EventEmitter<any>();
  @Output() onDeleteClick = new EventEmitter<any>();

  deleteWasClicked(): void{
    this.onDeleteClick.emit(this.index);
  }

  changeKarmaWasClicked(change: number): void{
    this.onKarmaClick.emit([this.index, change]);
  }

  constructor(){}
}
