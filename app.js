//Set up
const express = require('express')
const morgan = require('morgan')
const path = require('path')
//--Session setup
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session')
//--Routes setup
const homeRouter = require('./routes/home')
const movieRouter = require('./routes/movie')

const PORT = 4000
const app = express()
app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))
//--Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: true}))
//--Parse JSON bodies (as sent by API clients)
app.use(express.json());
//--initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
//--initialize cookie-parser to allow us access the cookies stored in the browser
app.use(cookieParser());
//--initialize express-session to allow tracking the logged-in user across sessions
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "movie_rating_secret"
}));

// Routes
app.use('/', homeRouter)
app.use('/home', homeRouter)
app.use('/movie', movieRouter)

// Handle 404 Error
app.use((req, res, next) => {
    res.status(404).send(
        '<h1> The page you are looking for does not exist or an other error occurred.</h1><h2>Please go back and choose a new direction.</h2>');
})

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})