const express = require("express");
const { create } = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

// Set up Handlebars
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  //helpers: require('./utils/helpers')
});

// Middleware setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Static files should be served at this point, as all routes and middlewares are already defined
app.use(express.static('public'));

// Handlebars engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Passport and other configurations
require('./config/passport');
require('./config/cloudinary');

// Routes
const forumRoutes = require('./routes/forum'); // Make sure the path is correct
const feedbackRoutes = require('./routes/feedback'); // Adjust the path as necessary
app.use("/", forumRoutes);
app.use("/", feedbackRoutes); // This will serve all your feedback routes on the root path
app.use("/", require("./routes/index")); // Assuming you have an index.js in your routes folder

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

