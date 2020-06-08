const path = require("path");

const DB_EXPORT_PATH = path.join(__dirname, "/db/");
const DB_FILENAME = "testResults";
const API_PORT = 3000;

module.exports = {
    DB_EXPORT_PATH,
    DB_FILENAME,
    API_PORT,
};
