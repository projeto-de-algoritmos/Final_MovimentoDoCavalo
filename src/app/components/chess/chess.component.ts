import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphBuilder } from 'src/algorithm/GraphBuilder';
import { HorseMove } from 'src/algorithm/HorseMove';
import { SolveType } from '../homepage/homepage.component';

export enum HouseType {
  Blank,
  Horse,
  Final,
}

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.scss']
})
export class ChessComponent implements OnInit {
  rowSelected: string = 'a';
  colSelected: number = 0;
  rowFinalSelected: string = 'a';
  colFinalSelected: number = 0;
  horseSelected: boolean = false;
  Type = HouseType;
  type: SolveType = SolveType.Dijkstra;

  constructor(private dataRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.dataRoute.snapshot.params['type'];
  }

  getInfoOfHouse = (col: number, row: string): HouseType => {
    if (this.rowSelected == row && this.colSelected == col) {
      return HouseType.Horse;
    } else if (this.rowFinalSelected == row && this.colFinalSelected == col) {
      return HouseType.Final;
    }
    return HouseType.Blank;
  }

  getColor = (col: number, row: string): string => {
    if (col % 2 != 0) {
      if (row.charCodeAt(0) % 2 != 0) {
        return 'lightblue';
      }
    } else {
      if (row.charCodeAt(0) % 2 == 0) { 
        return 'lightblue';
      }
    }

    return 'white'
  }

  selectHouse = (col: number, row: string) => {
    if (!this.horseSelected) {
      this.colSelected = col;
      this.rowSelected = row;
      this.horseSelected = true;
    } else {
      this.colFinalSelected = col;
      this.rowFinalSelected = row;
      this.horseSelected = false;
    }
  }

  calculate = () => {
    if (this.type == SolveType.BellmanFord) {
      const builder = new GraphBuilder();
      const graph = builder.graphGenerator(8);
      const horseMove = new HorseMove(63);
      const tour = horseMove.horsePosition(this.rowSelected+this.colSelected, this.rowFinalSelected+this.colFinalSelected, graph);
      console.log(tour);
    } else {
      // Calculate path with Dijkstra
    }
  }
}
