import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'obs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'obs works!';
  button: HTMLButtonElement;
  isShown: boolean;

  ngOnInit() {
    this.button = <HTMLButtonElement>document.getElementById('button')

    const clickStream = Observable.fromEvent(this.button, 'click');

    clickStream.subscribe(() => {
      console.log('clicked');
    });

    clickStream
      .buffer(clickStream.throttleTime(250))
      .map((buffer: any[]) => { return buffer.length; })
      .filter((length: number) => { return length > 1; })
      .subscribe(() => {
        this.isShown = !this.isShown;
       });


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
