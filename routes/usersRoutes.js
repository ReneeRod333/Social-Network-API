const router = require('express').Router();
const { User, Thought } = require('../models');
const { userResponseFormatter } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).exec();
    const userRes = users.map(userResponseFormatter);
    res.status(200).json(userRes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const userRes = userResponseFormatter(user);
    res.status(200).json(userRes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const userRes = userResponseFormatter(user);
    res.status(200).json(userRes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    const userRes = userResponseFormatter(user);
    res.status(200).json(userRes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    await Thought.deleteMany({ username: req.params.id });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
