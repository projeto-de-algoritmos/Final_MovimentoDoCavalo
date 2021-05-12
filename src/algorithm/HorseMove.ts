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

    private _convertPositionToNode(positionChar: string, positionNumber: string): number {
        return (this._convertToNumber(positionChar) - this._convertToNumber('a'))*8 + (
            this._convertToNumber(positionNumber) - this._convertToNumber('0')); 
    }

    private _bellmanFord(origin: number, destiny: number, nodes: BoardPath[], n_arestas: number): number {
        let moviments = new Array();
        let finish = 1;

        for (let i = 0; i < this.SIZE; i++) {
            moviments.push(this.MAX_SIZE);
        }

        moviments[origin] = 0;

        for (let i = 0; i <= this.SIZE && finish; i++) {
            finish = 0;
            for (let j = 0; j < n_arestas; j++) {
                if (moviments[nodes[j].destiny] > moviments[nodes[j].origin] + nodes[j].weights) {
                    moviments[nodes[j].destiny] = moviments[nodes[j].origin] + nodes[j].weights;
                    finish = 1;
                }
            }
        }
        return moviments[destiny];
    }
    
    horsePosition(currentPosition: string, destinyPosition: string, graph: Graph) {
        const origin = this._convertPositionToNode(currentPosition[0], currentPosition[1]);
        const destiny = this._convertPositionToNode(destinyPosition[0], destinyPosition[1]);
        
        const tour = this._bellmanFord(origin, destiny, graph.boardPath, graph.numberEdges);
        return tour;
    }
}