import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Component({
  selector: 'obs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Observable experiments';
  button: HTMLButtonElement;
  isShown: boolean;
  subjectContents: string[] = [];
  events: string[] = [];
  numberOfDoubleClicks: number = 0;

  ngOnInit() {
    this.button = <HTMLButtonElement>document.getElementById('button');

    const clickStream = Observable.fromEvent(this.button, 'click');

    clickStream.subscribe(() => {
      console.log('clicked');
    });

    const doubleClickStream = clickStream
      .buffer(clickStream.throttleTime(250))
      .map((buffer: any[]) => { return buffer.length; })
      .filter((length: number) => { return length > 1; });

    doubleClickStream.subscribe(() => {
      this.isShown = !this.isShown;
      this.events.push(null);
    });

    doubleClickStream.scan((accumulated, numberOfClicks, index) => {
      return accumulated + numberOfClicks / 2;
    }, 0).subscribe((total: number) => {
      this.numberOfDoubleClicks = total;
    });


    const subject = new Subject<string>();
    subject.subscribe((x: string) => {
      this.subjectContents.push('next:' + x);
    },
      (x: any) => {
        this.subjectContents.push('error:' + x);
      },
      () => {
        this.subjectContents.push('completed');
      });

    subject.next('hello');
    subject.next('world');
    subject.complete();

    // sampledStream.subscribe((buffer: any[]) => {
    //   if (buffer.length > 0) {
    //     console.log('clicked times ', buffer.length);
    //   }
    //   if (buffer.length > 1) {
    //     this.isShown = !this.isShown;
    //   }
    // })
  }

  click(mouseEvent: MouseEvent) {
  }
}
