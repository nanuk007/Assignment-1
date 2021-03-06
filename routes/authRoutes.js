const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const cities =require('../cities/cities.json');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

module.exports = (app) => {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    // post 
    app.post('/api/auth/signin', function (req,res,next){controller.signin(req,res)});
    app.post('/api/auth/signup',jsonParser,function(req,res,next){ [
        verifySignUp.checkDuplicateUsernameOrEmail(req,res,next)
    ],
        controller.signup(req,res)});


        
    // get
    app.get("/api/test/user",function(req,res){ [authJwt.verifyToken(req,res)], controller.userBoard(req,res)});
    app.get('/api/logout', (req, res) => {

        req.logout();
        res.redirect('/')
    });

    app.get('/api/current_user', (req, res) => {

        res.send(req.user);
    });

    app.get("/api/cities",(req,res)=>{
        res.send(cities);
    })
  


};

