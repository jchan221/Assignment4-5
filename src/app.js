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
const blog = require('./model/blog');
const { find } = require('./model/accounts');

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

app.get('/home',(req,res) => {
    res.render('home')
})
app.get('/new', async (req,res) => {
    const searchBlog = await blog.find(

    )

    res.render('new', {
        blogs: searchBlog,
    });
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
    //console.log(req.session.users);
    //req.session;
    res.redirect('/About');

});

app.get('/About', async (req,res) => {
    if (req.session.users) {
        const myBlog = await blog.find({
            firstname: req.session.firstname,
        });
        console.log(myBlog);
        res.render('About', {
            user: req.session.users,
            myBlog: myBlog,
        });
    }
    else {
        res.redirect('/');
    }
})


app.post('/new', async (req,res) => {
    if (req.session.users) {
        res.render('new', {users:req.session.users});
    }
    else {
        res.redirect('/');
    }
    const {firstname,title,body} = req.body;

    const newPost = new blog({
        firstname: req.body.firstname,
        title: req.body.title,
        body: req.body.body,
    });
    newPost.save().then().catch((err)=> 
    console.log('error'));
    res.redirect('/new');
});

