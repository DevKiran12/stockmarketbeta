


const express = require('express');
const { engine } = require('express-handlebars');

const path = require('path');

const app = express();

const Port = process.env.PORT || 5000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const otherstuff = "hello there this is other stuff!"

app.get('/', function (req, res)  {
    res.render('home',{ 
        stuff: otherstuff

    } );
});


//set static folder

app.use(express.static(path.join(__dirname, 'public')));

app.listen(Port, () => console.log("Server listening on Port "+ Port));
