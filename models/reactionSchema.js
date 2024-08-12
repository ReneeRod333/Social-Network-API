const { Schema, model, Types, get } = require('mongoose');
const { formatDate } = require('../utils/helpers');

const reactionSchema = new Schema({
  _id: false,
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
});

module.exports = reactionSchema;
