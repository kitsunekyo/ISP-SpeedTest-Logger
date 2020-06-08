const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const { DBFILEBASEPATH, DBFILENAME } = require("../../config");

/**
 * module to read and write to lowdb collection for test results
 */
const resultsApi = (() => {
    const collectionName = DBFILENAME;
    const adapter = new FileSync(`${DBFILEBASEPATH}${collectionName}.json`);
    const collection = low(adapter);
    const dbDefaults = {};

    dbDefaults[collectionName] = [];
    collection.defaults(dbDefaults).write();

    function create(result) {
        collection.get(collectionName).push(result).write();
    }

    function list() {
        return collection.get(collectionName).value();
    }

    function find(query) {
        return collection.get(collectionName).find(query).value();
    }

    return {
        list,
        find,
        create,
    };
})();

module.exports = resultsApi;
