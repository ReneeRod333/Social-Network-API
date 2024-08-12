const dayjs = require('dayjs');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const { User } = require('../models');
const DATE_FORMAT = 'MMM Do, YYYY at HH:mm A';

dayjs.extend(advancedFormat);

const formatDate = (date) => dayjs(date).format(DATE_FORMAT);

const userResponseFormatter = (user) => {
  const { id, ...userRes } = user.toJSON({ virtuals: true });
  return userRes;
};

const thoughtResponseFormatter = (thought) => {
  const rawJson = thought.toJSON();
  const thoughtRes = {
    ...rawJson,
    username: rawJson.username.username,
  };

  return thoughtRes;
};

module.exports = {
  DATE_FORMAT,
  formatDate,
  userResponseFormatter,
  thoughtResponseFormatter,
};
