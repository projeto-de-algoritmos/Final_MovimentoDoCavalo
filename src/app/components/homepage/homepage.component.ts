import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Howl } from 'howler';

export enum SolveType {
  BellmanFord = 0,
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  Type = SolveType;
  sound = new Howl({ src: ['assets/picapau.mp3'], html5: true, loop: true, volume: 0.5 });
  
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeToChess = (type: SolveType): void => {
    this.sound.play();
    this.route.navigate(['/chess', { type }]);
  }
}
