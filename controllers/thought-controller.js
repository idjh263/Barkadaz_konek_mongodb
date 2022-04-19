const { Thought, User, Types } = require('../models');

const thoughtController = {

  getAllThought(req, res) {
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one pizza by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({ path: 'reactions', select: '-__v' })
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(400).json({message: 'No thought found with this id'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });

  },



  // add Thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
    .then(dbThoughtData => {
      User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(400).json({ message: 'No user found with this id' });
              return;
          }
          res.json(dbUserData);
      })
      .catch(err => res.json(err));
  })
  .catch(err => res.status(400).json(err));
},
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true }
  )
  .then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(400).json({ message: 'No thought found with this id' });
          return;
      }
      res.json(dbThoughtData);
  })
  .catch(err => res.status(400).json(err));
},


  // remove Thought
removeThought({ params }, res) {
  Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
      if (!deletedThought) {
        return res.status(404).json({ message: 'No Thought with this id!' });
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thought: params.id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
  // add reaction to Thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  
  // remove reply
  removeReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
