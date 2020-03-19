"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require('@elastic/elasticsearch');
exports.client = new Client({ node: 'http://localhost:9200' });
exports.transformResponse = response => {
    let ret = (response.body && response.body.hits && response.body.hits.hits) || null;
    return ret && ret.length ? ret.map(r => r._source) : ret;
};
//# sourceMappingURL=elasticsearch.client.js.map