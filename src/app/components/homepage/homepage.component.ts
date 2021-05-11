import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Howl, Howler} from 'howler';

export enum SolveType {
  Dijkstra,
  BellmanFord,
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  Type = SolveType;
  sound = new Howl({ src: ['assets/picapau.mp3'], html5: true });
  
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeToChess = (type: SolveType): void => {
    this.sound.play();
    Howler.volume(0.5);
    this.route.navigate(['/chess', { type }]);
  }
}
