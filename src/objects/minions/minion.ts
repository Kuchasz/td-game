import {Position} from "../../engine/position";
import {getDirection} from "../../utils/direction";
import {range} from "../../utils/number";
export interface Minion {
    position: Position;
    id: number;
    move?: () => void;
    calcPath?: () => void;
}

export class StandardMinion implements Minion {

    private _direction: Position;
    constructor(public id: number, public position: Position){
        this._direction = {
            x: getDirection(),
            y: getDirection()
        };
    }

    move() {
        const _newPosition = {
            x: this.position.x + this._direction.x,
            y: this.position.y + this._direction.y
        };

        if (_newPosition.x <= 0 || (_newPosition.x + 15) >= 800) {
            this._direction.x = getDirection(this._direction.x);
        }

        if (_newPosition.y <= 0 || (_newPosition.y + 15) >= 600) {
            this._direction.y = getDirection(this._direction.y);
        }

        _newPosition.x = range(_newPosition.x, 0, 785);
        _newPosition.y = range(_newPosition.y, 0, 585);

        this.position = _newPosition;
    }
}