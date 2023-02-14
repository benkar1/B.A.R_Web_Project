/*
    import what we need
 */
const express = require('express');
const path = require('path');
const port = 3000;
const sql = require('./db/db');
const CRUD = require('./db/CRUD');
const bodyParser = require('body-parser');
const strigify = require('csv-stringify').stringify;
const { parse } = require('csv-parse');
const csvToJson = require('csvtojson');
const cookieParser = require('cookie-parser');



/*
    setups
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'static')));
app.use(cookieParser());
    
//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


/*
    routes redirection
 */
app.get('/', (req,res) =>{
    res.redirect('/createDB');
})

app.get('/createDB', (req,res) =>{
    CRUD.CreateTables();
    res.redirect('/login');
})


app.get('/login', (req,res) =>{
    res.render('login',{
        title:"login"
    });
})

app.get('/MainPage', (req,res) =>{
    const firstname = req.cookies.firstname;
    if(req.cookies.username != undefined){
        res.render('MainPage',{
            title:"B.A.R Home Page",
            container_title: "Welcome Back, " + firstname.toUpperCase()
        });    
    }else{
        res.redirect('/login');
    }
})

app.get('/UserProfile', (req,res) =>{
    if(req.cookies.username != undefined){
        res.redirect('/showPractices')
    }else{
        res.redirect('/login');
    }
})

app.get('/Practice', CRUD.getQuestions)


app.get('/About', (req,res) => {
    res.render('About',{
        title:"About",
        container_title: "About B.A.R"
    });
})


//insert new user
app.post('/insertNewUser', CRUD.insertNewUser)


// //sign in route
app.post('/Sign_in', CRUD.findUser)

//show user practices
app.get('/showPractices', CRUD.showPractices)

//insert new practice
app.post('/insertPractice', CRUD.insertPractice)


app.get('/drop', (req,res) => {
    CRUD.DropTables();
    res.send("Dropped Tables");    
})




app.listen(port,() =>{
    console.log(`server is running on port ${port} `)
});

  
  