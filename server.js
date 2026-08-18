/* eslint-disable prefer-destructuring */
require('dotenv').config();
require('./config/databse');

const express = require('express');

const app = express();

// Middleware
const session = require('express-session');
const MongoStore = require('connect-mongo').MongoStore;
const methodOverride = require('method-override');
const morgan = require('morgan');

const isSignedIn = require('./middleware/isSignedIn');
const addUserToViews = require('./middleware/addUserToViews');

// CONTROLLERS
const authCtrl = require('./controllers/authCtrl');
const foodCtrl = require('./controllers/foodCtrl.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));

// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));

// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
    }),
  })
);

// Makes user available in EJS views
app.use(addUserToViews);

// PUBLIC ROUTES
app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.get('/auth/sign-up', authCtrl.signup);
app.post('/auth/sign-up', authCtrl.register);

app.get('/auth/sign-in', authCtrl.signin);
app.post('/auth/sign-in', authCtrl.login);

app.get('/users/:userId/foods', foodCtrl.index);

app.get('/users/:userId/foods/new',foodCtrl.newItem);

app.post('/users/:userId/foods', foodCtrl.create);

app.get('/users/:userId/foods/:itemsId', foodCtrl.show);

app.delete('/users/:userId/foods/:itemId', foodCtrl.deleteItem);

app.get('/users/:userId/foods/:itemId/edit', foodCtrl.editItem);

app.put('/users/:userId/foods/:itemId', foodCtrl.updateItem);
// CUSTOM MIDDLEWARE
// Everything below this line requires the user to be signed in
app.use(isSignedIn);

// PRIVATE ROUTES
app.get('/auth/sign-out', authCtrl.signout);

app.get('/protected', async (req, res) => {
  res.send(`You are logged in as ${req.session.user.username}`);
});

// Start server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});