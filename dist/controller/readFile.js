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
const readFileAndFindName = (req, res) => {
    let countoccurences = 0;
    const readInterface = readline_1.default.createInterface({
        input: fs_1.default.createReadStream('../res/oliver-twist.txt'),
        output: process.stdout
    });
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
const readFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const countoccurences = 0;
        let arrayNames = [];
        const str = yield fs_1.default.readFileSync('../res/first-names.txt', 'utf8');
        const firstNames = yield str.split("\r");
        const readInterface = readline_1.default.createInterface({
            input: fs_1.default.createReadStream('../res/oliver-twist.txt'),
            output: process.stdout
        });
        readInterface.on('line', (line) => __awaiter(void 0, void 0, void 0, function* () {
            const tempArr = line.split(" ");
            const filteredArray = tempArr.filter(value => firstNames.includes(value));
            arrayNames = [...arrayNames, ...filteredArray];
        }))
            .on('close', () => __awaiter(void 0, void 0, void 0, function* () {
            let outputStr = '';
            const group = lodash_1.default.groupBy(arrayNames);
            const keysSorted = Object.keys(group).sort((a, b) => group[b].length - group[a].length);
            yield lodash_1.default.map(keysSorted, val => (outputStr = outputStr.concat(`${val}: ${group[val].length}\r`)));
            yield fs_1.default.writeFileSync('result.txt', outputStr);
            return res.json({
                name: req.params.name,
                count: countoccurences,
                dataWritten: outputStr
            });
        }));
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
    }
});
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map