import { BoardPath } from "./BoardPath";
import { Graph } from "./Graph";

export class GraphBuilder {

    private _getNodes(qtNodes: number) {
        let nodes = new Array();
        let count = 0;
        for(let i = 1; i < qtNodes; i++) {
            let nodeList = new Array();
            for (let j = 1; j < qtNodes; j++) {
                nodeList.push(count);
                count++;
            }
            nodes.push(nodeList);
        }
        return nodes;
    }

    private _generateBoardPath(size: number): BoardPath[] {
        let boardPath: BoardPath[] = new Array();
        for(let i = 0; i < size; i++) {
            let board = {
                destiny: Infinity,
                origin: Infinity,
                weights:  Infinity
            } as BoardPath;
            boardPath.push(board);
        }
        return boardPath;
    }

    graphGenerator(qtNodes: number): Graph {
        const nodesGraph = this._getNodes(qtNodes+1);
        let boardPath: BoardPath[] = this._generateBoardPath(350);
        let numberEdges = 0;
        for(let i = 1; i < qtNodes; i++) {
            for(let j = 1; j < qtNodes; j++) {
                if((i + 1) < qtNodes && (j + 2) < qtNodes) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i + 1][j + 2];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i + 1) < qtNodes && (j - 2) >= 1) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i + 1][j - 2];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i + 2) < qtNodes && (j + 1) < qtNodes) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i + 2][j + 1];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i + 2) < qtNodes && (j - 1) >= 1) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i + 2][j - 1];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i - 1) > 0 && (j + 2) < qtNodes) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i - 1][j + 2];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i - 1) > 0 && (j - 2) >= 1) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i - 1][j - 2];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i - 2) > 0 && (j + 1) <qtNodes) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i - 2][j + 1];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
                if((i - 2) > 0 && (j - 1) >= 1) {
                    boardPath[numberEdges].origin = nodesGraph[i][j];
                    boardPath[numberEdges].destiny = nodesGraph[i - 2][j - 1];
                    boardPath[numberEdges].weights = 1;
                    numberEdges++;
                }
            }
        }
        const graph = {
            boardPath: boardPath,
            numberEdges: numberEdges
        } as Graph;
        return graph;
    }
}