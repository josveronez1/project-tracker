var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const port = 3000;


var indexRouter = require('./routes/index');
var projectsRouter = require('./routes/projects');
var tasksRouter = require('./routes/tasks');
var subtasksRouter = require('./routes/subtasks');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use('/subtasks', subtasksRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

module.exports = app;
