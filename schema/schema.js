const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Temp book collection
const books = [
    { name: 'Win Win', id: "123", genre: 'Hello World Genre' },
    { name: 'Bacardy', id: "323" },
    { name: 'Long ago', id: "545" },
    { name: 'Variety', id: "878" }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args) {
                //code to get data from the db or other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});