import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.routes';
var bodyParser = require( 'body-parser' );

export class App {
    private app: Application;

    constructor( private port?: number | string ) {
        this.app = express();
        this.setting();
        this.middleware();
        this.routes();
    }

    setting = () => {
        this.app.set( 'port', this.port || 3000 );
    }

    middleware = () => {
        this.app.use( morgan( 'dev' ) );
        this.app.use( cors() );
        this.app.use(
            bodyParser.json()
        )
    }

    routes = () => {
        this.app.use( router );
    }

    listen = async () => {
        await this.app.listen( this.app.get( 'port' ) );
        console.log( 'Server running...' );
        console.log( 'http://localhost:' + this.app.get( 'port' ) )
    }

}