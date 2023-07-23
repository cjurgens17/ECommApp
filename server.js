//connect to heroku
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('./dist/ecommapplication'));

app.get('/*', (req,res) =>
res.sendFile(path.join(__dirname, 'dist/ecommapplication', 'index.html')),
);

app.listen(process.env.PORT || 4200);


