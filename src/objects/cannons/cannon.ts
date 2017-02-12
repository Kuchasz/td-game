import {CanonSpecs} from "./canon-specs";
import {Position} from "../../engine/position";
export abstract class Cannon {
    public level: number;
    public position: Position;
    public victims: number;
    public abstract getSpecs: () => CanonSpecs;
}