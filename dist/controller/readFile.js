"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.readFileAndFindName = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * This function will read data file
 * will return with count name occurences in file
 * @param req
 * @param res
 */
const readFileAndFindName = (req, res) => {
    let countoccurences = 0;
    // Reading file line by line to avoid memory issue
    const readInterface = readline_1.default.createInterface({
        input: fs_1.default.createReadStream('../res/oliver-twist.txt'),
        output: process.stdout
    });
    // On every line this will be triggered, and close will be called when file ended
    readInterface.on('line', (line) => __awaiter(void 0, void 0, void 0, function* () {
        countoccurences += line.split(req.params.name).length - 1;
    }))
        .on('close', () => __awaiter(void 0, void 0, void 0, function* () {
        res.send({
            name: req.params.name,
            count: countoccurences
        });
    }));
};
exports.readFileAndFindName = readFileAndFindName;
/**
 * This function will read names data, and also the data file
 * will return with count of all numbers written in file
 * @param req
 * @param res
 */
const readFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let arrayNames = [];
        // creating names data array
        const namesData = yield fs_1.default.readFileSync('../res/first-names.txt', 'utf8');
        const firstNames = yield namesData.split("\r");
        // Reading file line by line to avoid memory issue
        const readInterface = readline_1.default.createInterface({
            input: fs_1.default.createReadStream('../res/oliver-twist.txt'),
            output: process.stdout
        });
        // On every line this will be triggered, and close will be called when file ended
        readInterface.on('line', (line) => __awaiter(void 0, void 0, void 0, function* () {
            const tempArr = line.split(" ");
            const filteredArray = tempArr.filter(value => firstNames.includes(value));
            arrayNames = [...arrayNames, ...filteredArray];
        }))
            .on('close', () => __awaiter(void 0, void 0, void 0, function* () {
            // Initiate a string, that will be the final output
            let outputStr = '';
            // Group all occurences by names
            const group = lodash_1.default.groupBy(arrayNames);
            // sort all names based on occurences
            const keysSorted = Object.keys(group).sort((a, b) => group[b].length - group[a].length);
            // Create string that we can write in a text file
            yield lodash_1.default.map(keysSorted, val => (outputStr = outputStr.concat(`${val}: ${group[val].length}\r`)));
            // Writing File to main directory of project
            yield fs_1.default.writeFileSync('result.txt', outputStr);
            return res.json({
                message: 'See out put in result.txt'
            });
        }));
    }
    catch (err) {
        res.json({ error: err.message || err });
    }
});
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map