const path = require("path");

const DBFILEBASEPATH = path.join(__dirname, "/db/");
const DBFILENAME = "testResults";
const SERVERPORT = 3000;

module.exports = {
    DBFILEBASEPATH,
    DBFILENAME,
    SERVERPORT,
};
