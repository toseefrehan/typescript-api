import express from "express";
import dotenv from "dotenv";
const app = express();

// Configure Express to parse incoming JSON data
app.use( express.json() );

import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime as if it were an environment variable
const port = process.env.SERVER_PORT;

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.send( "index" );
} );


// Configure routes
routes.register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );