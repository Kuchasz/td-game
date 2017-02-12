import {Position} from "../../engine/position";
export abstract class Minion {
    public position: Position;
    public abstract move: () => void;
    public abstract calcPath: () => void;
}