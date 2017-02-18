declare module "node-static" {
    import {ServerRequest, ServerResponse} from 'http';

    export class Server {
        constructor(path: string);
        serve(request: ServerRequest, response: ServerResponse): void;
    }
}