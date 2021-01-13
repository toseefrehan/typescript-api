import * as express from "express";
import {readFile, readFileAndFindName} from "../controller/readFile"



export const register = ( app: express.Application ) => {
    // LISITING ALL API'S HERE
    app.get( `/api/name-count/:name`, readFileAndFindName)
    app.get( `/api/name/count/file`, readFile);
}