const { Schema, model, Types } = require('mongoose'); 
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1, 
            maxlength: 200
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
            virtuals: true,
            getters: true
        }, 
        id: false
    }
);
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;