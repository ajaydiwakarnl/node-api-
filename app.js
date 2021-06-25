const express  = require('express');
const dbConfig = require('./database/db');
const app  = express();
const bodyParser = require("body-parser");
const apiRoute =  require('./routes/api');
const adminRoute =  require('./routes/admin');
const cors = require("cors");

const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(apiRoute);
app.use(adminRoute);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('./public'));
app.set('PORT',process.env.PORT || 2000);
const  server = app.listen(app.get('PORT'),function (){
    console.log("Run Successfully on" + app.get('PORT'));
});
