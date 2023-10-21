const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// const keys = require('./configs/keys');

// Import Routes files
const todoRoutes = require('./routes/todos');

// Express settings and middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);



// Connect to Database
const MONGODB_URI = "mongodb+srv://VedantShahu:zFZP7J7gPuRbkUZE@cluster0.xwhknbc.mongodb.net/test?retryWrites=true&w=majority";
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true); // Deal with "DeprecationWarning: collection.ensureIndex is deprecated."
mongoose.connect(MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true });

mongoose.connection.on('connected', () =>
  console.log(`Database connected to: ${MONGODB_URI}`)
);
mongoose.connection.on('disconnected', () =>
  console.log(`Database disconnected`)
);
mongoose.connection.on('error', err =>
  console.log(`Database connect with error: ${err.message}`)
);

// Server
const PORT = 5566;

app.listen(PORT, () => {
  console.log(`Listening on the port ${PORT} `)
});
