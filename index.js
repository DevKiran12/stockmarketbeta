


const express = require('express');
const { engine } = require('express-handlebars');

const path = require('path');
const request = require('request');
const app = express();
const bodyparser = require('body-parser');
const Port = process.env.PORT || 5000;
const axios = require("axios");


//use body parser middleware

app.use(bodyparser.urlencoded({extended: false}));

// API KEy :- pk_886d96de230e4da68c5765220514c4a9
//create call API function 
function call_api(finishedAPI,ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_886d96de230e4da68c5765220514c4a9',{json:true},(err,res,body)=> {
        if (err) {return console.log(err);}
        // console.log(body);
        if(res.statusCode===200){
            console.log(body);
            finishedAPI(body);
        }
    });
}


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "hello there this is other stuff!"
//set handlebar index get routes
app.get('/', function (req, res)  {
    call_api(function(doneapi){
        res.render('home',{ 
            stock: doneapi
        });
    // console.log(api);
    

    },"fb");
});

// call_api(function, req.body.stock_ticker)
//set handlebar index post routes
app.post('/', function (req, res)  {
    call_api(function(doneapi){
        // posted_stuff = req.body.stock_ticker;
        res.render('home',{ 
            stock: doneapi,
            // posted_stuff:posted_stuff
        });
    // console.log(api);
    

    },req.body.stock_ticker);
});

app.get("/home2", async function(req, res){
    let response = await axios.get("https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_886d96de230e4da68c5765220514c4a9");
    // console.log(response)
    // let data = await response.json();
    res.render("home", {stock:response.data})

})

//set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.listen(Port, () => console.log("Server listening on Port "+ Port));
