"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const readFile_1 = require("../controller/readFile");
const register = (app) => {
    // LISITING ALL API'S HERE
    app.get(`/api/name-count/:name`, readFile_1.readFileAndFindName);
    app.get(`/api/name/count/file`, readFile_1.readFile);
};
exports.register = register;
//# sourceMappingURL=api.js.map