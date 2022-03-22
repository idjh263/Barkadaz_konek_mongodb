const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 100
        }, 
        createdAt: {
            type: Date, 
            default: Date.now
        }, 
        userName: {
            type: String, 
            required: true
        }, 
        reactions: [reactionSchema]
    }, 
    {
        toJSON: {
            getters: true
        }, 
        id: false
    }
);

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;