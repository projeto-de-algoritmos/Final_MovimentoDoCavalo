import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeToChess = (type: SolveType) => {
    this.route.navigate(['/chess', { type }]);
  }
}
