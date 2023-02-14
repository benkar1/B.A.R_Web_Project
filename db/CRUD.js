const sql = require('./db');
const path = require('path');
const csv = require('csvtojson');



const CreateTables = (req, res) =>{
    CreateQuestionsTable();
    CreateUsersTable();
    CreatePracticesTable();
    return;
}


const CreateQuestionsTable = (req, res) => {
    const Q1 = "create table if not exists questions (id int auto_increment primary key, question varchar(255), answer varchar(255), definition varchar(255), category varchar(255))";
    sql.query(Q1, (err, mysqlres) =>{
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating table"});
        }else{
            console.log('questions table created');
            insertQuestionsData();
        }
    });
};

const insertQuestionsData = (req, res) => {
    const Q2 = "INSERT INTO questions SET ?";
    const csvFilePath = path.join(__dirname, "questions_data.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            jsonObj.forEach(element => {
                let newEntry = {
                    "id": element.id,
                    "question": element.question,
                    "answer": element.answer,
                    "definition": element.definition,
                    "category": element.category
                }
                sql.query(Q2, newEntry, (err, mysqlres) => {
                    if (err) {
                        console.log("error in inserting data: ", err);
                        // res.status(400).send({message: "error inserting row to table: " + err});
                    }else{
                        console.log("row created successfully");
                    }
                });
            });
        });
}


const CreateUsersTable = (req, res) => {
    const Q3 = "create table if not exists users (username varchar(16) not null primary key, firstname varchar(20), lastname varchar(20), password varchar(16))";
    sql.query(Q3,(err, mysqlres)=>{
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('users table created');
    });
}


const insertNewUser =  (req,res) =>{
    if (!req.body){
        // res.status(400).send({message: "content cannot be empty"});
        return;
    }
    //pull data to jason
    const newUser = {
        "username": req.body.SignUpusername,
        "firstname": req.body.SignUpfirstname,
        "lastname": req.body.SignUplastname,
        "password": req.body.SignUppassword
    };
    //run query
    const Q4 = "INSERT INTO users SET ?";
    sql.query(Q4, newUser, (err, mysqlres) => {
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating new user " + err});
            return;
        }
        res.redirect('/login');
    });
};


const findUser =  (req,res)=>{
    if (!req.body){
        // res.status(400).send({message: "content cannot be empty"});
        return;
    }
    //pull data to jason
    const {username, password} = req.body;
    //run query
    const Q5 = `select * from users where username like '${username}' `;
    sql.query(Q5, (err, mysqlres)=>{
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating new user " + err});
            return;
        }
        if (mysqlres.length > 0) {
            const user = mysqlres[0];

            if (password === user.password) {
                res.cookie("username", user.username);
                res.cookie("firstname", `${user.firstname}`);
                res.cookie("lastname", `${user.lastname}`);
                res.cookie("password", user.password);
                res.redirect('/MainPage');
                return;
            }else{
                res.redirect('/login');
            }

        }else{
            res.redirect('/login');
        }
    });
};

const CreatePracticesTable = (req, res) => {
    const Q6 = "create table if not exists practices (username varchar(16) not null, time datetime, question varchar(255), answer varchar(255), score integer)";
    sql.query(Q6,(err, mysqlres)=>{
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('practices table created');
    });
}


const insertPractice =  (req,res) =>{
    if (!req.body){
        // res.status(400).send({message: "content cannot be empty"});
        return;
    }
    //pull data to jason
    const newPractice = {
        "username": req.cookies.username,
        "time": new Date(),
        "question": req.body.question,
        "answer": req.body.answer,
        "score": req.body.score
    };
    //run query
    const Q7 = "INSERT INTO practices SET ?";
    sql.query(Q7, newPractice, (err, mysqlres) => {
        if (err){
            console.log("error: ", err);
            // res.status(400).send({message: "error in creating new user " + err});
            return;
        }
        console.log("new practice row added");
        return;
    });
};


const showPractices = (req,res) =>{
    const user = `${req.cookies.username}`;
    const Q8 = `select p.time as time, q.category as category, p.question as question, q.answer as answer, q.definition as definition, p.answer as user_answer, p.score from practices as p left join questions as q on p.question = q.question where username like ?`;
    sql.query(Q8, user + '%', (err, mysqlres)=>{
        if (!err) {
            console.log("table is shown Successfully");
            const firstname = req.cookies.firstname;
            res.render('UserProfile',{
                title:"My B.A.R Profile",
                container_title: `${firstname.toUpperCase()} Practices`,
                Practices_table: mysqlres
            });
            return;
        } else {
            console.log("Error: ", err);
            // res.status(400).send({message: "could not log the table"});
        }
    })
};

const getQuestions = (req,res) =>{
    const Q9 = `select * from questions where char_length(question)>1 order by RAND()`;
    sql.query(Q9, (err, mysqlres)=>{
        if (!err) {
            console.log("table is shown Successfully");
            res.render('Practice',{
                title:"Practice Page",
                Questions_table: mysqlres
            });
            return;
        } else {
            console.log("Error: ", err);
            // res.status(400).send({message: "could not log the table"});
        }
    })
    return;
};

const DropTables = (req, res)=>{
    DropQuestionsTable();
    DropPracticesTable();
    DropUsersTable();
    return;
}

const DropQuestionsTable = (req, res)=>{
    var Q10 = "DROP TABLE questions";
    sql.query(Q10, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            // res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        // res.send("table drpped");
        return;
    })
}

const DropPracticesTable = (req, res)=>{
    var Q11 = "DROP TABLE practices";
    sql.query(Q11, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            // res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        // res.send("table drpped");
        return;
    })
}

const DropUsersTable = (req, res)=>{
    var Q12 = "DROP TABLE users";
    sql.query(Q12, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            // res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        // res.send("table drpped");
        return;
    })
}




module.exports = {CreateTables, insertPractice, showPractices, insertNewUser, findUser, getQuestions, DropTables};


