
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
//*******************Must Have*********************
const pgp = require('pg-promise')();
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

//**************OPTIONAL**************************


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = pgp('postgres://rcoppa@localhost:5432/square');

app.use(session({
  secret: 'xxxxxxx',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//*******************OWNER********************
app.post('/sign', function(req, res){
  let data = req.body;
  bcrypt
    .hash(data.password, 10, function(err, hash){
      console.log(data)
      db.none("INSERT INTO owner(name, last_name, email, password) VALUES($1, $2, $3, $4)",[data.name, data.last_name, data.email, hash])
      .then(function(){
        res.render('owner/ownerlog');
    });
  });
});

//Retrieves user info and compares (LOGIN)
app.post('/log', function(req, res){
  let data = req.body;
 db
  .one("SELECT * FROM owner WHERE email = $1", [data.email])
  .catch(function(){
    res.render("login/error");
  })
  .then(function(user){
    bcrypt.compare(data.password, user.password, function(err, cmp){
      if(cmp) {
        req.session.user = user;
      res.render('index', user);
      } else {
        res.send("You're wrong");
      }
    })
  })
});

app.get("/administrator", function(req, res){
  db.any("SELECT * FROM users")
  .then(function(list){
    let all = {
      users:list
    };
  res.render('owner/lookedUp', all);
});
});

app.get('/administrator/:id', function(req, res){
  var id = req.params.id;
db.one("SELECT * FROM users WHERE id = $1", id)
.then(function(data){
    var lookedUp = {
      id:data.id,
      name: data.name,
      last: data.last_name,
      email: data.email,
      password: data.password
    };
    res.render('owner/show', lookedUp);
  });
})



//*********DELETE USER****************
app.post('/delete', function(req, res){
  db.none("DELETE FROM users WHERE email = $1", req.body.remove)
  .then(function(){
    res.redirect("/administrator");
  })
});

//************UPDATES USER EMAIL/PASSWORD*******
app.post('/update', function(req, res){
  let data = req.body;
  db.any("UPDATE users SET email=$1, password=$2 WHERE id=$3",[data.email, data.password, data.num_id])
  .then(function(){
    res.redirect("/administrator");
  })
});
//*************LOGOUT********************

app.get('/logout', function(req, res){
  req.session.user = false;
  res.redirect("/ownerlog");
});

//******************USERS***********************
app.post('/signup', function(req, res){
  let data = req.body;
if(req.session.user) {
  bcrypt
    .hash(data.password, 10, function(err, hash){
      console.log(data)
      db.none("INSERT INTO users(name, last_name, email, password) VALUES($1, $2, $3, $4)",[data.name, data.last_name, data.email, hash])
      .then(function(){
        res.redirect('/administrator');
    });
  });
  }else{
   res.send('login first bitch!');
  }
});

//*******************LOGIN*******************
app.post('/user', function(req, res){
  let data = req.body;
 db
  .one("SELECT * FROM users WHERE email = $1", [data.email])
  .catch(function(){
    res.render("user/error");
  })
  .then(function(user){
    bcrypt.compare(data.password, user.password, function(err, cmp){
      if(cmp) {
        req.session.user = user;
      res.render('user/user', user);
      } else {
        res.render("user/error");
      }
    })
  })
});

//*****************GET TASKS************
app.get('/tasks', function(req, res){
  owner = req.session.user.id;
  if(owner){
 db.any("SELECT * FROM tasks WHERE task_owner = $1", owner)
  .then(function(data){
    var all_tasks = {
      todo: data
    };
    console.log(data)
    res.render('user/tasks', all_tasks)
  });
}else{
  res.send('Who are you?? Please, login!!');
}
});

//***************ADD TASK*******************
app.post("/tasks", function(req, res){
project = req.body.project;
client = req.body.client;
creation_date= creation_date= new Date().toLocaleString().split(',',1)[0];
creation_time = new Date().toLocaleString().split(',',2)[1];
description = req.body.description;
deadline = [req.body.month, req.body.day].join(" / ");
task_owner = req.session.user.id;
if(req.session.user){
db.one("INSERT INTO tasks(project, client, creation_date, creation_time, description, dead_line, task_owner)VALUES($1,$2,$3,$4,$5,$6,$7) returning id",[project, client, creation_date, creation_time, description, deadline, task_owner])
.then(info=>{
  console.log(info)
res.redirect('/tasks');
});
}else{
  res.send("login Bitch!")
}
});

app.post('/delete_task', function(req, res){
  db.none("DELETE FROM tasks WHERE id = $1", req.body.remove)
  .then(function(){
    res.redirect("/tasks");
  })
});

//*****************CALENDAR NOTES*****************
/*
app.get('/init', function(req, res){
  description =
  start_date =
  start_time =
  end_date =
if(req.session.user){
db.one("INSERT INTO tasks(creation_date, creation_time, description, dead_line, task_owner)VALUES($1,$2,$3,$4) returning id",[start_date, start_time, description, end_date, task_owner])
.then(info=>{
  console.log(info);
res.send('Added');
});
}else{
  res.send("login Bitch!")
}
});*/

//*****************LOGOUT******************
app.get('/out', function(req, res){
  req.session.user = false;
  res.redirect("/login");
});



//************ROUTES****************
app.get('/home',function(req, res){
   if(req.session.user) {
    console.log(req.session.user)
  res.render('index')
}else{
  res.send('Login Bitch');
 }
});

app.get('/admin', function(req, res){
  if(req.session.user) {
  res.render('index');
}else{
  res.send("Login Bitch!")
}
});

app.get('/ownersign', function(req, res){
  res.render('owner/ownersign');
});

app.get('/ownerlog', function(req, res){
  res.render('owner/ownerlog');
});

app.get('/login', function(req, res){
  res.render('user/userlog');
});

app.get('/user', function(req, res){
  if(req.session.user) {
    console.log(req.session.user)
  res.render('user/user');
}else{
  res.send('Login Bitch');
 }
});

app.get('/administrator', function(req, res){
  res.render('owner/lookedUp');
});

app.get('/error', function(req, res){
  res.render('user/error');
});

app.get('/sched', function(req, res){
  res.render('user/sched');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Server Running in port: "+port+" {^-^}");
});







