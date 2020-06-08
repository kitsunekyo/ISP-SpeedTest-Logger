const path = require("path");

const DB_STORAGE_PATH = path.join(__dirname, "/db_storage/");
const DB_FILENAME = "testResults";
const API_PORT = 3000;

module.exports = {
    DB_STORAGE_PATH,
    DB_FILENAME,
    API_PORT,
};
