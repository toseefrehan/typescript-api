"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const readFile_1 = require("../controller/readFile");
const register = (app) => {
    app.get(`/api/name-count/:name`, readFile_1.readFileAndFindName);
    // app.get( `/api/name-count/:name`, async ( req: any, res ) => {
    //     try {
    //         const dataaa= new FileOperation();
    //         const data = await dataaa.readFile('../res/oliver-twist.txt', req.params.name);
    //         if(data){
    //             return data;
    //         }
    // let countoccurences = 0;
    //
    // const readInterface = readline.createInterface({
    //     input: fs.createReadStream('../res/oliver-twist.txt'),
    //     output: process.stdout
    // });
    //
    // readInterface.on('line', async(line) => {
    //     countoccurences += line.split(req.params.name).length - 1;
    // })
    //     .on('close', async ()=>{
    //         return res.json({
    //             name: req.params.name,
    //             count: countoccurences
    //         });
    //     });
    //     } catch ( err ) {
    //         res.json( { error: err.message || err } );
    //     }
    // } );
    app.get(`/api/name/count/file`, readFile_1.readFile);
};
exports.register = register;
//# sourceMappingURL=api.js.map