const { Schema, model } = require('mongoose');
const reactionSchema = require('./reactionSchema');
const { formatDate } = require('../utils/helpers');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reactions: [reactionSchema],
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
