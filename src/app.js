const express = require('express');
const noteRouter = require('./routes/note.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api' , noteRouter);
app.use((req,res) =>{
    res.status(404).json({msg : 'route not found'});
})

module.exports = app;