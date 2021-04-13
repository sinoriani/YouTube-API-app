const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors');

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
const {oauthRouter,getCreds,clientId, clientSecret, redirectUrl} = require('./routes/youtubeAuth')
const {channelsRouter} = require('./routes/channels')
const {usersRouter} = require('./routes/users')
const {commentsRouter} = require('./routes/comments')
const {historyRouter} = require('./routes/history')
const {notificationsRouter} = require('./routes/notifications')
const {videosRouter} = require('./routes/videos')

// Enable CORS
app.use(cors())

app.use('/oauth', oauthRouter)
app.use('/channels', channelsRouter)
app.use('/users', usersRouter)
app.use('/comments', commentsRouter)
app.use('/history', historyRouter)
app.use('/notifications', notificationsRouter)
app.use('/videos', videosRouter)



// set a static folder
app.use(express.static(path.join(__dirname,'public')))


const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ' + PORT))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // Close server & exit process
    //server.close(() => process.exit(1))
  })