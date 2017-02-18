import {Server as StaticServer} from 'node-static';
import {createServer, ServerResponse, ServerRequest} from 'http';

import * as createSocketServer from 'socket.io';
import {Minion} from "../objects/minions/minion";

const nodeStaticServer = new StaticServer(__dirname + '/../../public');

const _minions: Minion[] = [];

setInterval(() => {
    _minions.forEach(m => m.move());
    const _newMinion = {
        move: () => {
            _newMinion.position.x += Math.random()*5;
            _newMinion.position.y += _newMinion.id;
        },
        calcPath: () => {
        },
        position: {x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)},
        id: Math.random() > 0.5 ? Math.random() : - Math.random()
    };
    _minions.push(_newMinion);
    socketServer.emit('minions', _minions);
}, 1000/25);

const httpServer = createServer(function (request: ServerRequest, response: ServerResponse) {
    request.addListener('end', function () {
        nodeStaticServer.serve(request, response);
    }).resume();
});

const socketServer = createSocketServer(httpServer);

socketServer.on('connection', (socket: SocketIO.Socket) => {

});

httpServer.listen(8080);