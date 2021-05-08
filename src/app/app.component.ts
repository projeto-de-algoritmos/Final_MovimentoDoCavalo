import { Component } from '@angular/core';

export enum HouseType {
  Blank,
  Horse,
  Final,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movimento do Cavalo';
  rowSelected: string = 'a';
  colSelected: number = 0;
  rowFinalSelected: string = 'a';
  colFinalSelected: number = 0;
  horseSelected: boolean = false;
  Type = HouseType;

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

  public houseType = (): typeof HouseType => {
    return HouseType; 
  }
}
