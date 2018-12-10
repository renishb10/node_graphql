const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList 
} = graphql;

//Temp book collection
const books = [
    { name: 'Win Win', id: "123", genre: 'Hello World Genre', authorId: "1" },
    { name: 'Bacardy', id: "323", genre: 'Hello World Genre', authorId: "2" },
    { name: 'Long ago', id: "545", genre: 'Hello World Genre', authorId: "1" },
    { name: 'Variety', id: "878", genre: 'Hello World Genre', authorId: "3" }
];

//Temp book collection
const authors = [
    { id: "1", name: 'Ren', age: 90 },
    { id: "2", name: 'Ish', age: 89 },
    { id: "3", name: 'Rudra', age: 90 }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, {id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //code to get data from the db or other source
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                //code to get data from the db or other source
                return _.find(authors, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});