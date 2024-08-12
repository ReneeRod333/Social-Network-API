const { Schema, model } = require('mongoose');

const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => emailRegex.test(v),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    virtuals: {
      friendCount: {
        get() {
          return this.friends.length;
        },
      },
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
