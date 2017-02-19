import {connect} from 'socket.io-client';
import * as PIXI from 'pixi.js';
import {Minion} from "../objects/minions/minion";
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import {getRandomColor} from '../utils/color';

const socketConnection = connect('http://127.0.0.1:8080');

interface DrawnMinion extends Minion {
    graphics: PIXI.Container;
}

const drawnMinions: DrawnMinion[] = [];

function* getMinion(minionsArray): IterableIterator<Minion> {
    for (let i = 0; i < minionsArray.length; i++) {
        if (i % 3 == 0) yield {
            id: minionsArray[i],
            position: {
                x: minionsArray[i + 1],
                y: minionsArray[i + 2]
            }
        };
    }
}

socketConnection.on('connect', (socket: SocketIO.Client) => {
    socketConnection.on('minions', (minions) => {

        const _minions = new Uint16Array(minions);

        for (let minion of getMinion(_minions)) {

            const _existingMinion = drawnMinions.filter(m => m.id === minion.id)[0];

            if (_existingMinion) {
                _existingMinion.graphics.position = new PIXI.Point(minion.position.x, minion.position.y);
                // _existingMinion.graphics.scale =  new PIXI.Point(_existingMinion.position.x / minion.position.x, _existingMinion.position.x / minion.position.x);
            } else {
                const _newMinion = createMinion(minion);
                drawnMinions.push(_newMinion);
                _newMinion.graphics.position = new PIXI.Point(minion.position.x, minion.position.y);
                stage.addChild(_newMinion.graphics);
            }
        }
    })
});

document.querySelector('#add-minions').addEventListener('mousedown', () => {
    socketConnection.emit('change-limit', 50);
});

const _rederLoop = () => {
    app.render(stage);
    requestAnimationFrame(_rederLoop);
};

setInterval(() => {
    console.log(`We have got ${drawnMinions.length} minions`);
}, 1000);

const app = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0xFFFFFF});
document.body.appendChild(app.view);

var stage = new PIXI.Container();

const createMinion = (minion: Minion) => {

    // if (Math.random() > 0.5) {
    //     const graphics: Graphics = new PIXI.Graphics();
    //
    //     graphics.beginFill(getRandomColor());
    //     graphics.moveTo(0, 0);
    //     graphics.lineTo(0, 15);
    //     graphics.lineTo(15, 15);
    //     graphics.lineTo(15, 0);
    //     graphics.endFill();
    //
    //     return {
    //         graphics,
    //         ...minion
    //     };
    //
    // } else {
        const graphics = PIXI.Sprite.fromImage(`spritty_${Math.floor(Math.random()*5)+1}.png`);
        graphics.anchor.set(0.5);
        graphics.rotation += Math.random();

        return {
            graphics,
            ...minion
        };
    // }
};


_rederLoop();