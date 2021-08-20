var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["HabibiKhaled","admin@example.com",md5("admin123456")])
                db.run(insert, ["AhmadBaloo","user@example.com",md5("user123456")])
            }
        });     
        db.run(`CREATE TABLE favprog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            programid text UNIQUE, 
            programname text,
            unique (programid) 
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                var insert = 'INSERT INTO favprog (programid, programname) VALUES (?,?)'
                db.run(insert, ["HabibiKhaled","admin@example.com"])
                db.run(insert, ["AhmadBaloo","user@example.com"])
            }
        });  
        db.run(`CREATE TABLE favchannel (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            useremail, 
            channelid text , 
            channelname text
            )`,
        (err) => {
            if (err) {
                // Table already created

                console.log(err.message)
            }else{
                var insert = 'INSERT INTO favchannel (channelid, channelname) VALUES (?,?)'
                db.run(insert, ["HabibiKhaled","admin@example.com"])
                db.run(insert, ["AhmadBaloo","user@example.com"])
            }
        });  
    }
});


module.exports = db

