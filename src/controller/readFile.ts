import * as Express from 'express';


import fs from 'fs';
import readline from "readline";
import _ from "lodash";


export const readFileAndFindName = (req: Express.Request, res: Express.Response) => {
    let countoccurences = 0;
    const readInterface = readline.createInterface({
        input: fs.createReadStream('../res/oliver-twist.txt'),
        output: process.stdout
    });

    readInterface.on('line', async(line) => {
        countoccurences += line.split(req.params.name).length - 1;
    })
        .on('close', async ()=>{
            res.send( {
                name: req.params.name,
                count: countoccurences
            });
        });
};

export const readFile = async (req: Express.Request, res: Express.Response) => {
    try {
        const countoccurences = 0;
        let arrayNames: string[] = [];

        const str = await fs.readFileSync('../res/first-names.txt','utf8');

        const firstNames = await str.split("\r");
        const readInterface = readline.createInterface({
            input: fs.createReadStream('../res/oliver-twist.txt'),
            output: process.stdout
        });

        readInterface.on('line', async(line) => {
            const tempArr = line.split(" ");
            const filteredArray = tempArr.filter(value => firstNames.includes(value));
            arrayNames = [...arrayNames, ...filteredArray];
        })
            .on('close', async ()=>{

                let outputStr: string = '';
                const group = _.groupBy(arrayNames);

                const keysSorted = Object.keys(group).sort((a, b) => group[b].length - group[a].length);

                await _.map(keysSorted, val => (outputStr = outputStr.concat(`${val}: ${group[val].length}\r`)) );
                await fs.writeFileSync('result.txt', outputStr);

                return res.json({
                    name: req.params.name,
                    count: countoccurences,
                    dataWritten: outputStr
                });
            });

    } catch ( err ) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json( { error: err.message || err } );
    }
};