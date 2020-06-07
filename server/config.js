const path = require("path");

const DBFILEBASEPATH = path.join(__dirname, "/db/");
const DBFILENAME = "testResults";
const SERVERPORT = 3000;
const JOBTIMING = "* /12 * * *";

module.exports = {
    DBFILEBASEPATH,
    DBFILENAME,
    SERVERPORT,
    JOBTIMING,
};
