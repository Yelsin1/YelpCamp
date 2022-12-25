if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const ExpressError = require('./utills/ExpressError');
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const users = require('./routes/users');
// const helmet = require('helmet');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

mongoose.set('useFindAndModify', false);
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
// app.use(helmet({ contentSecurityPolicy: false }));

// session
app.use(session({
    name: 'Yelsin',
    secret: 'thisshouldbeavalidsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use(flash());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Static files
app.use(express.static(path.join(__dirname, 'public')))

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'yelsinone@gmail.com', username: 'yelsinone' });
    const newUser = await User.register(user, '----');
    res.send(newUser);
})

//Routers
app.use('/', users);
app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((error, request, response, next) => {
    const { status = 500, message = 'Something went wrong' } = error;
    response.status(status).render('error', { error });
})

app.listen(6060, () => {
    console.log("listening on Port: 6060");
});