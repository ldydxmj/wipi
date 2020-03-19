"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
const fs = require("fs-extra");
const path_1 = require("path");
const LOG_DIR_NAME = '../../logs';
fs.ensureDirSync(path_1.join(__dirname, LOG_DIR_NAME));
void ['request', 'response', 'error'].forEach(t => {
    fs.ensureDirSync(path_1.join(__dirname, LOG_DIR_NAME, t));
});
const resolvePath = (dir, filename) => path_1.join(__dirname, LOG_DIR_NAME, dir, filename);
const commonCinfig = {
    type: 'dateFile',
    pattern: '-yyyy-MM-dd.log',
    alwaysIncludePattern: true,
};
log4js.configure({
    appenders: {
        request: Object.assign(Object.assign({}, commonCinfig), { filename: resolvePath('request', 'request.log'), category: 'request' }),
        response: Object.assign(Object.assign({}, commonCinfig), { filename: resolvePath('response', 'response.log'), category: 'response' }),
        error: Object.assign(Object.assign({}, commonCinfig), { filename: resolvePath('error', 'error.log'), category: 'error' }),
    },
    categories: {
        default: { appenders: ['request'], level: 'info' },
        response: { appenders: ['response'], level: 'info' },
        error: { appenders: ['error'], level: 'info' },
    },
});
exports.requestLogger = log4js.getLogger('request');
exports.responseLogger = log4js.getLogger('response');
exports.errorLogger = log4js.getLogger('error');
//# sourceMappingURL=index.js.map