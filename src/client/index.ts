import {connect} from 'socket.io-client';
import * as PIXI from 'pixi.js';
import {Minion} from "../objects/minions/minion";

const socketConnection = connect('http://127.0.0.1:8080');

interface DrawnMinion extends Minion {
    graphics: PIXI.Graphics;
}

const drawnMinions: DrawnMinion[] = [];

function* getMinion(minionsArray): IterableIterator<Minion> {
    for (let i = 0; i < minionsArray.length; i++) {
        if (i%3==0) yield {
            id: minionsArray[i],
            position: {
                x: minionsArray[i+1],
                y: minionsArray[i+2]
            }
        };
    }
}

socketConnection.on('connect', (socket: SocketIO.Client) => {
    socketConnection.on('minions', (minions) => {

        const _minions = new Uint16Array(minions);

        for (let minion of getMinion(_minions)){

            const _existingMinion = drawnMinions.filter(m => m.id === minion.id)[0];

            if (_existingMinion){
                _existingMinion.graphics.position = new PIXI.Point(minion.position.x, minion.position.y);
                // _existingMinion.graphics.scale =  new PIXI.Point(_existingMinion.position.x / minion.position.x, _existingMinion.position.x / minion.position.x);
            } else {
                const _newMinion = createMinion(minion);
                drawnMinions.push(_newMinion);
                _newMinion.graphics.position = new PIXI.Point(minion.position.x, minion.position.y);
                stage.addChild(_newMinion.graphics);
            }

        }

        app.render(stage);

        // minions.forEach(minion => {
        //     const _existingMinion = drawnMinions.filter(m => m.id === minion.id)[0];
        //
        //     if (_existingMinion){
        //         _existingMinion.graphics.position = minion.position;
        //         _existingMinion.graphics.scale =  new PIXI.Point(_existingMinion.position.x / minion.position.x, _existingMinion.position.x / minion.position.x);
        //     } else {
        //         const _newMinion = createMinion(minion);
        //         drawnMinions.push(_newMinion);
        //         _newMinion.graphics.position = minion.position;
        //         stage.addChild(_newMinion.graphics);
        //     }
        // });
        //
        // app.render(stage);
    })
});

document.querySelector('#add-minions').addEventListener('mousedown', ()=>{
    console.log('adawd');
    socketConnection.emit('change-limit', 50);
});

const app = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x5f5f5f});
document.body.appendChild(app.view);

var stage = new PIXI.Container();

const createMinion = (minion: Minion) => {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(getRandomColor());
    graphics.moveTo(0, 0);
    graphics.lineTo(0, 5);
    graphics.lineTo(5, 5);
    graphics.lineTo(5, 0);
    graphics.endFill();

    return {
        graphics,
        ...minion
    };
};

const getRandomColor = () => {
    const _colors = [0xe1b178, 0xe5cfb1, 0xf6d5dc, 0x9a5564, 0x571e27];
    return _colors[Math.floor(Math.random() * _colors.length)];
};