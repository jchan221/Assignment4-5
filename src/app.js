const express = require('express')
const session = require('express-session');
let app = express()
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
const ejs = require('ejs')
    methodOverride = require('method-override'),
    cors = require('cors'),
    logger = require('morgan')
    require('./mongoosConnection')

const users = require('./model/accounts');

app.use(logger('dev'))
app.use(cors());
app.use(methodOverride('_method'))
app.use(express.json())
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
  })); 


app.set('view engine', 'ejs')

app.get('/',(req,res) => {
    res.render('login')
})
app.get('/About',(req,res) => {
    res.render('about')
})
app.get('/home',(req,res) => {
    res.render('home')
})
app.get('/new',(req,res) => {
    res.render('new')
})
app.listen(5000, () => {
    console.log('http://localhost:5000')
})

app.post('/register',(req,res) => {
    const {email,password,firstname,lastname} = req.body;

    const registerUser = new users({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,

    });
    registerUser.save().then().catch((err)=> 
    console.log('error'));
});

app.post('/login' , async (req,res) => {
    const {email,password} = req.body;
    const loginUser = await users.findOne({
        email,
    });
    //if (!loginUser) {
        //res.send('invalid username');
        //return;
    //}
    req.session.users = loginUser; 
    console.log(req.session.users);
    //req.session;
    res.redirect('/About');

});

app.get('/About', async (req,res) => {
    if (req.session.users) {
        console.log(req.session.users);
        res.render('/About', {user:req.session.users});
    }
    else {
        res.redirect('/');
    }
})

