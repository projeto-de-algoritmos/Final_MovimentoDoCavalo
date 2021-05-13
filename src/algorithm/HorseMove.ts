import { BoardPath } from "./BoardPath";
import { Graph } from "./Graph";

export class HorseMove {

    SIZE: number;
    MAX_SIZE = Infinity;

    constructor(size: number) {
        this.SIZE = !size ? 64 : size;
    }

    private _convertToNumber(character: string): number {
        return character.charCodeAt(0);
    }

    private _convertToString(value: number) {
        let valueRow = (Math.trunc(value/8)) + 'a'.charCodeAt(0);
        let valueColumn = value % 8;
        let charRow = String.fromCharCode(valueRow);
        return charRow + valueColumn.toString();
    }

    private _convertPositionToNode(positionChar: string, positionNumber: string): number {
        return (this._convertToNumber(positionChar) - this._convertToNumber('a'))*8 + (
            this._convertToNumber(positionNumber) - this._convertToNumber('0')); 
    }

    private _convertPositionToBoard(currentShortPath: Array<number>) {
        let shortPathBoard = new Array();
        for(let shortPath of currentShortPath) {
            shortPathBoard.push(this._convertToString(shortPath));
        }
        return shortPathBoard;
    }

    private _shortPosition(positions: Array<number>, destiny: number, currentShortPath: Array<number>) {
        if (destiny == null) {
            return;
        }
        currentShortPath.push(destiny);
        this._shortPosition(positions, positions[destiny], currentShortPath);
    }

    private _bellmanFord(origin: number, destiny: number, nodes: BoardPath[], n_arestas: number) {
        let moviments = new Array();
        let positions = new Array();
        let finish = 1;

        for (let i = 0; i < this.SIZE; i++) {
            moviments.push(this.MAX_SIZE);
            positions.push(null);
        }

        moviments[origin] = 0;

        for (let i = 0; i <= this.SIZE && finish; i++) {
            finish = 0;
            for (let j = 0; j < n_arestas; j++) {
                if (moviments[nodes[j].destiny] > moviments[nodes[j].origin] + nodes[j].weights) {
                    moviments[nodes[j].destiny] = moviments[nodes[j].origin] + nodes[j].weights;
                    positions[nodes[j].destiny] = nodes[j].origin;
                    finish = 1;
                }
            }
        }
        let currentShortPath = new Array(); 
        this._shortPosition(positions, destiny, currentShortPath);
        const shortPath = this._convertPositionToBoard(currentShortPath);
        const response = {
            qtMove: moviments[destiny], 
            positions: shortPath
        }
        return response;
    }
 
    horseBellmanPosition(currentPosition: string, destinyPosition: string, graph: Graph) {
        const origin = this._convertPositionToNode(currentPosition[0], currentPosition[1]);
        const destiny = this._convertPositionToNode(destinyPosition[0], destinyPosition[1]);

        const tour = this._bellmanFord(origin, destiny, graph.boardPath, graph.numberEdges);
        return tour;
    }
}