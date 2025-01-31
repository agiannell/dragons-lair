require('dotenv').config();
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      treasureCtrl = require('./controllers/treasureController'),
      auth = require('./middleware/authMiddleware'),
      { CONNECTION_STRING, SESSION_SECRET } = process.env,
      app = express(),
      PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());
app.use(session({
    resave: true, 
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
});

// Auth endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

// Treasure endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);