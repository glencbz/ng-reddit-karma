import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ThreadComponent } from './thread/thread.component';
import { ThreadService } from './thread/thread.service';

@NgModule({
  declarations: [
    AppComponent,
    ThreadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ ThreadService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
