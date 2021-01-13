import fs from "fs";
import readline from "readline";
import _ from "lodash";

const readFile = async () => {
    try {
        let arrayNames: string[] = [];

        // creating names data array
        const str = await fs.readFileSync('../res/first-names.txt','utf8');
        const firstNames = await str.split("\r");

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

            process.exit()
        });

    } catch ( err ) {
        process.exit()
    }
};

readFile()