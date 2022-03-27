const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionText: {
    type: String,
    required: true,
    minlength: 1, 
    maxlength: 280
  },
  userName: {
    type: String, 
    required: true
}, 
createdAt: {
  type: Date, 
  default: Date.now
}

});

module.exports = reactionSchema;
