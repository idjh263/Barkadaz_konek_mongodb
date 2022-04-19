const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true, 
      trim: true, 
      unique: true
    },
    email: {
      type: String,
      required: true, 
      trim: true,
      unique: true, 
      match: [/.+@.+\..+/]
    },
    thought: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ], 
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
// PizzaSchema.virtual('commentCount').get(function() {
//   return this.comments.reduce(
//     (total, comment) => total + comment.replies.length + 1,
//     0
//   );
// });



UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
});


const User = model('User', UserSchema);

module.exports = User;