const router = require('express').Router();
const { Thought, User } = require('../models');
const { thoughtResponseFormatter } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find({})
      .populate('username', 'username')
      .populate('reactions')
      .exec();

    const thoughtsResponse = thoughts.map((thought) =>
      thoughtResponseFormatter(thought)
    );

    res.status(200).json(thoughts);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)
      .populate('users')
      .populate('reactions')
      .exec();

    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.status(200).json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const body = {
      thoughtText: req.body.thoughtText,
      username: user._id,
    };
    const newThought = new Thought(body);
    const savedThought = await newThought.save();
    user.thoughts.push(savedThought._id);
    const thoughtResponse = thoughtResponseFormatter(
      await savedThought.populate('username', 'username')
    );
    await user.save();

    res.status(200).json(thoughtResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    const reactingUser = await User.findById(req.body.userId);
    const body = {
      reactionBody: req.body.reactionBody,
      username: reactingUser.username,
    };

    thought.reactions.push(body);
    const updatedThought = await thought.save();

    const thoughtResponse = thoughtResponseFormatter(
      await updatedThought.populate('reactions')
    );
    res.status(200).json(thoughtResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
