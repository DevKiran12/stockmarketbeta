


const express = require('express');
const { engine } = require('express-handlebars');

const path = require('path');
const request = require('request');
const app = express();

const Port = process.env.PORT || 5000;

// API KEy :- pk_886d96de230e4da68c5765220514c4a9
//create call API function 
function call_api() {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_886d96de230e4da68c5765220514c4a9',{json:true},(err,res,body)=> {
        if (err) {return console.log(err);}
        // console.log(body);
        if(res.statusCode===200){
            // console.log(body);
            return body
        }
    });
}


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "hello there this is other stuff!"

app.get('/', function (req, res)  {
    const api = call_api();
    console.log(api);
    res.render('home',{ 
        stock: api

    } );
});


//set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.listen(Port, () => console.log("Server listening on Port "+ Port));
