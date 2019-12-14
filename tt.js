const fs = require("fs");

const r = fs.readFileSync("db.json").toString();
const obj = JSON.parse(r);
console.log(obj.length);
