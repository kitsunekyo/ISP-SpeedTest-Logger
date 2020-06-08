const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const { DB_STORAGE_PATH, DB_FILENAME } = require("../../config");

/**
 * module to read and write to lowdb collection for test results
 */
const db = (() => {
    const adapter = new FileSync(`${DB_STORAGE_PATH}${DB_FILENAME}.json`);
    const collection = low(adapter);
    const dbDefaults = {};

    dbDefaults[DB_FILENAME] = [];
    collection.defaults(dbDefaults).write();

    function create(result) {
        collection.get(DB_FILENAME).push(result).write();
    }

    function list() {
        return collection.get(DB_FILENAME).value();
    }

    function find(query) {
        return collection.get(DB_FILENAME).find(query).value();
    }

    return {
        list,
        find,
        create,
    };
})();

module.exports = db;
