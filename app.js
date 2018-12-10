const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//Connect to MongoDb
mongoose.connect('mongodb://localhost:27017/graphqldb');
mongoose.connection.once('open', () => {
    console.log('MongoDB connection made successful');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('NodeJS server running on port - ' + 4000);
})