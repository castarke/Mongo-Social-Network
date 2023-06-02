const { Thought, User } = require('../models');

// get all thoughts
const thoughtController = {
  getThought: async function (req, res) {
    try {
      const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// get a single thought
  getSingleThought: async function (req, res) {
    try {
      const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Could not find thought with this id' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// uses post route,creating a thought
  createThought: async function (req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      const dbUserData = await User.findOneAndUpdate(
        { username: dbThoughtData.username },
        { $push: { thoughts: dbThoughtData._id } },
        { new: true }
      );
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought was created, but no user found with this id' });
      }
      res.json({ message: 'Thought was created' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
//uses put route, updating a thought
  updateThought: async function (req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Could not find thought with this id' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// uses delete route, deleting thought
  deleteThought: async function (req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'Could not find thought with this id' });
      }
      const dbUserData = await User.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: 'Thought was successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// uses post route, adding reaction
  addReaction: async function (req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      console.log(req.body)
      debugger
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
//uses  delete route, deleting reaction
  removeReaction: async function (req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: {
              reactionId: req.params.reactionId
            }
          }
        },
        { runValidators: true, new: true }
      );
      if (!dbThoughtData) {
        return res.status(404).json({ message: 'No thought with this id' });
      }
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;
