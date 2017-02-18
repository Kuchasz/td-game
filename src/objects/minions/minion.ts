import {Position} from "../../engine/position";
export interface Minion {
    position: Position;
    id: number;
    move?: () => void;
    calcPath?: () => void;
}