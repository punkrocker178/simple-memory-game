import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'find-pairs-game';
  gameConfig: any;
  goTo: number = 0;

  ngOnInit() {
    this.gameConfig = {
      numPair: 6,
      timeOut: 45,
      hintTime: 0.7
    }
  }

  play() {
    this.goTo = 1;
  }
}
