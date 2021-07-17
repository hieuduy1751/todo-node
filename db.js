const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/db.json');
const db = low(adapter);

db.defaults({ users: [], todo: []}).write();

module.exports = db;