import * as Express from 'express';


import fs from 'fs';
import readline from "readline";
import _ from "lodash";

/**
 * This function will read data file
 * will return with count name occurences in file
 * @param req
 * @param res
 */

export const readFileAndFindName = (req: Express.Request, res: Express.Response) => {
    let countoccurences = 0;

    // Reading file line by line to avoid memory issue
    const readInterface = readline.createInterface({
        input: fs.createReadStream('../res/oliver-twist.txt'),
        output: process.stdout
    });

    // On every line this will be triggered, and close will be called when file ended
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
/**
 * This function will read names data, and also the data file
 * will return with count of all numbers written in file
 * @param req
 * @param res
 */
export const readFile = async (req: Express.Request, res: Express.Response) => {
    try {
        let arrayNames: string[] = [];
        // creating names data array
        const namesData = await fs.readFileSync('../res/first-names.txt','utf8');
        const firstNames = await namesData.split("\r");

        // Reading file line by line to avoid memory issue
        const readInterface = readline.createInterface({
            input: fs.createReadStream('../res/oliver-twist.txt'),
            output: process.stdout
        });

        // On every line this will be triggered, and close will be called when file ended
        readInterface.on('line', async(line) => {
            const tempArr = line.split(" ");
            const filteredArray = tempArr.filter(value => firstNames.includes(value));
            arrayNames = [...arrayNames, ...filteredArray];
        })
        .on('close', async ()=>{
            // Initiate a string, that will be the final output
            let outputStr: string = '';

            // Group all occurences by names
            const group = _.groupBy(arrayNames);

            // sort all names based on occurences
            const keysSorted = Object.keys(group).sort((a, b) => group[b].length - group[a].length);

            // Create string that we can write in a text file
            await _.map(keysSorted, val => (outputStr = outputStr.concat(`${val}: ${group[val].length}\r`)) );

            // Writing File to main directory of project
            await fs.writeFileSync('result.txt', outputStr);

            return res.json({
                message: 'See out put in result.txt'
            });
        });
    } catch ( err ) {
        res.json( { error: err.message || err } );
    }
};