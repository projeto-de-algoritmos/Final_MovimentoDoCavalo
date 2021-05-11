import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: Router, private dataRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(SolveType[(this.dataRoute.snapshot.params['type'])]);
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
    // Calculate here
  }
}
