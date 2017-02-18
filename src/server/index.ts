import {Server as StaticServer} from 'node-static';
import {createServer, ServerResponse, ServerRequest} from 'http';

import * as createSocketServer from 'socket.io';
import {Minion} from "../objects/minions/minion";

const nodeStaticServer = new StaticServer(__dirname + '/../../public');

const _minions: Minion[] = [];

let _minionsLimit = 10;

const getDirection = (direction: number = -1) => {
    if (direction < 0) {
        return Math.floor(Math.random() * 10);
    } else {
        return -Math.floor(Math.random() * 10);
    }
}

setInterval(() => {
    _minions.forEach(m => m.move());

    if (_minions.length < _minionsLimit) {
        const _newMinion = {
            move: () => {
                _newMinion.position.x += _newMinion.direction.x;
                _newMinion.position.y += _newMinion.direction.y;

                if (_newMinion.position.x <= 0 || _newMinion.position.x + 5 >= 800) {
                    _newMinion.direction.x = getDirection(_newMinion.direction.x);
                }
                if (_newMinion.position.y <= 0 || _newMinion.position.y + 5 >= 600) {
                    _newMinion.direction.y = getDirection(_newMinion.direction.y);
                }

            },
            direction: {
                x: getDirection(),
                y: getDirection()
            },
            calcPath: () => {
            },
            position: {x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)},
            id: _minions.length
        };
        _minions.push(_newMinion);
    }

    const _buflength = _minions.length * 3 * 2;
    const _buffer = new ArrayBuffer(_buflength);
    const __minions = new Uint16Array(_buffer);

    _minions.forEach((minion, idx) => {
        __minions[idx * 3] = idx;
        __minions[idx * 3 + 1] = minion.position.x;
        __minions[idx * 3 + 2] = minion.position.y;
    });

    //var _buf = new ArrayBuffer()

    socketServer.emit('minions', _buffer);
}, 1000 / 25);

const httpServer = createServer(function (request: ServerRequest, response: ServerResponse) {
    request.addListener('end', function () {
        nodeStaticServer.serve(request, response);
    }).resume();
});

const socketServer = createSocketServer(httpServer);

socketServer.on('connection', (socket: SocketIO.Socket) => {
    socket.on('change-limit', (appendix) => {
        _minionsLimit += appendix;
    });
});

httpServer.listen(8080);