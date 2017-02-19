import {Server as StaticServer} from 'node-static';
import {createServer, ServerResponse, ServerRequest} from 'http';

import * as createSocketServer from 'socket.io';
import {Minion, StandardMinion} from "../objects/minions/minion";

const nodeStaticServer = new StaticServer(__dirname + '/../../public');

const _minions: Minion[] = [];

let _minionsLimit = 10;



setInterval(() => {
    _minions.forEach(m => m.move());

    if (_minions.length < _minionsLimit) {
        const _newMinion = new StandardMinion(_minions.length, {x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)});
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